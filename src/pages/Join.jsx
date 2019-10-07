import React from 'react';
import { IonContent, IonHeader, IonPage, IonButton } from '@ionic/react';
import Toolbar from '../components/Toolbar.jsx'

class Join extends React.Component {

  render() {
    return (
      <IonPage>
        <IonHeader>
          <Toolbar />
        </IonHeader>

        <IonContent className="main ion-padding">
          <IonButton className="play">JOIN GAME!</IonButton>
        </IonContent>
      </IonPage>
    );
  }

};

export default Join;
