import React from 'react';
import { IonPopover, IonButton, IonModal, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonImg, IonMenuButton, IonPage, IonGrid, IonCol, IonRow, IonToolbar, IonProgressBar, IonInput, IonFooter } from '@ionic/react';
import { lock, unlock, trophy } from 'ionicons/icons';
import '../styles/quiz.css';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import '../styles/userOnboarding.css'
import { Plugins } from '@capacitor/core';

class Quiz extends React.Component {
    state = {
        user: '',
        historyId: '',
        quizzes: [],
        currentQuizz: 1,
        quiz: {
            location: {
                lat: 0,
                lng: 0
            },
            question: {
                content: '',
                type: 'text'
            },
            answer: {
                content: '',
                type: 'text'
            },
            hint: {
                content: '',
                type: ''
            },
            score: 0,
            images: [],
            locationName: '',
            indication: '',
            placeDescription: '_ _',

        },
        progressDiff: 0, // should be 1/gameNumQuizzes.length
        totalScore: 0,
        progressValue: 0,
        quizScore: 20,
        iconAnswer: '',
        iconAnswerStyle: '',
        showHint: false,
        answer: '',
        hintUsed: false,
        disableInput: false,
        inputPlaceholder: '______',
        showPopover: false,
        correctAnswer: false,
        showModal: true,

    }

    ionViewWillEnter() {
        this.onPageView()
    }

    componentWillMount() {
        this.onPageView()
    }

    onPageView = () => {
        Plugins.Storage.get({ key: 'token' })
            .then(token => {
                axios.get(`${process.env.REACT_APP_API}/auth?token=${token.value}`)
                    .then(res => {
                        this.setState({ user: res.data })
                        console.log('userId:', res.data._id)
                    })
            })
        Plugins.Storage.get({ key: 'history' })
            .then(history => { this.setState({ historyId: history.value }) })
        let gameId = this.props.match.params.id

        axios.get(`${process.env.REACT_APP_API}/games/${gameId}/quizzes`)
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

    getPlaceholder = (num) => {
        return [...Array(num)].forEach(() => { return 'hello' })
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
                gameId: this.props.match.params.id
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

    filterPlaces = (event) => {
        let text = event.target.value
        let filtered = this.state.originalPlaces.filter(e =>
            e.title.toUpperCase().includes(text.toUpperCase()))

        this.setState({ places: filtered })
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
                <IonModal
                    isOpen={this.state.showModal}
                    onDidDismiss={e => this.setState({ showModal: false })}
                >
                    <IonContent className="modalWindow three" >
                        <IonGrid className="onboardingGrid">
                            <IonRow>
                                <IonIcon className="manaoLogoLogin game" src="assets/Logo-yellow.svg"></IonIcon>
                            </IonRow>
                            <IonRow>
                                <h1 className="guide">{this.state.quiz.indication}</h1>
                            </IonRow>
                            <IonRow>
                                <IonItem className="guideContainer" onClick={this.sendCoordinates}>
                                    <h1 className="guide locationName">{this.state.quiz.locationName}</h1>
                                </IonItem>
                            </IonRow>
                        </IonGrid>

                        <i onClick={e => this.setState({ showModal: false })} style={{ backgroundColor: 'transparent' }} className="fas fa-angle-double-down"></i>

                    </IonContent>

                </IonModal>
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

                <IonContent className="quizMain  ion-padding">
                    <IonGrid>
                        <IonRow>
                            <h1 className="titleChallenge">CHALLENGE # {this.state.currentQuizz}</h1>
                        </IonRow>
                        <div className="extraInfo">
                            <h6>Did you know?</h6>
                            <p className="description" >
                                {this.state.quiz.placeDescription}
                            </p>
                        </div>

                    </IonGrid>
                    <IonGrid >
                        <IonRow>
                            <IonCol size="1" >
                                <IonIcon className="manaoLogo" src="assets/logo-black-shadow.svg"></IonIcon>
                            </IonCol>
                            <IonCol size="9" offset="2" className="problemBox">
                                {
                                    this.state.quiz.question.type === 'text' ? <p className="problemString">{this.state.quiz.question.content}</p> : <IonImg className="problemImg" src={`${this.state.quiz.question.content}`} />
                                }

                            </IonCol>
                        </IonRow>
                    </IonGrid>
                    <IonItem className={`answerForm ${this.borderInput()}`}>

                        <IonInput value={this.state.answer} className="answer" type="tel" maxlength={`${this.state.quiz.answer.content.length}`} disabled={this.state.disableInput} placeholder={this.state.inputPlaceholder} onIonChange={(e) => this.changeAnswer(e)}></IonInput>
                        <IonItem className={`checkIcon ${this.state.iconAnswerStyle}`}><i className={this.state.iconAnswer}></i></IonItem>
                    </IonItem>

                    <IonPopover
                        translucent={true}
                        animated={false}
                        cssClass="popover"
                        isOpen={this.state.showPopover}
                        onDidDismiss={e => this.setState({ showPopover: false })}
                    >
                        {
                            this.state.quiz.hint.type === "text" ? (<div className="hintBox">{this.state.quiz.hint.content}</div>) : (
                                <IonImg className="problemImg imgHint" src={`${this.state.quiz.hint.content}`} />)

                        }
                    </IonPopover>

                </IonContent >
                <IonFooter className="footerQuiz" >
                    <IonButtons className={`hintIcon ${this.state.hintUsed ? 'hintUsed' : ''}`} onClick={this.showHint}><IonIcon className="manaoLogo " src="assets/hintIcon-white.svg"></IonIcon></IonButtons>
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


export default withRouter(Quiz);
