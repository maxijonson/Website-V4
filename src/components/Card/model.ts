import { ITheme } from "src/modules/CSS";

export type IChildren = React.ReactNode;
export type IRenderer = React.ComponentType;
export type IBodyAlignment = "left" | "right";

export interface ISCProps {
    className?: string;
}

export interface ICardStateProps {
    readonly theme: ITheme;
}

export interface ICardInternalProps {
    bodyAlignment?: IBodyAlignment;
    delay?: number;
    duration?: number;
    hasRevealed?: boolean;
    isReveal?: boolean; // If Card is a child of a react-reveal component
}
export interface ICardThemeProviderProps {
    theme: ICardInternalProps & ICardStateProps & ICardProps;
}

export interface ICardProps {
    /**
     * Defines the Content container
     */
    ContentRenderer?: IRenderer;

    /**
     * Defines the Header container
     */
    HeaderRenderer?: IRenderer;

    /**
     * Defines the Title container
     */
    TitleRenderer?: IRenderer;
    /**
     * Rendered inside the Title container
     */
    title?: IChildren;

    /**
     * Defines the Subtitle container
     */
    SubtitleRenderer?: IRenderer;
    /**
     * Rendered inside the Subtitle container
     */
    subtitle?: IChildren;

    /**
     * On mobile, hides part of the header to give a desktop like look
     */
    HeaderHiderRenderer?: IRenderer;

    /**
     * Defines the Body container
     */
    BodyRenderer?: IRenderer;
    /**
     * Rendered inside the Body container
     */
    children?: IChildren;

    /**
     * Defines the Image container
     */
    ImageRenderer?: IRenderer;
    /**
     * Defines the ImageHider container. Hides part of the image.
     */
    ImageHiderRenderer?: IRenderer;

    /**
     * The url to the image
     * Not specifying it will remove the Image container
     */
    imageUrl?: string;

    /**
     * Will be rendered between the Header and Body (if Header exists)
     */
    headerSeparator?: IRenderer;

    /**
     * Animate the Card internal content on viewport entry
     * @default false
     */
    animate?: boolean;

    /**
     * Internal Card animation delay is based on the Card reveal animation's delay + duration divided by this factor
     * @preRequisite animate == true
     * @default 4
     */
    animationDelayFactor?: number;

    /**
     * Override the Card background
     */
    background?: string;
}

export const mapStateToProps = ({ theme }: IStoreState): ICardStateProps => ({
    theme,
});

export const defaultProps: {
    bodyAlignment: IBodyAlignment;
    animate: boolean;
    delay: number;
    duration: number;
    animationDelayFactor: number;
    isReveal: boolean;
} = {
    bodyAlignment: "left",
    animate: false,
    delay: 0,
    duration: 1000,
    animationDelayFactor: 4,
    isReveal: false,
};
