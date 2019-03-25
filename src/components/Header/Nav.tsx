import * as React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { THEME_TRANSITION_TIME } from "src/config";
import { Hooks } from "src/modules";
import styled from "styled-components";
import tinycolor from "tinycolor2";

const { useForceUpdate, useMapState } = Hooks;

interface INavProps {
    name: string;
    path: string;
    exact?: boolean;
    Icon: () => JSX.Element;
    onPathChange?: () => void;
}

export default ({ path, exact, name, Icon, onPathChange }: INavProps) => {
    const { theme } = useMapState(({ theme }) => ({ theme }));
    const { t } = useTranslation();
    const forceUpdate = useForceUpdate();

    const handleClick = () => {
        if (onPathChange) {
            onPathChange();
        }
        forceUpdate();
    };

    const Nav = React.useMemo(
        () => styled(NavLink)`
            transition: all ${THEME_TRANSITION_TIME}s;
            width: 100%;
            display: grid;
            grid-template-columns: 2fr 8fr;
            font-weight: 100;
            color: ${theme.colors.defaultText};
            font-size: 3rem;
            padding: 3% 0 3% 2%;
            border-radius: none;
            &:hover:not(.nav--active) {
                padding-left: 5%;
                border-radius: 0 3rem 3rem 0;
                background: ${() => {
                    const color = tinycolor(theme.colors.card).setAlpha(0.4);
                    theme.name == "light" ? color.darken(15) : color.lighten();
                    return color.toRgbString();
                }};
            }
        `,
        [],
    );
    return (
        <Nav
            to={path}
            exact={exact}
            onClick={handleClick}
            activeClassName="nav--active"
            activeStyle={{
                borderRadius: "0 3rem 3rem 0",
                background: (() => {
                    const color = tinycolor(theme.colors.card).setAlpha(0.25);
                    theme.name == "light"
                        ? color.darken(50)
                        : color.lighten(50);
                    return color.toRgbString();
                })(),
            }}
        >
            <div style={{ textAlign: "center" }}>
                <Icon />
            </div>
            <div>{t(name).toUpperCase()}</div>
        </Nav>
    );
};
