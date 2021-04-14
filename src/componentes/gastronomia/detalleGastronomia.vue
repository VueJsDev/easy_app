<template>
	<v-app>
		<app-nav></app-nav>
		<v-container style="margin-top:60px">
			<v-layout row wrap>
				<v-flex xs12 sm10 md8 offset-sm1 offset-md2>
					<v-card>
						<v-card>
							<v-card-media :src="gastronomias.imageUrl" height="110px">
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
				            <h3 class="headline mb-0 info--text">{{gastronomias.nombre}}</h3>
				            <div>{{gastronomias.descripcion}}</div>
				            <div><strong>Dirección:</strong> {{gastronomias.direccion}}</div>
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

	export default {
		props:['id'],
		computed:
		{
			center() {
				return {
		    		lat: this.gastronomias.latitude,
		    		lng: this.gastronomias.longitude
		    	}
			},
			gastronomias()
			{
				return this.$store.getters.gastronomias(this.id)
			}
		},
		components: 
		{
			'app-nav': nav
		}
	}
</script>