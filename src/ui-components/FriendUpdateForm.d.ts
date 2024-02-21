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
export declare type FriendUpdateFormInputValues = {
    UserId?: string;
    FriendId?: string;
};
export declare type FriendUpdateFormValidationValues = {
    UserId?: ValidationFunction<string>;
    FriendId?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type FriendUpdateFormOverridesProps = {
    FriendUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    UserId?: PrimitiveOverrideProps<TextFieldProps>;
    FriendId?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type FriendUpdateFormProps = React.PropsWithChildren<{
    overrides?: FriendUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    friend?: any;
    onSubmit?: (fields: FriendUpdateFormInputValues) => FriendUpdateFormInputValues;
    onSuccess?: (fields: FriendUpdateFormInputValues) => void;
    onError?: (fields: FriendUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: FriendUpdateFormInputValues) => FriendUpdateFormInputValues;
    onValidate?: FriendUpdateFormValidationValues;
} & React.CSSProperties>;
export default function FriendUpdateForm(props: FriendUpdateFormProps): React.ReactElement;
