import { createMuiTheme } from "@material-ui/core";

export const darkTheme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            main: "#000",
            dark: "#123",
            contrastText: "yellow"
        },
        secondary: {
            main: "#456"
        }
    }
});