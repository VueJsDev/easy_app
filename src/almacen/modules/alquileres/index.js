import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

export const alquileres = {
	state: {
		alquileres: []
	},
	actions: {
		LISTAR_ALQUILERES ({commit}, payload) {
			firebase.database().ref('alquileres').once('value')
				.then((data) => {
					const alquileres = []
					const obj = data.val()
					for (let key in obj) {
						alquileres.push({
							id: key,
							descripcion: obj[key].descripcion,
						    direccion: obj[key].direccion,
						    email: obj[key].email,
						    imageUrl: obj[key].imageUrl,
						    latitude: obj[key].latitude,
						    longitude: obj[key].longitude,
							nombre: obj[key].nombre,
							telefono: obj[key].telefono,
							modeloNegocioEconomico: obj[key].modeloNegocioEconomico
						})
					}
					commit('CARGAR_LISTADO_ALQUILERES', alquileres)
				})
				.catch((error) => {
					console.log(error)
				})
		},
		CREAR_ALQUILERES ({commit}, payload) {
			const alquileres = {
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
			firebase.database().ref('alquileres').push(alquileres)
				.then((data) => {
					key = data.key
					return key
				})
				.then(key => {
					const filename = payload.image.name
					const ext = filename.slice(filename.lastIndexOf('.'))
					return firebase.storage().ref('alquileres/' + key + '.' + ext).put(payload.image)
				})
				.then(fileData => {
					imageUrl = fileData.metadata.downloadURLs[0]
					return firebase.database().ref('alquileres').child(key).update({imageUrl: imageUrl})
				})
				.then(() => {
					commit('CREAR_ALQUILERES', {
						...alquileres,
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
		CARGAR_LISTADO_ALQUILERES (state, payload) {
			state.alquileres = payload
		},
		CREAR_ALQUILERES (state, payload) {
			state.alquileres.push(payload)
		}
	},
	getters: {
		GET_ALQUILERES: state => state.alquileres,

		alquileres (state) {
			return (listadoId) => {
				return state.alquileres.find((alquileres)=> {
					return alquileres.id === listadoId
				})
			}
		},
	}
}
