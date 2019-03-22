import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";
import React from "react";
import { connect, MapStateToPropsParam } from "react-redux";
import { Dispatch } from "redux";
import styled from "styled-components";

import { Card, Modal } from "src/components";
import { ZINDEX } from "src/config";
// import { themes } from "src/modules/CSS";
// import i18n from "src/modules/i18n/i18n";
import { setTheme } from "../actions";
import { ITheme } from "../modules/CSS/themes";

// const { light, dark } = themes;

interface IHeaderOwnProps {
    className?: string;
}

interface IHeaderStateProps {
    readonly theme: ITheme;
}

interface IHeaderDispatchProps {
    readonly setTheme?: (theme: ITheme) => void;
}

type IHeaderProps = IHeaderOwnProps & IHeaderStateProps & IHeaderDispatchProps;

const Header = styled(({ className /*theme, setTheme*/ }: IHeaderProps) => {
    // const [checked, setChecked] = React.useState(theme.name == "light");
    // const [language, setLanguage] = React.useState(i18n.language);
    const [menuVisible, setMenuVisible] = React.useState(false);

    // const handleThemeChange = (checked: boolean) => {
    //     setChecked(checked);
    //     if (setTheme) {
    //         setTheme(checked ? light : dark);
    //     }
    // };

    // const handleLangChange = (checked: boolean) => {
    //     i18n.changeLanguage(checked ? "en" : "fr");
    //     setLanguage(checked ? "en" : "fr");
    // };

    const onRequestClose = () => setMenuVisible(false);

    const onMenuClick = () => setMenuVisible(true);

    return (
        <>
            <div className={className} onClick={onMenuClick}>
                <FontAwesomeIcon icon="bars" />
            </div>
            <Modal onRequestClose={onRequestClose} visible={menuVisible}>
                <Card title="test" subtitle="sub">
                    This is a card
                </Card>
            </Modal>
        </>
    );
})`
    position: fixed;
    top: 0;
    left: 0;
    font-size: 3.6rem;
    margin: 1.5rem 0 0 2rem;
    cursor: pointer;
    z-index: ${ZINDEX.header};
`;

const mapStateToProps: MapStateToPropsParam<
    IHeaderStateProps,
    IHeaderOwnProps,
    IStoreState
> = ({ theme }: IStoreState): IHeaderStateProps => ({
    theme,
});

const mapDispatchToProps = (dispatch: Dispatch<any>): IHeaderDispatchProps => ({
    setTheme: (theme: ITheme) => dispatch(setTheme(theme)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Header);
