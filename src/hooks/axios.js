import Axios from 'axios'

const axios = Axios.create({
    baseURL: "https://guillermo.informaticamajada.es",
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    },
    withCredentials: true,
    withXSRFToken: true
})

export default axios