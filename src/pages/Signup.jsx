import React from 'react'
import { IonPage, IonGrid, IonRow, IonInput, IonItem, IonLabel, IonContent, IonButton, IonIcon, IonAlert } from '@ionic/react'
import '../styles/login.css'
import axios from 'axios'

class Signup extends React.Component {
	state = {
		user: {
			name: '',
			email: '',
			nationality: '',
			password: ''
		},
		error: false
	}

	changeField = (e, field) => {
		let user = this.state.user
		user[field] = e.target.value
		this.setState({user})
	}

	signup = (e) => {
		e.preventDefault()
		axios.post('http://localhost:4000/users', this.state.user)
		.then(res => {
			let token = res.data.token
			if (token) {
				localStorage.setItem('token', token)
				this.props.history.push({
					pathname: '/games'
				})
			} else {
				this.setState({error: true})
			}
		})
	}

	changeErrorState = () => {
		let error = this.state.error
		error = !error
		this.setState({error})
	}

	render () {
		return(
			<IonPage>
				<IonContent className="login">
					<IonGrid>

						<IonRow>
							<IonIcon className="manaoLogoLogin" src="assets/Logo-yellow.svg"></IonIcon>
						</IonRow>

						<IonRow>
							<h1 className="formTitle">SIGNUP</h1>
						</IonRow>
					</IonGrid>

					<IonItem className="form signup">
						<IonLabel className="label" color="danger" position="floating">Name</IonLabel>
						<IonInput type="text" className="label" onIonChange={(e) => this.changeField(e, 'name')}></IonInput>
					</IonItem>

					<IonItem className="form signup">
						<IonLabel className="label" color="danger" position="floating">Email</IonLabel>
						<IonInput type="email" className="label" onIonChange={(e) => this.changeField(e, 'email')}></IonInput>
					</IonItem>

					<IonItem className="form signup">
						<IonLabel className="label" color="danger" position="floating">Nationality</IonLabel>
						<IonInput type="text" className="label" onIonChange={(e) => this.changeField(e, 'nationality')}></IonInput>
					</IonItem>

					<IonItem className="form signup">
						<IonLabel className="label" color="danger" position="floating">Password</IonLabel>
						<IonInput type="password" className="label" onIonChange={(e) => this.changeField(e, 'password')}></IonInput>
					</IonItem>

					<IonButton className="submitBtn" onClick={this.signup} >SUBMIT!</IonButton>
					<IonButton href='/login' className="changePage">Login instead</IonButton>
					{
						this.state.error ?
						<IonAlert className="signupAlert"
							isOpen={this.state.error}
							onDidDismiss={() => this.changeErrorState()}
							header="Something went wrong"
							message="Please try again or go to login if you already have an account"
							buttons={[
								{
									text: "Try again",
									role: "cancel"
								},
								{
									text: "Login",
									handler: () => {
										this.props.history.push({
											pathname: '/login'
										})
									}
								}
							]}
							/> : ''
					}
			  </IonContent>
			</IonPage>
		)
	}
}

export default Signup;
