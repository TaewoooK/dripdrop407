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
export declare type SavedPostsCreateFormInputValues = {
    username?: string;
    postIds?: string[];
};
export declare type SavedPostsCreateFormValidationValues = {
    username?: ValidationFunction<string>;
    postIds?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SavedPostsCreateFormOverridesProps = {
    SavedPostsCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    username?: PrimitiveOverrideProps<TextFieldProps>;
    postIds?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SavedPostsCreateFormProps = React.PropsWithChildren<{
    overrides?: SavedPostsCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: SavedPostsCreateFormInputValues) => SavedPostsCreateFormInputValues;
    onSuccess?: (fields: SavedPostsCreateFormInputValues) => void;
    onError?: (fields: SavedPostsCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SavedPostsCreateFormInputValues) => SavedPostsCreateFormInputValues;
    onValidate?: SavedPostsCreateFormValidationValues;
} & React.CSSProperties>;
export default function SavedPostsCreateForm(props: SavedPostsCreateFormProps): React.ReactElement;
