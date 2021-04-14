import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

export const buscador = {
	state: {
		listado: []
	},
	actions: {
		BUSCAR_ITEMS ({commit}, payload) {
			firebase.database()
					.ref('alquileres')
					.orderByChild("descripcion")
					.startAt("[a-zA-Z0-9]*")
                    .endAt(payload)
					.on("child_added", function(snapshot) {
						console.log(snapshot.val())
						const list = []
						const obj = snapshot.val()
						for (let key in obj) {
							list.push({
								id: key,
								descripcion: obj[key].descripcion,
							    direccion: obj[key].direccion,
							    email: obj[key].email,
							    imageUrl: obj[key].imageUrl,
							    latitude: obj[key].latitude,
							    longitude: obj[key].longitude,
								nombre: obj[key].nombre,
							    telefono: obj[key].telefono
							})
						}
						commit('CARGAR_LISTADO_BUSCADOR', list)
					});
		}
	},
	mutations: {
		CARGAR_LISTADO_BUSCADOR (state, payload) {
			state.listado = payload
		}
	}
}
