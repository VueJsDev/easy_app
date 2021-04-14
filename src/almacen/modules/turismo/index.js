import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

export const turismo = {
	state: {
		turismo: []
	},
	actions: {
		LISTAR_TURISMOS ({commit}, payload) {
			firebase.database().ref('turismo').once('value')
				.then((data) => {
					const turismo = []
					const obj = data.val()
					for (let key in obj) {
						turismo.push({
							id: key,
							descripcion: obj[key].descripcion,
						    direccion: obj[key].direccion,
						    email: obj[key].email,
						    imageUrl: obj[key].imageUrl,
						    latitude: obj[key].latitude,
						    longitude: obj[key].longitude,
							nombre: obj[key].nombre,
						    telefono: obj[key].telefono,
						    creatorId: obj[key].creatorId,
						    modeloNegocioEconomico: obj[key].modeloNegocioEconomico
						})
					}
					commit('CARGAR_LISTADO_TURISMOS', turismo)
				})
				.catch((error) => {
					console.log(error)
				})
		},
		CREAR_TURISMOS ({commit}, payload) {
			const turismo = {
				nombre: payload.nombre,
				direccion: payload.direccion,
				telefono: payload.telefono,
				email: payload.email,
				latitude: parseFloat(payload.latitude),
				longitude: parseFloat(payload.longitude),
				descripcion: payload.descripcion,
				modeloNegocioEconomico: payload.modeloNegocioEconomico
			}
			let imageUrl
			let key
			firebase.database().ref('turismo').push(turismo)
				.then((data) => {
					key = data.key
					return key
				})
				.then(key => {
					const filename = payload.image.name
					const ext = filename.slice(filename.lastIndexOf('.'))
					return firebase.storage().ref('turismo/' + key + '.' + ext).put(payload.image)
				})
				.then(fileData => {
					imageUrl = fileData.metadata.downloadURLs[0]
					return firebase.database().ref('turismo').child(key).update({imageUrl: imageUrl})
				})
				.then(() => {
					commit('CREAR_TURISMOS', {
						...turismo,
						imageUrl: imageUrl,
						id: key
					})
				})
				.catch((error) => {
					console.log(error)
				})
		}
	},
	mutations: {
		CARGAR_LISTADO_TURISMOS (state, payload) {
			state.turismo = payload
		},
		CREAR_TURISMOS (state, payload) {
			state.turismo.push(payload)
		}
	},
	getters: {
		GET_TURISMOS: state => state.turismo,

		turismo (state) {
			return (listadoId) => {
				return state.turismo.find((turismo)=> {
					return turismo.id === listadoId
				})
			}
		},
	}
}