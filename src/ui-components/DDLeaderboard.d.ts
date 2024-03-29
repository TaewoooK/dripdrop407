/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { LeaderboardProps } from "./Leaderboard";
import { ViewProps } from "@aws-amplify/ui-react";
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
export declare type DDLeaderboardOverridesProps = {
    DDLeaderboard?: PrimitiveOverrideProps<ViewProps>;
    Leaderboard?: LeaderboardProps;
} & EscapeHatchProps;
export declare type DDLeaderboardProps = React.PropsWithChildren<Partial<ViewProps> & {
    overrides?: DDLeaderboardOverridesProps | undefined | null;
}>;
export default function DDLeaderboard(props: DDLeaderboardProps): React.ReactElement;
