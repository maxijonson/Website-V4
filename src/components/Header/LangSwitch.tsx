import * as React from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import Switch from "react-switch";
import { ITheme } from "src/modules/CSS";

interface ILangSwitchStateProps {
    readonly theme: ITheme;
}

const mapStateToProps = (state: IStoreState): ILangSwitchStateProps => ({
    theme: state.theme,
});

export default connect(mapStateToProps)(({ theme }: ILangSwitchStateProps) => {
    const { i18n, t } = useTranslation();
    const [language, setLanguage] = React.useState(i18n.language);

    const handleLangChange = (checked: boolean) => {
        i18n.changeLanguage(checked ? "en" : "fr");
        setLanguage(checked ? "en" : "fr");
    };

    return (
        <div style={{ display: "inline-block" }}>
            <Switch
                activeBoxShadow={theme.colors.defaultText}
                ariaLabelledby={t("header.changeLang")}
                checked={language == "en"}
                onChange={handleLangChange}
                handleDiameter={15}
                offColor={
                    theme.name == "light"
                        ? theme.colors.themeSwitchOn
                        : theme.colors.themeSwitchOff
                }
                onColor={
                    theme.name == "light"
                        ? theme.colors.themeSwitchOn
                        : theme.colors.themeSwitchOff
                }
                onHandleColor={theme.colors.defaultText}
                offHandleColor={theme.colors.defaultText}
                checkedIcon={
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                            fontSize: 15,
                            color: theme.colors.defaultText,
                            paddingRight: 2,
                        }}
                        children={"EN"}
                    />
                }
                uncheckedIcon={
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                            fontSize: 15,
                            color: theme.colors.defaultText,
                            paddingRight: 2,
                        }}
                        children={"FR"}
                    />
                }
            />
        </div>
    );
});
