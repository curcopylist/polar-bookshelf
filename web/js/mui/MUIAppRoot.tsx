import createPersistedState from "use-persisted-state";
import {MUIThemeTypeContext, ThemeType} from "./context/MUIThemeTypeContext";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import {GlobalCss} from "../../spectron0/material-ui/GlobalCss";
import * as React from "react";
import {AccountContextSubscriber} from "../accounts/AccountSnapshotContext";

interface IProps {
    readonly children: JSX.Element;
}

export const MUIAppRoot = (props: IProps) => {

    const usePersistedTheme = createPersistedState('count');
    const [theme, setTheme] = usePersistedTheme<ThemeType>("dark");

    const muiTheme = createMuiTheme({
        // FIXME on mobile we use 16px ...
        typography: {
            htmlFontSize: 12,
            fontSize: 12
        },
        palette: {
            type: theme
        }
    });

    // FIXME: some of these operations are SLOW... doing them in parallel would
    // be MUCH MUCH better and maybe the code would be cleaner?
    return (

        <MuiThemeProvider theme={muiTheme}>
            <MUIThemeTypeContext.Provider value={{theme, setTheme}}>
                <AccountContextSubscriber>
                    <>
                        <CssBaseline/>
                        <GlobalCss/>

                        {props.children}

                    </>
                </AccountContextSubscriber>

            </MUIThemeTypeContext.Provider>
        </MuiThemeProvider>
    );

};
