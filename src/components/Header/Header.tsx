import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";
import React from "react";
import { connect, MapStateToPropsParam } from "react-redux";
import { Dispatch } from "redux";
import styled from "styled-components";
import ThemeSwitch from "./ThemeSwitch";

// import { themes } from "src/modules/CSS";
// import i18n from "src/modules/i18n/i18n";
import { setTheme } from "src/actions";
import { Card, Modal } from "src/components";
import { ZINDEX } from "src/config";
import { ITheme } from "src/modules/CSS/themes";
import LangSwitch from "./LangSwitch";

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

const CardTitle = () => (
    <div
        style={{
            display: "grid",
            gridTemplateColumns: "3fr 1fr",
            width: "100%",
        }}
    >
        <div style={{ gridColumnStart: 1 }}>
            <h1 style={{ fontSize: "3.5rem", margin: 0 }}>Navigation</h1>
        </div>
        <div
            style={{
                gridColumnStart: 2,
                backgroundImage: "url(/assets/images/logo.png)",
                backgroundSize: "30%",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center right",
            }}
        />
    </div>
);

const Header = styled(({ className, theme }: IHeaderProps) => {
    const [menuVisible, setMenuVisible] = React.useState(false);

    const onRequestClose = () => setMenuVisible(false);

    const onMenuClick = () => setMenuVisible(true);

    return (
        <>
            <div className={className} onClick={onMenuClick}>
                <FontAwesomeIcon icon="bars" color={theme.colors.defaultText} />
            </div>
            <Modal
                onRequestClose={onRequestClose}
                visible={menuVisible}
                left
                overlayClassName="header--modal-overlay"
                containerClassName="header--modal-container"
            >
                <Card
                    title={<CardTitle />}
                    subtitle={
                        <>
                            <LangSwitch />
                            <ThemeSwitch />
                        </>
                    }
                    cardClassName="header--card"
                >
                    This is a Card
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
