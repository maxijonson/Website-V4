import * as React from "react";
import { connect } from "react-redux";
// import { BREAKPOINTS, THEME_TRANSITION_TIME } from "src/config";
// import styled from "styled-components";
import Card from "./Card";
import {
    // defaultProps,
    // ICardInternalProps,
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

// TODO: i18n
export const CardCatcher = connect(mapStateToProps)(
    (props: ICardCatcherProps & ICardStateProps & ICardProps & ISCProps) => {
        const { theme } = props;
        return (
            <Card
                background={theme.colors.defaultErrorBg}
                title={
                    <span
                        style={{ color: theme.colors.defaultErrorText }}
                        children="UH OH"
                    />
                }
                subtitle={
                    <span
                        style={{ color: theme.colors.altErrorText }}
                        children="Something went wrong..."
                    />
                }
                headerSeparator={() => null}
                imageUrl="assets/images/warn.png"
            >
                <div
                    style={{
                        color: theme.colors.defaultErrorText,
                        textAlign: "center",
                    }}
                >
                    An unexpected error happened and this component could not be
                    rendererd
                </div>
            </Card>
        );
    },
);
