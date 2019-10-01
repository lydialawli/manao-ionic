import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSlides, IonSlide, IonButtons, IonGrid, IonRow, IonCol, IonMenuButton, IonAvatar, IonIcon } from '@ionic/react';
import { arrowBack, arrowForward } from 'ionicons/icons'
import React from 'react';
import Card from '../components/Card.jsx'
import Button from '../components/Buttons.jsx'
import axios from 'axios'
import '../styles/toolbar.css'
import '../styles/games.css'

class Home extends React.Component {

	state = {
		games: [{
			image: '',
			title: 'WWW',
			location: '',
			intro: '',
			duration: 0,
			rating: [0]
		}],
		game_ready: false,
		game: {
			image: 'http://static.asiawebdirect.com/m/phuket/portals/kosamui-com/homepage/beaches/pagePropertiesImage/samui-beaches.jpg.jpg',
			title: 'LAMAI FUN LAMAI',
			location: 'Lamai, Koh Samui',
			intro: 'Go aroung the nice center area of Lamai while having a blast figuring out this game!',
			duration: 3600,
			rating: [5]
		},
		filterOptions: [
			{ filter: 'players', options: ['fas fa-user', 'fas fa-users'] },
			{ filter: 'location', options: ['fas fa-map-marker-alt'] },
			{ filter: 'transportation', options: ['fas fa-walking', 'fas fa-bicycle', 'fas fa-motorcycle'] }
		]
	}

	UNSAFE_componentDidMount() {
		axios.get('http://localhost:4000/games')
			.then(res => {
				// let games = this.state.games.concat(res.data)
				// console.log('games', games);
				this.setState({
					games: res.data,
					game_ready: true
				})
			})
	}

	goToQuiz = () => {
		this.props.history.push({
			pathname: '/quiz'
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
							<IonAvatar>
								<img alt="" src="https://previews.123rf.com/images/alex9230/alex92301710/alex9230171000012/87612992-cute-face-of-lime-fruit-vector-illustration.jpg" />
							</IonAvatar>
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
					<IonSlides>
						<IonSlide>
							<Card game={this.state.game} />
						</IonSlide>
						<IonSlide>
							<Card game={this.state.game} />
						</IonSlide>
					</IonSlides>

					{
						this.state.game_ready ?
							<IonSlides options={{ slidesPerView: 1 }}>
								{
									this.state.games.map((game, key) => {
										return (
											<IonSlide >
												<Card game={game} key={key} />
											</IonSlide>
										)
									})
								}
							</IonSlides> : <IonSlides options={{slidesPerView:1}}></IonSlides>
						}
					<IonIcon className="icon left" icon={arrowBack}></IonIcon>
					<IonIcon className="icon right" icon={arrowForward}></IonIcon>
				</IonContent>
			</IonPage>
		);
	}

};

export default Home;
