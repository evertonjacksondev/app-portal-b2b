import axios from "axios"
export default {

    async authLogin(email, password, geolocation) {

        try {
            if (!email && !password) throw 'Email e senha Obrigatório!s'

            const { data } = await axios({
                method: 'post',
                timeout: '30000',
                url: 'http://localhost:5005/auth/login',
                data: {
                    email,
                    password,
                    geolocation,
                }
            })



            return data

        } catch ({ response }) {
            throw response
        }
    },

    async authLoginOTP(email, password, code, token) {

        try {
            if (!code) throw 'Código de validação obrigatório'
         
            const { data } = await axios({
                method: 'post',
                timeout: '30000',
                url: 'http://localhost:5005/auth/verify',
                data: {
                    email,
                    password,
                    code,
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            return data

        } catch ({ response }) {
            throw response
        }
    },

    async signup(email, password, name) {

        try {
            if (email && password && name) throw 'Email, senha e nome Obrigatório!'

            const partners = await axios({
                method: 'post',
                timeout: '30000',
                url: 'http://localhost:5005/auth/signup',
                data: {
                    email,
                    password
                }
            })
            return partners.data

        } catch (error) {
            return error
        }
    }

}

