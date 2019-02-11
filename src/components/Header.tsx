import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { CSS } from "../modules";
import { ITheme } from "../modules/CSS/themes";
import { IStoreState } from "../store/config";

const { fonts } = CSS.fonts;

export interface IHeaderProps {
    theme: ITheme;
    className?: string;
}

const Component = ({ className }: IHeaderProps) => (
    <div className={className}>HEADER</div>
);

const StyledComponent = styled(Component)`
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    background: transparent;
    text-align: center;
    font-family: '${fonts.oswald.family}';
`;

const mapStateToProps = ({ theme }: IStoreState): IHeaderProps => ({
    theme,
});

export default connect(mapStateToProps)(StyledComponent);
