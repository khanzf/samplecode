import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import '@/assets/css/main.css';

Vue.use(Vuetify);
const darkTheme = localStorage.getItem('theme') === 'dark';
export default new Vuetify({
  theme: {
    dark: darkTheme,
    themes: {
      light: {
        primary: '#3f51b5',
        secondary: '#b0bec5',
        anchor: '#8c9eff',
      },
    },
  },
});
