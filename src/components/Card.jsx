import React from 'react'
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon } from '@ionic/react'
import '../styles/card.css'
import { time, logoUsd, speedometer, star } from 'ionicons/icons'

class Card extends React.Component {
	state = {
		game: {
			image: '',
			title: '',
			location: '',
			intro: '',
			duration: 0,
			ratings: [0],
			price: 0,
			distance: 0
		},
		rate:0,
		duration:0
	}

	updateContent = (props) => {
		let game = props.game
		let rate = this.state.rate
		let duration = this.state.duration

		duration = parseInt(game.duration / 3600)
		rate = parseInt(game.ratings.reduce((a,b) => a + b) / game.ratings.length)

		this.setState({
			game: game,
			rate: rate,
			duration: duration
		})
	}

	UNSAFE_componentWillReceiveProps(props) {
		this.updateContent(props)
	}

	componentWillMount() {
		this.updateContent(this.props)
	}

	render () {
		return (
			<IonCard className="gameCard" href={`/game/${this.state.game._id}`}>
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
			</IonCard>
		)
	}
}
export default Card
