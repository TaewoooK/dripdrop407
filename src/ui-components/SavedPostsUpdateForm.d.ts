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
export declare type SavedPostsUpdateFormInputValues = {
    username?: string;
    postIds?: string[];
};
export declare type SavedPostsUpdateFormValidationValues = {
    username?: ValidationFunction<string>;
    postIds?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SavedPostsUpdateFormOverridesProps = {
    SavedPostsUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    username?: PrimitiveOverrideProps<TextFieldProps>;
    postIds?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SavedPostsUpdateFormProps = React.PropsWithChildren<{
    overrides?: SavedPostsUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    savedPosts?: any;
    onSubmit?: (fields: SavedPostsUpdateFormInputValues) => SavedPostsUpdateFormInputValues;
    onSuccess?: (fields: SavedPostsUpdateFormInputValues) => void;
    onError?: (fields: SavedPostsUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SavedPostsUpdateFormInputValues) => SavedPostsUpdateFormInputValues;
    onValidate?: SavedPostsUpdateFormValidationValues;
} & React.CSSProperties>;
export default function SavedPostsUpdateForm(props: SavedPostsUpdateFormProps): React.ReactElement;
