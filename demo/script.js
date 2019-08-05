import VaahCms from './../dist/vaahcms-vue-helpers.min.js'

Vue.use(VaahCms);

const app = new Vue({
    el: '#app',

    data: {
        assets: null,
        new_item: {
            name: null,
            email: null
        }
    },

    mounted() {

    },
    methods:{

        //-----------------------------------------------------------
        getHelper: function () {
            this.$vaahcms.console('test');
            console.log('test');
        },
        //-----------------------------------------------------------



        //-----------------------------------------------------------
        //-----------------------------------------------------------
    }
});