import * as React from "react";
import { connect } from "react-redux";
import { THEME_TRANSITION_TIME } from "src/config";
import { fonts, ITheme } from "src/modules/CSS";
import styled, { ThemeProvider } from "styled-components";
import tinycolor from "tinycolor2";

interface IButtonStateProps {
    readonly theme: ITheme;
}

interface IThemeProvider {
    theme: IButtonThemeProviderProps;
}

interface IButtonThemeProviderProps {
    readonly theme: ITheme;
    readonly background?: string;
    readonly textColor?: string;
}

interface IButtonOwnProps {
    /**
     * Function to call when the Button is clicked
     */
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;

    /**
     * Overrides the Button container
     */
    ButtonRenderer?: (props: { children?: React.ReactNode }) => JSX.Element;

    /**
     * Children of the button
     * @Note Overrides title and subtitle
     */
    children?: React.ReactNode;

    /**
     * Background color
     */
    background?: string;

    /**
     * Text color
     */
    textColor?: string;

    /**
     * If no children is specified, this will be used as title
     */
    title?: React.ReactNode;

    /**
     * If no children is specified, this will be used as subtitle
     */
    subtitle?: React.ReactNode;
}

const mapStateToProps = ({ theme }: IStoreState): IButtonStateProps => ({
    theme,
});

const Button = styled.button`
    background: ${({ theme: { theme, background } }: IThemeProvider) =>
        background || theme.colors.buttonBg};
    color: ${({ theme: { theme, textColor } }: IThemeProvider) =>
        textColor || theme.colors.buttonText};
    border: none;
    border-radius: 0.5rem;
    padding: 0.75rem;
    transition: all ${THEME_TRANSITION_TIME}s;

    &:hover {
        background: ${({ theme: { theme, background } }: IThemeProvider) =>
            tinycolor(background || theme.colors.buttonBg)
                .darken()
                .toHexString()};
    }
    &:active {
        transform: scale(0.97);
    }
    &:active,
    &:focus {
        outline: 0;
    }
`;

const Title = styled.div`
    font-family: ${fonts.roboto.family};
`;
const Subtitle = styled.div`
    font-size: 1rem;
    font-family: ${fonts.openSans.family};
    margin: 0 1rem;
`;

export default connect(mapStateToProps)(
    (props: IButtonOwnProps & IButtonStateProps) => {
        const {
            theme,
            onClick,
            children,
            background,
            textColor,
            title,
            subtitle,
            ButtonRenderer,
        } = props;

        const BButton = ButtonRenderer || Button;

        const themeValue: IButtonThemeProviderProps = {
            theme,
            background,
            textColor,
        };

        return (
            (!children && !title && !subtitle && null) || (
                <ThemeProvider theme={themeValue}>
                    <>
                        <BButton onClick={onClick}>
                            {children || (
                                <>
                                    {title && <Title children={title} />}
                                    {subtitle && (
                                        <Subtitle children={subtitle} />
                                    )}
                                </>
                            )}
                        </BButton>
                    </>
                </ThemeProvider>
            )
        );
    },
);
