import React from 'react'
import GoogleMapReact from 'google-map-react'
import Pin from '../components/Pin.jsx'
import '../styles/map.css'

class Map extends React.Component {
	state = {
		key: {
  		key: 'AIzaSyCVJkF4x11QI221vToWHyVvM4voNYuYbwU'
		},
		center: {
		  lat: 9.471623,
		  lng: 100.046935
		},
		zoom: 17,
		label: 'Lamai Market'
	}

	componentWillReceiveProps(props) {
		let center = this.state.center
		center.lat = props.lat
		center.lng = props.lng
		this.setState({
			center: center,
			label: props.locationName
		})
	}

	render () {
		return(
			<GoogleMapReact bootstrapURLKeys={this.state.key} defaultCenter={this.state.center} defaultZoom={this.state.zoom}>
				<Pin lat={this.state.lat} lng={this.state.lng} label={this.state.label}></Pin>
			</GoogleMapReact>

		)
	}
}

export default Map;
