import * as _ from "lodash";
import React from "react";
import * as Reveal from "react-reveal";
import { CardCatcher } from "src/components/Card/CardCatcher";
import { BREAKPOINTS } from "src/config";
import { THEME_TRANSITION_TIME } from "src/config/config";
import { Hooks } from "src/modules";
import { fonts, ITheme } from "src/modules/CSS";
import styled, { ThemeProvider } from "styled-components";
import tinycolor from "tinycolor2";
import { withCatcher } from "../Catcher";
import {
    defaultProps,
    IBodyAlignment,
    ICardInternalProps,
    ICardProps,
} from "./model";

const { useMapState } = Hooks;

interface IThemeProps {
    theme: ICardInternalProps &
        ICardProps & {
            theme: ITheme;
        };
}

// CARD TITLE

const DTitle = styled.h1`
    font-size: 4rem;
    font-family: ${fonts.roboto.family};

    @media (max-width: ${BREAKPOINTS.smpx}) {
        position: relative;
        padding-left: ${({ theme: { bodyAlignment } }: IThemeProps) =>
            bodyAlignment == "right" && "50%"};
        padding-right: ${({ theme: { bodyAlignment } }: IThemeProps) =>
            bodyAlignment == "left" && "50%"};
        z-index: 2;
        text-align: ${({ theme: { bodyAlignment } }: IThemeProps) =>
            bodyAlignment == "left" ? "left" : "right"};
    }
`;

// CARD SUBTITLE

const DSubtitle = styled.h2`
    font-size: 2.25rem;
    color: ${({ theme: { theme } }: IThemeProps) => theme.colors.cardSubtitle};
    font-family: ${fonts.openSans.family};

    @media (max-width: ${BREAKPOINTS.smpx}) {
        position: relative;
        padding-left: ${({ theme: { bodyAlignment } }: IThemeProps) =>
            bodyAlignment == "right" && "25%"};
        padding-right: ${({ theme: { bodyAlignment } }: IThemeProps) =>
            bodyAlignment == "left" && "25%"};
        z-index: 2;
        text-align: ${({ theme: { bodyAlignment } }: IThemeProps) =>
            bodyAlignment == "left" ? "left" : "right"};
    }
`;

// CARD HEADER HIDER

const DHeaderHider = styled.div`
    ${({
        theme: { imageUrl, background, theme, bodyAlignment },
    }: IThemeProps) =>
        imageUrl &&
        `@media (max-width: ${BREAKPOINTS.smpx}) {
        background: ${background || theme.colors.card};
        transition: all ${THEME_TRANSITION_TIME}s;
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 1;
        top: 0;
        left: 0;
        box-shadow: 0 0 1.5rem ${theme.colors.cardShadow};
        transform: ${
            bodyAlignment == "left"
                ? "skew(70deg) translateX(-35%) scale(1.2)"
                : "skew(-70deg) translateX(35%) scale(1.2)"
        };
    }`}
`;

// CARD HEADER

const DHeader = styled.div`
    @media (max-width: ${BREAKPOINTS.smpx}) {
        background: url(${({ theme: { imageUrl } }) => imageUrl}) center center /
            cover no-repeat;
        overflow-y: auto;
        overflow-x: hidden;
        padding: 0.5% 3%;
        position: relative;
    }
`;

// CARD BODY

const DBody = styled.div`
    font-family: "${fonts.openSans.family}";
    @media (max-width: ${BREAKPOINTS.smpx}) {
        padding: 2% 3%;
    }
`;

// CARD CONTENT

const DContent = styled.div`
    grid-column-start: ${({ theme: { bodyAlignment } }: IThemeProps) =>
        bodyAlignment == "left" ? 1 : 2};
    padding: 2% 3%;

    @media (max-width: ${BREAKPOINTS.smpx}) {
        grid-column-start: 1;
        padding: 0;
    }
`;

// CARD IMAGE HIDER

const DImageHider = styled.div`
    background: ${({ theme: { theme, background } }: IThemeProps) =>
        background || theme.colors.card};
    transform: ${({ theme: { bodyAlignment, hasRevealed } }: IThemeProps) =>
        hasRevealed &&
        (bodyAlignment == "left"
            ? "skew(10deg) translateX(-70%)"
            : "skew(-10deg) translateX(70%)")};
    transition: all ${THEME_TRANSITION_TIME}s, transform 1s;
    width: 100%;
    height: 100%;
    box-shadow: 0 0 1.5rem
        ${({ theme: { theme } }: IThemeProps) => theme.colors.cardShadow};
`;

// CARD IMAGE

const DImage = styled.div`
    @media (min-width: ${BREAKPOINTS.smpx}) {
    grid-column-start: ${({ theme: { bodyAlignment } }: IThemeProps) =>
        bodyAlignment == "left" ? 2 : 1};
    background-size: cover;
    position: relative;
    transition: all 1s;
    transition-delay: 0.25s;
    overflow: hidden;
    background:
        url("${({ theme: { imageUrl } }: IThemeProps) => imageUrl}")
        center center / cover no-repeat;
    }
`;

// Footer

const DFooter = styled.div`
    font-family: "${fonts.roboto.family}";
    font-size: 1.6rem;
    color: ${({ theme: { theme } }: IThemeProps) => {
        const color = tinycolor(theme.colors.defaultText);
        theme.name == "light" ? color.lighten(25) : color.darken(25);
        return color.toRgbString();
    }};
`;

// Card container
const Card = styled.div`
    background: ${({ theme: { background, theme } }: IThemeProps) =>
        background || theme.colors.card};
    width: 75%;
    display: grid;
    margin: 5% auto;
    box-shadow: 0 0.5rem 0.5rem
        ${({ theme: { theme } }: IThemeProps) => theme.colors.cardShadow};
    border-radius: 0.25em;
    font-size: 2.3rem;
    color: ${({ theme: { theme } }: IThemeProps) => theme.colors.defaultText};
    transition: all ${THEME_TRANSITION_TIME}s;
    text-align: justify;
    overflow: hidden;

    @media (max-width: ${BREAKPOINTS.smpx}) {
        font-size: 4rem;
    }

    @media (min-width: ${BREAKPOINTS.smpx}) {
        grid-gap: 1rem;
        grid-template-columns: ${({
            theme: { imageUrl, bodyAlignment },
        }: IThemeProps) =>
            imageUrl
                ? bodyAlignment == "left"
                    ? "75% 25%"
                    : "25% 75%"
                : "100%"};
    }
`;

// Component that animates internally (if animate is true)
// After the animation is done, this becomes a React.Fragment to prevent any more animations
interface IAnimateContext {
    animate: boolean;
    fallbackHasRevealed: boolean;
    bodyAlignment: IBodyAlignment;
    baseDelay: number;
    hasRevealed: boolean;
}
const AnimateContext = React.createContext<IAnimateContext>({
    animate: false,
    fallbackHasRevealed: false,
    bodyAlignment: "left",
    baseDelay: 1000,
    hasRevealed: false,
});
const AnimateSide = ({
    children,
    delay = 0,
    cascade = false,
    onReveal,
}: {
    children: JSX.Element;
    delay?: number;
    cascade?: boolean;
    onReveal?: () => void;
}) => {
    const {
        animate,
        fallbackHasRevealed,
        bodyAlignment,
        baseDelay,
        hasRevealed,
    } = React.useContext(AnimateContext);

    return animate && !fallbackHasRevealed ? (
        <Reveal.Fade
            left={bodyAlignment == "left"}
            right={bodyAlignment == "right"}
            delay={baseDelay + delay}
            children={children}
            factor={0}
            cascade={cascade}
            appear={hasRevealed}
            onReveal={onReveal}
        />
    ) : (
        <div children={children} />
    );
};

const Base = (props: ICardProps & ICardInternalProps) => {
    const {
        ContentRenderer,
        HeaderRenderer,
        title: title,
        TitleRenderer,
        subtitle,
        SubtitleRenderer,
        HeaderHiderRenderer,
        BodyRenderer,
        children,
        ImageRenderer,
        ImageHiderRenderer,
        imageUrl,
        headerSeparator,
        bodyAlignment = defaultProps.bodyAlignment,
        animate = defaultProps.animate,
        delay = defaultProps.delay, // Animation delay provided by same props we give to React-Reveal
        duration = defaultProps.duration, // by React-Reveal
        hasRevealed: hasRevealedProp,
        animationDelayFactor = defaultProps.duration,
        isReveal = defaultProps.isReveal,
        cardClassName,
        footerSeparator,
        FooterRenderer,
        footer,
    } = props;

    const { theme } = useMapState(({ theme }) => ({ theme }));

    // Extra state to control the revealing ourselves for things that aren't in react-reveal's scope
    // e.g: changing language or theme would be considered like a change and re-fire the animations, we don't want that!
    const [fallbackHasRevealed, setFallbackHasRevealed] = React.useState(false);
    const [isBeingRevealed, setIsBeingRevealed] = React.useState(false);

    const hasRevealed = isReveal
        ? animate
            ? hasRevealedProp || false
            : true
        : animate
        ? isBeingRevealed
        : true;

    const baseDelay = Math.round((delay + duration) / animationDelayFactor);

    let timeout: number;
    const onRevealTrigger = (timeout: number = 2000) => {
        if (isReveal ? hasRevealed : true) {
            setIsBeingRevealed(true);
            timeout = window.setTimeout(
                () => setFallbackHasRevealed(true),
                timeout,
            );
        }
    };
    React.useEffect(() => () => window.clearTimeout(timeout));

    // Content
    const Content = ContentRenderer || DContent;

    // Header
    const renderHeader = !!title || !!subtitle;
    const Header =
        HeaderRenderer || ((renderHeader && DHeader) || (() => null));
    const Title = TitleRenderer || DTitle;
    const Subtitle = SubtitleRenderer || DSubtitle;
    const HeaderHider = HeaderHiderRenderer || DHeaderHider;

    // Body
    const Body = BodyRenderer || DBody;

    // Footer
    const Footer = FooterRenderer || DFooter;

    // Image
    const Image = ImageRenderer || ((imageUrl && DImage) || (() => null));
    const ImageHider = ImageHiderRenderer || DImageHider;

    return (
        <ThemeProvider theme={{ ...props, hasRevealed, theme }}>
            <AnimateContext.Provider
                value={{
                    animate,
                    bodyAlignment,
                    hasRevealed,
                    fallbackHasRevealed,
                    baseDelay,
                }}
            >
                <Card className={cardClassName}>
                    {bodyAlignment == "right" && (
                        <Image className="card-image  card-bodyAlignment-right">
                            <ImageHider className="card-image-hider  card-bodyAlignment-right" />
                        </Image>
                    )}
                    <Content className="card-content">
                        {renderHeader && (
                            <Header className="card-header">
                                <AnimateSide
                                    cascade
                                    onReveal={
                                        !children
                                            ? () => onRevealTrigger(1750)
                                            : () => {}
                                    }
                                >
                                    <div>
                                        {title && (
                                            <Title
                                                children={title}
                                                className="card-title"
                                            />
                                        )}
                                        {subtitle && (
                                            <Subtitle
                                                children={subtitle}
                                                className="card-subtitle"
                                            />
                                        )}
                                    </div>
                                </AnimateSide>
                                <HeaderHider className="card-header-hider" />
                            </Header>
                        )}
                        {renderHeader &&
                            children &&
                            (headerSeparator || (
                                <AnimateSide
                                    delay={250}
                                    children={<hr className="card-hr header" />}
                                />
                            ))}

                        {children && (
                            <AnimateSide
                                delay={500}
                                onReveal={onRevealTrigger}
                                children={
                                    <Body
                                        children={children}
                                        className="card-body"
                                    />
                                }
                            />
                        )}

                        {children &&
                            footer &&
                            (footerSeparator || (
                                <AnimateSide
                                    delay={750}
                                    children={<hr className="card-hr footer" />}
                                />
                            ))}

                        {footer && (
                            <AnimateSide
                                delay={1000}
                                children={<Footer children={footer} />}
                            />
                        )}
                    </Content>
                    {bodyAlignment == "left" && (
                        <Image className="card-image  card-bodyAlignment-left">
                            <ImageHider className="card-image-hider card-bodyAlignment-left" />
                        </Image>
                    )}
                </Card>
            </AnimateContext.Provider>
        </ThemeProvider>
    );
};

export const CardCatched = withCatcher(Base, { Fallback: CardCatcher });

/**
 * Flexible Card component with default containers, or you can define your own.
 * Primary: body is aligned to the left (use Alt to align to the right)
 * @structure
 * ```tsx
    <>
        <Content>
            <Header>
                <Title>{title}</Title>
                <Subtitle>{subtitle}</Subtitle>
                <HeaderHider />
            </Header>
            <Body>{body}</Body>
        </Content>
        <Image>
            <ImageHider />
        </Image>
    </>
 * ```
 */
export default (props: ICardProps) => (
    <CardCatched {...props} bodyAlignment="left" />
);

/**
 * Shows text to the right (when there's an image)
 */
export const Alt = (props: ICardProps) => (
    <CardCatched {...props} bodyAlignment="right" />
);
