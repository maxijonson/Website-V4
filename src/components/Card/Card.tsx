import * as _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { CardCatcher } from "src/components/Card/CardCatcher";
import { BREAKPOINTS } from "src/config";
import { THEME_TRANSITION_TIME } from "src/config/config";
import { fonts } from "src/modules/CSS";
import styled, { ThemeProvider } from "styled-components";
import { withCatcher } from "../Catcher";
import {
    defaultProps,
    ICardInternalProps,
    ICardProps,
    ICardStateProps,
    ICardThemeProviderProps,
    ISCProps,
    mapStateToProps,
} from "./model";

import * as Reveal from "react-reveal";
// @ts-ignore:noImplicitAny
import RevealFlash from "react-reveal/Flash";
// @ts-ignore:noImplicitAny
import RevealHeadShake from "react-reveal/HeadShake";
// @ts-ignore:noImplicitAny
import RevealJello from "react-reveal/Jello";
// @ts-ignore:noImplicitAny
import RevealJump from "react-reveal/Jump";
// @ts-ignore:noImplicitAny
import RevealPulse from "react-reveal/Pulse";
// @ts-ignore:noImplicitAny
import RevealRubberBand from "react-reveal/RubberBand";
// @ts-ignore:noImplicitAny
import RevealShake from "react-reveal/Shake";
// @ts-ignore:noImplicitAny
import RevealSpin from "react-reveal/Spin";
// @ts-ignore:noImplicitAny
import RevealSwing from "react-reveal/Swing";
// @ts-ignore:noImplicitAny
import RevealTada from "react-reveal/Tada";
// @ts-ignore:noImplicitAny
import RevealWobble from "react-reveal/Wobble";

// CARD TITLE

const Title = styled.h1`
    font-size: 4rem;
    font-family: ${fonts.roboto.family};

    @media (max-width: ${BREAKPOINTS.smpx}) {
        position: relative;
        padding-left: ${({
            theme: { bodyAlignment },
        }: ICardThemeProviderProps) => bodyAlignment == "right" && "50%"};
        padding-right: ${({
            theme: { bodyAlignment },
        }: ICardThemeProviderProps) => bodyAlignment == "left" && "50%"};
        z-index: 2;
        text-align: ${({ theme: { bodyAlignment } }: ICardThemeProviderProps) =>
            bodyAlignment == "left" ? "left" : "right"};
    }
`;

// CARD SUBTITLE

const Subtitle = styled.h2`
    font-size: 2.25rem;
    color: ${({ theme: { theme } }: ICardThemeProviderProps) =>
        theme.colors.cardSubtitle};
    font-family: ${fonts.openSans.family};

    @media (max-width: ${BREAKPOINTS.smpx}) {
        position: relative;
        padding-left: ${({
            theme: { bodyAlignment },
        }: ICardThemeProviderProps) => bodyAlignment == "right" && "25%"};
        padding-right: ${({
            theme: { bodyAlignment },
        }: ICardThemeProviderProps) => bodyAlignment == "left" && "25%"};
        z-index: 2;
        text-align: ${({ theme: { bodyAlignment } }: ICardThemeProviderProps) =>
            bodyAlignment == "left" ? "left" : "right"};
    }
`;

// CARD HEADER HIDER

const HeaderHider = styled.div`
    ${({
        theme: { imageUrl, background, theme, bodyAlignment },
    }: ICardThemeProviderProps) =>
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

const Header = styled.div`
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

const Body = styled.div`
    font-family: "${fonts.openSans.family}";
    @media (max-width: ${BREAKPOINTS.smpx}) {
        padding: 2% 3%;
    }
`;

// CARD CONTENT

const Content = styled.div`
    grid-column-start: ${({
        theme: { bodyAlignment },
    }: ICardThemeProviderProps) => (bodyAlignment == "left" ? 1 : 2)};
    padding: 2% 3%;

    @media (max-width: ${BREAKPOINTS.smpx}) {
        grid-column-start: 1;
        padding: 0;
    }
`;

// CARD IMAGE HIDER

const ImageHider = styled.div`
    background: ${({ theme: { theme, background } }: ICardThemeProviderProps) =>
        background || theme.colors.card};
    transform: ${({
        theme: { bodyAlignment, hasRevealed },
    }: ICardThemeProviderProps) =>
        hasRevealed &&
        (bodyAlignment == "left"
            ? "skew(10deg) translateX(-70%)"
            : "skew(-10deg) translateX(70%)")};
    transition: all ${THEME_TRANSITION_TIME}s, transform 1s;
    width: 100%;
    height: 100%;
    box-shadow: 0 0 1.5rem
        ${({ theme: { theme } }: ICardThemeProviderProps) =>
            theme.colors.cardShadow};
`;

// CARD IMAGE

const Image = styled.div`
    @media (min-width: ${BREAKPOINTS.smpx}) {
    grid-column-start: ${({
        theme: { bodyAlignment },
    }: ICardThemeProviderProps) => (bodyAlignment == "left" ? 2 : 1)};
    background-size: cover;
    position: relative;
    transition: all 1s;
    transition-delay: 0.25s;
    overflow: hidden;
    background:
        url("${({ theme: { imageUrl } }: ICardThemeProviderProps) => imageUrl}")
        center center / cover no-repeat;
    }
`;

// CARD

let crashed = false;

const Base = connect(mapStateToProps)(
    styled(
        (
            props: ICardProps & ISCProps & ICardInternalProps & ICardStateProps,
        ) => {
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
                theme,
                className,
                bodyAlignment = defaultProps.bodyAlignment,
                animate = defaultProps.animate,
                delay = defaultProps.delay, // Animation delay provided by same props we give to React-Reveal
                duration = defaultProps.duration, // by React-Reveal
                hasRevealed,
                animationDelayFactor = defaultProps.duration,
                isReveal = defaultProps.isReveal,
                background,
                cardClassName,
            } = props;
            // Content
            const CContent = ContentRenderer || Content;

            // Header
            const renderHeader = !!title || !!subtitle;
            const CHeader =
                HeaderRenderer || ((renderHeader && Header) || (() => null));
            const CTitle = TitleRenderer || Title;
            const CSubtitle = SubtitleRenderer || Subtitle;
            const CHeaderHider = HeaderHiderRenderer || HeaderHider;

            // Body
            const CBody = BodyRenderer || Body;

            // Image
            const CImage =
                ImageRenderer || ((imageUrl && Image) || (() => null));
            const CImageHider = ImageHiderRenderer || ImageHider;

            // Extra state to control the revealing ourselves for things that aren't in react-reveal's scope
            // e.g: changing language or theme would be considered like a change and re-fire the animations, we don't want that!
            const [
                fallbackHasRevealed,
                setFallbackHasRevealed,
            ] = React.useState(false);
            const [isBeingRevealed, setIsBeingRevealed] = React.useState(false);

            const themeValue: ICardStateProps &
                ICardInternalProps &
                ICardProps = {
                bodyAlignment,
                theme,
                imageUrl,
                hasRevealed: isReveal
                    ? animate
                        ? hasRevealed
                        : true
                    : animate
                    ? isBeingRevealed
                    : true,
                background,
            };

            const baseDelay = Math.round(
                (delay + duration) / animationDelayFactor,
            );

            const onRevealTrigger = (timeout: number = 2000) => {
                if (isReveal ? hasRevealed : true) {
                    setIsBeingRevealed(true);
                    setTimeout(() => setFallbackHasRevealed(true), timeout);
                }
            };

            // Component that animates internally (if animate is true)
            // After the animation is done, this becomes a React.Fragment to prevent any more animations
            const AnimateSide =
                animate && !fallbackHasRevealed
                    ? ({
                          children,
                          delay = 0,
                          cascade = false,
                          onReveal,
                      }: {
                          children: JSX.Element;
                          delay?: number;
                          cascade?: boolean;
                          onReveal?: () => void;
                      }) => (
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
                      )
                    : ({ children }: { children: JSX.Element }) => (
                          <div children={children} />
                      );

            // TODO: Cleanup `crahsed`
            if (!crashed) {
                crashed = true;
                throw new Error("Test");
            }

            return (
                <ThemeProvider theme={themeValue}>
                    <div className={`${cardClassName} ${className}`}>
                        {bodyAlignment == "right" && (
                            <Image>
                                <CImageHider />
                            </Image>
                        )}
                        <CContent>
                            {renderHeader && (
                                <CHeader>
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
                                                <CTitle children={title} />
                                            )}
                                            {subtitle && (
                                                <CSubtitle
                                                    children={subtitle}
                                                />
                                            )}
                                        </div>
                                    </AnimateSide>
                                    <CHeaderHider />
                                </CHeader>
                            )}
                            {renderHeader &&
                                children &&
                                (headerSeparator || (
                                    <AnimateSide
                                        delay={250}
                                        children={<hr />}
                                    />
                                ))}

                            {children && (
                                <AnimateSide
                                    delay={500}
                                    onReveal={onRevealTrigger}
                                    children={<CBody children={children} />}
                                />
                            )}
                        </CContent>
                        {bodyAlignment == "left" && (
                            <CImage>
                                <CImageHider />
                            </CImage>
                        )}
                    </div>
                </ThemeProvider>
            );
        },
    )`
        && {
            background: ${({
                theme,
                background,
            }: ICardStateProps & ICardProps) =>
                background || theme.colors.card};
            width: 75%;
            display: grid;
            margin: 5% auto;
            box-shadow: 0 0.5rem 0.5rem
                ${({ theme }: ICardStateProps) => theme.colors.cardShadow};
            border-radius: 0.25em;
            font-size: 2.3rem;
            color: ${({ theme }: ICardStateProps) => theme.colors.defaultText};
            transition: all ${THEME_TRANSITION_TIME}s;
            text-align: justify;
            overflow: hidden;
        }

        @media (max-width: ${BREAKPOINTS.smpx}) {
            font-size: 4rem;
        }

        @media (min-width: ${BREAKPOINTS.smpx}) {
            grid-gap: 1rem;
            grid-template-columns: ${({
                imageUrl,
                bodyAlignment = defaultProps.bodyAlignment,
            }: ICardProps & ICardInternalProps) =>
                imageUrl
                    ? bodyAlignment == "left"
                        ? "75% 25%"
                        : "25% 75%"
                    : "100%"};
        }
    `,
);

const Card = withCatcher(Base, { Fallback: CardCatcher });

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
export default (props: ICardProps) => <Card {...props} bodyAlignment="left" />;

/**
 * Shows text to the right (when there's an image)
 */
export const Alt = (props: ICardProps) => (
    <Card {...props} bodyAlignment="right" />
);

interface IRevealProps {
    alt?: boolean;
    appear?: boolean;
    big?: boolean;
    bottom?: boolean;
    cascade?: boolean;
    collapse?: boolean;
    count?: number;
    delay?: number;
    distance?: string;
    duration?: number;
    enter?: boolean;
    exit?: boolean;
    forever?: boolean;
    fraction?: number;
    left?: boolean;
    mirror?: boolean;
    mountOnEnter?: boolean;
    opposite?: boolean;
    out?: boolean;
    right?: boolean;
    spy?: any;
    timeout?: number;
    top?: boolean;
    when?: boolean;
}

/// --- ANIMATED ON VIEWPORT ENTER ---///

export const Fade = (props: ICardProps & IRevealProps) => {
    const [hasRevealed, setHasRevealed] = React.useState(false);

    const onReveal = () => setHasRevealed(true);

    return (
        <Reveal.Fade {...props} onReveal={onReveal}>
            <Card
                {...props}
                bodyAlignment={props.alt ? "right" : "left"}
                hasRevealed={hasRevealed}
                isReveal
            />
        </Reveal.Fade>
    );
};

export const Flip = (props: ICardProps & IRevealProps) => {
    const [hasRevealed, setHasRevealed] = React.useState(false);

    const onReveal = () => setHasRevealed(true);

    return (
        <Reveal.Flip {...props} onReveal={onReveal}>
            <Card
                {...props}
                bodyAlignment={props.alt ? "right" : "left"}
                hasRevealed={hasRevealed}
                isReveal
            />
        </Reveal.Flip>
    );
};

export const Rotate = (props: ICardProps & IRevealProps) => {
    const [hasRevealed, setHasRevealed] = React.useState(false);

    const onReveal = () => setHasRevealed(true);

    return (
        <Reveal.Rotate {...props} onReveal={onReveal}>
            <Card
                {...props}
                bodyAlignment={props.alt ? "right" : "left"}
                hasRevealed={hasRevealed}
                isReveal
            />
        </Reveal.Rotate>
    );
};

export const Zoom = (props: ICardProps & IRevealProps) => {
    const [hasRevealed, setHasRevealed] = React.useState(false);

    const onReveal = () => setHasRevealed(true);

    return (
        <Reveal.Zoom {...props} onReveal={onReveal}>
            <Card
                {...props}
                bodyAlignment={props.alt ? "right" : "left"}
                hasRevealed={hasRevealed}
                isReveal
            />
        </Reveal.Zoom>
    );
};

export const Bounce = (props: ICardProps & IRevealProps) => {
    const [hasRevealed, setHasRevealed] = React.useState(false);

    const onReveal = () => setHasRevealed(true);

    return (
        <Reveal.Bounce {...props} onReveal={onReveal}>
            <Card
                {...props}
                bodyAlignment={props.alt ? "right" : "left"}
                hasRevealed={hasRevealed}
                isReveal
            />
        </Reveal.Bounce>
    );
};

export const Slide = (props: ICardProps & IRevealProps) => {
    const [hasRevealed, setHasRevealed] = React.useState(false);

    const onReveal = () => setHasRevealed(true);

    return (
        <Reveal.Slide {...props} onReveal={onReveal}>
            <Card
                {...props}
                bodyAlignment={props.alt ? "right" : "left"}
                hasRevealed={hasRevealed}
                isReveal
            />
        </Reveal.Slide>
    );
};

export const Roll = (props: ICardProps & IRevealProps) => {
    const [hasRevealed, setHasRevealed] = React.useState(false);

    const onReveal = () => setHasRevealed(true);

    return (
        <Reveal.Roll {...props} onReveal={onReveal}>
            <Card
                {...props}
                bodyAlignment={props.alt ? "right" : "left"}
                hasRevealed={hasRevealed}
                isReveal
            />
        </Reveal.Roll>
    );
};

export const LightSpeed = (props: ICardProps & IRevealProps) => {
    const [hasRevealed, setHasRevealed] = React.useState(false);

    const onReveal = () => setHasRevealed(true);

    return (
        <Reveal.LightSpeed {...props} onReveal={onReveal}>
            <Card
                {...props}
                bodyAlignment={props.alt ? "right" : "left"}
                hasRevealed={hasRevealed}
                isReveal
            />
        </Reveal.LightSpeed>
    );
};

export const Jump = (props: ICardProps & IRevealProps) => {
    const [hasRevealed, setHasRevealed] = React.useState(false);

    const onReveal = () => setHasRevealed(true);

    return (
        <RevealJump {...props} onReveal={onReveal}>
            <Card
                {...props}
                bodyAlignment={props.alt ? "right" : "left"}
                hasRevealed={hasRevealed}
                isReveal
            />
        </RevealJump>
    );
};

export const Flash = (props: ICardProps & IRevealProps) => {
    const [hasRevealed, setHasRevealed] = React.useState(false);

    const onReveal = () => setHasRevealed(true);

    return (
        <RevealFlash {...props} onReveal={onReveal}>
            <Card
                {...props}
                bodyAlignment={props.alt ? "right" : "left"}
                hasRevealed={hasRevealed}
                isReveal
            />
        </RevealFlash>
    );
};

export const HeadShake = (props: ICardProps & IRevealProps) => {
    const [hasRevealed, setHasRevealed] = React.useState(false);

    const onReveal = () => setHasRevealed(true);

    return (
        <RevealHeadShake {...props} onReveal={onReveal}>
            <Card
                {...props}
                bodyAlignment={props.alt ? "right" : "left"}
                hasRevealed={hasRevealed}
                isReveal
            />
        </RevealHeadShake>
    );
};

export const Jello = (props: ICardProps & IRevealProps) => {
    const [hasRevealed, setHasRevealed] = React.useState(false);

    const onReveal = () => setHasRevealed(true);

    return (
        <RevealJello {...props} onReveal={onReveal}>
            <Card
                {...props}
                bodyAlignment={props.alt ? "right" : "left"}
                hasRevealed={hasRevealed}
                isReveal
            />
        </RevealJello>
    );
};

export const Pulse = (props: ICardProps & IRevealProps) => {
    const [hasRevealed, setHasRevealed] = React.useState(false);

    const onReveal = () => setHasRevealed(true);

    return (
        <RevealPulse {...props} onReveal={onReveal}>
            <Card
                {...props}
                bodyAlignment={props.alt ? "right" : "left"}
                hasRevealed={hasRevealed}
                isReveal
            />
        </RevealPulse>
    );
};

export const RubberBand = (props: ICardProps & IRevealProps) => {
    const [hasRevealed, setHasRevealed] = React.useState(false);

    const onReveal = () => setHasRevealed(true);

    return (
        <RevealRubberBand {...props} onReveal={onReveal}>
            <Card
                {...props}
                bodyAlignment={props.alt ? "right" : "left"}
                hasRevealed={hasRevealed}
                isReveal
            />
        </RevealRubberBand>
    );
};

export const Shake = (props: ICardProps & IRevealProps) => {
    const [hasRevealed, setHasRevealed] = React.useState(false);

    const onReveal = () => setHasRevealed(true);

    return (
        <RevealShake {...props} onReveal={onReveal}>
            <Card
                {...props}
                bodyAlignment={props.alt ? "right" : "left"}
                hasRevealed={hasRevealed}
                isReveal
            />
        </RevealShake>
    );
};

export const Spin = (props: ICardProps & IRevealProps) => {
    const [hasRevealed, setHasRevealed] = React.useState(false);

    const onReveal = () => setHasRevealed(true);

    return (
        <RevealSpin {...props} onReveal={onReveal}>
            <Card
                {...props}
                bodyAlignment={props.alt ? "right" : "left"}
                hasRevealed={hasRevealed}
                isReveal
            />
        </RevealSpin>
    );
};

export const Swing = (props: ICardProps & IRevealProps) => {
    const [hasRevealed, setHasRevealed] = React.useState(false);

    const onReveal = () => setHasRevealed(true);

    return (
        <RevealSwing {...props} onReveal={onReveal}>
            <Card
                {...props}
                bodyAlignment={props.alt ? "right" : "left"}
                hasRevealed={hasRevealed}
                isReveal
            />
        </RevealSwing>
    );
};

export const Tada = (props: ICardProps & IRevealProps) => {
    const [hasRevealed, setHasRevealed] = React.useState(false);

    const onReveal = () => setHasRevealed(true);

    return (
        <RevealTada {...props} onReveal={onReveal}>
            <Card
                {...props}
                bodyAlignment={props.alt ? "right" : "left"}
                hasRevealed={hasRevealed}
                isReveal
            />
        </RevealTada>
    );
};

export const Wobble = (props: ICardProps & IRevealProps) => {
    const [hasRevealed, setHasRevealed] = React.useState(false);

    const onReveal = () => setHasRevealed(true);

    return (
        <RevealWobble {...props} onReveal={onReveal}>
            <Card
                {...props}
                bodyAlignment={props.alt ? "right" : "left"}
                hasRevealed={hasRevealed}
                isReveal
            />
        </RevealWobble>
    );
};
