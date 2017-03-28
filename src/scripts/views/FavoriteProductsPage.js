import React from 'react'
import Banner from './components/banner'

var FavoriteProductsPage = React.createClass({
	componentWillMount: function () {
		var boundUpdater = function(){
			this.setState({
				loaded: true,
				collection: this.state.collection 
			})
		}.bind(this)
		this.props.favColl.on('sync', boundUpdater)
	},
	componentWillUnmount: function(){
		this.props.favColl.off('sync')
	},
	getInitialState: function () {
		return {
			collection: this.props.favColl,
			loaded: false
		}
	},
	render: function(){
		if (this.state.loaded !== true){
			return <div>...loading...</div>
		}
		return (
			<div className="home-page">
				<Banner />
				Number of Results: {this.state.collection.models.length}
				<div className="listings">
					{this.state.collection.models.map(function(model){
						return <div className="listing" key={model.get('listing_id')}>
							<a href={`#detail/${model.get('listing_id') }`}>
								<img src={model.get('mainImageUrl')} /><br/>
								{model.get('title')}
								
							</a>
						</div>
					})}
				</div>
			</div>
			)
	}
})

export default FavoriteProductsPage