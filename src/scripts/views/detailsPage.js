import React from 'react'
import Banner from './components/banner'
import {FavoriteProductModel} from './../models/favoriteProductModel'

var DetailsPage = React.createClass({
	componentWillMount: function () {
		var boundUpdater = function(){
			this.setState({
				loaded: true,
				model: this.state.model 
			})
		}.bind(this)
		this.props.model.on('sync', boundUpdater)
	},
	componentWillUnmount: function(){
		this.props.model.off('sync')
	},
	getInitialState: function () {
		return {
			model: this.props.model,
			loaded: false
		}
	},
	_addToFavorites: function(event){
		// Add to favorites page

		// Creating a new instance of the FavoriteProductModel (backbone model)

		var newFavProd = new FavoriteProductModel({
			listing_id: this.state.model.get("listing_id"),
			title: this.state.model.get("title"),
			mainImageUrl: this.state.model.get('MainImage').url_170x135
		})
		debugger

		newFavProd.save()
			.then(
				function(response) { // SUCCESS
					alert('Favorited. It has happened. So excite')
				},
				function(err) { // FAILURE
					alert('zomg it failed')
					console.log(err)
				}
			)
	},
	render: function(){

		if (this.state.loaded !== true){
			return <div>...loading...</div>
		}

		return (
			<div className="details-page">
			<Banner />
				<h2>{this.state.model.get('title')}</h2>
					<span className="glyphicon glyphicon-heart" onClick={this._addToFavorites}></span>

					<img className="img-responsive thumbnail" src={this.state.model.get('MainImage').url_570xN} />
					<p>{this.state.model.get('description')}</p>
					<button>{'$'}{this.state.model.get('price')}</button>
			</div>

		
			)
	}
})

export default DetailsPage