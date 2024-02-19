/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { TextProps, ViewProps } from "@aws-amplify/ui-react";
import { FriendRequestProps } from "./FriendRequest";
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
export declare type FriendRequestsListCondensedOverridesProps = {
    FriendRequestsListCondensed?: PrimitiveOverrideProps<ViewProps>;
    Backdrop?: PrimitiveOverrideProps<ViewProps>;
    "See More..."?: PrimitiveOverrideProps<TextProps>;
    "Requests Group"?: PrimitiveOverrideProps<ViewProps>;
    "Friend Request49591312"?: FriendRequestProps;
    "Friend Request49591299"?: FriendRequestProps;
    "Friend Request49591286"?: FriendRequestProps;
    "Friend Requests"?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type FriendRequestsListCondensedProps = React.PropsWithChildren<Partial<ViewProps> & {
    overrides?: FriendRequestsListCondensedOverridesProps | undefined | null;
}>;
export default function FriendRequestsListCondensed(props: FriendRequestsListCondensedProps): React.ReactElement;
