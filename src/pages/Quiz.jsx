import { IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonImg, IonMenuButton, IonPage, IonGrid, IonCol, IonRow, IonToolbar, IonProgressBar, IonInput, IonAlert, IonFooter } from '@ionic/react';
import { lock, map, unlock, trophy } from 'ionicons/icons';
import React from 'react';
import '../styles/quiz.css';
import Swal from 'sweetalert2';
import axios from 'axios';

class Quiz extends React.Component {
    state = {
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
            placeDescription: '_ _'
        },
        progressDiff: 0, // should be 1/gameNumQuizzes.length
        totalScore: 0,
        progressValue: 0 * (1 / 5), // quiz index * 1/GameQuizzes.length
        quizScore: 20,
        iconAnswer: '',
        iconAnswerStyle: '',
        showHint: false,
        answer: '',
        result: 'null',
        hintUsed: false,
        disableInput: false,
        lockIcon: lock,
        inputPlaceholder: '_ _'
    }

    UNSAFE_componentWillMount() {
        console.log('yay')
        axios.get(`${process.env.REACT_APP_API}/games/5d94347c14d4cf2435d84ef9/quizzes`)
            .then(res => {
                // let games = this.state.games.concat(res.data)
                // console.log('games', games);
                console.log('hey ===>', res.data.quizzes[0].quiz)
                this.setState({
                    quizzes: res.data.quizzes,
                    quiz: res.data.quizzes[0].quiz,
                    progressDiff: 1 / res.data.quizzes.length
                })
            })
            .catch(err => console.log('err', err))
    }

    nextQuizSetup = () => {
        this.setState({
            quiz: this.state.quizzes[this.state.currentQuizz].quiz,
            currentQuizz: this.state.currentQuizz + 1
        })
        // console.log('next Quiz is ready!')
    }

    showHint = () => {
        if (this.state.quiz.hint.type === 'text') {
            let showHint = this.state.showHint
            showHint = !showHint
            this.setState({ showHint, hintUsed: true })
        }

        //  else {
        //     Swal.fire({
        //         title: 'Sweet!',
        //         text: 'Modal with a custom image.',
        //         imageUrl: 'https://unsplash.it/400/200',
        //         imageWidth: 400,
        //         imageHeight: 200,
        //         imageAlt: 'Custom image',
        //         animation: false,
        //         customClass: "hintContainer",
        //     })
        //     this.setState({ hintUsed: true })
        // }
    }
    changeAnswer = (e) => {
        let answer = this.state.quiz.answer.content
        answer = e.target.value
        this.setState({ answer })
        if (answer === this.state.quiz.answer.content) {
            let hint = this.state.hintUsed ? 5 : 0

            this.setState({
                result: 'correct',
                iconAnswer: "far fa-check-circle",
                iconAnswerStyle: 'greenAnswer',
                lockIcon: unlock,
                disableInput: true,
                progressValue: this.state.progressValue + this.state.progressDiff,
                totalScore: this.state.totalScore + this.state.quiz.score - hint
            })
        }

        else if (answer === '') {
            this.setState({
                iconAnswer: ''
            })
        }
        else {
            this.setState({
                result: 'incorrect',
                iconAnswer: "far fa-times-circle",
                iconAnswerStyle: 'redAnswer'
            })
        }

    }

    borderInput = () => {
        if (this.state.answer === '') {
            return ''
        }
        if (this.state.result === 'correct') {
            return 'greenBorder'
        }
        else {
            return 'redBorder'
        }
    }

    render() {
        return (
            <IonPage>
                <IonHeader className="noShadow">
                    <IonToolbar className="quizbar noShadow">
                        <IonButtons slot="start">
                            <IonMenuButton />
                        </IonButtons>
                        <div className="yellowBox"></div>
                        <div> </div>
                        {/* <IonIcon className="fatPin" src="assets/fatPin.svg"></IonIcon> */}
                        <IonIcon className="icons trophy" icon={trophy}></IonIcon>
                        <div className="icons score" >{this.state.totalScore}</div>
                        <IonProgressBar value={this.state.progressValue} className="ionProgressBar" buffer={this.state.progressValue}>
                        </IonProgressBar>
                        <IonButtons >
                            <IonIcon className="mapIcon" slot="end" icon={map}></IonIcon>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>

                <IonContent className="quizMain  ion-padding">
                    <IonGrid>
                        <IonRow>
                            <h1 className="titleChallenge">CHALLENGE # {this.state.currentQuizz}</h1>
                        </IonRow>
                        <div className="extraInfo">
                            <h6>Extra info</h6>
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
                        <IonInput className="answer" type="tel" maxlength={`${this.state.quiz.answer.content.length}`} disabled={this.state.disableInput} placeholder={this.state.inputPlaceholder} onIonChange={(e) => this.changeAnswer(e)}></IonInput>
                        <IonItem className={`checkIcon ${this.state.iconAnswerStyle}`}><i className={this.state.iconAnswer}></i></IonItem>
                    </IonItem>
                    {
                        this.state.showHint ?
                            <IonAlert
                                className="hintContainer"
                                isOpen={this.state.showHint}
                                onDidDismiss={() => this.showHint()}
                                header={`${this.state.quiz.hint.content}`}
                            // message="🌀"
                            /> : ''
                    }

                    {/* <IonFooter className="footerQuiz "> <IonIcon className="lockIcon" icon={lock}></IonIcon></IonFooter> */}
                    {/* <div className="triangleGame"></div>
                    <div className="footerQuiz ">
                        <IonIcon className="lockIcon" icon={lock}></IonIcon>

                    </div> */}
                </IonContent >
                <IonFooter className="footerQuiz" >
                    <IonButtons className={`hint ${this.state.hintUsed ? 'hintUsed' : ''}`} onClick={this.showHint}><IonIcon className="manaoLogo " src="assets/hint-shadow.svg"></IonIcon></IonButtons>
                    <button onClick={()=> this.nextQuizSetup()}>
                        <IonIcon className="lockIcon" icon={this.state.lockIcon}> </IonIcon>
                    </button>
                    <div className="triangleGame"></div>
                </IonFooter>
            </IonPage >
        )
    }
}


export default Quiz;


