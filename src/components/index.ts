export { default as Header } from "./Header/Header";

export { default as Footer } from "./Footer";

export { default as ViewportContainer } from "./ViewportContainer";

export { default as Background } from "./Background";

export { default as ColorOverlay } from "./ColorOverlay";

import { default as Card } from "./Card/Card";
import * as CardsBase from "./Card/Card";
import * as CardsAnimated from "./Card/CardAnimated";
const Cards = { ...CardsAnimated, Alt: CardsBase.Alt, Base: CardsBase.default };
export { Cards, Card };

export { default as Catcher } from "./Catcher";

export { default as Button } from "./Button";

export { default as Modal } from "./Modal/Modal";

export { default as ErrorModal } from "./Modal/ErrorModal";

export { default as Section } from "./Section";

export { default as Tooltip } from "./Tooltip";

export { default as Project } from "./Project";

export { default as Scrollbar } from "./Scrollbar";
