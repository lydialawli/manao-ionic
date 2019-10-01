import React from 'react'
import { IonPage, IonGrid, IonRow, IonInput, IonItem, IonLabel, IonContent, IonButton, IonIcon } from '@ionic/react'
import '../styles/login.css'
import axios from 'axios'

class Login extends React.Component {
	state = {
		user: {
			email:'',
			password: ''
		},
		credentials: true
	}

	login = (e) => {
		e.preventDefault()
		axios.post('http://localhost:4000/login', this.state.user)
		.then(res => {
			let token = res.data.token
			if (token) {
				localStorage.setItem('token', token)
				this.props.history.push({
					pathname: '/games'
				})
			} else {
				this.setState({credentials: false})
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
							<h1 className="loginTitle">LOGIN</h1>
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

					<IonButton className="loginBtn" onClick={this.login} >SUBMIT!</IonButton>
					<IonButton className="newUser">Signup instead</IonButton>
			  </IonContent>
			</IonPage>
		)
	}
}

export default Login;
