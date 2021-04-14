<template>
	<v-app>
    	<app-nav></app-nav><br><br><br>
    	<v-container  v-for="informacion in informacion" :key="informacion.id">
    		<v-layout row>
    			<v-flex xs12 sm10 md8 offset-sm1 offset-md2>
    				<v-card>
    					<v-container fluid>
    						<v-layout row>
    							<v-flex xs5 sm4 md3>
    								<v-card-media
    								:src="informacion.imageUrl"
			                      	height="130px"
									style="margin-top: 20px;"
			                      	:key="informacion.id"
    								>
    								</v-card-media>
    							</v-flex>
    							<v-flex xs7 sm8 md9>
    								<v-card-title primary-title>
						                <div>
						                	<strong>{{ informacion.nombre }}</strong><p></p>
						                	<div>{{ informacion.telefono }}</div>
						                	<div>{{ informacion.email }}</div>
						                	<div>{{ informacion.direccion }}</div>
						                	<div>{{ informacion.ciudad }}</div>
						                </div>
					              	</v-card-title>
    							</v-flex>
    						</v-layout>
    					</v-container>
    				</v-card>
    			</v-flex>
    		</v-layout>
    	</v-container>
  	</v-app>
</template>

<script>
	import nav from '../utilidades/nav.vue'

	export default {

		components:
		{
			'app-nav': nav,
		},

		computed:
		{
			informacion() {
				return this.$store.getters.GET_INFORMACION
			}
		}
	}
</script>
