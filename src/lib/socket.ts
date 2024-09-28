import { io } from 'socket.io-client'

export const socket = io('http://10.250.192.128:8000')
// export const socket = new WebSocket('ws://10.250.192.128:8000')
// export const socketUrl = 'ws://10.250.192.128:8000'
