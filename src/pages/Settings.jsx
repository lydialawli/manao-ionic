import React from 'react';
import { IonContent, IonHeader, IonPage, IonButton } from '@ionic/react';
import { Plugins } from '@capacitor/core';
import Toolbar from '../components/Toolbar.jsx'
import '../styles/toolbar.css'
import '../styles/games.css'

class Settings extends React.Component {

	logout = () => {
		Plugins.Storage.remove({key:'token'})
		.then(res => {
			this.props.history.push({pathname: '/games'})
		})
		Plugins.Storage.keys().then(res => console.log(res))


	}

  render() {
    return (
      <IonPage>
        <IonHeader>
          <Toolbar />
        </IonHeader>


        <IonContent className="main ion-padding">
          <IonButton onClick={this.logout} className="play">Logout</IonButton>
        </IonContent>
      </IonPage>
    );
  }

};

export default Settings;
