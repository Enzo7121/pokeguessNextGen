import {extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
    styles:{
        global: {
            fontFamily: 'Press Start 2P',
            body: {
                background: "url('https://i.pinimg.com/originals/ca/e0/1a/cae01ab5cce960db0d7819cc96e97ce8.png')",
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                overflow: 'hidden'
            }
        }
    },
    fonts: {
        heading: 'Press Start 2P',
        body: 'Press Start 2P'
    }
})

export default theme