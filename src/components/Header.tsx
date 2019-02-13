import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { NavLink } from "react-router-dom";
import { CSS } from "../modules";
import { ITheme } from "../modules/CSS/themes";
import { routes } from "../routers/AppRouter";
import { IStoreState } from "../store/config";

const { fonts } = CSS.fonts;

export interface IHeaderProps {
    theme: ITheme;
    className?: string;
}

const RouteLink = styled.div`
    font-size: 1.3rem;
    color: ${({ theme }: IHeaderProps) => theme.colors.headerLink};
    transition: all 0.2s linear;
    border-width: 0.15em;
    border-top-style: solid;
    border-top-color: transparent;
    padding: 0.5em 0.2em;
    &:hover {
        border-top-color: ${({ theme }: IHeaderProps) =>
            theme.colors.headerLink};
    }
`;

const Component = ({ className, theme }: IHeaderProps) => (
    <div
        className={className}
        style={{
            display: "grid",
            gridTemplateColumns: "1fr 3fr 1fr",
        }}
    >
        <div
            style={{
                gridColumnStart: 2,
                textAlign: "center",
            }}
        >
            {_.map(
                routes,
                ({ name, path, hidden }) =>
                    !hidden && (
                        <NavLink
                            to={path}
                            key={name}
                            style={{
                                display: "inline-block",
                                textDecoration: "none",
                                margin: "0 1.2em",
                                fontWeight: 100,
                            }}
                            activeStyle={{
                                fontWeight: 900,
                            }}
                            exact
                        >
                            <RouteLink theme={theme}>
                                {name.toUpperCase()}
                            </RouteLink>
                        </NavLink>
                    ),
            )}
        </div>
    </div>
);

const StyledComponent = styled(Component)`
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    background: transparent;
    font-family: '${fonts.oswald.family}';
`;

const mapStateToProps = ({ theme }: IStoreState): IHeaderProps => ({
    theme,
});

export default connect(mapStateToProps)(StyledComponent);
