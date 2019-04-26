import axios from 'axios'
import jwt_decode from 'jwt-decode'
import setAuthToken from '../../utils/setAuthToken'

export const loginBridge = (userId) => {

    return (
        axios.get('/api/users/login/' + userId)
            .then(res => {
                const { token } = res.data

                // Save to localStorage
                localStorage.setItem('jwtToken', token)

                // Set token to auth header
                setAuthToken(token)

                // Decode token to get user data
                const decoded = jwt_decode(token)

                // Set current user
                return decoded
            }).catch(err => {
                return err
            })
    )
}

export const logoutUser = () => {

    // Remove token from localStorage
    localStorage.removeItem('jwtToken')

    // Remove auth header for future requests
    setAuthToken(false)
}
