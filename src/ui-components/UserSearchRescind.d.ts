/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { ButtonProps, IconProps, TextProps, ViewProps } from "@aws-amplify/ui-react";
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
export declare type UserSearchRescindOverridesProps = {
    UserSearchRescind?: PrimitiveOverrideProps<ViewProps>;
    "Profile Card"?: PrimitiveOverrideProps<ViewProps>;
    "Profile Picture"?: PrimitiveOverrideProps<IconProps>;
    Username?: PrimitiveOverrideProps<TextProps>;
    Button?: PrimitiveOverrideProps<ButtonProps>;
} & EscapeHatchProps;
export declare type UserSearchRescindProps = React.PropsWithChildren<Partial<ViewProps> & {
    overrides?: UserSearchRescindOverridesProps | undefined | null;
}>;
export default function UserSearchRescind(props: UserSearchRescindProps): React.ReactElement;
