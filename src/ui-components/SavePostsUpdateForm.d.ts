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
export declare type SavePostsUpdateFormInputValues = {
    username?: string;
    postIds?: string[];
};
export declare type SavePostsUpdateFormValidationValues = {
    username?: ValidationFunction<string>;
    postIds?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SavePostsUpdateFormOverridesProps = {
    SavePostsUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    username?: PrimitiveOverrideProps<TextFieldProps>;
    postIds?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SavePostsUpdateFormProps = React.PropsWithChildren<{
    overrides?: SavePostsUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    savePosts?: any;
    onSubmit?: (fields: SavePostsUpdateFormInputValues) => SavePostsUpdateFormInputValues;
    onSuccess?: (fields: SavePostsUpdateFormInputValues) => void;
    onError?: (fields: SavePostsUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SavePostsUpdateFormInputValues) => SavePostsUpdateFormInputValues;
    onValidate?: SavePostsUpdateFormValidationValues;
} & React.CSSProperties>;
export default function SavePostsUpdateForm(props: SavePostsUpdateFormProps): React.ReactElement;
