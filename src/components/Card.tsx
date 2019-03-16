import * as _ from "lodash";
import React from "react";
import { connect } from "react-redux";
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
import { THEME_TRANSITION_TIME } from "src/config/config";
import { fonts, ITheme } from "src/modules/CSS";
import styled, { ThemeProvider } from "styled-components";

import { BREAKPOINTS } from "src/config";

type IChildren = React.ReactNode;
type IRenderer = (props: { children?: IChildren }) => JSX.Element;
type IBodyAlignment = "left" | "right";

interface ISCProps {
    className?: string;
}

interface IStateProps {
    readonly theme: ITheme;
}

interface IInternalProps {
    bodyAlignment?: IBodyAlignment;
    delay?: number;
    duration?: number;
    hasRevealed?: boolean;
}
interface IThemeProviderProps {
    theme: IInternalProps & IStateProps & IOwnProps;
}

interface IOwnProps {
    /**
     * Defines the Content container
     */
    ContentRenderer?: IRenderer;

    /**
     * Defines the Header container
     */
    HeaderRenderer?: IRenderer;

    /**
     * Defines the Title container
     */
    TitleRenderer?: IRenderer;
    /**
     * Rendered inside the Title container
     */
    title?: IChildren;

    /**
     * Defines the Subtitle container
     */
    SubtitleRenderer?: IRenderer;
    /**
     * Rendered inside the Subtitle container
     */
    subtitle?: IChildren;

    /**
     * On mobile, hides part of the header to give a desktop like look
     */
    HeaderHiderRenderer?: IRenderer;

    /**
     * Defines the Body container
     */
    BodyRenderer?: IRenderer;
    /**
     * Rendered inside the Body container
     */
    children?: IChildren;

    /**
     * Defines the Image container
     */
    ImageRenderer?: IRenderer;
    /**
     * Defines the ImageHider container. Hides part of the image.
     */
    ImageHiderRenderer?: IRenderer;

    /**
     * The url to the image
     */
    imageUrl?: string;

    /**
     * Will be rendered between the Header and Body (if Header exists)
     */
    headerSeparator?: IRenderer;

    /**
     * Animate the Card internal content on viewport entry
     */
    animate?: boolean;
}

const mapStateToProps = ({ theme }: IStoreState): IStateProps => ({
    theme,
});

// CARD TITLE

const Title = styled.h1`
    font-size: 4rem;
    font-family: ${fonts.roboto.family};

    @media (max-width: ${BREAKPOINTS.smpx}) {
        position: relative;
        z-index: 2;
        text-align: ${({ theme: { bodyAlignment } }: IThemeProviderProps) =>
            bodyAlignment == "left" ? "left" : "right"};
    }
`;

// CARD SUBTITLE

const Subtitle = styled.h2`
    font-size: 2.25rem;
    color: ${({ theme: { theme } }: IThemeProviderProps) =>
        theme.colors.cardSubtitle};
    font-family: ${fonts.openSans.family};

    @media (max-width: ${BREAKPOINTS.smpx}) {
        position: relative;
        z-index: 2;
        text-align: ${({ theme: { bodyAlignment } }: IThemeProviderProps) =>
            bodyAlignment == "left" ? "left" : "right"};
    }
`;

// CARD HEADER HIDER

const HeaderHider = styled.div`
    @media (max-width: ${BREAKPOINTS.smpx}) {
        background: ${({ theme: { theme } }: IThemeProviderProps) =>
            theme.colors.card};
        transition: all ${THEME_TRANSITION_TIME}s;
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 1;
        top: 0;
        left: 0;
        box-shadow: 0 0 1.5rem
            ${({ theme: { theme } }: IThemeProviderProps) =>
                theme.colors.cardShadow};
        transform: ${({ theme: { bodyAlignment } }: IThemeProviderProps) =>
            bodyAlignment == "left"
                ? "skew(70deg) translateX(-35%)"
                : "skew(-70deg) translateX(35%)"};
    }
`;

// CARD HEADER

const Header = styled.div`
    @media (max-width: ${BREAKPOINTS.smpx}) {
        background:
            url("${({ theme: { imageUrl } }: IThemeProviderProps) => imageUrl}")
            center center / cover no-repeat;
        overflow-y: auto;
        overflow-x: hidden;
        padding: 0.5% 3%;
        position: relative;
    }
`;

// CARD BODY

const Body = styled.div`
    @media (max-width: ${BREAKPOINTS.smpx}) {
        padding: 2% 3%;
    }
`;

// CARD CONTENT

const Content = styled.div`
    grid-column-start: ${({ theme: { bodyAlignment } }: IThemeProviderProps) =>
        bodyAlignment == "left" ? 1 : 2};
    padding: 2% 3%;

    @media (max-width: ${BREAKPOINTS.smpx}) {
        grid-column-start: 1;
        padding: 0;
    }
`;

// CARD IMAGE HIDER

const ImageHider = styled.div`
    background: ${({ theme: { theme } }: IThemeProviderProps) =>
        theme.colors.card};
    transform: ${({ theme: { bodyAlignment } }: IThemeProviderProps) =>
        bodyAlignment == "left"
            ? "skew(10deg) translateX(-70%)"
            : "skew(-10deg) translateX(70%)"};
    transition: all ${THEME_TRANSITION_TIME}s;
    width: 100%;
    height: 100%;
    box-shadow: 0 0 1.5rem
        ${({ theme: { theme } }: IThemeProviderProps) =>
            theme.colors.cardShadow};
`;

// CARD IMAGE

const Image = styled.div`
    @media (min-width: ${BREAKPOINTS.smpx}) {
    grid-column-start: ${({ theme: { bodyAlignment } }: IThemeProviderProps) =>
        bodyAlignment == "left" ? 2 : 1};
    background-size: cover;
    position: relative;
    overflow: hidden;
    background:
        url("${({ theme: { imageUrl } }: IThemeProviderProps) => imageUrl}")
        center center / cover no-repeat;
    }
`;

// CARD

const defaultProps: {
    bodyAlignment: IBodyAlignment;
    animate: boolean;
    delay: number;
    duration: number;
} = {
    bodyAlignment: "left",
    animate: false,
    delay: 0,
    duration: 1000,
};

const Card = connect(mapStateToProps)(
    styled((props: IOwnProps & ISCProps & IInternalProps & IStateProps) => {
        const {
            ContentRenderer,
            HeaderRenderer,
            title,
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
        const CImage = ImageRenderer || ((imageUrl && Image) || (() => null));
        const CImageHider = ImageHiderRenderer || ImageHider;

        const themeValue: IStateProps & IInternalProps & IOwnProps = {
            bodyAlignment,
            theme,
            imageUrl,
        };

        const baseDelay = delay + duration;
        const AnimateSide = animate
            ? ({
                  children,
                  delay = 0,
              }: {
                  children: JSX.Element;
                  delay?: number;
              }) => (
                  <Reveal.Fade
                      left={bodyAlignment == "left"}
                      right={bodyAlignment == "right"}
                      delay={baseDelay + delay}
                      children={children}
                      appear={hasRevealed}
                  />
              )
            : ({ children }: { children: JSX.Element }) => (
                  <div children={children} />
              );

        return (
            <ThemeProvider theme={themeValue}>
                <div className={className}>
                    {bodyAlignment == "right" && (
                        <CImage>
                            <CImageHider />
                        </CImage>
                    )}
                    <CContent>
                        {renderHeader && (
                            <CHeader>
                                <AnimateSide>
                                    <>
                                        {title && <CTitle children={title} />}
                                        {subtitle && (
                                            <CSubtitle children={subtitle} />
                                        )}
                                        <CHeaderHider />
                                    </>
                                </AnimateSide>
                            </CHeader>
                        )}

                        {renderHeader &&
                            children &&
                            (headerSeparator || (
                                <AnimateSide delay={250} children={<hr />} />
                            ))}

                        {children && (
                            <AnimateSide
                                delay={500}
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
    })`
        background: ${({ theme }: IStateProps) => theme.colors.card};
        width: 75%;
        display: grid;
        margin: 5% auto;
        box-shadow: 0 0.5rem 0.5rem
            ${({ theme }: IStateProps) => theme.colors.cardShadow};
        border-radius: 0.25em;
        font-size: 2.3rem;
        color: ${({ theme }: IStateProps) => theme.colors.defaultText};
        transition: all ${THEME_TRANSITION_TIME}s;
        text-align: justify;
        overflow: hidden;

        @media (max-width: ${BREAKPOINTS.smpx}) {
            font-size: 4rem;
        }

        @media (min-width: ${BREAKPOINTS.smpx}) {
            grid-gap: 1rem;
            grid-template-columns: ${({
                imageUrl,
                bodyAlignment = defaultProps.bodyAlignment,
            }: IOwnProps & IInternalProps) =>
                imageUrl
                    ? bodyAlignment == "left"
                        ? "75% 25%"
                        : "25% 75%"
                    : "100%"};
        }
    `,
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
export default (props: IOwnProps) => <Card {...props} bodyAlignment="left" />;

/**
 * Shows text to the right (when there's an image)
 */
export const Alt = (props: IOwnProps) => (
    <Card {...props} bodyAlignment="right" />
);

/// --- ANIMATED ON VIEWPORT ENTER ---///

export const Fade = (props: IOwnProps & IRevealProps) => {
    const [hasRevealed, setHasRevealed] = React.useState(false);

    const onReveal = () => setHasRevealed(true);

    return (
        <Reveal.Fade {...props} onReveal={onReveal}>
            <Card
                {...props}
                bodyAlignment={props.alt ? "right" : "left"}
                hasRevealed={hasRevealed}
            />
        </Reveal.Fade>
    );
};

export const Flip = (props: IOwnProps & IRevealProps) => {
    const [hasRevealed, setHasRevealed] = React.useState(false);

    const onReveal = () => setHasRevealed(true);

    return (
        <Reveal.Flip {...props} onReveal={onReveal}>
            <Card
                {...props}
                bodyAlignment={props.alt ? "right" : "left"}
                hasRevealed={hasRevealed}
            />
        </Reveal.Flip>
    );
};

export const Rotate = (props: IOwnProps & IRevealProps) => {
    const [hasRevealed, setHasRevealed] = React.useState(false);

    const onReveal = () => setHasRevealed(true);

    return (
        <Reveal.Rotate {...props} onReveal={onReveal}>
            <Card
                {...props}
                bodyAlignment={props.alt ? "right" : "left"}
                hasRevealed={hasRevealed}
            />
        </Reveal.Rotate>
    );
};

export const Zoom = (props: IOwnProps & IRevealProps) => {
    const [hasRevealed, setHasRevealed] = React.useState(false);

    const onReveal = () => setHasRevealed(true);

    return (
        <Reveal.Zoom {...props} onReveal={onReveal}>
            <Card
                {...props}
                bodyAlignment={props.alt ? "right" : "left"}
                hasRevealed={hasRevealed}
            />
        </Reveal.Zoom>
    );
};

export const Bounce = (props: IOwnProps & IRevealProps) => {
    const [hasRevealed, setHasRevealed] = React.useState(false);

    const onReveal = () => setHasRevealed(true);

    return (
        <Reveal.Bounce {...props} onReveal={onReveal}>
            <Card
                {...props}
                bodyAlignment={props.alt ? "right" : "left"}
                hasRevealed={hasRevealed}
            />
        </Reveal.Bounce>
    );
};

export const Slide = (props: IOwnProps & IRevealProps) => {
    const [hasRevealed, setHasRevealed] = React.useState(false);

    const onReveal = () => setHasRevealed(true);

    return (
        <Reveal.Slide {...props} onReveal={onReveal}>
            <Card
                {...props}
                bodyAlignment={props.alt ? "right" : "left"}
                hasRevealed={hasRevealed}
            />
        </Reveal.Slide>
    );
};

export const Roll = (props: IOwnProps & IRevealProps) => {
    const [hasRevealed, setHasRevealed] = React.useState(false);

    const onReveal = () => setHasRevealed(true);

    return (
        <Reveal.Roll {...props} onReveal={onReveal}>
            <Card
                {...props}
                bodyAlignment={props.alt ? "right" : "left"}
                hasRevealed={hasRevealed}
            />
        </Reveal.Roll>
    );
};

export const LightSpeed = (props: IOwnProps & IRevealProps) => {
    const [hasRevealed, setHasRevealed] = React.useState(false);

    const onReveal = () => setHasRevealed(true);

    return (
        <Reveal.LightSpeed {...props} onReveal={onReveal}>
            <Card
                {...props}
                bodyAlignment={props.alt ? "right" : "left"}
                hasRevealed={hasRevealed}
            />
        </Reveal.LightSpeed>
    );
};

export const Jump = (props: IOwnProps & IRevealProps) => {
    const [hasRevealed, setHasRevealed] = React.useState(false);

    const onReveal = () => setHasRevealed(true);

    return (
        <RevealJump {...props} onReveal={onReveal}>
            <Card
                {...props}
                bodyAlignment={props.alt ? "right" : "left"}
                hasRevealed={hasRevealed}
            />
        </RevealJump>
    );
};

export const Flash = (props: IOwnProps & IRevealProps) => {
    const [hasRevealed, setHasRevealed] = React.useState(false);

    const onReveal = () => setHasRevealed(true);

    return (
        <RevealFlash {...props} onReveal={onReveal}>
            <Card
                {...props}
                bodyAlignment={props.alt ? "right" : "left"}
                hasRevealed={hasRevealed}
            />
        </RevealFlash>
    );
};

export const HeadShake = (props: IOwnProps & IRevealProps) => {
    const [hasRevealed, setHasRevealed] = React.useState(false);

    const onReveal = () => setHasRevealed(true);

    return (
        <RevealHeadShake {...props} onReveal={onReveal}>
            <Card
                {...props}
                bodyAlignment={props.alt ? "right" : "left"}
                hasRevealed={hasRevealed}
            />
        </RevealHeadShake>
    );
};

export const Jello = (props: IOwnProps & IRevealProps) => {
    const [hasRevealed, setHasRevealed] = React.useState(false);

    const onReveal = () => setHasRevealed(true);

    return (
        <RevealJello {...props} onReveal={onReveal}>
            <Card
                {...props}
                bodyAlignment={props.alt ? "right" : "left"}
                hasRevealed={hasRevealed}
            />
        </RevealJello>
    );
};

export const Pulse = (props: IOwnProps & IRevealProps) => {
    const [hasRevealed, setHasRevealed] = React.useState(false);

    const onReveal = () => setHasRevealed(true);

    return (
        <RevealPulse {...props} onReveal={onReveal}>
            <Card
                {...props}
                bodyAlignment={props.alt ? "right" : "left"}
                hasRevealed={hasRevealed}
            />
        </RevealPulse>
    );
};

export const RubberBand = (props: IOwnProps & IRevealProps) => {
    const [hasRevealed, setHasRevealed] = React.useState(false);

    const onReveal = () => setHasRevealed(true);

    return (
        <RevealRubberBand {...props} onReveal={onReveal}>
            <Card
                {...props}
                bodyAlignment={props.alt ? "right" : "left"}
                hasRevealed={hasRevealed}
            />
        </RevealRubberBand>
    );
};

export const Shake = (props: IOwnProps & IRevealProps) => {
    const [hasRevealed, setHasRevealed] = React.useState(false);

    const onReveal = () => setHasRevealed(true);

    return (
        <RevealShake {...props} onReveal={onReveal}>
            <Card
                {...props}
                bodyAlignment={props.alt ? "right" : "left"}
                hasRevealed={hasRevealed}
            />
        </RevealShake>
    );
};

export const Spin = (props: IOwnProps & IRevealProps) => {
    const [hasRevealed, setHasRevealed] = React.useState(false);

    const onReveal = () => setHasRevealed(true);

    return (
        <RevealSpin {...props} onReveal={onReveal}>
            <Card
                {...props}
                bodyAlignment={props.alt ? "right" : "left"}
                hasRevealed={hasRevealed}
            />
        </RevealSpin>
    );
};

export const Swing = (props: IOwnProps & IRevealProps) => {
    const [hasRevealed, setHasRevealed] = React.useState(false);

    const onReveal = () => setHasRevealed(true);

    return (
        <RevealSwing {...props} onReveal={onReveal}>
            <Card
                {...props}
                bodyAlignment={props.alt ? "right" : "left"}
                hasRevealed={hasRevealed}
            />
        </RevealSwing>
    );
};

export const Tada = (props: IOwnProps & IRevealProps) => {
    const [hasRevealed, setHasRevealed] = React.useState(false);

    const onReveal = () => setHasRevealed(true);

    return (
        <RevealTada {...props} onReveal={onReveal}>
            <Card
                {...props}
                bodyAlignment={props.alt ? "right" : "left"}
                hasRevealed={hasRevealed}
            />
        </RevealTada>
    );
};

export const Wobble = (props: IOwnProps & IRevealProps) => {
    const [hasRevealed, setHasRevealed] = React.useState(false);

    const onReveal = () => setHasRevealed(true);

    return (
        <RevealWobble {...props} onReveal={onReveal}>
            <Card
                {...props}
                bodyAlignment={props.alt ? "right" : "left"}
                hasRevealed={hasRevealed}
            />
        </RevealWobble>
    );
};
