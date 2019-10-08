import React from 'react';
import { IonContent, IonHeader, IonPage, IonButton, IonItem, IonLabel, IonInput } from '@ionic/react';
import { withRouter } from 'react-router-dom';
import Toolbar from '../components/Toolbar.jsx'
import axios from 'axios';
import '../styles/toolbar.css'
import '../styles/login.css'
import '../styles/settings.css'

class Settings extends React.Component {

	state = {
		user: {
			name: '',
			nationality: '',
			email: ''
		},

		isDisabled: true
	}

	logout = () => {
		localStorage.clear()
		this.props.history.push({pathname: '/games'})
	}

	changeField = (e, field) => {
		let user = this.state.user
		user[field] = e.target.value
		this.setState({user})
	}

	editFields = (disabled) => {
		let user = this.props.match.params.id
		if (disabled) {
			this.setState({isDisabled: false})
		} else {
			axios.patch(`${process.env.REACT_APP_API}/users/${user}`, this.state.user)
			.then(res => {
				console.log(res.data)
				this.setState({isDisabled: true})
			})
		}
	}

	componentWillReceiveProps(props) {
		console.log(this.props);
		let user = this.props.match.params.id
		axios.get(`${process.env.REACT_APP_API}/users/${user}`)
		.then(res => {
			this.setState({user: res.data})
		})
	}

	ionViewWillLeave() {
		let user = this.state.user
		user.name = ''
		user.email = ''
		user.nationality = ''
		this.setState({user})
	}

  render() {
    return (
      <IonPage>
        <IonHeader>
          <Toolbar />
        </IonHeader>

        <IonContent className="main ion-padding">
					<IonItem style={{opacity:1}} className="form settingsInput">
						<IonLabel className="settings label" color="danger" position="floating">Name</IonLabel>
						<IonInput disabled={this.state.isDisabled} color="light" type="text" placeholder={this.state.user.name} className="settings label input" onIonChange={(e) => this.changeField(e, 'name')}></IonInput>
					</IonItem>

					<IonItem className="form settingsInput">
						<IonLabel className="settings label" color="danger" position="floating">Email</IonLabel>
						<IonInput disabled={this.state.isDisabled} color="light" type="email" placeholder={this.state.user.email} className="settings label input" onIonChange={(e) => this.changeField(e, 'email')}></IonInput>
					</IonItem>

					<IonItem className="form settingsInput">
						<IonLabel className="settings label" color="danger" position="floating">Nationality</IonLabel>
						<IonInput disabled={this.state.isDisabled} color="light" type="text" placeholder={this.state.user.nationality} className="settings label input" onIonChange={(e) => this.changeField(e, 'nationality')}></IonInput>
					</IonItem>

					<IonButton onClick={() => this.editFields(this.state.isDisabled)} className="play">
						{
							this.state.isDisabled ? 'Edit info' : 'Save'
						}
						</IonButton>
					<br></br>
          <IonButton onClick={this.logout} className="play">Logout</IonButton>
        </IonContent>
      </IonPage>
    );
  }

};

export default withRouter(Settings);
