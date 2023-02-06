<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-icon size="48" color="darkgrey">
          mdi-movie
        </v-icon>
        <div class="text-h4 pl-12">
          Первая проба пера
        </div>
      </div>
    </v-app-bar>

    <v-main>
      <MainPage/>
    </v-main>
  </v-app>
</template>

<script>

import MainPage from "@/components/MainPage";

export default {
  name: 'App',

  components: {
    MainPage
  },

  data: () => ({
    //
  }),
};
</script>
