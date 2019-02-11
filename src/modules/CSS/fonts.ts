export type FontVariants = "400" | "400i" | "700" | "700i";
export type FontSubsets = "latin" | "latin-ext";
export type FontName = "oswald";

export interface IFont {
    family: string;
    variants?: FontVariants;
    subsets?: FontSubsets;
}

export type IFonts = { [name in FontName]: IFont };

export const fonts: IFonts = {
    oswald: {
        family: "Oswald",
    },
};
