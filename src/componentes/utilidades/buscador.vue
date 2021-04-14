<template>
	<v-container><br>
		<v-layout row wrap>
			<v-text-field
				v-model="palabra"
				name="input-1-3"
				label="Buscar..."
				single-line
				dark
				append-icon="search"
				@keyup.native="escribiendo"
			></v-text-field>
		</v-layout>
		</v-container>
</template>

<script>
	export default {
		data () {
			return {
				palabra: '',
				valor: false
			}
		},
		methods:
		{
			escribiendo() {
				this.$emit('buscando', this.palabra);
			},
		},
	}
</script>
