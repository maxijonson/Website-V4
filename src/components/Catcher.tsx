import * as React from "react";

declare global {
    type IError = Error;
    interface IErrorReport {
        readonly error: IError;
        readonly stack: object;
    }
}
type IFallback = (props: any) => JSX.Element;
type IOnError = (errorReport: IErrorReport) => void;

interface ICatcherOwnProps {
    Fallback?: IFallback;
    onError?: IOnError;
}

interface ICatcherState {
    readonly errorReport: IErrorReport | null;
}

export default class Catcher extends React.Component<
    ICatcherOwnProps,
    ICatcherState
> {
    constructor(props: ICatcherOwnProps) {
        super(props);
        this.state = { errorReport: null };
    }

    public componentDidCatch(error: IError, info: object) {
        const { onError } = this.props;
        const errorReport: IErrorReport = {
            error,
            stack: info,
        };
        console.warn("caught error");
        if (onError) {
            onError(errorReport);
        }
        this.setState({
            errorReport,
        });
    }

    public onRetry() {
        this.setState({ errorReport: null });
    }

    public render() {
        const { errorReport } = this.state;
        const { children, Fallback } = this.props;

        if (errorReport) {
            return Fallback ? (
                <Fallback errorReport={errorReport} onRetry={this.onRetry} />
            ) : (
                <p>
                    Something went wrong rendering this part of the page... Have
                    you tried turning it off and on again?
                </p>
            );
        }
        return children;
    }
}

/**
 * Catcher HOC
 * @param WrappedComponent - The component that is prone to error
 * @param [options] - Optional options for the Catcher
 * @param [options.Fallback] - Fallback component to use on error
 * @param [options.onError] - Function to execute on error
 */
export const withCatcher = (
    WrappedComponent: React.ComponentType,
    options?: { Fallback?: IFallback; onError?: IOnError },
) => (props: any) => (
    <Catcher
        Fallback={options && options.Fallback}
        onError={options && options.onError}
    >
        <WrappedComponent {...props} />
    </Catcher>
);
