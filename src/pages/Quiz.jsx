import { IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonImg, IonMenuButton, IonPage, IonGrid, IonCol, IonRow, IonTitle, IonToolbar, IonText, IonProgressBar, IonInput, IonAlert, IonFooter } from '@ionic/react';
import { lock, map } from 'ionicons/icons';
import React from 'react';
import '../styles/quiz.css';
import Swal from 'sweetalert2';

class Quiz extends React.Component {
    state = {
        score: 0,
        showHint: false,
        description: "Markets are a huge part of the Thai culture, and the locals love markets just as much as tourists.This exact spot on a Sunday evening is awesome!",
        challengeNum: 1,
        problem: 'Wow, so hot in here! How do this people survive?',
        quiz: {
            score: 20,
            question: {
                type: 'String',
                content: 'Wow, so hot in here! How do this people survive?'
            },
            answer: '21',
            locationName: "7/11 cross-streets",
            indication: 'Get to the starting point. Head to:',
            placeDescription: 'Markets are a huge part of the Thai culture, and the locals love markets just as much as tourists.This exact spot on a Sunday evening is awesome!',
            hint: {
                type: 'string',
                content: ''
            }
        }
    }


    showHint = () => {
        // let showHint = this.state.showHint
        // showHint = !showHint
        // this.setState({ showHint })
        Swal.fire({
            title: 'Sweet!',
            text: 'Modal with a custom image.',
            imageUrl: 'https://unsplash.it/400/200',
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
            animation: false,
            customClass: "hintContainer"
        })

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
                        <IonIcon className="fatPin" src="assets/fatPin.svg"></IonIcon>
                        <IonProgressBar value={0.5} className="ionProgressBar"> </IonProgressBar>
                        <IonButtons >
                            <IonIcon className="mapIcon" slot="end" icon={map}></IonIcon>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>

                <IonContent className="quizMain  ion-padding">
                    <IonGrid>
                        <IonRow>
                            <h1 className="titleChallenge">CHALLENGE # {this.state.challengeNum}</h1>
                        </IonRow>
                        <div className="extraInfo">
                            <h6>Extra info</h6>
                            <p className="description" >
                                {this.state.description}
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
                                    this.state.quiz.question.type==='string' ?  <p className="problemString">{this.state.quiz.question.content}</p> : <IonImg  className="problemImg" src="https://seakoala.io/src/seakoala.png"/>
                                }
                               
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                    <IonItem className="answerForm">
                        <IonInput className="answer" type="number" placeholder="_ _"></IonInput>
                    </IonItem>
                    {
                        this.state.showHint ?
                            <IonAlert
                                className="hintContainer"
                                isOpen={this.state.showHint}
                                onDidDismiss={() => this.showHint()}
                                header="hint is blabla"
                            // message="🌀"
                            /> : ''
                    }

                    {/* <IonFooter className="footerQuiz "> <IonIcon className="lockIcon" icon={lock}></IonIcon></IonFooter> */}
                    {/* <div className="triangleGame"></div>
                    <div className="footerQuiz ">
                        <IonIcon className="lockIcon" icon={lock}></IonIcon>

                    </div> */}
                </IonContent>
                <IonFooter className="footerQuiz" >
                    <IonButtons className="hint" onClick={this.showHint}><IonIcon className="manaoLogo " src="assets/hint-shadow.svg"></IonIcon></IonButtons>
                    <IonIcon className="lockIcon" icon={lock}> </IonIcon>
                    <div className="triangleGame"></div>
                </IonFooter>
            </IonPage >
        )
    }
}


export default Quiz;