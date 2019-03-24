import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import Switch from "react-switch";
import { setTheme as setThemeAction } from "src/actions";
import { Hooks } from "src/modules";
import { ITheme, themes } from "src/modules/CSS";

const { useMapDispatch, useMapState } = Hooks;

const { light, dark } = themes;

export default () => {
    const { theme } = useMapState(({ theme }) => ({ theme }));
    const { setTheme } = useMapDispatch((dispatch) => ({
        setTheme: (theme: ITheme) => dispatch(setThemeAction(theme)),
    }));
    const [themeSwitch, setThemeSwitch] = React.useState(theme.name == "light");
    const handleThemeChange = (checked: boolean) => {
        setThemeSwitch(checked);
        if (setTheme) {
            setTheme(checked ? light : dark);
        }
    };

    return (
        <div style={{ display: "inline-block" }}>
            <Switch
                activeBoxShadow={theme.colors.defaultText}
                ariaLabelledby={`Switch to ${
                    theme.name == "light" ? theme.name : "dark"
                } theme`}
                checked={themeSwitch}
                onChange={handleThemeChange}
                handleDiameter={15}
                onColor={theme.colors.themeSwitchOn}
                offColor={theme.colors.themeSwitchOff}
                onHandleColor={theme.colors.defaultText}
                offHandleColor={theme.colors.defaultText}
                checkedIcon={
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                            fontSize: 15,
                            color: theme.colors.defaultText,
                            paddingRight: 2,
                        }}
                        children={<FontAwesomeIcon icon="sun" />}
                    />
                }
                uncheckedIcon={
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                            fontSize: 15,
                            color: theme.colors.defaultText,
                            paddingRight: 2,
                        }}
                        children={<FontAwesomeIcon icon="moon" />}
                    />
                }
            />
        </div>
    );
};
