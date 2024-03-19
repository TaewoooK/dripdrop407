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
export declare type SavePostsCreateFormInputValues = {
    username?: string;
    postIds?: string[];
};
export declare type SavePostsCreateFormValidationValues = {
    username?: ValidationFunction<string>;
    postIds?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SavePostsCreateFormOverridesProps = {
    SavePostsCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    username?: PrimitiveOverrideProps<TextFieldProps>;
    postIds?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SavePostsCreateFormProps = React.PropsWithChildren<{
    overrides?: SavePostsCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: SavePostsCreateFormInputValues) => SavePostsCreateFormInputValues;
    onSuccess?: (fields: SavePostsCreateFormInputValues) => void;
    onError?: (fields: SavePostsCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SavePostsCreateFormInputValues) => SavePostsCreateFormInputValues;
    onValidate?: SavePostsCreateFormValidationValues;
} & React.CSSProperties>;
export default function SavePostsCreateForm(props: SavePostsCreateFormProps): React.ReactElement;
