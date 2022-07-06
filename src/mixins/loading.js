export default {
  data(){
    return {

    }
  },
  mouted(){
    console.log('teste')
  },
  methods: {
    loadingShow() {
      this.$q.loading.show();
    },
    loadingHide(){
      this.$q.loading.hide()
    }
  }
}
