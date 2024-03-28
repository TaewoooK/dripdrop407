/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type PrivacyUpdateFormInputValues = {
    Username?: string;
    Private?: boolean;
};
export declare type PrivacyUpdateFormValidationValues = {
    Username?: ValidationFunction<string>;
    Private?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PrivacyUpdateFormOverridesProps = {
    PrivacyUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Username?: PrimitiveOverrideProps<TextFieldProps>;
    Private?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type PrivacyUpdateFormProps = React.PropsWithChildren<{
    overrides?: PrivacyUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    privacy?: any;
    onSubmit?: (fields: PrivacyUpdateFormInputValues) => PrivacyUpdateFormInputValues;
    onSuccess?: (fields: PrivacyUpdateFormInputValues) => void;
    onError?: (fields: PrivacyUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PrivacyUpdateFormInputValues) => PrivacyUpdateFormInputValues;
    onValidate?: PrivacyUpdateFormValidationValues;
} & React.CSSProperties>;
export default function PrivacyUpdateForm(props: PrivacyUpdateFormProps): React.ReactElement;
