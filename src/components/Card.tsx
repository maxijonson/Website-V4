import React from "react";
import { connect } from "react-redux";
import { THEME_TRANSITION_TIME } from "src/config/config";
import { fonts, ITheme } from "src/modules/CSS";
import styled from "styled-components";

import { BREAKPOINTS } from "src/config";

interface IStyledProps {
    className?: string;
}

type Alignment = "right" | "left";
interface ICommonProps {
    bodyAlignment?: Alignment;
}

interface ICardTitleProps extends IStyledProps, ICommonProps {
    title?: JSX.Element | string;
}

interface ICardSubtitleProps extends IStyledProps, ICommonProps {
    subtitle?: JSX.Element | string;
}

type ICardHeaderProps = ICardTitleProps & ICardSubtitleProps & ICardImageProps;

interface ICardBodyProps extends IStyledProps {
    body?: JSX.Element | string;
}

type ICardContentProps = ICardTitleProps &
    ICardSubtitleProps &
    ICardImageProps &
    ICardBodyProps;

interface ICardImageProps extends IStyledProps, ICommonProps {
    backgroundUrl?: string;
}

interface IStateProps {
    theme: ITheme;
}

interface IOwnProps {
    children: JSX.Element | string;
}

type CardProps = ICardTitleProps &
    ICardSubtitleProps &
    ICardContentProps &
    ICardImageProps &
    IStyledProps &
    ICommonProps &
    IOwnProps &
    IStateProps;

const mapStateToProps = ({ theme }: IStoreState): IStateProps => ({
    theme,
});

// CARD TITLE

const CardTitle = styled(({ title, className }: ICardTitleProps) => (
    <h1 className={className}>{title}</h1>
))`
    font-size: 4rem;
    font-family: ${fonts.roboto.family};

    @media (max-width: ${BREAKPOINTS.smpx}) {
        position: relative;
        z-index: 2;
        text-align: ${({ bodyAlignment }: ICardSubtitleProps) =>
            bodyAlignment == "left" ? "left" : "right"};
    }
`;

// CARD SUBTITLE

const CardSubtitle = connect(mapStateToProps)(
    styled(({ subtitle, className }: ICardSubtitleProps) => (
        <h2 className={className}>{subtitle}</h2>
    ))`
        font-size: 2.25rem;
        color: ${({ theme }: IStateProps) => theme.colors.cardSubtitle};
        font-family: ${fonts.openSans.family};

        @media (max-width: ${BREAKPOINTS.smpx}) {
            position: relative;
            z-index: 2;
            text-align: ${({ bodyAlignment }: ICardSubtitleProps) =>
                bodyAlignment == "left" ? "left" : "right"};
        }
    `,
);

// CARD HEADER HIDER

const CardHeaderHider = connect(mapStateToProps)(
    styled.div<ICardImageProps>`
        @media (max-width: ${BREAKPOINTS.smpx}) {
            background: ${({ theme }: IStateProps) => theme.colors.card};
            transition: all ${THEME_TRANSITION_TIME}s;
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 1;
            top: 0;
            left: 0;
            box-shadow: 0 0 1.5rem
                ${({ theme }: IStateProps) => theme.colors.cardShadow};
            transform: ${({ bodyAlignment }: ICardImageProps) =>
                bodyAlignment == "left"
                    ? "skew(70deg) translateX(-35%)"
                    : "skew(-70deg) translateX(35%)"};
        }
    `,
);

// CARD HEADER

const CardHeader = styled(
    ({ title, subtitle, className, bodyAlignment }: ICardHeaderProps) => (
        <>
            <div className={className}>
                <CardHeaderHider bodyAlignment={bodyAlignment} />
                {title && (
                    <CardTitle bodyAlignment={bodyAlignment} title={title} />
                )}
                {subtitle && (
                    <CardSubtitle
                        bodyAlignment={bodyAlignment}
                        subtitle={subtitle}
                    />
                )}
            </div>
        </>
    ),
)`
    @media (max-width: ${BREAKPOINTS.smpx}) {
        background:
            url("${({ backgroundUrl }) => backgroundUrl}")
            center center / cover no-repeat;
        overflow-y: auto;
        overflow-x: hidden;
        padding: 0.5% 3%;
        position: relative;
    }
`;

// CARD BODY

const CardBody = styled(({ body, className }: ICardBodyProps) => (
    <p className={className}>{body}</p>
))`
    @media (max-width: ${BREAKPOINTS.smpx}) {
        padding: 0.5% 3%;
    }
`;

// CARD CONTENT

const CardContent = styled(
    ({
        title,
        subtitle,
        body,
        className,
        backgroundUrl,
        bodyAlignment,
    }: ICardContentProps) => (
        <div className={className}>
            <CardHeader
                backgroundUrl={backgroundUrl}
                title={title}
                subtitle={subtitle}
                bodyAlignment={bodyAlignment}
            />
            {(!!title || !!subtitle) && <hr />}
            <CardBody body={body} />
        </div>
    ),
)`
    grid-column-start: ${({ bodyAlignment }: ICardContentProps) =>
        bodyAlignment == "left" ? 1 : 2};
    padding: 0.5% 3%;

    @media (max-width: ${BREAKPOINTS.smpx}) {
        grid-column-start: 1;
        padding: 0;
    }
`;

// CARD IMAGE HIDER

const CardImageHider = connect(mapStateToProps)(
    styled.div<ICardImageProps>`
        background: ${({ theme }: IStateProps) => theme.colors.card};
        transform: ${({ bodyAlignment }: ICardImageProps) =>
            bodyAlignment == "left"
                ? "skew(10deg) translateX(-70%)"
                : "skew(-10deg) translateX(70%)"};
        transition: all ${THEME_TRANSITION_TIME}s;
        width: 100%;
        height: 100%;
        box-shadow: 0 0 1.5rem
            ${({ theme }: IStateProps) => theme.colors.cardShadow};
    `,
);

// CARD IMAGE

const CardImage = styled(
    ({ backgroundUrl, className, bodyAlignment }: ICardImageProps) => (
        <div className={className}>
            <CardImageHider
                bodyAlignment={bodyAlignment}
                backgroundUrl={backgroundUrl}
            />
        </div>
    ),
)`
    grid-column-start: ${({ bodyAlignment }: ICardImageProps) =>
        bodyAlignment == "left" ? 2 : 1};
    background-size: cover;
    position: relative;
    overflow: hidden;
    background:
        url("${({ backgroundUrl }) => backgroundUrl}")
        center center / cover no-repeat;
`;

// CARD

const Base = styled.div`
    background: ${({ theme }: IStateProps) => theme.colors.card};
    width: 75%;
    display: grid;
    margin: 5% auto;
    box-shadow: 0.5rem 0.75rem 2.5rem
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
        /* grid-template-columns: ${({
            backgroundUrl,
            bodyAlignment = "left",
        }: CardProps) =>
            backgroundUrl
                ? bodyAlignment == "left"
                    ? "75% 25%"
                    : "25% 75%"
                : "100%"}; */
    }
`;

export const Primary = connect(mapStateToProps)(
    Base.withComponent(styled(
        ({
            title,
            subtitle,
            backgroundUrl,
            children,
            className,
            bodyAlignment = "left",
        }: CardProps) => (
            <div className={className}>
                <>
                    <CardContent
                        title={title}
                        subtitle={subtitle}
                        body={children}
                        bodyAlignment={bodyAlignment}
                        backgroundUrl={backgroundUrl}
                    />
                    {backgroundUrl && (
                        <CardImage
                            bodyAlignment={bodyAlignment}
                            backgroundUrl={backgroundUrl}
                        />
                    )}
                </>
            </div>
        ),
    )`
        @media (min-width: ${BREAKPOINTS.smpx}) {
            grid-template-columns: ${({ backgroundUrl }: CardProps) =>
                backgroundUrl ? "75% 25%" : "100%"};
        }
    `),
);

export const Alt = connect(mapStateToProps)(
    Base.withComponent(styled(
        ({
            title,
            subtitle,
            backgroundUrl,
            children,
            className,
            bodyAlignment = "right",
        }: CardProps) => (
            <div className={className}>
                <>
                    {backgroundUrl && (
                        <CardImage
                            bodyAlignment={bodyAlignment}
                            backgroundUrl={backgroundUrl}
                        />
                    )}
                    <CardContent
                        title={title}
                        subtitle={subtitle}
                        body={children}
                        bodyAlignment={bodyAlignment}
                        backgroundUrl={backgroundUrl}
                    />
                </>
            </div>
        ),
    )`
        @media (min-width: ${BREAKPOINTS.smpx}) {
            grid-template-columns: ${({ backgroundUrl }: CardProps) =>
                backgroundUrl ? "25% 75%" : "100%"};
        }
    `),
);
