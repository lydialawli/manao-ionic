import { IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonList, IonMenuButton, IonPage, IonGrid, IonCol, IonRow, IonTitle, IonToolbar, IonText } from '@ionic/react';
import { flask, football, paperPlane, wifi, lock } from 'ionicons/icons';
import React from 'react';
import '../styles/quiz.css';


class Quiz extends React.Component {
    render() {
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar className="quizbar">
                        <IonButtons slot="start">
                            <IonMenuButton />
                        </IonButtons>
                        <div className="yellowBox"></div>
                    </IonToolbar>{" "}
                </IonHeader>{" "}

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
                                <IonIcon className="manaoLogo" src="assets/Logo.svg"></IonIcon>
                            </IonCol>

                            <IonCol>
                                <p className="problem" >
                                    Wow, so hot in here! How do this people survive?
                        </p>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                    <div className="triangle"></div>
                    <div className="footerQuiz ">
                        <IonIcon className="lockIcon" icon={lock}></IonIcon>
                    </div>
                </IonContent>
            </IonPage >
        )
    }
}


export default Quiz;