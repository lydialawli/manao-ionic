import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonMenuButton, IonAvatar } from '@ionic/react';
import React from 'react';
import '../styles/toolbar.css'
import '../styles/games.css'

class Settings extends React.Component {

  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar className="toolbar">
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>{" "}
            <IonTitle> Manao </IonTitle>{" "}
            <IonButtons slot="end">
              <IonAvatar>
                <img src="https://previews.123rf.com/images/alex9230/alex92301710/alex9230171000012/87612992-cute-face-of-lime-fruit-vector-illustration.jpg" alt="" />
              </IonAvatar>
            </IonButtons>{" "}
          </IonToolbar>{" "}
        </IonHeader>{" "}


        <IonContent className="main ion-padding">
          <IonButton className="play">Here will go User Settings</IonButton>
        </IonContent>
      </IonPage>
    );
  }

};

export default Settings;
