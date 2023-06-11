import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
    direction: "rtl",
    fonts: {
        heading: `iran-yekan-bold`,
        body: `iran-yekan-regular`,
    },
    colors: {
        brand: {
            100: "#3182ce"
        }
    },
})

export default theme