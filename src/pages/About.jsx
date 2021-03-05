import React from 'react';
import { IonContent, IonHeader, IonPage, IonGrid, IonRow, IonCol, IonText } from '@ionic/react';
import Toolbar from '../components/Toolbar.jsx'
import '../styles/about.css'

class About extends React.Component {
  render() {
    return (
      <IonPage>
        <IonHeader>
          <Toolbar />
        </IonHeader>
				<IonContent className="main">
					<img className="banner" alt="" src="/assets/banner.png"></img>
	        <IonGrid className="aboutGrid">
						<IonRow>
							 <IonCol>
								<div style={{backgroundImage:'url(https://seakoala.io/docs/images/universeLy.png)'}} className="founderImg"></div>
							</IonCol>
							<IonCol>
								<div style={{backgroundImage:'url(https://lh3.googleusercontent.com/uZsAOkhUMi_6QrWpbTIUNyb8HFTuhIIHAho2n0PeymiV184u3rXNu8AkLVh-P-U129kKZ5B_hhd5tnuE4RUYVpNRHZU=s195)'}} className="founderImg"></div>
							</IonCol>
						</IonRow>
						<IonRow>
							<IonCol>
								<h1>Lydia</h1>
							</IonCol>
							<IonCol>
								<h1>Monica</h1>
							</IonCol>
						</IonRow>
						<IonRow>
							<IonText className="about loc">
								<i className="fas fa-map-marker-alt"></i> Amphoe Koh Sa-Mui, Surat Thani, Thailand
							</IonText>
						</IonRow>
						<IonRow>
							<IonText className="about phone">
								<i className="fas fa-phone"></i> +66 98 785 3402
							</IonText>
						</IonRow>
						<IonRow>
							<IonText className="about mail">
								<i className="fas fa-envelope"></i> manao@manao.com
							</IonText>
						</IonRow>
					</IonGrid>

        </IonContent>
      </IonPage >
    )
  }
}

export default About;
