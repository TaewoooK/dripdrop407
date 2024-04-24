/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type BattleUpdateFormInputValues = {
    Player1?: string;
    Player2?: string;
    Player1Status?: string;
    Player2Status?: string;
    Player1Score?: number;
    Player2Score?: number;
    Player1ImageKey?: string;
    Player2ImageKey?: string;
    createdAt?: string;
};
export declare type BattleUpdateFormValidationValues = {
    Player1?: ValidationFunction<string>;
    Player2?: ValidationFunction<string>;
    Player1Status?: ValidationFunction<string>;
    Player2Status?: ValidationFunction<string>;
    Player1Score?: ValidationFunction<number>;
    Player2Score?: ValidationFunction<number>;
    Player1ImageKey?: ValidationFunction<string>;
    Player2ImageKey?: ValidationFunction<string>;
    createdAt?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type BattleUpdateFormOverridesProps = {
    BattleUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Player1?: PrimitiveOverrideProps<TextFieldProps>;
    Player2?: PrimitiveOverrideProps<TextFieldProps>;
    Player1Status?: PrimitiveOverrideProps<TextFieldProps>;
    Player2Status?: PrimitiveOverrideProps<TextFieldProps>;
    Player1Score?: PrimitiveOverrideProps<TextFieldProps>;
    Player2Score?: PrimitiveOverrideProps<TextFieldProps>;
    Player1ImageKey?: PrimitiveOverrideProps<TextFieldProps>;
    Player2ImageKey?: PrimitiveOverrideProps<TextFieldProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type BattleUpdateFormProps = React.PropsWithChildren<{
    overrides?: BattleUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    battle?: any;
    onSubmit?: (fields: BattleUpdateFormInputValues) => BattleUpdateFormInputValues;
    onSuccess?: (fields: BattleUpdateFormInputValues) => void;
    onError?: (fields: BattleUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: BattleUpdateFormInputValues) => BattleUpdateFormInputValues;
    onValidate?: BattleUpdateFormValidationValues;
} & React.CSSProperties>;
export default function BattleUpdateForm(props: BattleUpdateFormProps): React.ReactElement;
