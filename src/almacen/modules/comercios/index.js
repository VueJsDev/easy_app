import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

export const comercios = {
	state: {
		comercios: []
	},
	actions: {
		LISTAR_COMERCIOS ({commit}, payload) {
			firebase.database().ref('comercios').once('value')
				.then((data) => {
					const comercios = []
					const obj = data.val()
					for (let key in obj) {
						comercios.push({
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
						    modeloNegocioEconomico: obj[key].modeloNegocioEconomico,
						})
					}
					commit('CARGAR_LISTADO_COMERCIOS', comercios)
				})
				.catch((error) => {
					console.log(error)
				})
		},
		CREAR_COMERCIOS ({commit}, payload) {
			const comercios = {
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
			firebase.database().ref('comercios').push(comercios)
				.then((data) => {
					key = data.key
					return key
				})
				.then(key => {
					const filename = payload.image.name
					const ext = filename.slice(filename.lastIndexOf('.'))
					return firebase.storage().ref('comercios/' + key + '.' + ext).put(payload.image)
				})
				.then(fileData => {
					imageUrl = fileData.metadata.downloadURLs[0]
					return firebase.database().ref('comercios').child(key).update({imageUrl: imageUrl})
				})
				.then(() => {
					commit('CREAR_COMERCIOS', {
						...comercios,
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
		CARGAR_LISTADO_COMERCIOS (state, payload) {
			state.comercios = payload
		},
		CREAR_COMERCIOS (state, payload) {
			state.comercios.push(payload)
		}
	},
	getters: {
		GET_COMERCIOS: state => state.comercios,

		comercios (state) {
			return (listadoId) => {
				return state.comercios.find((comercios)=> {
					return comercios.id === listadoId
				})
			}
		},
	}
}