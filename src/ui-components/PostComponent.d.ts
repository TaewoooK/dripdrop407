/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { ButtonProps, FlexProps, IconProps, ImageProps, TextProps, ViewProps } from "@aws-amplify/ui-react";
import { MyIconProps } from "./MyIcon";
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
export declare type PostComponentOverridesProps = {
    PostComponent?: PrimitiveOverrideProps<ViewProps>;
    "Frame 450"?: PrimitiveOverrideProps<ViewProps>;
    Frame49012134?: PrimitiveOverrideProps<ViewProps>;
    Vector49012135?: PrimitiveOverrideProps<IconProps>;
    Frame49012132?: PrimitiveOverrideProps<ViewProps>;
    Vector49012133?: PrimitiveOverrideProps<IconProps>;
    "dripdropsample 1"?: PrimitiveOverrideProps<ImageProps>;
    MyIcon48882017?: MyIconProps;
    "Frame 454"?: PrimitiveOverrideProps<FlexProps>;
    "Ellipse 2"?: PrimitiveOverrideProps<IconProps>;
    "Test User"?: PrimitiveOverrideProps<TextProps>;
    MyIcon48882012?: MyIconProps;
    Button49012122?: PrimitiveOverrideProps<ButtonProps>;
    Button49012126?: PrimitiveOverrideProps<ButtonProps>;
} & EscapeHatchProps;
export declare type PostComponentProps = React.PropsWithChildren<Partial<ViewProps> & {
    overrides?: PostComponentOverridesProps | undefined | null;
}>;
export default function PostComponent(props: PostComponentProps): React.ReactElement;
