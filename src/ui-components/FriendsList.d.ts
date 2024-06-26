/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { SearchFieldProps, TextProps, ViewProps } from "@aws-amplify/ui-react";
import { FriendProps } from "./Friend";
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
export declare type FriendsListOverridesProps = {
    FriendsList?: PrimitiveOverrideProps<ViewProps>;
    Backdrop?: PrimitiveOverrideProps<ViewProps>;
    "Friends Group"?: PrimitiveOverrideProps<ViewProps>;
    Friend4997933?: FriendProps;
    Friend4997934?: FriendProps;
    Friend4997949?: FriendProps;
    Friend4997950?: FriendProps;
    Friend4997924?: FriendProps;
    Friend4997916?: FriendProps;
    "Friends List"?: PrimitiveOverrideProps<TextProps>;
    SearchField?: PrimitiveOverrideProps<SearchFieldProps>;
} & EscapeHatchProps;
export declare type FriendsListProps = React.PropsWithChildren<Partial<ViewProps> & {
    overrides?: FriendsListOverridesProps | undefined | null;
}>;
export default function FriendsList(props: FriendsListProps): React.ReactElement;
