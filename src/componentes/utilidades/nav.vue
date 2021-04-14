<template>
	<div>
		<!-- <v-navigation-drawer v-model="sideNav">
			<v-list>
				<v-list-tile
					v-for="item in menuItems"
					:key="item.title"
					:to="item.link">
					<v-list-tile-action>
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>{{ item.title }}</v-list-tile-content>
				</v-list-tile>
			</v-list>
		</v-navigation-drawer> -->
		<v-toolbar fixed dark class="blue white--text">
			<!-- <v-toolbar-side-icon
				@click.stop="sideNav = !sideNav"
				class="hidden-xs-only">
			</v-toolbar-side-icon> -->
			<v-toolbar-title>
				<router-link to="/" tag="span" style="cursor: pointer">
					<v-icon x-large dark>home</v-icon>
				</router-link>
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<!-- <v-toolbar-items class="hidden-xs-only">
				<v-btn
					flat
					v-for="item in menuItems"
					:key="item.title"
					:to="item.link">
					<v-icon left dark>{{ item.icon }}</v-icon>
					{{ item.title }}
				</v-btn>
			</v-toolbar-items> -->
		</v-toolbar>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				sideNav: false,
			}
		},

		computed:
		{
			menuItems () 
			{
				let menuItems = [
					{icon: 'vpn_key', title: 'Registrarse', link: '/registrarte'},
					{icon: 'lock_open', title: 'Ingresar', link: '/loguearse'},
					/*{icon: 'lock_open', title: 'Nueva Entidad', link: '/entidades/crear'},*/
				]
				if (this.userIsAuthenticated) {
					menuItems = [
						{icon: 'person', title: 'Perfil', link: '/perfil'},
						{icon: 'add', title: 'Nueva Entidad', link: '/entidades/crear'},
					]
				}
				return menuItems
			},
			userIsAuthenticated () 
			{
				return this.$store.getters.usuario !== null && this.$store.getters.usuario !== undefined
			}
		},

	    methods:
	    {
	    	buscador()
	    	{
	    		this.$router.push('/buscador')
	    	},

	    	volver()
		    {
		    	this.$router.go(-1)
		    }
	    },
	}
</script>

<style lang="stylus">
  @import '../../stylus/main'
</style>
