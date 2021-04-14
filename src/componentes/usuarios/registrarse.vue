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
								<form @submit.prevent="registrate">
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
									<v-layout row>
										<v-flex xs12>
											<v-text-field
												name="confirmarContraseña"
												label="Confirmar Contraseña"
												v-model="confirmarContraseña"
												type="password"
												:rules="[compararContraseñas]">
											</v-text-field>
										</v-flex>
									</v-layout>
									<v-layout>
										<v-flex xs12>
											<v-btn type="submit">Regístrate</v-btn>
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
	export default {
		data(){
			return {
				email: '',
				password: '',
				confirmarContraseña: ''
			}
		},

		computed: {
			compararContraseñas()
			{
				return this.password !== this.confirmarContraseña ? 'Las Contraseñas no coinciden.' : ''
			},

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
			registrate()
			{
				this.$store.dispatch('USUARIO_NUEVO', {'email': this.email, 'password': this.password})
				this.limpiar();
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