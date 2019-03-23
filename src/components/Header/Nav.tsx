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
}

type INavProps = INavState & INavOwnProps & INavStyledProps;

const mapStateToProps = ({ theme }: IStoreState): INavState => ({
    theme,
});

export default connect(mapStateToProps)(
    styled(({ className, path, key, exact, name, Icon }: INavProps) => {
        const { t } = useTranslation();

        return (
            <NavLink to={path} key={key} exact={exact} className={className}>
                <div style={{ textAlign: "center" }}>
                    <Icon />
                </div>
                <div>{t(name).toUpperCase()}</div>
            </NavLink>
        );
    })`
        transition: all ${THEME_TRANSITION_TIME}s;
        width: 100%;
        display: grid;
        grid-template-columns: 2fr 8fr;
        font-weight: 100;
        color: ${({ theme }: INavProps) => theme.colors.defaultText};
        font-size: 3rem;
        padding: 3% 0 3% 2%;
        &:hover {
            background: ${({ theme }: INavProps) =>
                tinycolor(theme.colors.card)
                    .darken(5)
                    .toHexString()};
        }
    `,
);
