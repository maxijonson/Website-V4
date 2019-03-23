import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { connect } from "react-redux";
import Switch from "react-switch";
import { Dispatch } from "redux";
import { setTheme } from "src/actions";
import { ITheme, themes } from "src/modules/CSS";

interface IThemeSwitchStateProps {
    readonly theme: ITheme;
}

interface IThemeSwitchDispatchProps {
    readonly setTheme?: (theme: ITheme) => void;
}

type IThemeSwitchProps = IThemeSwitchStateProps & IThemeSwitchDispatchProps;

const { light, dark } = themes;

const mapStateToProps = (state: IStoreState): IThemeSwitchStateProps => ({
    theme: state.theme,
});

const mapDispatchToProps = (
    dispatch: Dispatch<any>,
): IThemeSwitchDispatchProps => ({
    setTheme: (theme: ITheme) => dispatch(setTheme(theme)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(({ theme, setTheme }: IThemeSwitchProps) => {
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
});
