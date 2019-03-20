import * as React from "react";
import * as ReactDOM from "react-dom";
import posed from "react-pose";
import { connect } from "react-redux";
import { ZINDEX } from "src/config";
import { fonts, ITheme } from "src/modules/CSS";
import styled, { ThemeProvider } from "styled-components";
import tinycolor from "tinycolor2";

interface IModalStateProps {
    readonly theme: ITheme;
}

interface IModalOwnProps {
    visible?: boolean;
    children?: React.ReactNode;
    onRequestClose: () => void;
    parent?: HTMLElement;
}

interface IThemeProvider {
    theme: IModalThemeProviderProps;
}

interface IModalThemeProviderProps {
    readonly theme: ITheme;
}

const mapStateToProps = ({ theme }: IStoreState): IModalStateProps => ({
    theme,
});

const Overlay = styled(
    posed.div({
        visible: {
            opacity: 1,
            zIndex: ZINDEX.modal,
            transition: {
                zIndex: { duration: 0 },
                default: { duration: 250 },
            },
        },
        hidden: {
            opacity: 0,
            zIndex: -1,
            transition: {
                default: { duration: 250 },
            },
        },
    }),
)`
    display: grid;
    height: 100vh;
    left: 0;
    padding: 15%;
    position: fixed;
    top: 0;
    width: 100vw;
    background: ${({ theme: { theme } }: IThemeProvider) =>
        tinycolor(theme.colors.pageBackground)
            .setAlpha(0.8)
            .toRgbString()};
`;

const Container = styled(
    posed.div({
        visible: {
            y: "0%",
        },
        hidden: {
            y: "100%",
        },
    }),
)`
    z-index: ${ZINDEX.modal + 2};
    margin: auto;
    max-height: 100%;
    overflow: scroll;
    border-radius: 1rem;
    font-size: 2rem;
    font-family: "${fonts.roboto.family}";
`;

const usePortal = (parent: HTMLElement = document.body) => {
    const el = React.useRef(document.createElement("div"));
    React.useEffect(() => {
        parent.appendChild(el.current);
        return () => el.current.remove();
    });
    return el.current;
};

const preventPropagation = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
) => {
    e.stopPropagation();
};

export default connect(mapStateToProps)(
    (props: IModalOwnProps & IModalStateProps) => {
        const {
            theme,
            visible = false,
            children,
            onRequestClose,
            parent,
        } = props;

        const themeValue: IModalThemeProviderProps = {
            theme,
        };

        const target = usePortal(parent);

        const pose = visible ? "visible" : "hidden";

        return (
            ReactDOM.createPortal(
                <ThemeProvider theme={themeValue}>
                    <Overlay onClick={onRequestClose} pose={pose}>
                        <Container onClick={preventPropagation}>
                            {children}
                        </Container>
                    </Overlay>
                </ThemeProvider>,
                target,
            ) || null
        );
    },
);
