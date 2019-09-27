import { IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, IonSlides, IonSlide, IonButtons, IonButton, IonGrid, IonRow, IonCol, IonMenuButton, IonAvatar, IonChip, IonItem, IonLabel } from '@ionic/react';
import React from 'react';
import Card from '../components/Card.jsx'
import Button from '../components/Buttons.jsx'
import '../styles/toolbar.css'
import '../styles/home.css'

class Home extends React.Component {

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
                <img src="https://previews.123rf.com/images/alex9230/alex92301710/alex9230171000012/87612992-cute-face-of-lime-fruit-vector-illustration.jpg" />
              </IonAvatar>
            </IonButtons>{" "}
          </IonToolbar>{" "}
        </IonHeader>{" "}


        <IonContent className="main ion-padding">
          <IonGrid>
            <IonRow>
              <IonCol>
                <Button />
              </IonCol>
              <IonCol>
                <Button />
              </IonCol>
              <IonCol>
                <Button />
              </IonCol>
            </IonRow>
          </IonGrid>
          <IonSlides>
            <IonSlide>
              <Card />
            </IonSlide>
            <IonSlide>
              <Card />
            </IonSlide>
            <IonSlide>
              <Card />
            </IonSlide>
            <IonSlide>
              <Card />
            </IonSlide>
          </IonSlides>
          <IonButton className="play">PLAY THIS GAME!</IonButton>
        </IonContent>
      </IonPage>
    );
  }

};

export default Home;