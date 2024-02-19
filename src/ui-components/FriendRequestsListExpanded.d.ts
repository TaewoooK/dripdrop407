/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { ViewProps } from "@aws-amplify/ui-react";
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
export declare type FriendRequestsListExpandedOverridesProps = {
    FriendRequestsListExpanded?: PrimitiveOverrideProps<ViewProps>;
    Backdrop?: PrimitiveOverrideProps<ViewProps>;
    "Requests Group"?: PrimitiveOverrideProps<ViewProps>;
    "Friend Request49621328"?: FriendRequestProps;
    "Friend Request49621329"?: FriendRequestProps;
    "Friend Request49621330"?: FriendRequestProps;
    "Friend Request49621375"?: FriendRequestProps;
    "Friend Request49621376"?: FriendRequestProps;
    "Friend Request49621377"?: FriendRequestProps;
} & EscapeHatchProps;
export declare type FriendRequestsListExpandedProps = React.PropsWithChildren<Partial<ViewProps> & {
    overrides?: FriendRequestsListExpandedOverridesProps | undefined | null;
}>;
export default function FriendRequestsListExpanded(props: FriendRequestsListExpandedProps): React.ReactElement;
