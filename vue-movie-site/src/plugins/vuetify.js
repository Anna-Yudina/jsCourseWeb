 import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
 import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: colors.purple.darken1,
                secondary: colors.purple.lighten4,
                darkgrey: colors.grey.darken3,
                lightgrey: colors.grey.lighten1,
                error: colors.pink.darken3,
            },
        },
    },
});
