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
export declare type BannedUsersUpdateFormInputValues = {
    bannedUsers?: string;
};
export declare type BannedUsersUpdateFormValidationValues = {
    bannedUsers?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type BannedUsersUpdateFormOverridesProps = {
    BannedUsersUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    bannedUsers?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type BannedUsersUpdateFormProps = React.PropsWithChildren<{
    overrides?: BannedUsersUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    bannedUsers?: any;
    onSubmit?: (fields: BannedUsersUpdateFormInputValues) => BannedUsersUpdateFormInputValues;
    onSuccess?: (fields: BannedUsersUpdateFormInputValues) => void;
    onError?: (fields: BannedUsersUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: BannedUsersUpdateFormInputValues) => BannedUsersUpdateFormInputValues;
    onValidate?: BannedUsersUpdateFormValidationValues;
} & React.CSSProperties>;
export default function BannedUsersUpdateForm(props: BannedUsersUpdateFormProps): React.ReactElement;
