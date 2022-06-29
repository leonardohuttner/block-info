export default {
    methods:{
        loading({message}){
            $q.loading.show({
                message,
                spinner: '',
                spinnerColor: 'yellow',
                spinnerSize: 140,
                backgroundColor: 'white',
                messageColor: 'black'
            })
        },
    }
}