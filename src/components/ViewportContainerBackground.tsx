import React from "react";
import { BREAKPOINTS } from "src/config";
import styled from "styled-components";

interface IViewportContainerProps
    extends React.HTMLAttributes<HTMLDivElement> {}

const Container = styled.div`
    @media (max-width: ${BREAKPOINTS.mdpx}) {
        & > div {
            background-attachment: scroll !important;
            background-size: cover !important;
        }
    }
`;

export default (props: IViewportContainerProps) => (
    <Container>
        <div
            {...props}
            style={{
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                backgroundSize: "cover",
                backgroundAttachment: "fixed",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                ...props.style,
            }}
        />
    </Container>
);
