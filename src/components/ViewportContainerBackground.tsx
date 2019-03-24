import React from "react";
import { BREAKPOINTS } from "src/config";
import styled from "styled-components";

interface IViewportContainerProps
    extends React.HTMLAttributes<HTMLDivElement> {}

export default (props: IViewportContainerProps) => {
    const Container = React.useMemo(
        () => styled.div`
            @media (max-width: ${BREAKPOINTS.mdpx}) {
                background-attachment: scroll !important;
            }
        `,
        [],
    );

    return (
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
};
