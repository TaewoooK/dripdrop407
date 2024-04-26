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
export declare type BattleCreateFormInputValues = {
    Player1?: string;
    Player2?: string;
    Player1Status?: string;
    Player2Status?: string;
    Player1Score?: number;
    Player2Score?: number;
    Player1ImageKey?: string;
    Player2ImageKey?: string;
    createdAt?: string;
    actionedUsers?: string[];
};
export declare type BattleCreateFormValidationValues = {
    Player1?: ValidationFunction<string>;
    Player2?: ValidationFunction<string>;
    Player1Status?: ValidationFunction<string>;
    Player2Status?: ValidationFunction<string>;
    Player1Score?: ValidationFunction<number>;
    Player2Score?: ValidationFunction<number>;
    Player1ImageKey?: ValidationFunction<string>;
    Player2ImageKey?: ValidationFunction<string>;
    createdAt?: ValidationFunction<string>;
    actionedUsers?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type BattleCreateFormOverridesProps = {
    BattleCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Player1?: PrimitiveOverrideProps<TextFieldProps>;
    Player2?: PrimitiveOverrideProps<TextFieldProps>;
    Player1Status?: PrimitiveOverrideProps<TextFieldProps>;
    Player2Status?: PrimitiveOverrideProps<TextFieldProps>;
    Player1Score?: PrimitiveOverrideProps<TextFieldProps>;
    Player2Score?: PrimitiveOverrideProps<TextFieldProps>;
    Player1ImageKey?: PrimitiveOverrideProps<TextFieldProps>;
    Player2ImageKey?: PrimitiveOverrideProps<TextFieldProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
    actionedUsers?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type BattleCreateFormProps = React.PropsWithChildren<{
    overrides?: BattleCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: BattleCreateFormInputValues) => BattleCreateFormInputValues;
    onSuccess?: (fields: BattleCreateFormInputValues) => void;
    onError?: (fields: BattleCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: BattleCreateFormInputValues) => BattleCreateFormInputValues;
    onValidate?: BattleCreateFormValidationValues;
} & React.CSSProperties>;
export default function BattleCreateForm(props: BattleCreateFormProps): React.ReactElement;
