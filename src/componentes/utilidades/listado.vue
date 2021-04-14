<template>
  <v-app style="margin-top:80px;">
    <v-container style="margin-top:-35px;"  v-for="item in objeto" :key="item.id">
      <v-layout row v-if="item.modeloNegocioEconomico">
        <!-- <v-layout> -->
          <!-- <v-flex xs12 sm6 offset-sm3>
            <v-card>
              <v-card-media height="80px">
                <v-carousel>
                  <v-carousel-item 
                  v-for="(imagen,i) in imagenes" 
                  :src="item.imageUrl" 
                  :key="i" 
                  style="margin-top: 3px; height: 70px"></v-carousel-item>
                </v-carousel>
              </v-card-media>
            </v-card>
            <v-card class="light-blue lighten-2 white--text" @click="info(item.id)">
            <v-container fluid>
              <v-layout row>
                <v-flex xs5 sm4 md3>
                  <v-card-media
                  :src="item.imageUrl"
                  height="100px"
                  :key="item.id"
                  >
                  </v-card-media>
                </v-flex>
                <v-flex xs7 sm8 md9>
                  <v-card-title primary-title>
                    <div>
                      <strong>{{ item.nombre }}</strong>
                      <div>{{ item.direccion }}</div>
                      <div>{{ item.telefono }}</div>
                    </div>
                  </v-card-title>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
          </v-flex> -->
        <!-- </v-layout> -->
        <!-- <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
          <v-card class="light-blue lighten-2 white--text" @click="info(item.id)">
            <v-container fluid>
              <v-layout row>
                <v-flex xs5 sm4 md3>
                  <v-card-media
                  :src="item.imageUrl"
                  height="100px"
                  :key="item.id"
                  >
                  </v-card-media>
                </v-flex>
                <v-flex xs7 sm8 md9>
                  <v-card-title primary-title>
                    <div>
                      <strong>{{ item.nombre }}</strong>
                      <div>{{ item.direccion }}</div>
                      <div>{{ item.telefono }}</div>
                      <div>{{ item.video }}</div>
                    </div>
                  </v-card-title>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex> -->
      </v-layout>
      <v-layout row v-else>
        <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
          <v-card  @click="info(item.id)">
            <v-container fluid>
              <v-layout row>
                <v-flex xs5 sm4 md3>
                  <v-card-media
                  :src="item.imageUrl"
                  height="100px"
                  :key="item.id"
                  >
                  </v-card-media>
                </v-flex>
                <v-flex xs7 sm8 md9>
                  <v-card-title primary-title>
                    <div>
                      <strong>{{ item.nombre }}</strong>
                      <div>{{ item.direccion }}</div>
                      <div>{{ item.telefono }}</div>
                    </div>
                  </v-card-title>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <infinite-loading @infinite="infiniteHandler" spinner="bubbles">
        <!-- <span slot="no-results"><h4 class="info--text">No más resultados</h4></span>
        <span slot="no-more"><h4 class="info--text">No más datos</h4></span> -->
        <span slot="no-results">
          <v-icon class="light-blue--text text--darken-1">fiber_manual_record</v-icon>
        </span>
    </infinite-loading>
  </v-app>
</template>
<script>
import InfiniteLoading from 'vue-infinite-loading'
export default {

  data() {
    return {
      list: [],
      imagenes: [
        {
          src: 'https://www.google.com.ar/imgres?imgurl=http%3A%2F%2Fwww.getxo.eus%2FImagesPublic%2Fopndata%2Fcomercios1.jpg&imgrefurl=http%3A%2F%2Fwww.getxo.eus%2Fes%2Fgobierno-abierto%2Fopndata%2Fcomercios&docid=Qlk44Shch0PUpM&tbnid=QkQvqeJyvncw6M%3A&vet=10ahUKEwjJz6T7s-fXAhUHC5AKHaEhBE8QMwhDKAAwAA..i&w=1200&h=480&safe=active&bih=653&biw=1366&q=comercios&ved=0ahUKEwjJz6T7s-fXAhUHC5AKHaEhBE8QMwhDKAAwAA&iact=mrc&uact=8'
        },
        {
          src: 'https://www.google.com.ar/imgres?imgurl=https%3A%2F%2Fportaldenoticias.com.ar%2Fwp-content%2Fuploads%2F2016%2F06%2Fcomercio.jpg&imgrefurl=https%3A%2F%2Fportaldenoticias.com.ar%2F2016%2F06%2F03%2Ftarifazo-5-mil-comercios-minoristas-bajaron-la-persiana%2F&docid=IwXlq32GdQnPIM&tbnid=BWOyThCDMemXRM%3A&vet=10ahUKEwjJz6T7s-fXAhUHC5AKHaEhBE8QMwhEKAEwAQ..i&w=1130&h=500&safe=active&bih=653&biw=1366&q=comercios&ved=0ahUKEwjJz6T7s-fXAhUHC5AKHaEhBE8QMwhEKAEwAQ&iact=mrc&uact=8'
        },
        {
          src: 'https://www.google.com.ar/imgres?imgurl=http%3A%2F%2Fwww.mackennainfo.com%2Ffiles%2Fmedium%2F1479052371-COMERCIOS-1-EDIT.jpg&imgrefurl=http%3A%2F%2Fwww.mackennainfo.com%2Fdetalle%2Fnoticia%2F498%2Finspecciones-a-comercios.html&docid=pjZShci5dVVIXM&tbnid=oQmY4nOTxIqP8M%3A&vet=10ahUKEwjJz6T7s-fXAhUHC5AKHaEhBE8QMwhFKAIwAg..i&w=485&h=251&safe=active&bih=653&biw=1366&q=comercios&ved=0ahUKEwjJz6T7s-fXAhUHC5AKHaEhBE8QMwhFKAIwAg&iact=mrc&uact=8'
        },
        {
          src: 'https://www.google.com.ar/imgres?imgurl=https%3A%2F%2Fi0.wp.com%2Fpaginaswebconcordia.com%2Fwp-content%2Fuploads%2F2015%2F12%2F2-COMERCIOS.jpg&imgrefurl=http%3A%2F%2Fpaginaswebconcordia.com%2Fmarketing-de-contenido-para-comercios-locales%2F&docid=cs081Ushq3uvQM&tbnid=vqkdBCkeZAvvuM%3A&vet=10ahUKEwjJz6T7s-fXAhUHC5AKHaEhBE8QMwhJKAYwBg..i&w=1838&h=1000&safe=active&bih=653&biw=1366&q=comercios&ved=0ahUKEwjJz6T7s-fXAhUHC5AKHaEhBE8QMwhJKAYwBg&iact=mrc&uact=8'
        }
      ]
    }
  },

  props: ['objeto', 'rutadetalle', 'palabra_a_buscar'],

  watch: {
    palabra_a_buscar: function (val) {
        console.log('Palabra buscando: ' + val);
    }
  },

  methods:
  {
    info(id)
    {
      this.$router.push(`/${this.rutadetalle}/${id}`)
    },

    infiniteHandler($state) {
      setTimeout(() => {
        const temp = [];
        for (let i = this.list.length + 1; i <= this.list.length + 20; i++) {
          temp.push(i);
        }
        this.list = this.list.concat(temp);
         $state.complete();
      }, 3000);
    }
  },

  components: {
    InfiniteLoading,
  }
}
</script>
