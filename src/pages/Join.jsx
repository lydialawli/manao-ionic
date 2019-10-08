import React from 'react';
import { IonContent, IonHeader, IonPage, IonButton } from '@ionic/react';
import Toolbar from '../components/Toolbar.jsx'
import '../styles/join.css'
class Join extends React.Component {

  render() {
    return (
      <IonPage>
        <IonHeader>
          <Toolbar />
        </IonHeader>

        <IonContent className="main ion-padding">
					<div className="joinMessage">
						<h1>Coming soon!</h1>
						<h5>We are working hard to offer you the best multiplayer expericence!</h5>
					</div>
          <IonButton className="play">JOIN GAME!</IonButton>
        </IonContent>
      </IonPage>
    );
  }

};

export default Join;
