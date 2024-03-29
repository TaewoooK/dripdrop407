/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SwitchField,
  TextField,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getPrivacy } from "../graphql/queries";
import { updatePrivacy } from "../graphql/mutations";
const client = generateClient();
export default function PrivacyUpdateForm(props) {
  const {
    id: idProp,
    privacy: privacyModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    Username: "",
    Private: false,
  };
  const [Username, setUsername] = React.useState(initialValues.Username);
  const [Private1, setPrivate1] = React.useState(initialValues.Private);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = privacyRecord
      ? { ...initialValues, ...privacyRecord }
      : initialValues;
    setUsername(cleanValues.Username);
    setPrivate1(cleanValues.Private);
    setErrors({});
  };
  const [privacyRecord, setPrivacyRecord] = React.useState(privacyModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getPrivacy.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getPrivacy
        : privacyModelProp;
      setPrivacyRecord(record);
    };
    queryData();
  }, [idProp, privacyModelProp]);
  React.useEffect(resetStateValues, [privacyRecord]);
  const validations = {
    Username: [{ type: "Required" }],
    Private: [{ type: "Required" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          Username,
          Private: Private1,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: updatePrivacy.replaceAll("__typename", ""),
            variables: {
              input: {
                id: privacyRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "PrivacyUpdateForm")}
      {...rest}
    >
      <TextField
        label="Username"
        isRequired={true}
        isReadOnly={false}
        value={Username}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Username: value,
              Private: Private1,
            };
            const result = onChange(modelFields);
            value = result?.Username ?? value;
          }
          if (errors.Username?.hasError) {
            runValidationTasks("Username", value);
          }
          setUsername(value);
        }}
        onBlur={() => runValidationTasks("Username", Username)}
        errorMessage={errors.Username?.errorMessage}
        hasError={errors.Username?.hasError}
        {...getOverrideProps(overrides, "Username")}
      ></TextField>
      <SwitchField
        label="Private"
        defaultChecked={false}
        isDisabled={false}
        isChecked={Private1}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              Username,
              Private: value,
            };
            const result = onChange(modelFields);
            value = result?.Private ?? value;
          }
          if (errors.Private?.hasError) {
            runValidationTasks("Private", value);
          }
          setPrivate1(value);
        }}
        onBlur={() => runValidationTasks("Private", Private1)}
        errorMessage={errors.Private?.errorMessage}
        hasError={errors.Private?.hasError}
        {...getOverrideProps(overrides, "Private")}
      ></SwitchField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || privacyModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || privacyModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
