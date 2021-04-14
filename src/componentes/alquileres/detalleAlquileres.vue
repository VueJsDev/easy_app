<template>
	<v-app>
		<app-nav></app-nav>
		<v-container style="margin-top:60px">
			<v-layout row wrap>
				<v-flex xs12 sm10 md8 offset-sm1 offset-md2>
					<v-card>
						<v-card>
							<v-card-media :src="alquileres.imageUrl" height="110px">
        					</v-card-media>
						</v-card>
	                    <gmap-map
						    :center="center"
						    :zoom="16"
						    style="height: 160px"
						>
						 	<gmap-marker
						      :position="center"
						      :clickable="true"
						      :draggable="true"
						      @click="center=center"
						    ></gmap-marker>
						</gmap-map>
						<v-card-title primary-title>
				          <div>
				            <h3 class="headline mb-0 info--text">{{alquileres.nombre}}</h3>
				            <div>{{alquileres.descripcion}}</div>
				            <div><strong>Dirección:</strong> {{alquileres.direccion}}</div>
				          </div>
				        </v-card-title>
					</v-card>
				</v-flex>
			</v-layout>
		</v-container>
	</v-app>
</template>

<script>
	import nav from '../utilidades/nav_buscador.vue'
	import Vue from 'vue'
	import _ from 'lodash'
	import { mapState } from 'vuex'

	export default {

		data () {
	      return {
	      }
	    },
		props:['id'],
		computed:
		{
			center() {
				return {
		    		lat: this.alquileres.latitude,
		    		lng: this.alquileres.longitude
		    	}
			},
			alquileres()
			{
				return this.$store.getters.alquileres(this.id)
			},
		},
		components:
		{
			'app-nav': nav
		}
	}
</script>
