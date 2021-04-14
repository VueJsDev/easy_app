<template>
	<div>
		<v-layout row>
			<v-flex xs12 sm6 offset-sm3><br><br><br>
				<h4 class="info--text">Nueva Entidad</h4>
			</v-flex>
		</v-layout>
		<v-container grid-list-md text-xs-center ref="form" lazy-validation>
			<v-layout row wrap>
				<v-flex xs12>
			        <v-text-field
						name="nombre"
						label="Nombre"
						id="nombre"
						v-model="nombre"
						:error-messages="nameErrors"
						@input="$v.nombre.$touch()"
						@blur="$v.nombre.$touch()"
						required
						>
					</v-text-field>
			    </v-flex>
			    <v-flex xs6>
			        <v-text-field
						name="telefono"
						label="Teléfono"
						id="telefono"
						v-model="telefono"
						required
						:error-messages="phoneErrors"
						@input="$v.telefono.$touch()"
						@blur="$v.telefono.$touch()"
						>
					</v-text-field>
			    </v-flex>
			    <v-flex xs6>
			        <!-- <v-text-field
						name="email"
						label="E-mail"
						id="email"
						v-model="email"
						:error-messages="emailErrors"
						@input="$v.email.$touch()"
						@blur="$v.email.$touch()"
						required
						>
					</v-text-field> -->
					<v-text-field
						name="email"
						label="E-mail"
						id="email"
						v-model="email"
						>
					</v-text-field>
			    </v-flex>
			    <v-flex xs7>
			        <v-text-field
						name="direccion"
						label="Dirección"
						id="direccion"
						v-model="direccion"
						:error-messages="addressErrors"
						@input="$v.direccion.$touch()"
						@blur="$v.direccion.$touch()"
						required
						>
					</v-text-field>
			    </v-flex>
			    <v-flex xs6>
					<v-btn raised class="primary" @click="subirImagen">Cargar Imagen</v-btn>
					<input
						type="file"
						style="display: none"
						ref="fileInput"
						accept="image/*"
						@change="subiendoImagenes"
						append-icon="search"
					>
			    </v-flex>
			    <v-flex xs2>
			        <img :src="imageUrl" height="90px">
			    </v-flex>
			</v-layout>
			<v-layout row wrap>
			    <v-flex xs12>
			        <v-text-field
						name="descripcion"
						label="Descripción"
						multi-line
						id="descripcion"
						v-model="descripcion"
						>
					</v-text-field>
			    </v-flex>
				<v-flex xs12>
			        <v-checkbox
						color="green"
						v-model="modeloNegocioEconomico"
					>
					<div slot="label">
						ModeloNegocioEconomico
					</div>
					</v-checkbox>
			    </v-flex>
			    <v-fab-transition>
				  <v-btn
					class="info"
					dark
					bottom
					right
					fab
					fixed
					type="submit"
					@click.native.stop="crearEntidades"
				  >
					<v-icon>send</v-icon>
				  </v-btn>
				</v-fab-transition>
				<input type="hidden" v-model="latitude" value="">
				<input type="hidden" v-model="longitude" value="">
			</v-layout>
		</v-container>
	</div>
</template>

<script>
	import Vue from 'vue'
	import axios from 'axios'
	import _ from 'lodash'
	import Toasted from 'vue-toasted'
	import { validationMixin } from 'vuelidate'
  	import { required, maxLength, email, numeric, alpha } from 'vuelidate/lib/validators'

	Vue.use(Toasted)

	export default {
		mixins: [validationMixin],
		validations: {
			nombre: { required, maxLength: maxLength(10), alpha },
			telefono: { required, numeric },
			// email: { required, email },
			direccion: { required }
		},
		data() {
			return {
				nombre: null,
				direccion: null,
				telefono: null,
				email: null,
				imageUrl: null,
				descripcion: null,
		    	latitude: null,
		    	longitude: null,
		    	image: 0,
				modeloNegocioEconomico: false
			}
		},

		watch: {
		    direccion: function() {
		      this.latitude = null;
		      this.longitude = null;
		      this.buscadorCoordenadas();
		    }
		},

		computed:
		{
			nameErrors () {
				const errors = []
				if (!this.$v.nombre.$dirty) return errors
				!this.$v.nombre.required && errors.push('El Nombre es requerido')
				return errors
			},

			phoneErrors () {
				const errors = []
				if (!this.$v.telefono.$dirty) return errors
				!this.$v.telefono.numeric && errors.push('Ingrese sòlo Nùmeros')
        		!this.$v.telefono.required && errors.push('El Telèfono es requerido')
				return errors
			},

			// emailErrors () {
			// 	const errors = []
			// 	if (!this.$v.email.$dirty) return errors
			// 	!this.$v.email.email && errors.push('Ingrese un e-mail vàlido')
        	// 	!this.$v.email.required && errors.push('El E-mail es requerido')
			// 	return errors
			// },

			addressErrors () {
				const errors = []
				if (!this.$v.direccion.$dirty) return errors
				!this.$v.direccion.required && errors.push('La Direcciòn es requerido')
				return errors
			},
		},

		methods:
		{
			buscadorCoordenadas: _.debounce(function() {
				let app = this;
			    app.latitude = "Buscando...";
			    app.longitude = "Buscando...";
			    axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + app.direccion)
				  .then(function (response) {
				    app.latitude = response.data.results[0].geometry.location.lat;
              		app.longitude = response.data.results[0].geometry.location.lng;
				  })
				  .catch(function (error) {
				    app.latitude = "Direccion Invalida";
              		app.longitude = "Direccion Invalida";
				  })
			}, 500),

			subirImagen()
			{
				this.$refs.fileInput.click()
			},

			subiendoImagenes(event)
			{
				const files = event.target.files
				let filename = files[0].name
				if (filename.lastIndexOf('.') <= 0)
				{
					return alert('Subir un arhivo de imagen compatible')
				}
				const fileReader = new FileReader()
				fileReader.addEventListener('load', () => {
					this.imageUrl = fileReader.result
				})
				fileReader.readAsDataURL(files[0])
				this.image = files[0]
			},

			clear ()
			{
				this.$v.$reset()
				this.nombre = null,
				this.direccion = null,
				this.telefono = null,
				this.email = null,
				this.imageUrl = null,
				this.descripcion = null,
				this.latitude = null,
				this.longitude = null,
				this.modeloNegocioEconomico = false
			},

			crearEntidades ()
			{
				this.$v.$touch()
				this.$emit('crearEntidades', {nombre: this.nombre, direccion: this.direccion, telefono: this.telefono, email: this.email, image: this.image, descripcion: this.descripcion, latitude: this.latitude, longitude: this.longitude, modeloNegocioEconomico: this.modeloNegocioEconomico})
				this.$toasted.success('Datos Guardados', {
					theme: 'primary',
					position: 'top-right',
					duration: 3000
				})
				this.clear()
				// if(this.image == null)
				// {
				// 	console.log('PASAR IMAGEN POR DEFECTO')
				// 	// var image="<img src='../../assets/defecto.png' alt='Imagen' />";
				// 	// console.log(image);
				// 	// this.$emit('crearEntidades', {nombre: this.nombre, direccion: this.direccion, telefono: this.telefono, email: this.email, image: this.image, descripcion: this.descripcion, latitude: this.latitude, longitude: this.longitude})
				// 	// console.log()
				// 	// this.$toasted.error('Ingrese una Imagen', {
				// 	// 	theme: 'primary',
				// 	// 	position: 'top-right',
				// 	// 	duration: 3000,
				// 	// 	message : 'Not Authorized to Access'
				// 	// })
				// } else {
				// 	this.$emit('crearEntidades', {nombre: this.nombre, direccion: this.direccion, telefono: this.telefono, email: this.email, image: this.image, descripcion: this.descripcion, latitude: this.latitude, longitude: this.longitude})
				// 	this.$toasted.success('Datos Guardados', {
				// 		theme: 'primary',
				// 		position: 'top-right',
				// 		duration: 3000
				// 	})
				// 	this.clear()
				// }
			}
		}
	}
</script>
