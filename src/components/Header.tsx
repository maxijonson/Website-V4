import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";
import React, { FunctionComponent } from "react";
import { connect, MapStateToPropsParam } from "react-redux";
import { NavLink } from "react-router-dom";
import Switch from "react-switch";
import { Dispatch } from "redux";
import styled from "styled-components";

import { THEME_TRANSITION_TIME } from "src/config/config";
import { themes } from "src/modules/CSS";
import i18n, { t } from "src/modules/i18n/i18n";
import { setTheme } from "../actions";
import { CSS } from "../modules";
import { ITheme } from "../modules/CSS/themes";
import { routes } from "../routers/routes";

const { fonts } = CSS;
const { light, dark } = themes;

interface IHeaderOwnProps {
    className?: string;
}

interface IStateProps {
    readonly theme: ITheme;
}

interface IDispatchProps {
    readonly setTheme?: (theme: ITheme) => void;
}

type HeaderProps = IHeaderOwnProps & IStateProps & IDispatchProps;

const RouteLink = styled.div`
    display: inline-block;
    color: ${({ theme }: IStateProps) => theme.colors.defaultText};
    transition: all ${THEME_TRANSITION_TIME}s;
    border-width: 0.15em;
    border-top-style: solid;
    border-top-color: transparent;
    padding: 0.2em 0.4em;
    &:hover {
        border-top-color: ${({ theme }: IStateProps) =>
            theme.colors.defaultText};
    }
`;

const Header: FunctionComponent<HeaderProps> = ({
    className,
    theme,
    setTheme,
}) => {
    const [checked, setChecked] = React.useState(theme.name == "light");
    const [language, setLanguage] = React.useState(i18n.language);

    const handleThemeChange = (checked: boolean) => {
        setChecked(checked);
        if (setTheme) {
            setTheme(checked ? light : dark);
        }
    };

    const handleLangChange = (checked: boolean) => {
        i18n.changeLanguage(checked ? "en" : "fr");
        setLanguage(checked ? "en" : "fr");
    };

    return (
        <div
            className={className}
            style={{
                display: "grid",
                gridTemplateColumns: "20% 60% 20%",
            }}
        >
            <div
                style={{
                    gridColumnStart: 1,
                    paddingTop: "2%",
                    paddingLeft: "5%",
                }}
            >
                <NavLink
                    to="/"
                    children={
                        <img
                            style={{ maxWidth: "100%", maxHeight: "60%" }}
                            src="/assets/images/logo.png"
                        />
                    }
                />
            </div>
            <div
                style={{
                    gridColumnStart: 2,
                    textAlign: "center",
                }}
            >
                {_.map(
                    routes,
                    ({ key, name, path, hidden, exact }) =>
                        !hidden && (
                            <NavLink
                                to={path}
                                key={key}
                                style={{
                                    display: "inline-block",
                                    textDecoration: "none",
                                    margin: "0 3%",
                                    fontWeight: 100,
                                }}
                                activeStyle={{
                                    fontWeight: "bolder",
                                }}
                                exact={exact}
                            >
                                <RouteLink theme={theme}>
                                    {name().toUpperCase()}
                                </RouteLink>
                            </NavLink>
                        ),
                )}
            </div>
            <div
                style={{
                    gridColumnStart: 3,
                    textAlign: "right",
                    paddingTop: "2%",
                    paddingRight: "5%",
                }}
            >
                <div style={{ display: "inline-block", margin: "0 3%" }}>
                    <Switch
                        activeBoxShadow={theme.colors.defaultText}
                        ariaLabelledby={t("header.changeLang")}
                        checked={language == "en"}
                        onChange={handleLangChange}
                        handleDiameter={15}
                        offColor={
                            theme.name == "light"
                                ? theme.colors.themeSwitchOn
                                : theme.colors.themeSwitchOff
                        }
                        onColor={
                            theme.name == "light"
                                ? theme.colors.themeSwitchOn
                                : theme.colors.themeSwitchOff
                        }
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
                                children={"EN"}
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
                                children={"FR"}
                            />
                        }
                    />
                </div>
                <div style={{ display: "inline-block", margin: "0 3%" }}>
                    <Switch
                        activeBoxShadow={theme.colors.defaultText}
                        ariaLabelledby={`Switch to ${
                            theme.name == "light" ? theme.name : "dark"
                        } theme`}
                        checked={checked}
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
            </div>
        </div>
    );
};

const StyledHeader = styled(Header)`
    height: 5vh;
    top: 0;
    left: 0;
    width: 100vw;
    background: transparent;
    position: fixed;
    font-family: '${fonts.oswald.family}';
    font-size: 2rem;
    z-index: 10;
`;

const mapStateToProps: MapStateToPropsParam<
    IStateProps,
    IHeaderOwnProps,
    IStoreState
> = ({ theme }: IStoreState): IStateProps => ({
    theme,
});

const mapDispatchToProps = (dispatch: Dispatch<any>): IDispatchProps => ({
    setTheme: (theme: ITheme) => dispatch(setTheme(theme)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(StyledHeader);
