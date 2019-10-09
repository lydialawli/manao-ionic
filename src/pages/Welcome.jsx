import React from 'react'
import { IonContent, IonPage, IonIcon, IonGrid, IonRow, IonItem, IonSlide, IonSlides, IonCol } from '@ionic/react';

import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom'

import axios from 'axios'
import '../styles/userOnboarding.css'
import '../styles/welcome.css'

class Welcome extends React.Component {

	state = {
		gameId: '',
		quiz: {
			indication: '',
			locationName: ''
		},
		user: {},
		options: {
			slidesPerView: 1,
			spaceBetween: 0,
			speed: 1000
		}
	}

	componentDidMount() {
		let game = this.props.match.params.id
		axios.get(`${process.env.REACT_APP_API}/games/${game}/quizzes`)
			.then(res => {
				this.setState({
					quiz: res.data.quizzes[0].quiz,
					gameId: this.props.match.params.id
				})
			})

		let token = localStorage.getItem('token')
		axios.get(`${process.env.REACT_APP_API}/auth?token=${token}`)
		.then(res => {
			this.setState({ user: res.data })
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

	goToPlayQuizzes = () => {
		this.props.history.push({
			pathname: `/play/${this.state.gameId}/quizzes`,
			gameId: this.state.gameId,
			user: this.state.user
		})
	}

	render() {

		return (
			<IonPage>
				<IonContent className="userOnboarding">
					<IonSlides options={this.state.options}>

						<IonSlide className="onboardingSlide one">
							<IonGrid className="onboardingGrid">
								<IonRow>
									<IonIcon className="manaoLogoLogin game" src="assets/Logo-yellow.svg"></IonIcon>
								</IonRow>
								<IonRow>
									<h1 className="guide">Welcome to the game, {this.state.user.name}</h1>
								</IonRow>
								<IonRow>
									<IonItem className="guideContainer" onClick={this.sendCoordinates}>
										<h1 className="guide locationName ready">Are you ready?</h1>
									</IonItem>
								</IonRow>
							</IonGrid>
							<i className="fas fa-angle-double-right"></i>
						</IonSlide>

						<IonSlide className="onboardingSlide two">
							<IonGrid className="onboardingGrid">
								<IonRow>
									<h1 className="guide instructions">Before we start, you should know...</h1>
								</IonRow>
								<IonRow>
									<IonGrid className="instructionsGrid">
										<IonRow>
											<IonCol>
												<h6><IonIcon className="instructionsLogo" src="assets/Logo.svg"></IonIcon></h6>
											</IonCol>
											<IonCol>
												<h6>I will give you the <b>problem</b> that you need to solve.</h6>
											</IonCol>
										</IonRow>
										<IonRow>
											<IonCol>
												<h6><IonIcon className="instructionsLogo" src="assets/hint.svg"></IonIcon></h6>
											</IonCol>
											<IonCol>
												<h6>I am your <b>hint</b>. If you use me, you get less points. I can help you only ONCE each quiz!</h6>
											</IonCol>
										</IonRow>
										<IonRow>
											<IonCol>
												<h6><IonIcon className="instructionsLogo" src="assets/location.svg"></IonIcon></h6>
											</IonCol>
											<IonCol>
												<h6>I am the <b>map</b> to remind you where you are.</h6>
											</IonCol>
										</IonRow>
									</IonGrid>
								</IonRow>
								<IonRow>
									<h6>To unlock the next challenge, you must first answer the previous quiz correctly.</h6>
								</IonRow>
								<IonRow>
									<h1 className="guide go">Got it? Let's go!</h1>
								</IonRow>
							</IonGrid>
							<i onClick={this.goToPlayQuizzes} className="fas fa-thumbs-up"></i>
						</IonSlide>

					</IonSlides>

				</IonContent>
			</IonPage >
		)
	}
}

export default withRouter(Welcome);
