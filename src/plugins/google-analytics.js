import Vue from 'vue';
import VueGtag from 'vue-gtag';

const gtag = process.env.VUE_APP_GOOGLE_ANALYTICS_ID;

if (gtag) {
    Vue.use(VueGtag, {
        config: { 
            id: gtag,
            params: {
                send_page_view: true
            }
         },
    });
}