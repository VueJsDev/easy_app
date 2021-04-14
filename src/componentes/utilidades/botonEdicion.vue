<template>
	<div  class="flotante">
    <v-card-text>
      <v-fab-transition>
        <v-btn
          class="info"
          dark
          absolute
          top
          right
          fab
        >
          <v-icon>create</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-card-text>
  </div>
</template>

<style>
  .flotante {
    display:scroll;
    position:fixed;
    bottom:30px;
    right:0px;
    left: 0px;
  }
</style>