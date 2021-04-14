import Home from './componentes/Home.vue'

import Buscador from './componentes/utilidades/nav_buscador.vue'

import ListadoAlquileres from './componentes/alquileres/listadoAlquileres.vue'
import DetalleAlquileres from './componentes/alquileres/detalleAlquileres.vue'

import ListadoComercios from './componentes/comercios/listadoComercios.vue'
import DetalleComercios from './componentes/comercios/detalleComercios.vue'

import ListadoProfesionales from './componentes/profesionales/listadoProfesionales.vue'
import DetalleProfesionales from './componentes/profesionales/detalleProfesionales.vue'

import ListadoServicios from './componentes/servicios/listadoServicios.vue'
import DetalleServicios from './componentes/servicios/detalleServicios.vue'

import ListadoGastronomia from './componentes/gastronomia/listadoGastronomia.vue'
import DetalleGastronomia from './componentes/gastronomia/detalleGastronomia.vue'

import ListadoTurismo from './componentes/turismo/listadoTurismo.vue'
import DetalleTurismo from './componentes/turismo/detalleTurismo.vue'

import ListadoSalud from './componentes/salud/listadoSalud.vue'
import DetalleSalud from './componentes/salud/detalleSalud.vue'

import ListadoBelleza from './componentes/belleza/listadoBelleza.vue'
import DetalleBelleza from './componentes/belleza/detalleBelleza.vue'

import ListadoInformacion from './componentes/informacion/listadoInformacion.vue'

import CrearAlquileres from './componentes/alquileres/formularioAlquileres.vue'
import CrearComercios from './componentes/comercios/formularioComercios.vue'
import CrearProfesionales from './componentes/profesionales/formularioProfesionales.vue'
import CrearServicios from './componentes/servicios/formularioServicios.vue'
import CrearGastronomia from './componentes/gastronomia/formularioGastronomia.vue'
import CrearTurismo from './componentes/turismo/formularioTurismo.vue'
import CrearSalud from './componentes/salud/formularioSalud.vue'
import CrearBelleza from './componentes/belleza/formularioBelleza.vue'

/*import Registrarse from './componentes/usuarios/registrarse.vue'
import Loguearse from './componentes/usuarios/registrate.vue'
import Perfil from './componentes/usuarios/perfil.vue'*/


export const routes = [

	{
		path: '/',
		name: 'Home',
		component: Home
	},

	/*{
		path: '/registrarte',
		name: 'Registrarse al Sistema',
		component: Registrarse
	},

	{
		path: '/loguearse',
		name: 'Loguearse al Sistema',
		component: Loguearse
	},

	{
		path: '/perfil',
		name: 'Perfil a Editar',
		component: Perfil
	},*/

	{
		path: '/buscador',
		name: 'Buscador',
		props: true,
		component: Buscador
	},

	{
		path: '/listadoAlquileres',
		name: 'Listado Alquileres',
		component: ListadoAlquileres
	},

	{
		path: '/detalleAlquileres/:id',
		name: 'Detalles Alquileres',
		props: true,
		component: DetalleAlquileres
	},

	{
		path: '/detalleComercios/:id',
		name: 'Detalles Comercios',
		props: true,
		component: DetalleComercios
	},

	{
		path: '/listadoComercios',
		name: 'Listado Comercios',
		component: ListadoComercios
	},

	{
		path: '/listadoProfesionales',
		name: 'Listado Profesionales',
		component: ListadoProfesionales
	},

	{
		path: '/detalleProfesionales/:id',
		name: 'Detalles Profesionales',
		props: true,
		component: DetalleProfesionales
	},

	{
		path: '/listadoServicios',
		name: 'Listado Servicios',
		component: ListadoServicios
	},

	{
		path: '/detalleServicios/:id',
		name: 'Detalles Servicios',
		props: true,
		component: DetalleServicios
	},

	{
		path: '/listadoGastronomia',
		name: 'Listado Gastronomia',
		component: ListadoGastronomia
	},

	{
		path: '/detalleGastronomia/:id',
		name: 'Detalles Gastronomias',
		props: true,
		component: DetalleGastronomia
	},

	{
		path: '/listadoTurismo',
		name: 'Listado Turismo',
		component: ListadoTurismo
	},

	{
		path: '/detalleTurismo/:id',
		name: 'Detalles Turismo',
		props: true,
		component: DetalleTurismo
	},

	{
		path: '/listadoSalud',
		name: 'Listado Salud',
		component: ListadoSalud
	},

	{
		path: '/detalleSalud/:id',
		name: 'Detalles Salud',
		props: true,
		component: DetalleSalud
	},

	{
		path: '/listadoBelleza',
		name: 'Listado Belleza',
		component: ListadoBelleza
	},

	{
		path: '/detalleBelleza/:id',
		name: 'Detalles Belleza',
		props: true,
		component: DetalleBelleza
	},

	{
		path: '/listadoInformacion',
		name: 'Listado Informacion',
		component: ListadoInformacion
	},

	{
		path: '/entidades/crear',
		name: 'Nuevo Alquiler',
		component: CrearAlquileres
	},

	{
		path: '/comercios/crear',
		name: 'Nuevo Comercios',
		component: CrearComercios
	},

	{
		path: '/profesionales/crear',
		name: 'Nuevo Profesional',
		component: CrearProfesionales
	},

	{
		path: '/servicios/crear',
		name: 'Nuevo Servicio',
		component: CrearServicios
	},

	{
		path: '/gastronomia/crear',
		name: 'Nuevo Gastronomia',
		component: CrearGastronomia
	},

	{
		path: '/turismo/crear',
		name: 'Nuevo Turismo',
		component: CrearTurismo
	},

	{
		path: '/salud/crear',
		name: 'Nuevo Salud',
		component: CrearSalud
	},

	{
		path: '/belleza/crear',
		name: 'Nuevo Belleza',
		component: CrearBelleza
	},

]