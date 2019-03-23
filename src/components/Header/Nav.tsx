import * as React from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { THEME_TRANSITION_TIME } from "src/config";
import { ITheme } from "src/modules/CSS";
import styled from "styled-components";
import tinycolor from "tinycolor2";

interface INavStyledProps {
    className?: string;
}

interface INavState {
    readonly theme: ITheme;
}

interface INavOwnProps {
    key: string;
    name: string;
    path: string;
    exact?: boolean;
    Icon: () => JSX.Element;
    onPathChange?: () => void;
}

type INavProps = INavState & INavOwnProps & INavStyledProps;

const mapStateToProps = ({ theme }: IStoreState): INavState => ({
    theme,
});

// TODO: Put somewhere else
const useForceUpdate = () => {
    const [, forceUpdate] = React.useReducer((x) => x + 1, 0);
    return () => forceUpdate({});
};

export default connect(mapStateToProps)(
    styled(
        ({
            className,
            path,
            key,
            exact,
            name,
            Icon,
            theme,
            onPathChange,
        }: INavProps) => {
            const { t } = useTranslation();
            const forceUpdate = useForceUpdate();
            const handleClick = () => {
                if (onPathChange) {
                    onPathChange();
                }
                forceUpdate();
            };
            return (
                <NavLink
                    to={path}
                    key={key}
                    exact={exact}
                    onClick={handleClick}
                    activeClassName="nav--active"
                    activeStyle={{
                        borderRadius: "0 3rem 3rem 0",
                        background: (() => {
                            const color = tinycolor(theme.colors.card).setAlpha(
                                0.25,
                            );
                            theme.name == "light"
                                ? color.darken(50)
                                : color.lighten(50);
                            return color.toRgbString();
                        })(),
                    }}
                    className={className}
                >
                    <div style={{ textAlign: "center" }}>
                        <Icon />
                    </div>
                    <div>{t(name).toUpperCase()}</div>
                </NavLink>
            );
        },
    )`
        transition: all ${THEME_TRANSITION_TIME}s;
        width: 100%;
        display: grid;
        grid-template-columns: 2fr 8fr;
        font-weight: 100;
        color: ${({ theme }: INavProps) => theme.colors.defaultText};
        font-size: 3rem;
        padding: 3% 0 3% 2%;
        border-radius: none;
        &:hover:not(.nav--active) {
            padding-left: 5%;
            border-radius: 0 3rem 3rem 0;
            background: ${({ theme }: INavProps) => {
                const color = tinycolor(theme.colors.card).setAlpha(0.4);
                theme.name == "light" ? color.darken(15) : color.lighten();
                return color.toRgbString();
            }};
        }
    `,
);
