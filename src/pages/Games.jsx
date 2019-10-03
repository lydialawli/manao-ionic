import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSlides, IonSlide, IonButtons, IonGrid, IonRow, IonCol, IonMenuButton, IonAvatar, IonIcon } from '@ionic/react';
import { arrowBack, arrowForward } from 'ionicons/icons'
import Card from '../components/Card.jsx'
import Button from '../components/Buttons.jsx'
import {Link} from 'react-router-dom'
import axios from 'axios'
import '../styles/toolbar.css'
import '../styles/games.css'

class Home extends React.Component {

	state = {
		games: [],

		filterOptions: [
			{filter: 'players', options: ['fas fa-user', 'fas fa-users']},
			{filter: 'location', options: ['fas fa-map-marker-alt']},
			{filter: 'transportation', options: ['fas fa-walking', 'fas fa-bicycle', 'fas fa-motorcycle']}
		],
		user: {
			email: '',
			avatar: '',
			_id: ''
		}
	}

	mountSlides = () => {
		let wrapper = document.getElementsByClassName('swiper-wrapper')[0]
		let slides = Array.from(document.getElementsByTagName('ion-slide'))
		slides.forEach(slide => {
			if (slide.parentNode.className !== 'swiper-wrapper') {
				wrapper.appendChild(slide)
			}
		})
	}

	componentDidMount() {
		let token = localStorage.getItem('token')
		let games = this.state.games

		axios.get(`${process.env.REACT_APP_API}/games`)
		.then(res => {
			games = res.data
			if (token) {
				axios.get(`${process.env.REACT_APP_API}/auth?token=${token}`)
				.then(res => {
					axios.get(`${process.env.REACT_APP_API}/users/${res.data._id}`)
					.then(user => {
						this.setState({
							games: games,
							user: user.data
						}, () => this.mountSlides())
					})
				})
			} else {
				this.setState({games}, () => this.mountSlides())
			}
		})
	}

  render() {
    return (
      <IonPage>

        <IonHeader>
          <IonToolbar className="toolbar">
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle> Manao </IonTitle>
            <IonButtons slot="end">
							<Link className="link" to={`/profile/${this.state.user._id}/settings`}>
              	<IonAvatar>
                	<img alt="" src={this.state.user.avatar} />
              	</IonAvatar>
							</Link>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent className="main ion-padding">
          <IonGrid className="filters">
            <IonRow>
							{
								this.state.filterOptions.map((filter, key) =>
									<IonCol key={key}>
										<Button key={key} icon={filter.options} />
									</IonCol>
								)
							}
            </IonRow>
          </IonGrid>

					<IonSlides options={{slidesPerView:1}}>

						{
							this.state.games.map((game, key) => {
								return (
									<IonSlide key={key}>
										<Card game={game} key={key}/>
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

export default Home;
