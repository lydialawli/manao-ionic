import React from 'react';
import { IonContent, IonHeader, IonPage, IonSlides, IonSlide, IonGrid, IonRow, IonText, IonIcon, withIonLifeCycle } from '@ionic/react';
import { arrowBack, arrowForward } from 'ionicons/icons'
import { Plugins } from '@capacitor/core';
import Card from '../components/Card.jsx'
import Toolbar from '../components/Toolbar.jsx'
import axios from 'axios'
import '../styles/toolbar.css'
import '../styles/games.css'

class Home extends React.Component {

	state = {
		games: [],
		user: {
			_id: ''
		}
	}

	mountSlides = () => {
		let wrapper = document.getElementsByClassName('swiper-wrapper')[0]
		let slides = Array.from(document.getElementsByTagName('ion-slide'))
		slides.forEach(slide => {
			if (slide.parentNode.className !== 'swiper-wrapper') {
				if (wrapper) {
					wrapper.appendChild(slide)
				}
			}
		})
	}

	ionViewWillEnter() {
		let games = this.state.games

		axios.get(`${process.env.REACT_APP_API}/games`)
		.then(res => {
			games = res.data
			this.setState({games}, () => this.mountSlides())
		}).catch(err => {console.log('err', err)})

	}

	sendCoordinates = () => {
		Plugins.Geolocation.getCurrentPosition()
		.then(res => {
			this.props.history.push({
					pathname: '/map',
					lat: res.coords.latitude,
					lng: res.coords.longitude,
					locationName: 'You are here'
			})
		})


	}

	render() {
		return (
			<IonPage>

        <IonHeader>
          <Toolbar />
        </IonHeader>

				<IonContent className="main ion-padding">
					<IonGrid className="filters">
						<IonRow>
							<IonText className="game-location" onClick={this.sendCoordinates}><i className="fas fa-map-marker-alt games"></i> Samui</IonText>
						</IonRow>
					</IonGrid>

					<IonSlides options={{ slidesPerView: 1 }}>

						{
							this.state.games.map((game, key) => {
								return (
									<IonSlide key={key}>
										<Card game={game} key={key} />
									</IonSlide>
								)
							})
						}

					</IonSlides>

					<IonIcon className="icon left" icon={arrowBack}></IonIcon>
					<IonIcon className="icon right" icon={arrowForward}></IonIcon>
				</IonContent>
			</IonPage>
		);
	}

};

export default withIonLifeCycle(Home);
