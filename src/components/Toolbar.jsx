import React from 'react'
import { IonTitle, IonToolbar, IonButtons, IonMenuButton, IonAvatar, IonIcon } from '@ionic/react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/toolbar.css'

class Toolbar extends React.Component {
	state = {
		user: {
			_id: ''
		}
	}

	componentWillReceiveProps(props) {
		let token = localStorage.getItem('token')
		if (token) {
			axios.get(`${process.env.REACT_APP_API}/auth?token=${token}`)
			.then(res => {
				axios.get(`${process.env.REACT_APP_API}/users/${res.data._id}`)
				.then(user => {
					this.setState({
						user: user.data
					})
				})
			})
		} else {
			let user = this.state.user
			user._id = ''
			this.setState({
				user: user
			})
		}
	}

	render () {
		return (
			<IonToolbar className="toolbar">
				<IonButtons slot="start">
					<IonMenuButton />
				</IonButtons>
				<Link to={'/games'}><IonTitle><IonIcon className="toolbarLogo" src="assets/Logo-yellow.svg"></IonIcon></IonTitle></Link>
				<IonButtons slot="end">
					{
						this.state.user._id !== '' ?
						<Link to={`/profile/${this.state.user._id}/settings`}>
							<IonAvatar>
								<img alt="" src={this.state.user.avatar} />
							</IonAvatar>
						</Link>
							:
						<Link to={`/login`}>
							<IonAvatar>
								<img alt="" src='/assets/default-avatar.png' />
							</IonAvatar>
						</Link>
					}

				</IonButtons>
			</IonToolbar>
		)
	}
}

export default Toolbar;
