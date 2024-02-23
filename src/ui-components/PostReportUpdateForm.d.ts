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
export declare type PostReportUpdateFormInputValues = {
    reporter?: string;
    reason?: string;
    sentAt?: string;
    postId?: string;
};
export declare type PostReportUpdateFormValidationValues = {
    reporter?: ValidationFunction<string>;
    reason?: ValidationFunction<string>;
    sentAt?: ValidationFunction<string>;
    postId?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PostReportUpdateFormOverridesProps = {
    PostReportUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    reporter?: PrimitiveOverrideProps<TextFieldProps>;
    reason?: PrimitiveOverrideProps<TextFieldProps>;
    sentAt?: PrimitiveOverrideProps<TextFieldProps>;
    postId?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PostReportUpdateFormProps = React.PropsWithChildren<{
    overrides?: PostReportUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    postReport?: any;
    onSubmit?: (fields: PostReportUpdateFormInputValues) => PostReportUpdateFormInputValues;
    onSuccess?: (fields: PostReportUpdateFormInputValues) => void;
    onError?: (fields: PostReportUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PostReportUpdateFormInputValues) => PostReportUpdateFormInputValues;
    onValidate?: PostReportUpdateFormValidationValues;
} & React.CSSProperties>;
export default function PostReportUpdateForm(props: PostReportUpdateFormProps): React.ReactElement;
