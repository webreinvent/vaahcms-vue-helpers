import VaahCms from './../dist/vaahcms-vue-helpers.esm.js'

Vue.use(VaahCms);

const app = new Vue({
    el: '#app',

    data: {
        assets: null,
    },

    mounted() {

    },
    methods:{

        //-----------------------------------------------------------
        getHelper: function () {
            this.$vaahcms.checkConsole();
            console.log('test');
        },
        //---------------------------------------------------------------------

        //-----------------------------------------------------------
        //-----------------------------------------------------------
    }
});