import Backbone from 'backbone'

export const FavoriteProductModel = Backbone.Model.extend({
	urlRoot: '/api/favProds',
	idAttribute: '_id'
})

export const FavoriteProductCollection = Backbone.Collection.extend({
	comparator: function(mod) {
		return new Date(mod.get('createdAt')).getTime() * -1
	},
	model: FavoriteProductModel,
	url: '/api/favProds'
})
