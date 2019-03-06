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

interface IStateProps {
    readonly theme: ITheme;
}

type FooterProps = IStateProps & IFooterOwnProps;

const mapStateToProps: MapStateToPropsParam<IStateProps, void, IStoreState> = ({
    theme,
}: IStoreState): IStateProps => ({
    theme,
});

export default connect(mapStateToProps)(
    styled(({ className }: FooterProps) => (
        <footer className={className}>
            Copyright <FontAwesomeIcon icon={["far", "copyright"]} />{" "}
            {new Date().getFullYear()} MaxiJonson. All rights reserved.
        </footer>
    ))`
        color: ${({ theme }: FooterProps) => theme.colors.defaultText};
        font-size: 1.2rem;
        text-align: center;
        transition: all ${THEME_TRANSITION_TIME}s;
        background-color: ${({ theme }: FooterProps) =>
            theme.colors.pageBackground};
        font-family: ${fonts.oswald.family};
        width: 100%;
    `,
);
