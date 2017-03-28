import React from 'react'



var Banner = React.createClass({
	_handleKeyDown: function(evtObj){
		if (evtObj.keyCode === 13) {
			location.hash = `search/${evtObj.target.value}`
			evtObj.target.value = ''
		}
	},

	render: function() {
		return(
			<div>
				<input placeholder="search the things" type="text" onKeyDown={this._handleKeyDown}/>
				<a href="#home">home</a>
				<a href="#favProds">favorites</a>
				<div className="mainPic">
					<div className="siteName">The Homemade Store</div>
				</div>
				
			</div>
		)
	}
})

export default Banner