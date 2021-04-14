import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

export const profesionales = {
	state: {
		profesionales: []
	},
	actions: {
		LISTAR_PROFESIONALES ({commit}, payload) {
			firebase.database().ref('profesionales').once('value')
				.then((data) => {
					const profesionales = []
					const obj = data.val()
					for (let key in obj) {
						profesionales.push({
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
					commit('CARGAR_LISTADO_PROFESIONALES', profesionales)
				})
				.catch((error) => {
					console.log(error)
				})
		},
		CREAR_PROFESIONALES ({commit}, payload) {
			const profesionales = {
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
			firebase.database().ref('profesionales').push(profesionales)
				.then((data) => {
					key = data.key
					return key
				})
				.then(key => {
					const filename = payload.image.name
					const ext = filename.slice(filename.lastIndexOf('.'))
					return firebase.storage().ref('profesionales/' + key + '.' + ext).put(payload.image)
				})
				.then(fileData => {
					imageUrl = fileData.metadata.downloadURLs[0]
					return firebase.database().ref('profesionales').child(key).update({imageUrl: imageUrl})
				})
				.then(() => {
					commit('CREAR_PROFESIONALES', {
						...profesionales,
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
		CARGAR_LISTADO_PROFESIONALES (state, payload) {
			state.profesionales = payload
		},
		CREAR_PROFESIONALES (state, payload) {
			state.profesionales.push(payload)
		}
	},
	getters: {
		GET_PROFESIONALES: state => state.profesionales,

		profesionales (state) {
			return (listadoId) => {
				return state.profesionales.find((profesionales)=> {
					return profesionales.id === listadoId
				})
			}
		},
	}
}