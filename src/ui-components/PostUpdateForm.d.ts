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
export declare type PostUpdateFormInputValues = {
    owner?: string;
    description?: string;
    comments?: string;
    drip_points?: number;
    createdAt?: string;
    enable_comments?: boolean;
    postImageKey?: string;
};
export declare type PostUpdateFormValidationValues = {
    owner?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    comments?: ValidationFunction<string>;
    drip_points?: ValidationFunction<number>;
    createdAt?: ValidationFunction<string>;
    enable_comments?: ValidationFunction<boolean>;
    postImageKey?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PostUpdateFormOverridesProps = {
    PostUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    comments?: PrimitiveOverrideProps<TextFieldProps>;
    drip_points?: PrimitiveOverrideProps<TextFieldProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
    enable_comments?: PrimitiveOverrideProps<SwitchFieldProps>;
    postImageKey?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PostUpdateFormProps = React.PropsWithChildren<{
    overrides?: PostUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    post?: any;
    onSubmit?: (fields: PostUpdateFormInputValues) => PostUpdateFormInputValues;
    onSuccess?: (fields: PostUpdateFormInputValues) => void;
    onError?: (fields: PostUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PostUpdateFormInputValues) => PostUpdateFormInputValues;
    onValidate?: PostUpdateFormValidationValues;
} & React.CSSProperties>;
export default function PostUpdateForm(props: PostUpdateFormProps): React.ReactElement;
