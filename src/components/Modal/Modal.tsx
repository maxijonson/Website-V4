import * as React from "react";
import { connect } from "react-redux";
import { ITheme } from "src/modules/CSS";
import styled, { ThemeProvider } from "styled-components";

interface IModalStateProps {
    readonly theme: ITheme;
}

interface IModalOwnProps {
    visible?: boolean;
}

interface IModalThemeProviderProps {
    readonly theme: ITheme;
}

const mapStateToProps = ({ theme }: IStoreState): IModalStateProps => ({
    theme,
});

const Overlay = styled.div``;

export default connect(mapStateToProps)(
    (props: IModalOwnProps & IModalStateProps) => {
        const { theme } = props;

        const [visible, setVisible] = React.useState(props.visible);

        const themeValue: IModalThemeProviderProps = {
            theme,
        };

        return (
            (!visible && null) || (
                <ThemeProvider theme={themeValue}>
                    <>
                        <div>Hello</div>
                    </>
                </ThemeProvider>
            )
        );
    },
);
