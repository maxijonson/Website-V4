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

interface IPoseOptions {
    top?: boolean;
    right?: boolean;
    bottom?: boolean;
    left?: boolean;
}

interface IModalOwnProps extends IPoseOptions {
    visible?: boolean;
    children?: React.ReactNode;
    onRequestClose: (e: React.MouseEvent<HTMLDivElement>) => void;
    parent?: HTMLElement;
    overlayClassName?: string;
    containerClassName?: string;
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
    width: 100vw;
    top: 0;
    background: ${({ theme: { theme } }: IThemeProvider) =>
        tinycolor(theme.colors.pageBackground)
            .setAlpha(0.8)
            .toRgbString()};
    cursor: ${({ theme: { theme } }: IThemeProvider) =>
            theme.name == "light"
                ? "url(/assets/images/back-cursor-black.png)"
                : "url(/assets/images/back-cursor-white.png)"},
        auto;
    > * {
        cursor: default;
    }
    &:active {
        cursor: default;
    }
`;

const Container = styled(
    posed.div({
        visible: {
            y: "0%",
            x: "0%",
        },
        hidden: {
            y: ({ top, bottom }: IPoseOptions) =>
                top || bottom ? (top ? "-100%" : "100%") : "0%",
            x: ({ left, right }: IPoseOptions) =>
                left || right ? (left ? "-100%" : "100%") : "0%",
        },
    }),
)`
    z-index: ${ZINDEX.modal + 2};
    margin: auto 0;
    max-height: 100%;
    overflow-y: auto;
    font-size: 2rem;
    font-family: "${fonts.roboto.family}";
`;

const usePortal = (parent: HTMLElement) => {
    const el = React.useRef(document.createElement("div"));
    React.useEffect(() => {
        parent.appendChild(el.current);

        return () => el.current.remove();
    }, []);
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
            visible,
            children,
            onRequestClose,
            parent = document.body,
            top,
            bottom,
            left,
            right,
            overlayClassName,
            containerClassName,
        } = props;

        const themeValue: IModalThemeProviderProps = {
            theme,
        };

        const target = usePortal(parent);

        const pose = visible ? "visible" : "hidden";

        return (
            ReactDOM.createPortal(
                <ThemeProvider theme={themeValue}>
                    <Overlay
                        onClick={onRequestClose}
                        pose={pose}
                        className={overlayClassName}
                    >
                        <Container
                            onClick={preventPropagation}
                            top={top}
                            right={right}
                            bottom={bottom}
                            left={left}
                            className={containerClassName}
                        >
                            {children}
                        </Container>
                    </Overlay>
                </ThemeProvider>,
                target,
            ) || null
        );
    },
);
