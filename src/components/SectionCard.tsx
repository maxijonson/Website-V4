import React from "react";
import { connect } from "react-redux";
import { THEME_TRANSITION_TIME } from "src/config/config";
import { fonts, ITheme } from "src/modules/CSS";
import styled from "styled-components";

interface IStyledProps {
    className?: string;
}

type Alignment = "right" | "left";
interface ICommonProps {
    bodyAlignment?: Alignment;
}

interface ISectionCardTitleProps extends IStyledProps {
    title?: JSX.Element | string;
}

interface ISectionCardSubtitleProps extends IStyledProps {
    subtitle?: JSX.Element | string;
}

interface ISectionCardBodyProps
    extends ISectionCardTitleProps,
        ISectionCardSubtitleProps,
        IStyledProps,
        ICommonProps {
    body?: JSX.Element | string;
}

interface ISectionCardImageProps extends IStyledProps, ICommonProps {
    backgroundUrl?: string;
}

interface IStateProps {
    theme: ITheme;
}

interface IOwnProps {
    children: JSX.Element | string;
}

type SectionCardProps = ISectionCardTitleProps &
    ISectionCardSubtitleProps &
    ISectionCardBodyProps &
    ISectionCardImageProps &
    IStyledProps &
    ICommonProps &
    IOwnProps &
    IStateProps;

const mapStateToProps = ({ theme }: IStoreState): IStateProps => ({
    theme,
});

// SECTION CARD TITLE

const SectionCardTitle = ({ title, className }: ISectionCardTitleProps) => (
    <h1 className={className}>{title}</h1>
);

const StyledSectionCardTitle = styled(SectionCardTitle)`
    font-size: 4rem;
    font-family: ${fonts.roboto.family};
`;

// SECTION CARD SUBTITLE

const SectionCardSubtitle = ({
    subtitle,
    className,
}: ISectionCardSubtitleProps) => <h2 className={className}>{subtitle}</h2>;

const StyledSectionCardSubtitle = styled(SectionCardSubtitle)`
    font-size: 2.25rem;
    color: ${({ theme }: IStateProps) => theme.colors.sectionSubtitle};
    font-family: ${fonts.openSans.family};
`;

const ConnectedSectionCardSubtitle = connect(mapStateToProps)(
    StyledSectionCardSubtitle,
);

// SECTION CARD BODY

const SectionCardBody = ({
    title,
    subtitle,
    body,
    className,
}: ISectionCardBodyProps) => (
    <div className={className}>
        {title && <StyledSectionCardTitle title={title} />}
        {subtitle && <ConnectedSectionCardSubtitle subtitle={subtitle} />}
        {(!!title || !!subtitle) && <hr />}
        {body && <p>{body}</p>}
    </div>
);

const StyledSectionCardBody = styled(SectionCardBody)`
    grid-column-start: ${({ bodyAlignment }: ISectionCardBodyProps) =>
        bodyAlignment == "left" ? 1 : 2};
    padding: 0.5% 3%;
`;

// SECTION CARD IMAGE HIDER

const SectionCardImageHider = ({ className }: ISectionCardImageProps) => (
    <div className={className} />
);

const StyledSectionCardImageHider = styled(SectionCardImageHider)`
    background: ${({ theme }: IStateProps) => theme.colors.sectionCard};
    transform: ${({ bodyAlignment }: ISectionCardImageProps) =>
        bodyAlignment == "left"
            ? "skew(10deg) translateX(-70%)"
            : "skew(-10deg) translateX(70%)"};
    transition: all ${THEME_TRANSITION_TIME}s;
    width: 100%;
    height: 100%;
    box-shadow: 0 0 1.5rem
        ${({ theme }: IStateProps) => theme.colors.sectionCardShadow};
`;

const ConnectedSectionCardImageHider = connect(mapStateToProps)(
    StyledSectionCardImageHider,
);

// SECTION CARD IMAGE

const SectionCardImage = ({
    backgroundUrl,
    className,
    bodyAlignment,
}: ISectionCardImageProps) => (
    <div className={className}>
        <ConnectedSectionCardImageHider
            bodyAlignment={bodyAlignment}
            backgroundUrl={backgroundUrl}
        />
    </div>
);

const StyledSectionCardImage = styled(SectionCardImage)`
    grid-column-start: ${({ bodyAlignment }: ISectionCardImageProps) =>
        bodyAlignment == "left" ? 2 : 1};
    background-size: cover;
    position: relative;
    overflow: hidden;
    background:
        url("${({ backgroundUrl }) => backgroundUrl}")
        center center / cover no-repeat;
`;

// SECTION CARD

const SectionCard = ({
    title,
    subtitle,
    backgroundUrl,
    children,
    className,
    bodyAlignment = "left",
}: SectionCardProps) => (
    <div className={className}>
        {bodyAlignment == "left" ? (
            <>
                <StyledSectionCardBody
                    title={title}
                    subtitle={subtitle}
                    body={children}
                    bodyAlignment={bodyAlignment}
                />
                {backgroundUrl && (
                    <StyledSectionCardImage
                        bodyAlignment={bodyAlignment}
                        backgroundUrl={backgroundUrl}
                    />
                )}
            </>
        ) : (
            <>
                {backgroundUrl && (
                    <StyledSectionCardImage
                        bodyAlignment={bodyAlignment}
                        backgroundUrl={backgroundUrl}
                    />
                )}
                <StyledSectionCardBody
                    title={title}
                    subtitle={subtitle}
                    body={children}
                    bodyAlignment={bodyAlignment}
                />
            </>
        )}
    </div>
);

const StyledSectionCard = styled(SectionCard)`
    background: ${({ theme }: IStateProps) => theme.colors.sectionCard};
    width: 75%;
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: ${({
        backgroundUrl,
        bodyAlignment = "left",
    }: SectionCardProps) =>
        backgroundUrl
            ? bodyAlignment == "left"
                ? "75% 25%"
                : "25% 75%"
            : "100%"};
    margin: 5% auto;
    box-shadow: 0.5rem 0.75rem 2.5rem
        ${({ theme }: IStateProps) => theme.colors.sectionCardShadow};
    border-radius: 0.25em;
    font-size: 2.3rem;
    color: ${({ theme }: IStateProps) => theme.colors.defaultText};
    transition: all ${THEME_TRANSITION_TIME}s;
    text-align: justify;
    overflow: hidden;
`;

export default connect(mapStateToProps)(StyledSectionCard);
