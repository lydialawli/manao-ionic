import { IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar, IonText } from '@ionic/react';
import { flask, football, paperPlane, wifi } from 'ionicons/icons';
import React from 'react';
import '../styles/quiz.css';


class Quiz extends React.Component {
    render() {
        return (
            <IonPage>
                {/* <IonButtons slot="start">
                    <IonMenuButton />
                </IonButtons>
                <IonHeader className="playMenu"  attribute="translucent">
          <IonToolbar className="playMenu">
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
          </IonToolbar>
        </IonHeader> */}

                <IonContent className="quizMain  ion-padding">
                    <div className="extraInfo">
                        <h6>Extra info</h6>
                        <p  className="description" >
                            Markets are a huge part of the Thai culture, and the locals love markets just as much as tourists.
                This exact spot on a Sunday evening is awesome!
                        </p>
                    </div>
                </IonContent>
            </IonPage >
        )
    }
}

export default Quiz;