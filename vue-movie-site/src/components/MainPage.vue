<template>
  <v-container>
    <v-row>
      <v-col lg="6" offset-lg="2">
        <v-stepper v-model="el">
          <v-stepper-header>
            <v-stepper-step :complete="el > 1" step="1">
              Первый шаг
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="el > 2" step="2">
              Второй шаг
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="3">
              Третий шаг
            </v-stepper-step>
          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content step="1">
              <v-card class="mb-12" color="deep-purple lighten-5">
                <v-form class="ma-5" ref="stationForm">
                  <br>
                  <v-autocomplete
                      v-model="station"
                      :items="stations"
                      outlined
                      dense
                      rounded
                      label="Выберите станцию"
                      :rules="stationRules"
                  ></v-autocomplete>
                  <v-row class="ma-4">
                    <v-col>
                      <v-text-field
                          outlined
                          rounded
                          dense
                          label="Старт"
                          prepend-icon="mdi-calendar"
                          readonly
                          @click="dateDialog = true"
                          :value="dates[0]"
                          :rules="dateRules"
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field
                          outlined
                          rounded
                          dense
                          label="Финиш"
                          prepend-icon="mdi-calendar"
                          readonly
                          @click="dateDialog = true"
                          :value="dates[1]"
                          :rules="dateRules"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-dialog v-model="dateDialog" width="400">
                    <v-date-picker
                        color="deep-purple"
                        v-model="dates"
                        range
                    ></v-date-picker>
                    <v-btn @click="dateDialog = false">Ок</v-btn>
                  </v-dialog>
                  <v-btn color="deep-purple" class="white--text" block rounded @click="search">
                    Поиск полетов
                  </v-btn>
                </v-form>
              </v-card>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-card class="mt-12" color="deep-purple lighten-5">
                <v-list>
                  <v-virtual-scroll :items="flightsList" height="500" item-height="80px">
                    <template v-slot:default="{ item }">
                      <v-list-item two-line :key="item.id" @click="flightId = item.id">
                        <v-list-item-avatar>
                          <v-img :src="item.image"></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title>{{ item.title }}</v-list-item-title>
                          <v-list-item-subtitle>{{ item.dates[0] }} - {{ item.dates[1] }}</v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action v-if="item.id === flightId">
                          <v-icon color="green">mdi-check-bold</v-icon>
                        </v-list-item-action>
                      </v-list-item>
                    </template>
                  </v-virtual-scroll>
                </v-list>
              </v-card>
              <v-row>
                <v-col>
                  <v-btn text rounded block outlined @click="el = 1">
                    Отменить
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn color="primary" @click="el = 3" rounded block :disabled="flightId === null">
                    Продолжить
                  </v-btn>
                </v-col>
              </v-row>


            </v-stepper-content>

            <v-stepper-content step="3">
              <v-card class="mb-12" color="grey lighten-1" v-if="selectedFlight">
                <v-img :src="selectedFlight.image">
                  <v-card-title>{{selectedFlight.title}}</v-card-title>
                </v-img>
                <v-card-text>
                  <div class="text-subtitle-1">
                    {{selectedFlight.dates[0]}} - {{selectedFlight.dates[1]}}
                  </div>
                </v-card-text>
              </v-card>

              <v-btn color="primary" @click="el = 1">
                Продолжить
              </v-btn>
              <v-btn text>
                Отменить
              </v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {fakeList} from "@/helpers/fakeData"

export default {
  name: "MainPage",

  data() {
    return {
      el: 1,
      dateDialog: false,
      stations: ['Марс', 'Луна'],
      station: '',
      dates: [],
      stationRules: [(v) => !!v || 'Поле обязательное'],
      dateRules: [(v) => !!v || 'Поле обязательное'],
      flightId: null
    };
  },

  methods: {
    search() {
      const isValid = this.$refs["stationForm"].validate();
      console.log(isValid)
      console.log(this.station)
      if (!isValid) {
        return;
      }
      this.el = 2;
    },
  },

  computed: {
    flightsList() {
      return fakeList(['2021-01-01', '2021-01-02'], 1000)
    },
    selectedFlight() {
      return this.flightsList[this.flightId]
    }
  }
};
</script>

<style scoped>
</style>