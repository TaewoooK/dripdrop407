/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createPostReport } from "../graphql/mutations";
const client = generateClient();
export default function PostReportCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    reporter: "",
    reason: "",
    sentAt: "",
    postId: "",
  };
  const [reporter, setReporter] = React.useState(initialValues.reporter);
  const [reason, setReason] = React.useState(initialValues.reason);
  const [sentAt, setSentAt] = React.useState(initialValues.sentAt);
  const [postId, setPostId] = React.useState(initialValues.postId);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setReporter(initialValues.reporter);
    setReason(initialValues.reason);
    setSentAt(initialValues.sentAt);
    setPostId(initialValues.postId);
    setErrors({});
  };
  const validations = {
    reporter: [{ type: "Required" }],
    reason: [],
    sentAt: [{ type: "Required" }],
    postId: [{ type: "Required" }],
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
          reporter,
          reason,
          sentAt,
          postId,
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
            query: createPostReport.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "PostReportCreateForm")}
      {...rest}
    >
      <TextField
        label="Reporter"
        isRequired={true}
        isReadOnly={false}
        value={reporter}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              reporter: value,
              reason,
              sentAt,
              postId,
            };
            const result = onChange(modelFields);
            value = result?.reporter ?? value;
          }
          if (errors.reporter?.hasError) {
            runValidationTasks("reporter", value);
          }
          setReporter(value);
        }}
        onBlur={() => runValidationTasks("reporter", reporter)}
        errorMessage={errors.reporter?.errorMessage}
        hasError={errors.reporter?.hasError}
        {...getOverrideProps(overrides, "reporter")}
      ></TextField>
      <TextField
        label="Reason"
        isRequired={false}
        isReadOnly={false}
        value={reason}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              reporter,
              reason: value,
              sentAt,
              postId,
            };
            const result = onChange(modelFields);
            value = result?.reason ?? value;
          }
          if (errors.reason?.hasError) {
            runValidationTasks("reason", value);
          }
          setReason(value);
        }}
        onBlur={() => runValidationTasks("reason", reason)}
        errorMessage={errors.reason?.errorMessage}
        hasError={errors.reason?.hasError}
        {...getOverrideProps(overrides, "reason")}
      ></TextField>
      <TextField
        label="Sent at"
        isRequired={true}
        isReadOnly={false}
        value={sentAt}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              reporter,
              reason,
              sentAt: value,
              postId,
            };
            const result = onChange(modelFields);
            value = result?.sentAt ?? value;
          }
          if (errors.sentAt?.hasError) {
            runValidationTasks("sentAt", value);
          }
          setSentAt(value);
        }}
        onBlur={() => runValidationTasks("sentAt", sentAt)}
        errorMessage={errors.sentAt?.errorMessage}
        hasError={errors.sentAt?.hasError}
        {...getOverrideProps(overrides, "sentAt")}
      ></TextField>
      <TextField
        label="Post id"
        isRequired={true}
        isReadOnly={false}
        value={postId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              reporter,
              reason,
              sentAt,
              postId: value,
            };
            const result = onChange(modelFields);
            value = result?.postId ?? value;
          }
          if (errors.postId?.hasError) {
            runValidationTasks("postId", value);
          }
          setPostId(value);
        }}
        onBlur={() => runValidationTasks("postId", postId)}
        errorMessage={errors.postId?.errorMessage}
        hasError={errors.postId?.hasError}
        {...getOverrideProps(overrides, "postId")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
