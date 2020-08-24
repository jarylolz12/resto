const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
	mnuName: { type: String, required: true }, //pangalan sa order
	mnuCategory: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'category'
		}
	], //unsa iyang category> Sud-an? Ilimnon?, Dessert?
	mnuPrice: { type: Number, required: true }, //Tag Pila kol?
	isAvailable: { type: Boolean, default: true }, //Meron ba kayong adobo? ... wala po.
	isEdited: { type: Boolean, default: false }, //Kinsa man nag usab ani?
	isUnli: { type: Boolean, default: false }, //Unli? unsa buffet?
	staffEncoded: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user'
		}
	],
	encodedDate: { type: String },
	staffEdited: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user'
		}
	], //kinsa nag usab sa isAvailable?
	//pag mag error i set ang module sa userSchema
	editedDate: { type: String }
});

const menu = mongoose.model('menu', menuSchema);

module.exports = menu;
