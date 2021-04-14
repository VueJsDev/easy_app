import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { routes } from './routes.js'
import { store } from './almacen/index.js'
import * as firebase from 'firebase'
import * as VueGoogleMaps from 'vue2-google-maps'
import Vuetify from 'vuetify'

Vue.use(Vuetify)
Vue.use(VueRouter)

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBBC6fHBk-fRcCRzNfTPyWkbnsR6ElpFpA',
  }
});

const router = new VueRouter({
  mode: 'history',
	routes
})

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  created () {
  	firebase.initializeApp({
  		apiKey: 'AIzaSyCuMr79gWrWwQv0qAyAhu4IUh4HNEvWO34',
	    authDomain: 'easyapp-efe37.firebaseapp.com',
	    databaseURL: 'https://easyapp-efe37.firebaseio.com',
	    projectId: 'easyapp-efe37',
	    storageBucket: 'gs://easyapp-efe37.appspot.com'
  	})
    this.$store.dispatch('LISTAR_ALQUILERES')
    this.$store.dispatch('LISTAR_COMERCIOS')
    this.$store.dispatch('LISTAR_PROFESIONALES')
    this.$store.dispatch('LISTAR_SERVICIOS')
    this.$store.dispatch('LISTAR_GASTRONOMIAS')
    this.$store.dispatch('LISTAR_TURISMOS')
    this.$store.dispatch('LISTAR_SALUD')
    this.$store.dispatch('LISTAR_BELLEZAS')
  }
})
