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
export declare type PostReportCreateFormInputValues = {
    reporter?: string;
    reason?: string;
    sentAt?: string;
    postId?: string;
};
export declare type PostReportCreateFormValidationValues = {
    reporter?: ValidationFunction<string>;
    reason?: ValidationFunction<string>;
    sentAt?: ValidationFunction<string>;
    postId?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PostReportCreateFormOverridesProps = {
    PostReportCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    reporter?: PrimitiveOverrideProps<TextFieldProps>;
    reason?: PrimitiveOverrideProps<TextFieldProps>;
    sentAt?: PrimitiveOverrideProps<TextFieldProps>;
    postId?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PostReportCreateFormProps = React.PropsWithChildren<{
    overrides?: PostReportCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: PostReportCreateFormInputValues) => PostReportCreateFormInputValues;
    onSuccess?: (fields: PostReportCreateFormInputValues) => void;
    onError?: (fields: PostReportCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PostReportCreateFormInputValues) => PostReportCreateFormInputValues;
    onValidate?: PostReportCreateFormValidationValues;
} & React.CSSProperties>;
export default function PostReportCreateForm(props: PostReportCreateFormProps): React.ReactElement;
