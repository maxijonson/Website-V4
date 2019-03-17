import * as React from "react";
import { connect } from "react-redux";
import { BREAKPOINTS, THEME_TRANSITION_TIME } from "src/config";
import styled from "styled-components";
import {
    defaultProps,
    ICardInternalProps,
    ICardProps,
    ICardStateProps,
} from "./model";

interface ICardCatcherProps {
    errorReport: IErrorReport;
}

interface ISCProps {
    className?: string;
}

const mapStateToProps = ({ theme }: IStoreState): ICardStateProps => ({
    theme,
});

export const CardCatcher = connect(mapStateToProps)(
    styled((props: ICardCatcherProps & ICardProps & ISCProps) => {
        const { className } = props;
        return (
            <p className={className}>
                UH OH: {props.errorReport.error.message}
            </p>
        );
    })`
        background: ${({ theme }: ICardStateProps) =>
            theme.colors.defaultErrorBg};
        width: 75%;
        display: grid;
        margin: 5% auto;
        box-shadow: 0 0.5rem 0.5rem
            ${({ theme }: ICardStateProps) => theme.colors.cardShadow};
        border-radius: 0.25em;
        font-size: 2.3rem;
        color: ${({ theme }: ICardStateProps) => theme.colors.defaultErrorText};
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
            }: ICardProps & ICardInternalProps) =>
                imageUrl
                    ? bodyAlignment == "left"
                        ? "75% 25%"
                        : "25% 75%"
                    : "100%"};
        }
    `,
);
