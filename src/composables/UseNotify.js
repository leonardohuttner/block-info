import { useQuasar } from 'quasar'

export default function useNotify() {
    const $q = useQuasar()

    const notifySuccess = (message, caption, timeout) => {
        $q.notify({
            type: 'positive',
            position: 'top-right',
            message: message || 'Sucess!',
            caption: caption,
            timeout: timeout || 3000
        })
    }

    const notifyNegative = (message, caption, timeout) => {
        $q.notify({
            type: 'negative',
            position: 'top-right',
            message: message || 'Error!',
            caption: caption,
            timeout: timeout || 3000
        })
    }

    const notifyWarning = (message, caption, timeout) => {
        $q.notify({
            type: 'warning',
            position: 'top-right',
            message: message || 'Alert!',
            caption: caption ? caption : '',
            timeout: timeout || 3000
        })
    }

    return {
        notifySuccess,
        notifyNegative,
        notifyWarning
    }
}
