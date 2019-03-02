import React from "react";
import styled from "styled-components";

interface IDebugOwnProps {
    className?: string;
}

type IDebugProps = IDebugOwnProps;

const Debug = ({ className }: IDebugProps) => <div className={className} />;

const StyledDebug = styled(Debug)`
    background: red;
    width: 100vw;
    height: 5vh;
    position: fixed;
    bottom: 0;
    left: 0;
`;

export default () => <StyledDebug />;
