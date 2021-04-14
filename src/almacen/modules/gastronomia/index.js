import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

export const gastronomias = {
	state: {
		gastronomias: []
	},
	actions: {
		LISTAR_GASTRONOMIAS ({commit}, payload) {
			firebase.database().ref('gastronomias').once('value')
				.then((data) => {
					const gastronomias = []
					const obj = data.val()
					for (let key in obj) {
						gastronomias.push({
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
					commit('CARGAR_LISTADO_GASTRONOMIAS', gastronomias)
				})
				.catch((error) => {
					console.log(error)
				})
		},
		CREAR_GASTRONOMIAS ({commit}, payload) {
			const gastronomias = {
				nombre: payload.nombre,
				direccion: payload.direccion,
				telefono: payload.telefono,
				email: payload.email,
				latitude: parseFloat(payload.latitude),
				longitude: parseFloat(payload.longitude),
				descripcion: payload.descripcion,
				modeloNegocioEconomico: payload.descripcion
			}
			let imageUrl
			let key
			firebase.database().ref('gastronomias').push(gastronomias)
				.then((data) => {
					key = data.key
					return key
				})
				.then(key => {
					const filename = payload.image.name
					const ext = filename.slice(filename.lastIndexOf('.'))
					return firebase.storage().ref('gastronomias/' + key + '.' + ext).put(payload.image)
				})
				.then(fileData => {
					imageUrl = fileData.metadata.downloadURLs[0]
					return firebase.database().ref('gastronomias').child(key).update({imageUrl: imageUrl})
				})
				.then(() => {
					commit('CREAR_GASTRONOMIAS', {
						...gastronomias,
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
		CARGAR_LISTADO_GASTRONOMIAS (state, payload) {
			state.gastronomias = payload
		},
		CREAR_GASTRONOMIAS (state, payload) {
			state.gastronomias.push(payload)
		}
	},
	getters: {
		GET_GASTRONOMIAS: state => state.gastronomias,

		gastronomias (state) {
			return (listadoId) => {
				return state.gastronomias.find((gastronomias)=> {
					return gastronomias.id === listadoId
				})
			}
		},
	}
}