import React from "react";
import styled from "styled-components";

const Debug = () => <div />;

const StyledDebug = styled(Debug)`
    background: red;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
`;

export default () => <StyledDebug />;
