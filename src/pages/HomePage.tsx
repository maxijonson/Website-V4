import React from "react";
import { Header, ViewportContainer } from "../components";

export const HomePage = () => (
    <React.Fragment>
        <ViewportContainer
            background={{
                backgroundImage: "url('/assets/images/home-intro-bg.jpg')",
                transform: "scale(1.2)",
                filter: "blur(3px)",
            }}
            style={{ overflow: "hidden" }}
        >
            <Header />
        </ViewportContainer>
    </React.Fragment>
);
