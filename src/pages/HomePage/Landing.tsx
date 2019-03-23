import * as React from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { STYLE_CENTERED, THEME_TRANSITION_TIME } from "src/config";
import { fonts, ITheme } from "src/modules/CSS";

const mapStateToProps = (state: IStoreState): { theme: ITheme } => ({
    theme: state.theme,
});

export default connect(mapStateToProps)(({ theme }: { theme: ITheme }) => {
    const { t } = useTranslation();

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
                <div
                    style={{
                        fontSize: "4rem",
                        fontFamily: fonts.Kaushan.family,
                    }}
                >
                    {t("home.intro.welcome")}
                </div>
                <div
                    style={{
                        fontSize: "6rem",
                        fontFamily: fonts.exo.family,
                    }}
                >
                    {t("home.intro.maxijonson")}
                </div>
                <hr
                    style={{
                        margin: "1% 35%",
                        transition: `all ${THEME_TRANSITION_TIME}s`,
                        borderColor: theme.colors.defaultText,
                    }}
                />
                <div
                    style={{
                        fontSize: "2rem",
                        fontFamily: fonts.openSans.family,
                    }}
                >
                    {t("home.intro.tagline")}
                </div>
            </div>
        </div>
    );
});
