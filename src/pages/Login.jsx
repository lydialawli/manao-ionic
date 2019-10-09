import React from 'react'
import { IonPage, IonGrid, IonRow, IonInput, IonItem, IonLabel, IonContent, IonButton, IonIcon, IonText } from '@ionic/react'
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
		axios.post(`${process.env.REACT_APP_API}/login`, this.state.user)
		.then(res => {
			let token = res.data.token
			if (token) {
				localStorage.setItem('token', token)
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
							<IonIcon className="manaoLogoLogin" src="assets/Logo-yellow.svg"></IonIcon>
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

					<IonGrid>
						<IonRow>
							<IonButton className="submitBtn" onClick={this.login} >SUBMIT!</IonButton>
						</IonRow>
						<IonRow>
							<IonButton href='/signup' className="changePage">Signup instead</IonButton>
						</IonRow>
					</IonGrid>

			  </IonContent>
			</IonPage>
		)
	}
}

export default Login;
