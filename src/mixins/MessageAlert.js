export default {
    methods:{
        succesMessage({message, title,duration}){
            this.$q.notify({
                color:'green',
                message: title,
                caption: message,
                timeout: duration,
                position:'top-right',
                progress: true
            })
        },

        warningMessage({message, title,duration}){
            this.$q.notify({
                color:'primary',
                message: title,
                caption: message,
                timeout: duration,
                position:'top-right',
                progress: true
            })
        },

        errorMessage({message, title,duration}){
            this.$q.notify({
                color:'red',
                message: title,
                caption: message,
                timeout: duration,
                position:'top-right',
                progress: true
            })
        },
    }
}