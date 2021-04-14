<template>
	<v-app>
		<app-navigation></app-navigation>
	</v-app>
</template>

<script>
	import navigation from '../componentes/utilidades/navigation.vue'

	export default {
		components: 
		{
			'app-navigation': navigation,
		}
	};
</script>

<style lang="stylus">
  @import '../stylus/main'
</style>