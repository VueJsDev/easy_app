<template>
	<div>
		<img :src="imagenUsuario">
		<img :src="imagenUsuarioFacebook">
	</div>
</template>

<script>
	export default {
		data() {
			return {

			}
		},

		computed: {
			imagenUsuario()
			{
				return this.$store.getters.imagenUsuario
			},
			imagenUsuarioFacebook()
			{
				return this.$store.getters.imagenUsuarioFacebook
			},
		},

		watch: {
			imagenUsuario (value) {
				if (value != null && value != undefined) {
					this.$router.push('Perfil a Editar')
				}
			},
			imagenUsuarioFacebook (value) {
				if (value != null && value != undefined) {
					this.$router.push('Perfil a Editar')
				}
			}
		},
	}
</script>