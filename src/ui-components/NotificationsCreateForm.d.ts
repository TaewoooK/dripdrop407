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
export declare type NotificationsCreateFormInputValues = {
    username?: string;
    notificationsList?: string[];
};
export declare type NotificationsCreateFormValidationValues = {
    username?: ValidationFunction<string>;
    notificationsList?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type NotificationsCreateFormOverridesProps = {
    NotificationsCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    username?: PrimitiveOverrideProps<TextFieldProps>;
    notificationsList?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type NotificationsCreateFormProps = React.PropsWithChildren<{
    overrides?: NotificationsCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: NotificationsCreateFormInputValues) => NotificationsCreateFormInputValues;
    onSuccess?: (fields: NotificationsCreateFormInputValues) => void;
    onError?: (fields: NotificationsCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: NotificationsCreateFormInputValues) => NotificationsCreateFormInputValues;
    onValidate?: NotificationsCreateFormValidationValues;
} & React.CSSProperties>;
export default function NotificationsCreateForm(props: NotificationsCreateFormProps): React.ReactElement;
