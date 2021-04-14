import Vue from 'vue'
import Vuex from 'vuex'

export const image = require('../../../assets/logo.jpg')

export const informacion = {
	state: {
		informacion: [{
			nombre: 'TÚGuíaFormosa',
			imageUrl: image,
			telefono: '(370)4-381395',
			email: 'tuguiaformosa@gmail.com',
			// direccion: 'Fotheringham Nº 2430',
			ciudad: 'Formosa Capital'
		}]
	},
	actions: {},
	mutations: {},
	getters: {
		GET_INFORMACION: state => state.informacion,
	}
}