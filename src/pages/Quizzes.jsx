import React from 'react';
import { IonPopover, IonButton, IonModal, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonImg, IonMenuButton, IonPage, IonGrid, IonCol, IonRow, IonToolbar, IonProgressBar, IonInput, IonFooter } from '@ionic/react';
import { lock, unlock, trophy } from 'ionicons/icons';
import '../styles/quiz.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/userOnboarding.css'
import { Plugins } from '@capacitor/core';
import Quiz from '../components/Quiz.jsx'

class PlayQuizzes extends React.Component {
    state = {
        user: '',
        historyId: '',
        quizzes: [],
        currentQuizz: 1,

    }

    ionViewWillEnter() {
        this.onPageView()
    }

    componentWillMount() {
        this.onPageView()
    }

    onPageView = () => {
        Plugins.Storage.get({ key: 'history' })
            .then(history => {
                this.setState({
                    historyId: history.value,
                    user: this.props.location.user,
                    gameId: this.props.location.gameId
                })
            })

        axios.get(`${process.env.REACT_APP_API}/games/${this.props.location.gameId}/quizzes`)
            .then(res => {
                this.setState({
                    quizzes: res.data.quizzes,
                    quiz: res.data.quizzes[0].quiz,
                    progressDiff: 1 / res.data.quizzes.length,
                    // inputPlaceholder: res.data.quizzes[0].quiz.answer.content.length
                })
            })
            .catch(err => console.log('err', err))
    }


    nextQuizSetup = () => {
        // console.log('totalscore: ',this.state.totalScore)
        axios.patch(`${process.env.REACT_APP_API}/histories/${this.state.historyId}`, {
            userId: this.state.user._id,
            score: this.state.totalScore
        }).then(data => console.log('patched!', data.data))

        if (!this.state.quizzes[this.state.currentQuizz]) {
            this.props.history.push({
                pathname: '/outcome',
                score: this.state.totalScore,
                user: this.state.user,
                gameId: this.state.gameId
            })
        }

        else {
            this.setState({
                quiz: this.state.quizzes[this.state.currentQuizz].quiz,
                currentQuizz: this.state.currentQuizz + 1,
                iconAnswerStyle: '',
                iconAnswer: '',
                hintUsed: false,
                disableInput: false,
                correctAnswer: false,
                answer: '',
                showModal: true,
            })
        }

        // console.log('next Quiz is ready!')
    }

    showHint = () => {
        this.setState({
            showPopover: true,
            hintUsed: true
        })
    }

    changeAnswer = (e) => {
        this.setState({ answer: e.target.value })
        let answer = e.target.value.toUpperCase()
        let trueAnswer = this.state.quiz.answer.content.toUpperCase()

        if (answer === trueAnswer) {
            let hint = this.state.hintUsed ? 5 : 0

            this.setState({
                correctAnswer: true,
                iconAnswer: "far fa-check-circle",
                iconAnswerStyle: 'greenAnswer',
                disableInput: true,
                progressValue: this.state.progressValue + this.state.progressDiff,
                totalScore: this.state.totalScore + this.state.quiz.score - hint,
            })
        }

        else if (answer === '') {
            this.setState({
                iconAnswer: ''
            })
        }
        else {
            this.setState({
                correctAnswer: false,
                iconAnswer: "far fa-times-circle",
                iconAnswerStyle: 'redAnswer',
            })
        }

    }

    sendCoordinates = () => {
        this.props.history.push({
            pathname: '/map',
            lat: this.state.quiz.location.lat,
            lng: this.state.quiz.location.lng,
            locationName: this.state.quiz.locationName
        })
    }

    borderInput = () => {
        if (this.state.answer === '') {
            return ''
        }
        if (this.state.correctAnswer) {
            return 'greenBorder'
        }
        else {
            return 'redBorder'
        }
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

                        {/* <IonIcon className="scoreIcons trophy" icon={trophy}></IonIcon>
                        <div className="scoreIcons score" >{this.state.totalScore}</div>
                        <IonProgressBar value={this.state.progressValue} className="ionProgressBar" buffer={this.state.progressValue}>
                        </IonProgressBar> */}
                        {/* <IonButtons onClick={this.sendCoordinates}>
                            <IonIcon className="mapIcon" slot="end" src="assets/locationmapIcon.svg"></IonIcon>
                        </IonButtons> */}
                    </IonToolbar>
                </IonHeader>
                <IonContent className="quizMain  ion-padding">
                    <Quiz></Quiz>
                </IonContent>
                <IonFooter className="footerQuiz" >
                    <button disabled={!this.state.correctAnswer} onClick={() => this.nextQuizSetup()}>
                        {this.state.correctAnswer ? (<IonIcon className="lockIcon openLock" icon={unlock}> </IonIcon>) :
                            (<IonIcon className="lockIcon" icon={lock}> </IonIcon>)}
                    </button>
                    <div className="triangleGame"></div>
                </IonFooter>
            </IonPage >
        )
    }
}


export default PlayQuizzes;
