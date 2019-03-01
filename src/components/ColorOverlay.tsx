import React from "react";

interface IColorOverlayOwnProps extends React.HTMLAttributes<HTMLDivElement> {}

export type IColorOverlayProps = IColorOverlayOwnProps;

export default (props: IColorOverlayProps) => (
    <div
        {...props}
        style={{
            width: "100%",
            height: "100%",
            opacity: 0.5,
            background: "#000",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 0,
            ...props.style,
        }}
    />
);
