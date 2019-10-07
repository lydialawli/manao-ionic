import React from 'react'
import { IonContent, IonPage, IonIcon, IonGrid, IonRow } from '@ionic/react';
import '../styles/outcome.css'

class Outcome extends React.Component {
	state = {
		coloredStars: 0
	}

	changeColoredStars = (n) => {
		this.setState({coloredStars: n})
	}

	render () {
		return(
			<IonPage>
				<IonContent className="outcome">
					<IonGrid>
						<IonRow className="outcomeRow">
							<IonIcon className="manaoLogoLogin game" src="assets/logo-black-shadow.svg"></IonIcon>
						</IonRow>
						<IonRow className="outcomeRow">
							<h1>Congrax! You finished the game!</h1>
						</IonRow>
						<IonRow className="outcomeRow score">
							<h1><i className="fas fa-trophy"></i> Score: 340</h1>
						</IonRow>
						<IonRow className="outcomeRow">
							<h6>On behalf of the Manao Team, we hope you had a blast.</h6>
						</IonRow>
						<IonRow className="outcomeRow">
							<h6 className="">If you’d like more free games throughout the world, let us know what you think!</h6>
						</IonRow>
						{
							[...Array(this.state.coloredStars)].map((s, i) => <i className="fas fa-star" onClick={() => this.changeColoredStars(i+1)}></i>)
						}
						{
							[...Array(5-this.state.coloredStars)].map((s, i) => <i className="far fa-star" onClick={() => this.changeColoredStars(this.state.coloredStars+i+1)}></i>)
						}
					</IonGrid>
				</IonContent>
			</IonPage>
		)

	}
}

export default Outcome;
