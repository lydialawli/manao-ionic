import React from 'react'
import '../styles/buttons.css'

class Test extends React.Component {
	render () {
		return (
				<div className="button">
					<div className="trapezoid"></div>
					<div className="triangle"></div>
					<span className="btnText">BUTTON</span>
				</div>
		)
	}
}
export default Test
