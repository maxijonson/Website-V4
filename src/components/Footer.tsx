import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { connect, MapStateToPropsParam } from "react-redux";
import { THEME_TRANSITION_TIME } from "src/config/config";
import styled from "styled-components";
import { fonts } from "../modules/CSS";
import { ITheme } from "../modules/CSS/themes";

interface IFooterOwnProps {
    className?: string;
}

interface IFooterStateProps {
    readonly theme: ITheme;
}

type IFooterProps = IFooterStateProps & IFooterOwnProps;

const mapStateToProps: MapStateToPropsParam<IFooterStateProps, void, IStoreState> = ({ theme }: IStoreState): IFooterStateProps => ({
    theme,
});

export default connect(mapStateToProps)(
    styled(({ className }: IFooterProps) => (
        <footer className={className}>
            Copyright <FontAwesomeIcon icon={["far", "copyright"]} /> {new Date().getFullYear()} MaxiJonson. All rights reserved.
        </footer>
    ))`
        color: ${({ theme }: IFooterProps) => theme.colors.defaultText};
        font-size: 1.2rem;
        text-align: center;
        transition: all ${THEME_TRANSITION_TIME}s;
        background-color: ${({ theme }: IFooterProps) => theme.colors.pageBackground};
        font-family: ${fonts.oswald.family};
        width: 100%;
    `,
);
