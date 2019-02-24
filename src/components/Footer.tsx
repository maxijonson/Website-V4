import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { connect, MapStateToPropsParam } from "react-redux";
import styled from "styled-components";
import { fonts } from "../modules/CSS";
import { ITheme } from "../modules/CSS/themes";
import { IStoreState } from "../store/config";

interface IFooterOwnProps {
    className?: string;
}

interface IStateProps {
    readonly theme: ITheme;
}

type FooterProps = IStateProps & IFooterOwnProps;

const Component = ({ className }: FooterProps) => (
    <footer className={className}>
        Copyright <FontAwesomeIcon icon={["far", "copyright"]} />{" "}
        {new Date().getFullYear()} MaxiJonson. All rights reserved.
    </footer>
);

const StyledComponent = styled(Component)`
    color: ${({ theme }: FooterProps) => theme.colors.defaultText};
    font-size: 1.2rem;
    text-align: center;
    transition: all 0.2s linear;
    background-color: ${({ theme }: FooterProps) =>
        theme.colors.pageBackground};
    font-family: ${fonts.fonts.oswald.family};
    width: 100%;
`;

const mapStateToProps: MapStateToPropsParam<IStateProps, void, IStoreState> = ({
    theme,
}: IStoreState): IStateProps => ({
    theme,
});

export default connect(mapStateToProps)(StyledComponent);
