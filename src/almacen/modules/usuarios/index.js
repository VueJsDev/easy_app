import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

export const usuarios = {
	state:{
		usuario: null,
		imagenUsuario: null,
		imagenUsuarioFacebook: null
	},
	actions:{

		INGRESAR_USARIO_FACEBOOK: ({ commit }) => {
			let provider = new firebase.auth.FacebookAuthProvider();
			firebase.auth().signInWithPopup(provider).then(function(result) {
			  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
			  let token = result.credential.accessToken;
			  // The signed-in user info.
			  let user = result.user;
			  commit('REGISTRAR_NUEVO_USUARIO', user)
			  commit('ENVIAR_FOTO_FACEBOOK', user.photoURL)
			  console.log(user.photoURL)
			  // ...
			}).catch(function(error) {
			  // Handle Errors here.
			  let errorCode = error.code;
			  let errorMessage = error.message;
			  // The email of the user's account used.
			  let email = error.email;
			  // The firebase.auth.AuthCredential type that was used.
			  let credential = error.credential;
			  // ...
			});
		},

		INGRESAR_USARIO_GMAIL: ({ commit }) => {
			let provider = new firebase.auth.GoogleAuthProvider();
			firebase.auth().signInWithPopup(provider).then(function(result) {
			  // This gives you a Google Access Token. You can use it to access the Google API.
			  //var token = result.credential.accessToken;
			  // The signed-in user info.
			  let user = result.user;
			  commit('REGISTRAR_NUEVO_USUARIO', user)
			  commit('ENVIAR_FOTO_GMAIL', user.photoURL)
			  /*console.log(user.photoURL)*/
			  // ...
			}).catch(function(error) {
			  // Handle Errors here.
			  let errorCode = error.code;
			  let errorMessage = error.message;
			  // The email of the user's account used.
			  let email = error.email;
			  // The firebase.auth.AuthCredential type that was used.
			  let credential = error.credential;
			  // ...
			});
		},

		USUARIO_NUEVO: ({ commit }, payload) => {
			firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
				.then(
					usuario => {
			            const newUser = {
			              id: usuario.uid,
			              registeredMeetups: []
			            }
			            commit('REGISTRAR_NUEVO_USUARIO', newUser)
		         	}
		        ) 	
				.catch((error) => {
					console.log(error)
				})
		},

		INGRESAR_USARIO: ({ commit }, datos) => {
			firebase.auth().signInWithEmailAndPassword(datos.email, datos.password)
				.then(
					usuario => {
						const newUser = {
			              id: usuario.uid,
			              registeredMeetups: []
			            }
			            commit('REGISTRAR_NUEVO_USUARIO', newUser)
					}
				)
				.catch((error) => {
					console.log(error)
				})
		},
	},
	mutations:{
		REGISTRAR_NUEVO_USUARIO: (state, payload) => {
			state.usuario = payload
		},

		ENVIAR_FOTO_GMAIL: (state, imagen) => {
			state.imagenUsuario = imagen
		},

		ENVIAR_FOTO_FACEBOOK: (state, imagen) => {
			state.imagenUsuarioFacebook = imagen
		},
	},
	getters:{
		usuario: (state) => {
			return state.usuario
		},

		imagenUsuario: (state) => {
			return state.imagenUsuario
		},

		imagenUsuarioFacebook: (state) => {
			return state.imagenUsuarioFacebook
		}
	}
}