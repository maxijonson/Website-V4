import * as React from "react";
import { connect } from "react-redux";
import { Button } from "src/components";
import { withCatcher } from "../Catcher";
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
const Base = connect(mapStateToProps)(
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
                    <Button
                        title="Debug"
                        subtitle="see the cryptic stuff"
                        onClick={() => console.log("clicked")}
                    />
                </div>
            </Card>
        );
    },
);

// TODO: Let the Catcher handle this kind of event (a Fallback crashing)
export const CardCatcher = withCatcher(Base, {
    Fallback: () => (
        <Card
            background="#C1292E"
            title="Crashception"
            children="The original component crashed as well as the Fallback component... This should not happen, but it did."
        />
    ),
});
