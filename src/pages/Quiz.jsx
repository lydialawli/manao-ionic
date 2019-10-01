import { IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonList, IonMenuButton, IonPage, IonGrid, IonCol, IonRow, IonTitle, IonToolbar, IonText, IonProgressBar, IonInput, IonAlert } from '@ionic/react';
import { lock, map } from 'ionicons/icons';
import React from 'react';
import '../styles/quiz.css';


class Quiz extends React.Component {
    state = {
        showHint: false
    }

    showHint = () => {
        let showHint = this.state.showHint
        showHint = !showHint
        this.setState({ showHint })
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
                            <h1 className="titleChallenge">CHALLENGE # 1</h1>
                        </IonRow>
                        <div className="extraInfo">
                            <h6>Extra info</h6>
                            <p className="description" >
                                Markets are a huge part of the Thai culture, and the locals love markets just as much as tourists.
                    This exact spot on a Sunday evening is awesome!
                        </p>
                        </div>

                    </IonGrid>
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <IonIcon className="manaoLogo" src="assets/logo-black-shadow.svg"></IonIcon>
                            </IonCol>

                            <IonCol>
                                <p className="problem" >
                                    Wow, so hot in here! How do this people survive?
                        </p>
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
                                // header="🌀"
                                message="🌀"
                            /> : ''
                    }
                    <IonButtons  className="hint" onClick={this.showHint}><IonIcon className="manaoLogo " src="assets/hint-shadow.svg"></IonIcon></IonButtons>
                    <div className="triangleGame"></div>
                    <div className="footerQuiz ">
                        <IonIcon className="lockIcon" icon={lock}></IonIcon>

                    </div>
                </IonContent>
            </IonPage >
        )
    }
}


export default Quiz;