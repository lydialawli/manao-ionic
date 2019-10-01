import React from 'react'
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon } from '@ionic/react'
import '../styles/card.css'
import { time, logoUsd, walk, star } from 'ionicons/icons'

class Card extends React.Component {
	state = {
		game: {
			image: '',
			title: '',
			location: '',
			intro: '',
			duration: '',
			rating: [0]
		},
		rate:0,
		duration:0
	}

	UNSAFE_componentWillReceiveProps(props) {
		this.setState({game: props.game})
	}

	UNSAFE_componentWillMount() {
		let game = this.props.game
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

	render () {
		return (
			<IonCard className="gameCard" href="/game">
				<div className="imgContainer">
					<img className="cardImg" style={{width:'100%'}} src={this.state.game.image} alt=''/>
						<div className="gameRating">
							<span>
								{
									[...Array(this.state.rate)].map((e,i) => <IonIcon key={i} className="starRating" icon={star}></IonIcon>)
								}
							</span>
						</div>
					<div className="diagonal"></div>
				</div>

				<IonCardHeader>
					<IonCardTitle className="gameTitle">{this.state.game.title}</IonCardTitle>
					<IonCardSubtitle>{this.state.game.location}</IonCardSubtitle>
				</IonCardHeader>
				<IonCardContent className="gameIntro">{this.state.game.intro}</IonCardContent>

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
			</IonCard>
		)
	}
}
export default Card
