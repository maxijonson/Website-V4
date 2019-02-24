import React from "react";
import { ViewportContainerBackground } from "./";

interface IViewportContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    background?: React.CSSProperties;
    contentStyle?: React.CSSProperties;
}

export default (props: IViewportContainerProps) => {
    const { children, background, contentStyle } = props;
    return (
        <div
            {...props}
            style={{
                display: "grid",
                position: "relative",
                maxWidth: "100vw",
                height: "100vh",
                ...props.style,
            }}
        >
            {background && <ViewportContainerBackground style={background} />}
            <div
                style={{
                    position: "absolute",
                    width: "100%",
                    top: 0,
                    left: 0,
                }}
            >
                <div style={{ padding: "0 1vw", ...contentStyle }}>
                    {children}
                </div>
            </div>
        </div>
    );
};
