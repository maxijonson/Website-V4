import React from "react";
import { ViewportContainerBackground } from "./";
import ColorOverlay, { IColorOverlayProps } from "./ColorOverlay";

interface IViewportContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    background?: React.CSSProperties;
    contentStyle?: React.CSSProperties;
    backgroundOverlay?: boolean;
    backgroundOverlayProps?: IColorOverlayProps;
}

export default (props: IViewportContainerProps) => {
    const {
        children,
        background,
        contentStyle,
        backgroundOverlay,
        backgroundOverlayProps,
    } = props;
    return (
        <div
            style={{
                display: "grid",
                position: "relative",
                maxWidth: "100vw",
                minHeight: "100vh",
                ...props.style,
            }}
        >
            {background && <ViewportContainerBackground style={background} />}
            {backgroundOverlay && <ColorOverlay {...backgroundOverlayProps} />}
            <div
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    top: 0,
                    left: 0,
                }}
            >
                <div
                    style={{
                        padding: "0 1vw",
                        height: "100%",
                        ...contentStyle,
                    }}
                >
                    {children}
                </div>
            </div>
        </div>
    );
};
