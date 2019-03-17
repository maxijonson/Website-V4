import * as React from "react";
import { connect } from "react-redux";
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
                headerSeparator={<span />}
                imageUrl="assets/images/warn.png"
            >
                <div
                    style={{
                        color: theme.colors.defaultErrorText,
                        textAlign: "center",
                    }}
                >
                    <p>
                        An unexpected error happened and this component could
                        not be rendered
                    </p>
                </div>
            </Card>
        );
    },
);
