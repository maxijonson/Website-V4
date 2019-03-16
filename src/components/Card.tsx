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
const defaultBodyAlignment: IBodyAlignment = "left";

interface ISCProps {
    className?: string;
}

interface IStateProps {
    readonly theme: ITheme;
}

interface IInternalProps extends IStateProps {
    bodyAlignment?: IBodyAlignment;
}
interface IThemeProviderProps {
    theme: IInternalProps & IOwnProps;
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
            bodyAlignment = defaultBodyAlignment,
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

        const themeValue: IInternalProps & IOwnProps = {
            bodyAlignment,
            theme,
            imageUrl,
        };

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
                                {title && <CTitle children={title} />}
                                {subtitle && <CSubtitle children={subtitle} />}
                                <CHeaderHider />
                            </CHeader>
                        )}

                        {renderHeader &&
                            children &&
                            (headerSeparator || <hr />)}

                        {children && <CBody children={children} />}
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
                bodyAlignment = defaultBodyAlignment,
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
    big?: boolean;
    bottom?: boolean;
    cascade?: boolean;
    count?: number;
    delay?: number;
    distance?: string;
    duration?: number;
    forever?: boolean;
    fraction?: number;
    left?: boolean;
    mirror?: boolean;
    opposite?: boolean;
    out?: boolean;
    right?: boolean;
    spy?: any;
    timeout?: number;
    top?: boolean;
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

export const Fade = (props: IOwnProps & IRevealProps) => (
    <Reveal.Fade {...props}>
        <Card {...props} bodyAlignment={props.alt ? "right" : "left"} />
    </Reveal.Fade>
);

export const Flip = (props: IOwnProps & IRevealProps) => (
    <Reveal.Flip {...props}>
        <Card {...props} bodyAlignment={props.alt ? "right" : "left"} />
    </Reveal.Flip>
);

export const Rotate = (props: IOwnProps & IRevealProps) => (
    <Reveal.Rotate {...props}>
        <Card {...props} bodyAlignment={props.alt ? "right" : "left"} />
    </Reveal.Rotate>
);

export const Zoom = (props: IOwnProps & IRevealProps) => (
    <Reveal.Zoom {...props}>
        <Card {...props} bodyAlignment={props.alt ? "right" : "left"} />
    </Reveal.Zoom>
);

export const Bounce = (props: IOwnProps & IRevealProps) => (
    <Reveal.Bounce {...props}>
        <Card {...props} bodyAlignment={props.alt ? "right" : "left"} />
    </Reveal.Bounce>
);

export const Slide = (props: IOwnProps & IRevealProps) => (
    <Reveal.Slide {...props}>
        <Card {...props} bodyAlignment={props.alt ? "right" : "left"} />
    </Reveal.Slide>
);

export const Roll = (props: IOwnProps & IRevealProps) => (
    <Reveal.Roll {...props}>
        <Card {...props} bodyAlignment={props.alt ? "right" : "left"} />
    </Reveal.Roll>
);

export const LightSpeed = (props: IOwnProps & IRevealProps) => (
    <Reveal.LightSpeed {...props}>
        <Card {...props} bodyAlignment={props.alt ? "right" : "left"} />
    </Reveal.LightSpeed>
);

export const Jump = (props: IOwnProps & IRevealProps) => (
    <RevealJump {...props}>
        <Card {...props} bodyAlignment={props.alt ? "right" : "left"} />
    </RevealJump>
);

export const Flash = (props: IOwnProps & IRevealProps) => (
    <RevealFlash {...props}>
        <Card {...props} bodyAlignment={props.alt ? "right" : "left"} />
    </RevealFlash>
);

export const HeadShake = (props: IOwnProps & IRevealProps) => (
    <RevealHeadShake {...props}>
        <Card {...props} bodyAlignment={props.alt ? "right" : "left"} />
    </RevealHeadShake>
);

export const Jello = (props: IOwnProps & IRevealProps) => (
    <RevealJello {...props}>
        <Card {...props} bodyAlignment={props.alt ? "right" : "left"} />
    </RevealJello>
);

export const Pulse = (props: IOwnProps & IRevealProps) => (
    <RevealPulse {...props}>
        <Card {...props} bodyAlignment={props.alt ? "right" : "left"} />
    </RevealPulse>
);

export const RubberBand = (props: IOwnProps & IRevealProps) => (
    <RevealRubberBand {...props}>
        <Card {...props} bodyAlignment={props.alt ? "right" : "left"} />
    </RevealRubberBand>
);

export const Shake = (props: IOwnProps & IRevealProps) => (
    <RevealShake {...props}>
        <Card {...props} bodyAlignment={props.alt ? "right" : "left"} />
    </RevealShake>
);

export const Spin = (props: IOwnProps & IRevealProps) => (
    <RevealSpin {...props}>
        <Card {...props} bodyAlignment={props.alt ? "right" : "left"} />
    </RevealSpin>
);

export const Swing = (props: IOwnProps & IRevealProps) => (
    <RevealSwing {...props}>
        <Card {...props} bodyAlignment={props.alt ? "right" : "left"} />
    </RevealSwing>
);

export const Tada = (props: IOwnProps & IRevealProps) => (
    <RevealTada {...props}>
        <Card {...props} bodyAlignment={props.alt ? "right" : "left"} />
    </RevealTada>
);

export const Wobble = (props: IOwnProps & IRevealProps) => (
    <RevealWobble {...props}>
        <Card {...props} bodyAlignment={props.alt ? "right" : "left"} />
    </RevealWobble>
);
