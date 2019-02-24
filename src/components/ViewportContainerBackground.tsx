import React from "react";

interface IViewportContainerProps
    extends React.HTMLAttributes<HTMLDivElement> {}

export default (props: IViewportContainerProps) => (
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
);
