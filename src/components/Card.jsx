import React from 'react'
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon } from '@ionic/react'
import '../styles/card.css'
import { time, logoUsd, walk, star } from 'ionicons/icons'

class Card extends React.Component {
	render () {
		return (
			<IonCard className="gameCard">
				<img className="cardImg" style={{width:'100%'}} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTosGP_0xskdLBsyul_SpdUfA_NP8o0JM8I3FZVvztD96y-9XY9' alt=''/>
				<IonCardHeader>
					<IonCardTitle>Discover Lamai</IonCardTitle>
					<IonCardSubtitle>Lamai Beach, Koh Samui</IonCardSubtitle>
				</IonCardHeader>
				<IonCardContent>
						Dare to play the silliest game of all? Play to discover a little nice area
				</IonCardContent>
				<div className="tags">
					<div className="tag">
						<span><IonIcon className="icon" icon={time}/> 2h</span>
					</div>
					<div className="tag">
						<span><IonIcon icon={logoUsd}></IonIcon><IonIcon icon={logoUsd}></IonIcon></span>
					</div>
					<div className="tag">
						<span><IonIcon icon={walk}></IonIcon> 2km</span>
					</div>
					<div className="tag">
						<span>
							<IonIcon icon={star}></IonIcon>
							<IonIcon icon={star}></IonIcon>
							<IonIcon icon={star}></IonIcon>
							<IonIcon icon={star}></IonIcon>
						</span>
					</div>
				</div>
			</IonCard>
		)
	}
}
export default Card
