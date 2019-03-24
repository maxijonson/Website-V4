import * as React from "react";
import { THEME_TRANSITION_TIME } from "src/config";
import { Hooks } from "src/modules";
import { fonts } from "src/modules/CSS";
import styled from "styled-components";
import tinycolor from "tinycolor2";

const { useMapState } = Hooks;

interface IButtonOwnProps {
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

    title?: React.ReactNode;
    subtitle?: React.ReactNode;
}

export default (props: IButtonOwnProps) => {
    const {
        onClick,
        children,
        background,
        textColor,
        title,
        subtitle,
        ButtonRenderer,
    } = props;

    const { theme } = useMapState(({ theme }) => ({ theme }));

    const Button = React.useMemo(
        () =>
            ButtonRenderer ||
            styled.button`
                background: ${background || theme.colors.buttonBg};
                color: ${textColor || theme.colors.buttonText};
                border: none;
                border-radius: 0.5rem;
                padding: 0.75rem;
                transition: all ${THEME_TRANSITION_TIME}s;

                &:hover {
                    background: ${() =>
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
            `,
        [theme, background, textColor],
    );

    const Title = React.useMemo(
        () => styled.div`
            font-family: ${fonts.roboto.family};
        `,
        [],
    );
    const Subtitle = React.useMemo(
        () => styled.div`
            font-size: 1rem;
            font-family: ${fonts.openSans.family};
            margin: 0 1rem;
        `,
        [],
    );

    return (
        (!children && !title && !subtitle && null) || (
            <Button onClick={onClick}>
                {children || (
                    <>
                        {title && <Title children={title} />}
                        {subtitle && <Subtitle children={subtitle} />}
                    </>
                )}
            </Button>
        )
    );
};
