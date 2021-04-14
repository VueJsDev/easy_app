<template>
	<v-app>
		<app-nav></app-nav>
		<v-container>
			<app-formulario @crearEntidades="crearEntidades"></app-formulario>
		</v-container>
	</v-app>
</template>

<script>
	import nav from '../utilidades/nav_buscador.vue'
	import formulario from '../utilidades/formularioAlta.vue'
	export default {

		components: 
		{
			'app-nav': nav,
			'app-formulario': formulario
		},
		methods:
		{
			crearEntidades(datos)
			{
				this.$store.dispatch('CREAR_GASTRONOMIAS', datos)
			}
		}
	}
</script>