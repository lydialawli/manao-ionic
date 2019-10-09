import React from 'react';
import { IonButtons, IonContent, IonHeader, IonIcon, IonMenuButton, IonPage, IonToolbar, IonProgressBar, IonModal, IonGrid, IonCol, IonRow, IonItem } from '@ionic/react';
import { trophy } from 'ionicons/icons';
import '../styles/quiz.css';

import { withRouter } from 'react-router-dom';
import axios from 'axios';
import '../styles/userOnboarding.css'
import Quiz from '../components/Quiz.jsx'

class Quizzes extends React.Component {
    state = {
        user: '',
        historyId: '',
        quizzes: [],
        currentQuizz: 0,
        quiz: {},
        totalScore: 0,
        progressValue: 0,
        progressDiff: 0, // should be 1/gameNumQuizzes.length
        showModal: true,
    }

    ionViewWillEnter() {
        this.onPageView()
    }

    componentWillMount() {
        this.onPageView()
    }

    componentWillReceiveProps(props) {
        this.onPageView(props)
    }

    onPageView = (p) => {
        let props = ''
        p ? props = p : props = this.props

        let historyId = localStorage.getItem('history')
        // console.log('user', props.location.user)
        // console.log('historyId', historyId)
        // console.log('gameId ', props.location.gameId)

        axios.get(`${process.env.REACT_APP_API}/games/${props.location.gameId}/quizzes`)
            .then(res => {
                console.log('quizzes==> ', res.data.quizzes)
                this.setState({
                    quizzes: res.data.quizzes,
                    progressDiff: 1 / res.data.quizzes.length,
                    quiz: res.data.quizzes[0].quiz,
                    historyId: historyId,
                    user: props.location.user,
                    gameId: props.location.gameId
                    // inputPlaceholder: res.data.quizzes[0].quiz.answer.content.length
                })
            })
            .catch(err => console.log('err', err))
    }


    nextQuizSetup = () => {
        // console.log('nextquiz', this.state.quizzes[this.state.currentQuizz].quiz)
        if (!this.state.quizzes[this.state.currentQuizz + 1]) {

            this.props.history.push({
                pathname: '/outcome',
                score: this.state.totalScore,
                user: this.state.user,
                gameId: this.state.gameId
            })
        }

        else {
            this.setState({
                quiz: this.state.quizzes[this.state.currentQuizz + 1].quiz,
                currentQuizz: this.state.currentQuizz + 1,
                showModal: true,
            })
        }
    }


    changeProgress = (progressValue, score) => {
        // console.log('progressValue', progressValue)
        // console.log('score', score)

        axios.patch(`${process.env.REACT_APP_API}/histories/${this.state.historyId}`, {
            userId: this.state.user._id,
            score: this.state.totalScore + score
        }).then(data => console.log('patched!', data.data))

        this.setState({
            progressValue: progressValue,
            totalScore: this.state.totalScore + score
        })
    }

    sendCoordinates = () => {
        console.log('opening map...')
        this.setState({ showModal: false },
            () => {
                this.props.history.push({
                    pathname: '/map',
                    lat: this.state.quiz.location.lat,
                    lng: this.state.quiz.location.lng,
                    locationName: this.state.quiz.locationName
                })
            }
        )
    }

    render() {
        return (

            <IonPage className="quizPage">
                <IonHeader no-border className="noShadow">
                    <IonToolbar className="quizbar noShadow">
                        <IonButtons slot="start">
                            <IonMenuButton style={{ color: 'white' }} />
                        </IonButtons>
                        <div className="menuBox"></div>

                        <IonIcon className="scoreIcons trophy" icon={trophy}></IonIcon>
                        <div className="scoreIcons score" >{this.state.totalScore}</div>
                        <IonProgressBar value={this.state.progressValue} className="ionProgressBar" buffer={this.state.progressValue}>
                        </IonProgressBar>
                        <IonButtons onClick={this.sendCoordinates}>
                            <IonIcon className="mapIcon" slot="end" src="assets/locationmapIcon.svg"></IonIcon>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonModal
                        isOpen={this.state.showModal}
                        onDidDismiss={e => this.setState({ showModal: false })}
                        animated="false"
                    >
                        <IonContent className="modalWindow three" >
                            <IonGrid className="onboardingGrid">
                                <IonRow>
                                    <IonIcon className="manaoLogoLogin game" src="assets/Logo-yellow.svg"></IonIcon>
                                </IonRow>
                                <IonRow>
                                    <h1 className="guide indication">{this.state.quiz.indication}</h1>
                                </IonRow>
                                <IonRow>
                                    <IonItem className="guideContainer" onClick={this.sendCoordinates}>
                                        <h1 className="guide locationName">{this.state.quiz.locationName}</h1>
                                    </IonItem>
                                </IonRow>
																<IonRow className="arrowIcon">
																	<h1 className="guide locationName"><i onClick={e => this.setState({ showModal: false })} style={{ backgroundColor: 'transparent' }} className="fas fa-angle-double-down"></i></h1>
																</IonRow>
                            </IonGrid>
                        </IonContent>
                    </IonModal>
                    <Quiz quiz={this.state.quiz} currentQuizz={this.state.currentQuizz} progressDiff={this.state.progressDiff} history={this.props.history} nextQuiz={this.nextQuizSetup} onCorrect={this.changeProgress}></Quiz>
                </IonContent>

            </IonPage >
        )
    }
}



export default withRouter(Quizzes);
