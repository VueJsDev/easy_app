import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

export const salud = {
	state: {
		salud: []
	},
	actions: {
		LISTAR_SALUD ({commit}, payload) {
			firebase.database().ref('salud').once('value')
				.then((data) => {
					const salud = []
					const obj = data.val()
					for (let key in obj) {
						salud.push({
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
					commit('CARGAR_LISTADO_SALUD', salud)
				})
				.catch((error) => {
					console.log(error)
				})
		},
		CREAR_SALUD ({commit}, payload) {
			const salud = {
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
			firebase.database().ref('salud').push(salud)
				.then((data) => {
					key = data.key
					return key
				})
				.then(key => {
					const filename = payload.image.name
					const ext = filename.slice(filename.lastIndexOf('.'))
					return firebase.storage().ref('salud/' + key + '.' + ext).put(payload.image)
				})
				.then(fileData => {
					imageUrl = fileData.metadata.downloadURLs[0]
					return firebase.database().ref('salud').child(key).update({imageUrl: imageUrl})
				})
				.then(() => {
					commit('CREAR_SALUD', {
						...salud,
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
		CARGAR_LISTADO_SALUD (state, payload) {
			state.salud = payload
		},
		CREAR_SALUD (state, payload) {
			state.salud.push(payload)
		}
	},
	getters: {
		GET_SALUD: state => state.salud,

		salud (state) {
			return (listadoId) => {
				return state.salud.find((salud)=> {
					return salud.id === listadoId
				})
			}
		},
	}
}