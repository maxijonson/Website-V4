import React from "react";
import { ViewportContainer } from "src/components";
import { PATHS, THEME_TRANSITION_TIME } from "src/config/config";
import { Hooks } from "src/modules";
import SandboxLanding from "./SandboxLanding";

const { useMapState } = Hooks;

export default () => {
    const { theme } = useMapState(({ theme }) => ({ theme }));

    return (
        <>
            <ViewportContainer
                background={{
                    backgroundImage: `url(${PATHS.images.sandboxIntroBg})`,
                    transform: "scale(1.2)",
                    transition: `all ${THEME_TRANSITION_TIME}s`,
                    filter: `${
                        theme.name == "light"
                            ? "blur(5px) brightness(90%)"
                            : "blur(5px) brightness(30%)"
                    }`,
                }}
                style={{
                    overflow: "hidden",
                    transition: `all ${THEME_TRANSITION_TIME}s`,
                }}
                backgroundOverlay
                backgroundOverlayProps={{
                    style: {
                        background: theme.colors.introOverlay,
                    },
                }}
            >
                <SandboxLanding />
            </ViewportContainer>
        </>
    );
};
