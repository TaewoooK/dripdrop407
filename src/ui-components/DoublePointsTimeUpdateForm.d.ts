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
export declare type DoublePointsTimeUpdateFormInputValues = {
    date?: string;
    startTime?: string;
};
export declare type DoublePointsTimeUpdateFormValidationValues = {
    date?: ValidationFunction<string>;
    startTime?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type DoublePointsTimeUpdateFormOverridesProps = {
    DoublePointsTimeUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    date?: PrimitiveOverrideProps<TextFieldProps>;
    startTime?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type DoublePointsTimeUpdateFormProps = React.PropsWithChildren<{
    overrides?: DoublePointsTimeUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    doublePointsTime?: any;
    onSubmit?: (fields: DoublePointsTimeUpdateFormInputValues) => DoublePointsTimeUpdateFormInputValues;
    onSuccess?: (fields: DoublePointsTimeUpdateFormInputValues) => void;
    onError?: (fields: DoublePointsTimeUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: DoublePointsTimeUpdateFormInputValues) => DoublePointsTimeUpdateFormInputValues;
    onValidate?: DoublePointsTimeUpdateFormValidationValues;
} & React.CSSProperties>;
export default function DoublePointsTimeUpdateForm(props: DoublePointsTimeUpdateFormProps): React.ReactElement;
