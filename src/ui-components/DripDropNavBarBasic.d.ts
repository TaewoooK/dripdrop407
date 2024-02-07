/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { FlexProps, IconProps, TextProps, ViewProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type DripDropNavBarBasicOverridesProps = {
    DripDropNavBarBasic?: PrimitiveOverrideProps<ViewProps>;
    "dripdrop."?: PrimitiveOverrideProps<TextProps>;
    "Frame 443"?: PrimitiveOverrideProps<FlexProps>;
    "Frame 438"?: PrimitiveOverrideProps<FlexProps>;
    Frame48651382?: PrimitiveOverrideProps<ViewProps>;
    Vector48651383?: PrimitiveOverrideProps<IconProps>;
    Home?: PrimitiveOverrideProps<TextProps>;
    "Frame 439"?: PrimitiveOverrideProps<FlexProps>;
    "Frame 444"?: PrimitiveOverrideProps<FlexProps>;
    Frame48651103?: PrimitiveOverrideProps<ViewProps>;
    Vector48651104?: PrimitiveOverrideProps<IconProps>;
    Leaderboard?: PrimitiveOverrideProps<TextProps>;
    "Frame 440"?: PrimitiveOverrideProps<FlexProps>;
    Vector48651107?: PrimitiveOverrideProps<IconProps>;
    Upload?: PrimitiveOverrideProps<TextProps>;
    "Frame 441"?: PrimitiveOverrideProps<FlexProps>;
    Vector48651110?: PrimitiveOverrideProps<IconProps>;
    Activity?: PrimitiveOverrideProps<TextProps>;
    "Frame 442"?: PrimitiveOverrideProps<FlexProps>;
    Frame48651384?: PrimitiveOverrideProps<ViewProps>;
    Vector48651385?: PrimitiveOverrideProps<IconProps>;
    Profile?: PrimitiveOverrideProps<TextProps>;
    "Frame 445"?: PrimitiveOverrideProps<FlexProps>;
    Frame48651116?: PrimitiveOverrideProps<ViewProps>;
    Vector48651117?: PrimitiveOverrideProps<IconProps>;
    Logout?: PrimitiveOverrideProps<TextProps>;
    Frame48651119?: PrimitiveOverrideProps<ViewProps>;
    Vector48651120?: PrimitiveOverrideProps<IconProps>;
    "Frame 446"?: PrimitiveOverrideProps<FlexProps>;
    "Ellipse 1"?: PrimitiveOverrideProps<IconProps>;
    "Ling-jet"?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type DripDropNavBarBasicProps = React.PropsWithChildren<Partial<ViewProps> & {
    overrides?: DripDropNavBarBasicOverridesProps | undefined | null;
}>;
export default function DripDropNavBarBasic(props: DripDropNavBarBasicProps): React.ReactElement;
