import * as React from "react";
import { Card } from "src/components";
import Modal from "./Modal";

interface IErrorModalOwnProps {
    errorReport: IErrorReport;
    visible: boolean;
    onRequestClose: () => void;
}

export default (props: IErrorModalOwnProps) => {
    const { visible, onRequestClose, errorReport } = props;
    console.log(errorReport.stack);
    return (
        <Modal visible={visible} onRequestClose={onRequestClose}>
            <Card
                cardClassName="ErrorModal--Modal--Card"
                title="Error Report"
                subtitle={errorReport.error.message}
            >
                <pre>{errorReport.error.stack}</pre>
            </Card>
        </Modal>
    );
};
