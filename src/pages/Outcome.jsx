import React from 'react'
import { IonContent, IonPage, IonIcon, IonGrid, IonRow, IonAlert } from '@ionic/react';
import { withRouter } from 'react-router-dom';
import '../styles/outcome.css'

class Outcome extends React.Component {
	state = {
		coloredStars: 0,
		alert: false,
		score: 0,
		userId: ''
	}

	ionViewWillEnter() {
		this.setState({
			score: this.props.location.score,
			userId: this.props.location.userId
		})
	}

	changeColoredStars = (n) => {
		let coloredStars = this.state.coloredStars
		if (coloredStars === n) {
			this.setState({alert: true})
			setTimeout(() => {
				this.props.history.push({
					pathname: '/games'
				})
			}, 5000)
		} else {
			this.setState({coloredStars: n})
		}
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
							<h1><i className="fas fa-trophy"></i> Score: {this.state.score}</h1>
						</IonRow>
						<IonRow className="outcomeRow">
							<h6>On behalf of the Manao Team, we hope you had a blast.</h6>
						</IonRow>
						<IonRow className="outcomeRow">
							<h6 className="">Please rate this game. Manao community will be very thankful!</h6>
						</IonRow>
						{
							[...Array(this.state.coloredStars)].map((s, i) => <i className="fas fa-star" onClick={() => this.changeColoredStars(i+1)}></i>)
						}
						{
							[...Array(5-this.state.coloredStars)].map((s, i) => <i className="far fa-star" onClick={() => this.changeColoredStars(this.state.coloredStars+i+1)}></i>)
						}

						<IonAlert
							isOpen={this.state.alert}
							onDidDismiss={() => this.setState({alert: false})}
							header="Thank you for playing Manao!"
							message="If you’d like more free games throughout the world, contact us and let us know your ideas!"
							/>
					</IonGrid>
				</IonContent>
			</IonPage>
		)

	}
}

export default withRouter(Outcome);
