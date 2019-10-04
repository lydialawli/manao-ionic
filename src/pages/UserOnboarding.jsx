import React from 'react'
import { IonContent, IonPage, IonIcon, IonGrid, IonRow, IonItem } from '@ionic/react';
import {Link} from 'react-router-dom'
import axios from 'axios'
import '../styles/userOnboarding.css'

class UserOnboarding extends React.Component {

	state = {
		quiz: {
			indication: '',
			locationName: ''
		}
	}

	componentDidMount() {
		axios.get(`${process.env.REACT_APP_API}/games/5d94347c14d4cf2435d84ef9/quizzes`)
		.then(res => {
			console.log(res.data.quizzes[0].quiz);
			this.setState({quiz: res.data.quizzes[0].quiz})
		})
	}

	sendCoordinates = () => {
		this.props.history.push({
			pathname: '/map',
			lat: this.state.quiz.location.lat,
			lng: this.state.quiz.location.lng,
			locationName: this.state.quiz.locationName
		})
	}

	render () {
		return(
			<IonPage>
				<IonContent className="userOnboarding">
					<IonGrid className="onboardingGrid">
						<IonRow>
							<IonIcon className="manaoLogoLogin game" src="assets/Logo-yellow.svg"></IonIcon>
						</IonRow>
						<IonRow>
							<h1 className="guide">{this.state.quiz.indication}</h1>
						</IonRow>
						<IonRow>
							<IonItem className="guideContainer" onClick={this.sendCoordinates}>
								<h1 className="guide locationName">{this.state.quiz.locationName}</h1>
							</IonItem>
						</IonRow>
					</IonGrid>
					<Link to="/quiz"><i className="fas fa-angle-double-down"></i></Link>
				</IonContent>
			</IonPage>
		)
	}
}

export default UserOnboarding;
