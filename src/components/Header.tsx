import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";
import React, { FunctionComponent } from "react";
import { connect, MapStateToPropsParam } from "react-redux";
import { NavLink } from "react-router-dom";
import Switch from "react-switch";
import { Dispatch } from "redux";
import styled from "styled-components";

import { themes } from "../../src/modules/CSS";
import { setTheme } from "../actions";
import { CSS } from "../modules";
import { ITheme } from "../modules/CSS/themes";
import { routes } from "../routers/routes";
import { IStoreState } from "../store/config";

const { fonts } = CSS.fonts;
const { light, dark } = themes.themes;

export interface IHeaderOwnProps {
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
    transition: all 0.2s linear;
    border-width: 0.15em;
    border-top-style: solid;
    border-top-color: transparent;
    padding: 0.2em 0.4em;
    &:hover {
        border-top-color: ${({ theme }: IStateProps) =>
            theme.colors.defaultText};
    }
`;

const Component: FunctionComponent<HeaderProps> = ({
    className,
    theme,
    setTheme,
}) => {
    const [checked, setChecked] = React.useState(theme.name == "light");

    const handleThemeChange = (checked: boolean) => {
        setChecked(checked);
        if (setTheme) {
            setTheme(checked ? light : dark);
        }
    };

    return (
        <div
            className={className}
            style={{
                display: "grid",
                gridTemplateColumns: "1fr 3fr 1fr",
            }}
        >
            <div
                style={{
                    gridColumnStart: 1,
                    marginTop: "2%",
                    marginLeft: "5%",
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
                    ({ name, path, hidden, exact }) =>
                        !hidden && (
                            <NavLink
                                to={path}
                                key={name}
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
                                    {name.toUpperCase()}
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
                <Switch
                    activeBoxShadow={theme.colors.defaultText}
                    ariaLabelledby={`Switch to ${
                        theme.name == "light" ? theme.name : "dark"
                    } theme`}
                    checked={checked}
                    onChange={handleThemeChange}
                    handleDiameter={15}
                    onColor={theme.colors.themeSwitchOn}
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
    );
};

const StyledComponent = styled(Component)`
    width: 100vw;
    height: 7vh;
    top: 0;
    left: 0;
    background: transparent;
    font-family: '${fonts.oswald.family}';
    font-size: 2rem;
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
)(StyledComponent);
