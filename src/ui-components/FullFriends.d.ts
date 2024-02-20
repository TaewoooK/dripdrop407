/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { FriendRequestsListCondensedProps } from "./FriendRequestsListCondensed";
import { FriendsListProps } from "./FriendsList";
import { DividerProps, ViewProps } from "@aws-amplify/ui-react";
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
export declare type FullFriendsOverridesProps = {
    FullFriends?: PrimitiveOverrideProps<ViewProps>;
    "Friend Requests List (Condensed)"?: FriendRequestsListCondensedProps;
    "Friends List"?: FriendsListProps;
    Divider?: PrimitiveOverrideProps<DividerProps>;
} & EscapeHatchProps;
export declare type FullFriendsProps = React.PropsWithChildren<Partial<ViewProps> & {
    overrides?: FullFriendsOverridesProps | undefined | null;
}>;
export default function FullFriends(props: FullFriendsProps): React.ReactElement;
