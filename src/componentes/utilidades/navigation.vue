<template>
	<v-app>
    <app-nav></app-nav>
    <main>
      <div>
        <app-menu></app-menu>
      </div>
    </main>
  </v-app>
</template>

<script>
  import nav from './nav.vue'
  import menu from './iconos_menu.vue';
	export default {
    components: 
    {
      'app-menu': menu,
      'app-nav': nav
    }
	}
</script>

<style lang="stylus">
  @import '../../stylus/main'
</style>