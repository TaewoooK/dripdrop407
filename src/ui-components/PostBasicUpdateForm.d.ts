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
export declare type PostBasicUpdateFormInputValues = {
    username?: string;
    outfitimage?: string;
    userphoto?: string;
};
export declare type PostBasicUpdateFormValidationValues = {
    username?: ValidationFunction<string>;
    outfitimage?: ValidationFunction<string>;
    userphoto?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PostBasicUpdateFormOverridesProps = {
    PostBasicUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    username?: PrimitiveOverrideProps<TextFieldProps>;
    outfitimage?: PrimitiveOverrideProps<TextFieldProps>;
    userphoto?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PostBasicUpdateFormProps = React.PropsWithChildren<{
    overrides?: PostBasicUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    postBasic?: any;
    onSubmit?: (fields: PostBasicUpdateFormInputValues) => PostBasicUpdateFormInputValues;
    onSuccess?: (fields: PostBasicUpdateFormInputValues) => void;
    onError?: (fields: PostBasicUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PostBasicUpdateFormInputValues) => PostBasicUpdateFormInputValues;
    onValidate?: PostBasicUpdateFormValidationValues;
} & React.CSSProperties>;
export default function PostBasicUpdateForm(props: PostBasicUpdateFormProps): React.ReactElement;
