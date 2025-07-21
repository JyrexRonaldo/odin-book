import io from 'socket.io-client'
const socket = io.connect(`${import.meta.env.VITE_HOME_DOMAIN}`)

export default socket