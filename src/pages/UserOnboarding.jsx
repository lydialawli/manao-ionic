import React from 'react'
import { IonContent, IonPage, IonIcon, IonGrid, IonRow } from '@ionic/react';
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
		axios.get('http://localhost:4000/games/5d94347c14d4cf2435d84ef9/quizzes')
		.then(res => {
			console.log(res.data.quizzes[0].quiz);
			this.setState({quiz: res.data.quizzes[0].quiz})
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
							<h1 className="guide locationName">{this.state.quiz.locationName}</h1>
						</IonRow>
					</IonGrid>
					<i class="fas fa-angle-double-down"></i>
				</IonContent>
			</IonPage>
		)
	}
}

export default UserOnboarding;
