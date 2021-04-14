<template>
	<v-app top-toolbar id="example-9-1" style="min-height: 0;" standalone>
		<v-toolbar fixed dark class="blue white--text">
			<v-btn icon @click="volver">
				<v-icon class="white--text">arrow_back</v-icon>
			</v-btn>
		</v-toolbar><br><br><br>
		<v-container>
			<v-layout>
				<v-flex xs12 sm6 offset-sm3>
					<v-card>
						<v-card-text>
							<v-container>
								<form @submit.prevent="ingresa">
									<v-layout row>
										<v-flex xs12>
											<v-text-field
												name="email"
												label="Correo"
												v-model="email"
												type="email"
												required>
											</v-text-field>
										</v-flex>
									</v-layout>
									<v-layout row>
										<v-flex xs12>
											<v-text-field
												name="password"
												label="Contraseña"
												v-model="password"
												type="password"
												required>
											</v-text-field>
										</v-flex>
									</v-layout>
									<v-layout>
							          	<v-flex xs6>
								            <div>
								            	<v-btn type="submit">
												<v-icon>person_outline</v-icon>&nbsp;
								            	Ingresa</v-btn>
								            </div>
							          	</v-flex>
							          	<v-flex xs6>
								            <div>
								            	<v-btn error dark @click="ingresaGmail" type="submit">
												<v-icon>email</v-icon>&nbsp;
								            	Gmail</v-btn>
								            </div>
							          	</v-flex>
									</v-layout>
									<v-layout>
							          	<v-flex xs12>
								            <div class="text-xs-center">
								            	<v-btn primary dark @click="ingresaFacebook" type="submit">
												<i class="fa fa-facebook-square fa-2x" aria-hidden="true"></i>&nbsp;
								            	Facebook</v-btn>
								            </div>
							          	</v-flex>
									</v-layout>
								</form>
							</v-container>
						</v-card-text>
					</v-card>
				</v-flex>
			</v-layout>
		</v-container>
  	</v-app>
</template>

<script>
	import * as firebase from 'firebase'
	export default {
		data(){
			return {
				email: '',
				password: ''
			}
		},

		computed: {
			usuario()
			{
				return this.$store.getters.usuario
			},
		},

		watch: {
			usuario (value) {
				if (value != null && value != undefined) {
					this.$router.push('/')
				}
			}
		},

		methods: {
			ingresa()
			{
				this.$store.dispatch('INGRESAR_USARIO', {'email': this.email, 'password': this.password})
				this.limpiar();
			},

			ingresaGmail()
			{
				this.$store.dispatch('INGRESAR_USARIO_GMAIL')
			},

			ingresaFacebook()
			{
				this.$store.dispatch('INGRESAR_USARIO_FACEBOOK')
			},

			limpiar()
			{
				this.email = '',
				this.password = '',
				this.confirmarContraseña = ''
			},

			volver()
			{
				this.$router.go(-1)
			}
		}

	}
</script>