import Vue from 'vue'
import Vuex from 'vuex'

import { alquileres } from './modules/alquileres'
import { comercios } from './modules/comercios/'
import { profesionales } from './modules/profesionales'
import { servicios } from './modules/servicios'
import { gastronomias } from './modules/gastronomia'
import { turismo } from './modules/turismo'
import { salud } from './modules/salud'
import { bellezas } from './modules/belleza'
import { informacion } from './modules/informacion'
import { buscador } from './modules/buscador'
import { usuarios } from './modules/usuarios'

Vue.use(Vuex)

export const store = new Vuex.Store({
	modules: {
		alquileres,
		comercios,
		profesionales,
		servicios,
		gastronomias,
		turismo,
		salud,
		bellezas,
		informacion,
		buscador,
		usuarios
	}
})
