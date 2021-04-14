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
    	<app-listado :objeto="turismo" rutadetalle="detalleTurismo"></app-listado>
    	<!-- <div v-if="logueado">
    		<app-boton-crear @click.native.stop="crear"></app-boton-crear>
    	</div>
    	<div v-else>
    	</div> -->
	</v-app>
</template>

<script>

	import botonCrear from '../utilidades/botonCrear.vue'
	import appListado from '../utilidades/listado.vue'
	import appBuscador from '../utilidades/buscador.vue'
	import {mapState, mapActions, mapGetters} from 'vuex';

	export default {
		data () {
			return {
				palabra_a_buscar: '',
				logueado: false
			}
		},

		components:
		{
			'app-boton-crear': botonCrear,
			appListado,
			appBuscador

		},
		methods:{

			prueba()
			{
				if (this.userIsAuthenticated) {
					console.log('askdaskjdhaskhdkaj')
					/*this.logueado = true*/
				} else {
					this.logueado = false
				}
			},

			crear()
			{
				this.$router.push('/turismo/crear')
			},
			buscandolistado: function(palabra) {
				this.palabra_a_buscar = palabra;
		    },
			volver()
			{
				this.$router.go(-1)
			}
		},

		computed: {
			userIsAuthenticated () 
			{
				return this.$store.getters.usuario !== null && this.$store.getters.usuario !== undefined
			},

			...mapState({
				turismo: state => state.turismo.turismo
			})
		}

		/*computed: mapState({
			turismo: function(state)
		    {
				let turismo = this.$store.state.turismo.turismo
		        let filtradopor = this.palabra_a_buscar && this.palabra_a_buscar.toLowerCase();
		        if (filtradopor)
		        {
		          turismo = turismo.filter(function (row)
		          {
		            return Object.keys(row).some(function (llave)
		            {
		              return String(row[llave]).toLowerCase().indexOf(filtradopor) > -1
		            })
		          })
		        }
		        return turismo;
		    }
		})*/
	}
</script>
