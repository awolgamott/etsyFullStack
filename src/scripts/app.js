import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import init from './init'
import HomePage from './views/homePage'
import {EtsyCollection} from './models/productModel'
import {FavoriteProductCollection} from './models/favoriteProductModel'
import {EtsyModel} from './models/productModel'
import DetailsPage from './views/detailsPage'
import FavoriteProductsPage from './views/FavoriteProductsPage'

var app = function() {
	var collectionInstance = new EtsyCollection()
	var favoritesInstance = new FavoriteProductCollection()

	var EtsyRouter = Backbone.Router.extend({
		routes: {
			'home': 'handleHome',
			'favProds': 'handleFavoriteProducts',
			'search/:query': 'handleProductSearch',
			'detail/:listing_id': 'handleDetailPage',
			'*defaultRoute': 'handleHome'
		},

		handleFavoriteProducts: function() {

			favoritesInstance.fetch() 
			ReactDOM.render(<FavoriteProductsPage 
				favColl={favoritesInstance}
				/>, document.querySelector('.container'))	
		},

		handleHome: function() {

			collectionInstance.fetch({
				dataType: 'jsonp',
				data:{
					includes: 'Images,MainImage',
					'api_key': collectionInstance._key
				}
			}) 
			ReactDOM.render(<HomePage 
				productColl={collectionInstance}
				/>, document.querySelector('.container'))	
		},

		handleRedirect: function() {
			location.hash = 'home'
		},

		handleProductSearch: function(query){
			collectionInstance.fetch({
				dataType: 'jsonp',
				data:{
					'keywords': query,
					includes: 'Images,MainImage',
					'api_key': collectionInstance._key
				}
			}) 
			ReactDOM.render(<HomePage
				productColl={collectionInstance}
				/>, document.querySelector('.container'))	
		},

		handleDetailPage: function(listing_id) {
			var modelInstance = new EtsyModel()

			modelInstance.fetch({
				url: 'https://openapi.etsy.com/v2/listings/' + listing_id + '.js',
				dataType: 'jsonp',
				data: {
					includes: 'Images,MainImage',
					'api_key': 'ayhxghvva4um3zjemhg60emb'
				}
			})
			ReactDOM.render(<DetailsPage
				model={modelInstance}
				/>, document.querySelector('.container'))	

		}
	})
	new EtsyRouter 
	Backbone.history.start()
}



// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..
// NECESSARY FOR USER FUNCTIONALITY. DO NOT CHANGE. 
export var app_name = init()
app()