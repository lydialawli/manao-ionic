import React from 'react'
import { IonContent, IonPage, IonIcon, IonGrid, IonRow, IonAlert } from '@ionic/react';
import { withRouter } from 'react-router-dom';
import axios from 'axios'
import '../styles/outcome.css'

class Outcome extends React.Component {
	state = {
		coloredStars: 0,
		alert: false,
		score: 0,
		user: {
			name: ''
		},
		gameId: ''
	}

	loadData = () => {
		let token = localStorage.getItem('token')
		axios.get(`${process.env.REACT_APP_API}/auth?token=${token}`)
		.then(res => {
			this.setState({
				score: this.props.location.score,
				user: res.data,
				gameId: this.props.location.gameId
			})
		})
	}

	ionViewWillEnter() {
		this.loadData()
	}

	UNSAFE_componentWillReceiveProps(props) {
		this.loadData()
	}

	changeColoredStars = (n) => {
		let coloredStars = this.state.coloredStars
		console.log(this.state);
		if (coloredStars === n) {
			axios.patch(`${process.env.REACT_APP_API}/games/${this.state.gameId}`, {
				rating: coloredStars
			}).then(res => {
				this.setState({ alert: true })
				localStorage.removeItem("history")
				setTimeout(() => {
					this.props.history.push({
						pathname: '/games',
						refresh: true
					})
				}, 2000)
			})
		} else {
			this.setState({ coloredStars: n })
		}
	}

	render() {
		return (
			<IonPage>
				<IonContent className="outcome">
					<IonGrid>
						<IonRow className="outcomeRow">
							<img  style={{height:'100px', margin:'auto', marginTop:'20px'}} alt="outcome-icon" src="assets/icon-outcome.png"></img>
						</IonRow>
						<IonRow className="outcomeRow">
							<h1>Congrax, {this.state.user.name}! You finished the game!</h1>
						</IonRow>
						<IonRow className="outcomeRow score">
							<h1><i className="fas fa-trophy"></i> Score: {this.state.score}</h1>
						</IonRow>
						<IonRow className="outcomeRow">
							<h6>On behalf of the Manao Team, we hope you had a blast.</h6>
						</IonRow>
						<IonRow className="outcomeRow">
							<h6 className="">Please rate this game. Manao community will be very thankful!</h6>
						</IonRow>
						{
							[...Array(this.state.coloredStars)].map((s, i) => <i className="fas fa-star" key={i} onClick={() => this.changeColoredStars(i + 1)}></i>)
						}
						{
							[...Array(5 - this.state.coloredStars)].map((s, i) => <i className="far fa-star" key={i} onClick={() => this.changeColoredStars(this.state.coloredStars + i + 1)}></i>)
						}

						<IonAlert
							isOpen={this.state.alert}
							onDidDismiss={() => this.setState({ alert: false })}
							header="Thank you for playing Manao!"
							message="If you’d like more free games throughout the world, contact us and let us know your ideas!"
						/>
					</IonGrid>
				</IonContent>
			</IonPage>
		)

	}
}

export default withRouter(Outcome);
