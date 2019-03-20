import * as React from "react";
import { connect } from "react-redux";
import { Button, Modal } from "src/components";
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

        const [modalVisible, setModalVisible] = React.useState(false);

        const handleClick = () => {
            setModalVisible(true);
        };

        const onModalRequestClose = () => setModalVisible(false);

        return (
            <>
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
                            An unexpected error happened and this message was
                            rendered as fallback to prevent the rest from
                            crashing!
                        </p>
                        <Button
                            title="Debug"
                            subtitle="see the cryptic stuff"
                            onClick={handleClick}
                        />
                    </div>
                </Card>
                <Modal
                    visible={modalVisible}
                    onRequestClose={onModalRequestClose}
                >
                    <Card
                        cardClassName="cardCatcher--modal--card"
                        title="title"
                        subtitle="sub"
                    >
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Voluptate praesentium molestiae ea quia
                        accusantium dolores tempora recusandae nobis aspernatur
                        facere incidunt, est aliquid id porro consectetur optio
                        odit ratione ipsam. Lorem ipsum dolor sit amet,
                        consectetur adipisicing elit. Accusamus recusandae
                        consequuntur perspiciatis iure, fugiat nostrum et id
                        explicabo! Cupiditate voluptatibus fugit blanditiis
                        magni tenetur impedit dolorem ullam repudiandae delectus
                        ea. Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Veritatis omnis qui eius consequatur odit modi non
                        dolorem mollitia nesciunt nemo eligendi veniam,
                        recusandae sed eveniet? Iure dolore consequuntur
                        expedita sint. Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Voluptas enim eveniet ad provident
                        odio excepturi autem similique aperiam nisi rerum, vero
                        cum esse, magnam suscipit doloremque culpa? Magnam, ab
                        nam! Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Error eveniet eum delectus magnam ipsum sequi
                        possimus unde veritatis quae facere blanditiis quod
                        repellat officia sunt commodi voluptatum est, porro
                        fugit.
                    </Card>
                </Modal>
            </>
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
