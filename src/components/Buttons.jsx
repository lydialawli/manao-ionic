import React from 'react'
import '../styles/buttons.css'

class Test extends React.Component {
	state = {
		icon: [],
		selectedIcon: 0
	}

	changeIcon = () => {
		let selectedIcon = this.state.selectedIcon
		selectedIcon++
		if (selectedIcon >= this.state.icon.length) {
			selectedIcon = 0
		}
		this.setState({selectedIcon})
	}

	UNSAFE_componentWillReceiveProps(props) {
		this.setState({icon: props.icon})
	}

	UNSAFE_componentWillMount() {
		this.setState({icon: this.props.icon})
	}
	render () {
		return (
				<div className="button" onClick={this.changeIcon}>
					<div className="trapezoid"></div>
					<div className="triangle"></div>
					<span className="btnText">
						<i className={this.state.icon[this.state.selectedIcon]}></i>
					</span>
				</div>
		)
	}
}
export default Test
