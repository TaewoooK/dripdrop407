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
export declare type DoublePointsTimeCreateFormInputValues = {
    date?: string;
    startTime?: string;
};
export declare type DoublePointsTimeCreateFormValidationValues = {
    date?: ValidationFunction<string>;
    startTime?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type DoublePointsTimeCreateFormOverridesProps = {
    DoublePointsTimeCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    date?: PrimitiveOverrideProps<TextFieldProps>;
    startTime?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type DoublePointsTimeCreateFormProps = React.PropsWithChildren<{
    overrides?: DoublePointsTimeCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: DoublePointsTimeCreateFormInputValues) => DoublePointsTimeCreateFormInputValues;
    onSuccess?: (fields: DoublePointsTimeCreateFormInputValues) => void;
    onError?: (fields: DoublePointsTimeCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: DoublePointsTimeCreateFormInputValues) => DoublePointsTimeCreateFormInputValues;
    onValidate?: DoublePointsTimeCreateFormValidationValues;
} & React.CSSProperties>;
export default function DoublePointsTimeCreateForm(props: DoublePointsTimeCreateFormProps): React.ReactElement;
