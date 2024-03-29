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
export declare type LeaderboardOverridesProps = {
    Leaderboard?: PrimitiveOverrideProps<ViewProps>;
    "Frame 467"?: PrimitiveOverrideProps<ViewProps>;
    Rank?: PrimitiveOverrideProps<TextProps>;
    User?: PrimitiveOverrideProps<TextProps>;
    Points?: PrimitiveOverrideProps<TextProps>;
    "Line 2"?: PrimitiveOverrideProps<IconProps>;
    "Frame 469"?: PrimitiveOverrideProps<ViewProps>;
    "Frame 470"?: PrimitiveOverrideProps<ViewProps>;
    Leaderboard5080772?: PrimitiveOverrideProps<TextProps>;
    Button50801348?: PrimitiveOverrideProps<ButtonProps>;
    Button50801352?: PrimitiveOverrideProps<ButtonProps>;
} & EscapeHatchProps;
export declare type LeaderboardProps = React.PropsWithChildren<Partial<ViewProps> & {
    overrides?: LeaderboardOverridesProps | undefined | null;
}>;
export default function Leaderboard(props: LeaderboardProps): React.ReactElement;
