import React from 'react'
import { IonPage, IonGrid, IonRow, IonInput, IonItem, IonLabel, IonContent, IonButton, IonIcon, IonText } from '@ionic/react'
import { Plugins } from '@capacitor/core';
import '../styles/login.css'
import axios from 'axios'

class Login extends React.Component {
	state = {
		user: {
			email:'',
			password: ''
		},
		message: ''
	}

	login = (e) => {
		e.preventDefault()
		axios.post('http://localhost:4000/login', this.state.user)
		.then(res => {
			let token = res.data.token
			if (token) {
				localStorage.setItem('token', token)
				// Plugins.Storage.set({
				// 	key: 'token',
				// 	value: token
				// })
				this.props.history.push({
					pathname: '/games'
				})
			} else {
				let message = res.data
				this.setState({message})
			}
		})
	}

	changeField = (e, field) => {
		let user = this.state.user
		user[field] = e.target.value
		this.setState({user})
	}

	render () {
		return(
			<IonPage>
				<IonContent className="login">
					<IonGrid className="content">

						<IonRow>
							<IonIcon className="manaoLogo" src="assets/Logo-yellow.svg"></IonIcon>
						</IonRow>

						<IonRow>
							<h1 className="formTitle">LOGIN</h1>
						</IonRow>
					</IonGrid>

					<IonItem className="form">
						<IonLabel className="label" color="danger" position="floating">Email</IonLabel>
						<IonInput type="email" className="label" onIonChange={(e) => this.changeField(e, 'email')}></IonInput>
					</IonItem>

					<IonItem className="form">
						<IonLabel className="label" color="danger" position="floating">Password</IonLabel>
						<IonInput type="password" className="label" onIonChange={(e) => this.changeField(e, 'password')}></IonInput>
					</IonItem>

					<IonText className="error">{this.state.message}</IonText>

					<IonButton className="submitBtn" onClick={this.login} >SUBMIT!</IonButton>
					<IonButton href='/signup' className="changePage">Signup instead</IonButton>
			  </IonContent>
			</IonPage>
		)
	}
}

export default Login;
