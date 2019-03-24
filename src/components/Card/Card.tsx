import * as _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { CardCatcher } from "src/components/Card/CardCatcher";
import { BREAKPOINTS } from "src/config";
import { THEME_TRANSITION_TIME } from "src/config/config";
import { fonts } from "src/modules/CSS";
import styled, { ThemeProvider } from "styled-components";
import tinycolor from "tinycolor2";
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

// Footer

const Footer = styled.div`
    font-family: "${fonts.roboto.family}";
    font-size: 1.6rem;
    color: ${({ theme: { theme } }: ICardThemeProviderProps) => {
        const color = tinycolor(theme.colors.defaultText);
        theme.name == "light" ? color.lighten(25) : color.darken(25);
        return color.toRgbString();
    }};
`;

// CARD

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
                footerSeparator,
                FooterRenderer,
                footer,
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

            // Footer
            const CFooter = FooterRenderer || Footer;

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

            return (
                <ThemeProvider theme={themeValue}>
                    <div className={`${className} ${cardClassName || ""}`}>
                        {bodyAlignment == "right" && (
                            <Image className="card-image  card-bodyAlignment-right">
                                <CImageHider className="card-image-hider  card-bodyAlignment-right" />
                            </Image>
                        )}
                        <CContent className="card-content">
                            {renderHeader && (
                                <CHeader className="card-header">
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
                                                <CTitle
                                                    children={title}
                                                    className="card-title"
                                                />
                                            )}
                                            {subtitle && (
                                                <CSubtitle
                                                    children={subtitle}
                                                    className="card-subtitle"
                                                />
                                            )}
                                        </div>
                                    </AnimateSide>
                                    <CHeaderHider className="card-header-hider" />
                                </CHeader>
                            )}
                            {renderHeader &&
                                children &&
                                (headerSeparator || (
                                    <AnimateSide
                                        delay={250}
                                        children={
                                            <hr className="card-hr header" />
                                        }
                                    />
                                ))}

                            {children && (
                                <AnimateSide
                                    delay={500}
                                    onReveal={onRevealTrigger}
                                    children={
                                        <CBody
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
                                        children={
                                            <hr className="card-hr footer" />
                                        }
                                    />
                                ))}

                            {footer && (
                                <AnimateSide
                                    delay={1000}
                                    children={<CFooter children={footer} />}
                                />
                            )}
                        </CContent>
                        {bodyAlignment == "left" && (
                            <CImage className="card-image  card-bodyAlignment-left">
                                <CImageHider className="card-image-hider card-bodyAlignment-left" />
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
