<template>
	<v-app top-toolbar id="example-9-1" style="min-height: 0;" standalone>
		<v-toolbar fixed dark class="blue white--text">
			<v-btn icon @click="volver">
				<v-icon class="white--text">arrow_back</v-icon>
			</v-btn>
			<v-spacer></v-spacer>
				<app-buscador @buscando="buscandolistado"></app-buscador>
			<v-spacer></v-spacer>
		</v-toolbar>
    	<app-listado :objeto="alquileres" rutadetalle="detalleAlquileres"></app-listado>
    	<!-- <app-boton-crear @click.native.stop="crear"></app-boton-crear> -->
  	</v-app>
</template>

<script>

	import appListado from '../utilidades/listado.vue'
	import botonCrear from '../utilidades/botonCrear.vue'
	import appBuscador from '../utilidades/buscador.vue'
	import {mapState, mapActions, mapGetters} from 'vuex';

	export default {
		data () {
			return {
				palabra_a_buscar: ''
			}
		},

		components:
		{
			'app-boton-crear': botonCrear,
			appListado,
			appBuscador
		},
		methods:{
			crear()
			{
				this.$router.push('/entidades/crear')
			},

			buscandolistado: function(palabra) {
				this.palabra_a_buscar = palabra;
		    },
			volver()
			{
				this.$router.go(-1)
			}
		},

		computed: mapState({
			alquileres: function(state)
		    {
				let alquileres = this.$store.state.alquileres.alquileres
		        let filtradopor = this.palabra_a_buscar && this.palabra_a_buscar.toLowerCase();
		        if (filtradopor)
		        {
		          alquileres = alquileres.filter(function (row)
		          {
		            return Object.keys(row).some(function (llave)
		            {
		              return String(row[llave]).toLowerCase().indexOf(filtradopor) > -1
		            })
		          })
		        }
		        return alquileres;
		    }
		})
	}
</script>
