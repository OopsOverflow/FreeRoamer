import {extendTheme} from "@chakra-ui/react";


const theme = extendTheme({
    config: {
        useSystemColorMode: true,
    },
    styles: {
        global: (props: any) => ({
            '*': {
                bg: 'none',
                _selection: {
                    color: props.colorMode === `dark` ? `black` : `white`,
                    bg: props.colorMode === `dark` ? `white` : `black`,
                },
            },
        }),
    },
    colors: {
        brand: {

        },
    },
});

export default theme;
