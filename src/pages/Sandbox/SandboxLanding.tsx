import * as React from "react";
import { STYLE_CENTERED, THEME_TRANSITION_TIME } from "src/config";
import { Hooks } from "src/modules";
import { fonts } from "src/modules/CSS";

const { useMapState } = Hooks;

export default () => {
    const { theme } = useMapState(({ theme }) => ({ theme }));
    return (
        <div
            style={{
                ...STYLE_CENTERED,
                display: "table",
                width: "100%",
                textShadow: `0 0 .75em ${theme.colors.altDefaultShadow}`,
            }}
        >
            <div
                style={{
                    textAlign: "center",
                    display: "table-cell",
                    verticalAlign: "middle",
                    transition: `all ${THEME_TRANSITION_TIME}s`,
                    color: theme.colors.intro,
                }}
            >
                <hr
                    style={{
                        margin: "1% 30%",
                        transition: `all ${THEME_TRANSITION_TIME}s`,
                        borderColor: theme.colors.defaultText,
                    }}
                />
                <div
                    style={{
                        fontSize: "6rem",
                        fontFamily: fonts.exo.family,
                    }}
                >
                    THE SANDBOX
                </div>
                <div
                    style={{
                        fontSize: "2rem",
                        fontFamily: fonts.openSans.family,
                    }}
                >
                    Where ideas are born
                </div>
                <hr
                    style={{
                        margin: "1% 30%",
                        transition: `all ${THEME_TRANSITION_TIME}s`,
                        borderColor: theme.colors.defaultText,
                    }}
                />
            </div>
        </div>
    );
};
