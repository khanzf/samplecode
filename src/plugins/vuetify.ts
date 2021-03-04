import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import '@/assets/css/main.css';

Vue.use(Vuetify);
const darkTheme = localStorage.getItem('theme') === 'dark';
export default new Vuetify({
  theme: {
    dark: darkTheme,
    themes: {
      dark: {
        primary: '#1976D2',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
      },
      light: {
        primary: '#1976D2',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
      },
    },
    options: {customProperties: true},
  },
});
