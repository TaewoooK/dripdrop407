/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { FlexProps, IconProps, ImageProps, TextProps, ViewProps } from "@aws-amplify/ui-react";
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
    Frame38611399?: PrimitiveOverrideProps<ViewProps>;
    Vector38611400?: PrimitiveOverrideProps<IconProps>;
    Frame38611401?: PrimitiveOverrideProps<ViewProps>;
    Vector38611402?: PrimitiveOverrideProps<IconProps>;
    "dripdropsample 1"?: PrimitiveOverrideProps<ImageProps>;
    "Frame 4378"?: PrimitiveOverrideProps<FlexProps>;
    MyIcon38611404?: PrimitiveOverrideProps<ViewProps>;
    "Frame 454"?: PrimitiveOverrideProps<FlexProps>;
    "Ellipse 2"?: PrimitiveOverrideProps<IconProps>;
    "Test User"?: PrimitiveOverrideProps<TextProps>;
    MyIcon38611408?: PrimitiveOverrideProps<ViewProps>;
    Button38611409?: PrimitiveOverrideProps<FlexProps>;
    Button38611410?: PrimitiveOverrideProps<FlexProps>;
} & EscapeHatchProps;
export declare type PostComponentProps = React.PropsWithChildren<Partial<ViewProps> & {
    post?: any;
} & {
    overrides?: PostComponentOverridesProps | undefined | null;
}>;
export default function PostComponent(props: PostComponentProps): React.ReactElement;
