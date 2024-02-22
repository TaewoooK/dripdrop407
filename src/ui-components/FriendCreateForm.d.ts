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
export declare type FriendCreateFormInputValues = {
    Username?: string;
    FriendUsername?: string;
};
export declare type FriendCreateFormValidationValues = {
    Username?: ValidationFunction<string>;
    FriendUsername?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type FriendCreateFormOverridesProps = {
    FriendCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Username?: PrimitiveOverrideProps<TextFieldProps>;
    FriendUsername?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type FriendCreateFormProps = React.PropsWithChildren<{
    overrides?: FriendCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: FriendCreateFormInputValues) => FriendCreateFormInputValues;
    onSuccess?: (fields: FriendCreateFormInputValues) => void;
    onError?: (fields: FriendCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: FriendCreateFormInputValues) => FriendCreateFormInputValues;
    onValidate?: FriendCreateFormValidationValues;
} & React.CSSProperties>;
export default function FriendCreateForm(props: FriendCreateFormProps): React.ReactElement;
