<template>
	<v-app top-toolbar id="example-9-1" style="min-height: 0;" standalone>
        <v-toolbar fixed  class="blue white--text">
			<v-btn icon @click="volver">
            	<v-icon class="white--text">arrow_back</v-icon>
          	</v-btn>
        </v-toolbar>
    </v-app>
</template>

<script>
	export default {
		data () {
			return {
				
			}
		},

		methods:
		{
			volver()
			{
				this.$router.go(-1)
			}
		}
	}
</script>

<style lang="stylus">
  @import '../../stylus/main'
</style>
