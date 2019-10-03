import { IonContent, IonPage, IonButton, IonIcon, IonText, IonBadge, IonBackButton } from '@ionic/react';
import { time, logoUsd, speedometer, star, arrowBack } from 'ionicons/icons'
import React from 'react'
import axios from 'axios'
import '../styles/games.css'
import '../styles/game.css'

class Game extends React.Component {
	state = {
		game: {
			tags: [{
				name: "",
				icon: ""
			}]
		},
		rate:0,
		duration:0,
		price:0
	}

	componentDidMount() {
		let game = this.props.match.params.id

		axios.get(`http://localhost:4000/games/${game}`)
		.then(res => {
			game = res.data
			let rate = this.state.rate
			let duration = this.state.duration
			let price = this.state.price

			duration = parseInt(game.duration / 3600)
			rate = parseInt(game.ratings.reduce((a,b) => a + b) / game.ratings.length)
			if (game.price > 1000) {
				price = 3
			} else if (game.price > 100) {
				price = 2
			} else {
				price = 1
			}

			this.setState({
				game: game,
				rate: rate,
				duration: duration,
				price: price
			})
		})
	}

	goBack = () => {
		this.props.history.goBack()
	}

	render () {
		return(
			<IonPage>

				<IonContent>
					<div className="imgContainer">
						<div className="gameImg" style={{backgroundImage:'url('+this.state.game.image+')'}}>
						</div>
						<div className="gameRating">
							<span>
								{
									[...Array(this.state.rate)].map((e,i) => <IonIcon key={i} className="starRating" icon={star}></IonIcon>)
								}
							</span>
						</div>
						<div className="diagonal big"></div>
					</div>
					<div className="gameContent">
						<h1 className="gameTitle big">{this.state.game.title}</h1>
						<IonText className="gameSubtitle">{this.state.game.location}</IonText>
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
										[...Array(this.state.price)].map((e,i) => <IonIcon className="tag" key={i} icon={logoUsd}></IonIcon>)
									}
								</span>
							</div>
							<div>
								<span><IonIcon className="tag" icon={speedometer}></IonIcon> {this.state.game.distance} km</span>
							</div>
						</div>
						<IonButton className="play">PLAY NOW!</IonButton>
					</div>
					<IonBackButton className="backBtn" text="" icon={arrowBack} defaultHref="/games" style={{position:"absolute"}}/>

				</IonContent>

			</IonPage>

		)
	}
}

export default Game;
