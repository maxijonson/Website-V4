import * as React from "react";
import { connect } from "react-redux";
import { ITheme } from "src/modules/CSS";
import styled, { ThemeProvider } from "styled-components";
import tinycolor from "tinycolor2";
import { ZINDEX } from "src/config";

interface IModalStateProps {
    readonly theme: ITheme;
}

interface IModalOwnProps {
    visible?: boolean;
    children?: React.ReactNode;
}

interface IThemeProvider {
    theme: IModalThemeProviderProps;
}

interface IModalThemeProviderProps {
    readonly theme: ITheme;
}

interface IModalContext {
    setModalVisible: (visible: boolean) => void;
}

const mapStateToProps = ({ theme }: IStoreState): IModalStateProps => ({
    theme,
});

const Overlay = styled.div`
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: ${ZINDEX.modal}; /* Z-index cannot go higher than its parent prop! https://cssreset.com/z-indexnotworking/ */
    background: ${({ theme: { theme } }: IThemeProvider) =>
        tinycolor(theme.colors.pageBackground)
            .setAlpha(0.8)
            .toRgbString()};
`;

const Container = styled.div`
    padding: 5% 10%;
    background: ${({ theme: { theme } }: IThemeProvider) =>
        tinycolor(theme.colors.pageBackground)
            .setAlpha(0.8)
            .toRgbString()};
`;

export const ModalContext = React.createContext<IModalContext | null>(null);

export default connect(mapStateToProps)(
    (props: IModalOwnProps & IModalStateProps) => {
        const { theme, visible, children } = props;

        const [modalVisible, setModalVisible] = React.useState(false);

        const themeValue: IModalThemeProviderProps = {
            theme,
        };
        console.log("visible", visible, props.visible);
        return (
            (modalVisible && (
                <ModalContext.Provider value={{ setModalVisible }}>
                    <>
                        <ThemeProvider theme={themeValue}>
                            <Overlay>
                                <Container />
                            </Overlay>
                        </ThemeProvider>
                        {children}
                    </>
                </ModalContext.Provider>
            )) ||
            null
        );
    },
);
