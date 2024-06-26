/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { CardProps, FlexProps, IconProps, TextFieldProps, TextProps, ViewProps } from "@aws-amplify/ui-react";
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
export declare type CommentComponentOverridesProps = {
    CommentComponent?: PrimitiveOverrideProps<ViewProps>;
    Comments?: PrimitiveOverrideProps<TextProps>;
    "Frame 453"?: PrimitiveOverrideProps<FlexProps>;
    TextField?: PrimitiveOverrideProps<TextFieldProps>;
    MyIcon?: MyIconProps;
    Frame?: PrimitiveOverrideProps<ViewProps>;
    Vector?: PrimitiveOverrideProps<IconProps>;
    "Frame 466"?: PrimitiveOverrideProps<ViewProps>;
    Card?: PrimitiveOverrideProps<CardProps>;
} & EscapeHatchProps;
export declare type CommentComponentProps = React.PropsWithChildren<Partial<ViewProps> & {
    state?: "Default";
} & {
    overrides?: CommentComponentOverridesProps | undefined | null;
}>;
export default function CommentComponent(props: CommentComponentProps): React.ReactElement;
