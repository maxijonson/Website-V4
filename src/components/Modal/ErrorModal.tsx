import * as React from "react";
import { Card } from "src/components";
import Modal from "./Modal";

interface IErrorModalOwnProps {
    errorReport: IErrorReport;
    visible: boolean;
    onRequestClose: () => void;
}

export default (props: IErrorModalOwnProps) => {
    const { visible, onRequestClose } = props;
    return (
        <Modal visible={visible} onRequestClose={onRequestClose}>
            <Card
                cardClassName="cardCatcher--modal--card"
                title="title"
                subtitle="sub"
            >
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Voluptate praesentium molestiae ea quia accusantium dolores
                tempora recusandae nobis aspernatur facere incidunt, est aliquid
                id porro consectetur optio odit ratione ipsam. Lorem ipsum dolor
                sit amet, consectetur adipisicing elit. Accusamus recusandae
                consequuntur perspiciatis iure, fugiat nostrum et id explicabo!
                Cupiditate voluptatibus fugit blanditiis magni tenetur impedit
                dolorem ullam repudiandae delectus ea. Lorem ipsum dolor, sit
                amet consectetur adipisicing elit. Veritatis omnis qui eius
                consequatur odit modi non dolorem mollitia nesciunt nemo
                eligendi veniam, recusandae sed eveniet? Iure dolore
                consequuntur expedita sint. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Voluptas enim eveniet ad provident
                odio excepturi autem similique aperiam nisi rerum, vero cum
                esse, magnam suscipit doloremque culpa? Magnam, ab nam! Lorem
                ipsum dolor sit amet, consectetur adipisicing elit. Error
                eveniet eum delectus magnam ipsum sequi possimus unde veritatis
                quae facere blanditiis quod repellat officia sunt commodi
                voluptatum est, porro fugit.
            </Card>
        </Modal>
    );
};
