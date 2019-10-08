import React from 'react'
import { IonContent, IonPage, IonButton, IonIcon, IonText, IonBadge, IonBackButton, IonAlert } from '@ionic/react';
import { time, logoUsd, speedometer, arrowBack } from 'ionicons/icons'
import { withRouter } from 'react-router-dom';
import axios from 'axios'
import '../styles/game.css'
import '../styles/games.css'

class Game extends React.Component {
	state = {
		game: {
			tags: [{
				name: "",
				icon: ""
			}],
			price: 0
		},
		rate:0,
		duration:0,
		showMessage: false
	}

	componentDidMount() {
		let game = this.props.match.params.id

		axios.get(`${process.env.REACT_APP_API}/games/${game}`)
		.then(res => {

			game = res.data
			let rate = this.state.rate
			let duration = this.state.duration

			duration = parseInt(game.duration / 3600)
			rate = parseInt(game.ratings.reduce((a,b) => a + b) / game.ratings.length)

			this.setState({
				game: game,
				rate: rate,
				duration: duration
			})
		})
	}

	goBack = () => {
		this.props.history.goBack()
	}

	play = () => {
		let token = localStorage.getItem('token')

		if (token) {
			axios.get(`${process.env.REACT_APP_API}/auth?token=${token}`)
			.then(user => {
				axios.post(`${process.env.REACT_APP_API}/history`, {
					players: [
						{
							user: user.data._id
						}
					],
					game: this.state.game._id
				})
				.then(res => {
					localStorage.setItem('history', res.data)
					this.props.history.push({
						pathname: `/play/${this.state.game._id}/start`
					})
				})
			})
		} else {
			this.setState({showMessage: true})
		}
	}

	render () {
		return(
			<IonPage>

				<IonContent>
					<div className="imgContainer">
						<div className="gameImg" style={{backgroundImage:'url('+this.state.game.image+')'}}>
						</div>
						<div className="diagonal big"></div>
					</div>
					<div className="gameContent">
						<h1 className="gameTitle big">{this.state.game.title}</h1>
						<IonText className="gameSubtitle"><i className="fas fa-map-marker-alt"></i> {this.state.game.location}</IonText>
						<div className="gameTags">
							{
								this.state.game.tags.map((tag, key) => <IonBadge className="gameTag" key={key} color="light">{tag.name}</IonBadge>)
							}
						</div>
						<div className="gameText">
							<IonText className="gameSubtitle">{this.state.game.intro}</IonText>
							<IonText className="gameSubtitle">{this.state.game.description}</IonText>
						</div>

						<div className="tags">
							<div>
								<span><IonIcon className="tag time" icon={time}/> {this.state.duration} h</span>
							</div>
							<div>
								<span>
									{
										[...Array(this.state.game.price)].map((e,i) => <IonIcon className="tag" key={i} icon={logoUsd}></IonIcon>)
									}
									{
										[...Array(3-this.state.game.price)].map((e,i) => <IonIcon className="tag grey" key={i} icon={logoUsd}></IonIcon>)
									}
								</span>
							</div>
							<div>
								<span><IonIcon className="tag" icon={speedometer}></IonIcon> {this.state.game.distance} km</span>
							</div>
						</div>
						<IonButton onClick={this.play} className="play">PLAY NOW!</IonButton>
					</div>
					<IonBackButton className="backBtn" text="" icon={arrowBack} defaultHref="/games" style={{position:"absolute"}}/>

					<IonAlert className="alert"
						isOpen={this.state.showMessage}
						onDidDismiss={() => this.setState({showMessage: false})}
						header="We don't know you yet!"
						message="Please signup or login to play"
						buttons={[
							{
								text: "Signup",
								handler: () => {
									this.props.history.push({
										pathname: '/signup'
									})
								}
							},
							{
								text: "Login",
								handler: () => {
									this.props.history.push({
										pathname: '/login'
									})
								}
							}
						]}
						/>

				</IonContent>

			</IonPage>

		)
	}
}

export default withRouter(Game);
