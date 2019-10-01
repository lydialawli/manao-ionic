import { IonContent, IonPage, IonButton, IonIcon, IonText, IonBadge, IonBackButton } from '@ionic/react';
import { time, logoUsd, walk, star, arrowBack } from 'ionicons/icons'
import React from 'react'
import '../styles/games.css'
import '../styles/game.css'

class Game extends React.Component {
	state = {
		game: {
			image: 'http://static.asiawebdirect.com/m/phuket/portals/kosamui-com/homepage/beaches/pagePropertiesImage/samui-beaches.jpg.jpg',
			title: 'LAMAI FUN LAMAI',
			location: 'LAMAI, KOH SAMUI',
			intro: 'Go around the nice center area of Lamai while having a blast figuring out this game!',
			description: 'Dont forget to bring sunscreen, sunglasses and your smile!',
			duration: '3600',
			rating: [5]
		},
		rate:0,
		duration:0
	}

	componentDidMount() {
		let game = this.state.game
		let rate = this.state.rate
		let duration = this.state.duration
		duration = parseInt(game.duration / 3600)
		rate = game.rating.reduce((a,b) => a + b) / game.rating.length

		this.setState({
			game: game,
			rate: rate,
			duration: duration
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
							<IonBadge className="gameTag" color="light">Food</IonBadge>
							<IonBadge className="gameTag" color="light">Cultural</IonBadge>
							<IonBadge className="gameTag" color="light">Water</IonBadge>
							<IonBadge className="gameTag" color="light">Easy</IonBadge>
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
								<span><IonIcon className="tag" icon={logoUsd}></IonIcon><IonIcon className="tag" icon={logoUsd}></IonIcon></span>
							</div>
							<div>
								<span><IonIcon className="tag" icon={walk}></IonIcon> 2 km</span>
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
