import { Theme } from "@material-ui/core";
import { darkTheme } from "./dark";
import { lightTheme } from "./light";


export function getThemeByName(theme: string): Theme {
    return themeMap[theme];
}

const themeMap: { [key: string]: Theme } = {
    darkTheme,
    lightTheme
};