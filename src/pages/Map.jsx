import React from 'react'
import { IonPage, IonContent, IonBackButton } from '@ionic/react';
import { arrowBack } from 'ionicons/icons'
import MapCom from '../components/MapCom.jsx'
import '../styles/map.css'

class Map extends React.Component {
	state = {
		label: 'Lamai Market',
		lat: 0,
		lng: 0
	}

	componentWillReceiveProps(props) {
		console.log(props);
		if (props) {
			this.setState({
				label: props.location.locationName,
				lat: props.location.lat,
				lng: props.location.lng
			})
		}
	}

	goBack = () => {
		this.props.history.goBack()
	}

	render() {
		return (
			<IonPage>
				<IonContent>
					<IonBackButton className="backBtn" text="" icon={arrowBack} defaultHref="/games" style={{ position: "absolute", zIndex: 1 }} />
					<MapCom lat={this.state.lat} lng={this.state.lng} label={this.state.label} />
				</IonContent>
			</IonPage>
		)
	}
}

export default Map;
