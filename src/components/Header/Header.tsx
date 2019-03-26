import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as _ from "lodash";
import React from "react";
import styled from "styled-components";

import { Card, Modal } from "src/components";
import { ZINDEX } from "src/config";
import { Hooks } from "src/modules";
import { routes, socials } from "src/routers/routes";
import LangSwitch from "./LangSwitch";
import Nav from "./Nav";
import ThemeSwitch from "./ThemeSwitch";

const { useMapState } = Hooks;

export default () => {
    const { theme } = useMapState(({ theme }) => ({ theme }));
    const [menuVisible, setMenuVisible] = React.useState(false);

    const onRequestClose = () => setMenuVisible(false);

    const onMenuClick = () => setMenuVisible(true);

    const handlePathChange = () => setMenuVisible(false);

    const Header = React.useMemo(
        () => styled.div`
            position: fixed;
            top: 0;
            left: 0;
            font-size: 3.6rem;
            margin: 1.5rem 0 0 2rem;
            cursor: pointer;
            z-index: ${ZINDEX.header};
        `,
        [],
    );

    return (
        <Header className={`header ${menuVisible ? "active" : ""}`}>
            <div className={`header--button`} onClick={onMenuClick}>
                <FontAwesomeIcon icon="bars" color={theme.colors.defaultText} />
            </div>
            <Modal
                onRequestClose={onRequestClose}
                visible={menuVisible}
                left
                overlayClassName="header--modal-overlay"
                containerClassName="header--modal-container"
                parent={document.getElementById("app")}
            >
                <Card
                    subtitle={
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                            }}
                        >
                            <div
                                style={{
                                    gridColumnStart: 1,
                                    textAlign: "center",
                                }}
                            >
                                <LangSwitch />
                            </div>
                            <div
                                style={{
                                    gridColumnStart: 2,
                                    textAlign: "center",
                                }}
                            >
                                <ThemeSwitch />
                            </div>
                        </div>
                    }
                    footer={
                        <div style={{ textAlign: "center" }}>
                            {_.map(socials, ({ Icon, name, url }) => (
                                <a
                                    style={{ margin: "0 4%" }}
                                    href={url}
                                    key={name}
                                    title={name}
                                    children={<Icon />}
                                />
                            ))}
                        </div>
                    }
                    cardClassName="header--card"
                >
                    {_.map(
                        routes,
                        ({ hidden, component, ...route }) =>
                            !hidden && (
                                <Nav
                                    {...route}
                                    onPathChange={handlePathChange}
                                />
                            ),
                    )}
                </Card>
            </Modal>
        </Header>
    );
};
