import React from 'react'
import { IonContent, IonPage, IonIcon, IonGrid, IonRow, IonItem, IonSlide, IonSlides } from '@ionic/react';
import { Plugins } from '@capacitor/core';
import {Link} from 'react-router-dom'
import axios from 'axios'
import '../styles/userOnboarding.css'
import '../styles/welcome.css'

class UserOnboarding extends React.Component {

	state = {
		user: {},
		options: {
			slidesPerView:1,
			direction: 'vertical'
		}
	}

	componentDidMount() {
		Plugins.Storage.get({key: 'token'})
		.then(token => {
			console.log(token.value);
			if (token.value) {
				axios.get(`${process.env.REACT_APP_API}/auth?token=${token.value}`)
				.then(res => {
					console.log(res.data);
					this.setState({user: res.data})
				})
			}
		})
	}

	render () {
		return(
			<IonPage>
				<IonContent className="userOnboarding">
					<IonSlides options={this.state.options}>

						<IonSlide className="onboardingSlide" style={{height:800}}>

							<div className="one">
								<IonGrid className="onboardingGrid">
									<IonRow>
										<IonIcon className="manaoLogoLogin game" src="assets/Logo-yellow.svg"></IonIcon>
									</IonRow>
									<IonRow>
										<h1 className="guide">Welcome to the game, {this.state.user.name}</h1>
									</IonRow>
									<IonRow>
										<IonItem className="guideContainer" onClick={this.sendCoordinates}>
											<h1 className="guide locationName">Are you ready?</h1>
										</IonItem>
									</IonRow>
								</IonGrid>
								<i className="fas fa-angle-double-down"></i>
							</div>

						</IonSlide>

						<IonSlide className="onboardingSlide">

							<div className="two">
								<IonGrid className="onboardingGrid">
									<IonRow>
										<IonIcon className="manaoLogoLogin game" src="assets/Logo-yellow.svg"></IonIcon>
									</IonRow>
									<IonRow>
										<h1 className="guide">Welcome to the game, {this.state.user.name}</h1>
									</IonRow>
									<IonRow>
										<IonItem className="guideContainer" onClick={this.sendCoordinates}>
											<h1 className="guide locationName">Are you ready?</h1>
										</IonItem>
									</IonRow>
								</IonGrid>
								<i className="fas fa-angle-double-down"></i>
							</div>

						</IonSlide>

						<IonSlide className="onboardingSlide" style={{height:"100%"}}>

							<div className="three">
								<IonGrid className="onboardingGrid">
									<IonRow>
										<IonIcon className="manaoLogoLogin game" src="assets/Logo-yellow.svg"></IonIcon>
									</IonRow>
									<IonRow>
										<h1 className="guide">Welcome to the game, {this.state.user.name}</h1>
									</IonRow>
									<IonRow>
										<IonItem className="guideContainer" onClick={this.sendCoordinates}>
											<h1 className="guide locationName">Are you ready?</h1>
										</IonItem>
									</IonRow>
								</IonGrid>
								<i className="fas fa-angle-double-down"></i>
							</div>

						</IonSlide>

					</IonSlides>

				</IonContent>
			</IonPage>
		)
	}
}

export default UserOnboarding;
