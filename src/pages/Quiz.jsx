import { IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar,IonText } from '@ionic/react';
import { flask, football, paperPlane, wifi } from 'ionicons/icons';
import React from 'react';
import '../styles/quiz.css';


class Quiz extends React.Component {
  render() {
    return (
      <IonPage>
        <IonHeader attribute="translucent">
          <IonToolbar className="playMenu">
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent className="quizMain">
          <IonText className="description">
              <h6>Extra info</h6>
            <p>
            Markets are a huge part of the Thai culture, and the locals love markets just as much as tourists. 
This exact spot on a Sunday evening is awesome!
            </p>
          </IonText>
        </IonContent>
      </IonPage >
    )
  }
}

export default Quiz;