import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

export const bellezas = {
	state: {
		bellezas: []
	},
	actions: {
		LISTAR_BELLEZAS ({commit}, payload) {
			firebase.database().ref('bellezas').once('value')
				.then((data) => {
					const bellezas = []
					const obj = data.val()
					for (let key in obj) {
						bellezas.push({
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
					commit('CARGAR_LISTADO_BELLEZAS', bellezas)
				})
				.catch((error) => {
					console.log(error)
				})
		},
		CREAR_BELLEZAS ({commit}, payload) {
			const bellezas = {
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
			firebase.database().ref('bellezas').push(bellezas)
				.then((data) => {
					key = data.key
					return key
				})
				.then(key => {
					const filename = payload.image.name
					const ext = filename.slice(filename.lastIndexOf('.'))
					return firebase.storage().ref('bellezas/' + key + '.' + ext).put(payload.image)
				})
				.then(fileData => {
					imageUrl = fileData.metadata.downloadURLs[0]
					return firebase.database().ref('bellezas').child(key).update({imageUrl: imageUrl})
				})
				.then(() => {
					commit('CREAR_BELLEZAS', {
						...bellezas,
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
		CARGAR_LISTADO_BELLEZAS (state, payload) {
			state.bellezas = payload
		},
		CREAR_BELLEZAS (state, payload) {
			state.bellezas.push(payload)
		}
	},
	getters: {
		GET_BELLEZAS: state => state.bellezas,

		bellezas (state) {
			return (listadoId) => {
				return state.bellezas.find((bellezas)=> {
					return bellezas.id === listadoId
				})
			}
		},
	}
}