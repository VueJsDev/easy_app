import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

export const servicios = {
	state: {
		servicios: []
	},
	actions: {
		LISTAR_SERVICIOS ({commit}, payload) {
			firebase.database().ref('servicios').once('value')
				.then((data) => {
					const servicios = []
					const obj = data.val()
					for (let key in obj) {
						servicios.push({
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
					commit('CARGAR_LISTADO_SERVICIOS', servicios)
				})
				.catch((error) => {
					console.log(error)
				})
		},
		CREAR_SERVICIOS ({commit}, payload) {
			const servicios = {
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
			firebase.database().ref('servicios').push(servicios)
				.then((data) => {
					key = data.key
					return key
				})
				.then(key => {
					const filename = payload.image.name
					const ext = filename.slice(filename.lastIndexOf('.'))
					return firebase.storage().ref('servicios/' + key + '.' + ext).put(payload.image)
				})
				.then(fileData => {
					imageUrl = fileData.metadata.downloadURLs[0]
					return firebase.database().ref('servicios').child(key).update({imageUrl: imageUrl})
				})
				.then(() => {
					commit('CREAR_SERVICIOS', {
						...servicios,
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
		CARGAR_LISTADO_SERVICIOS (state, payload) {
			state.servicios = payload
		},
		CREAR_SERVICIOS (state, payload) {
			state.servicios.push(payload)
		}
	},
	getters: {
		GET_SERVICIOS: state => state.servicios,

		servicios (state) {
			return (listadoId) => {
				return state.servicios.find((servicios)=> {
					return servicios.id === listadoId
				})
			}
		},
	}
}