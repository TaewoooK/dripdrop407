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
import { getFriendRequest } from "../graphql/queries";
import { updateFriendRequest } from "../graphql/mutations";
const client = generateClient();
export default function FriendRequestUpdateForm(props) {
  const {
    id: idProp,
    friendRequest: friendRequestModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    UserId: "",
    SenderId: "",
  };
  const [UserId, setUserId] = React.useState(initialValues.UserId);
  const [SenderId, setSenderId] = React.useState(initialValues.SenderId);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = friendRequestRecord
      ? { ...initialValues, ...friendRequestRecord }
      : initialValues;
    setUserId(cleanValues.UserId);
    setSenderId(cleanValues.SenderId);
    setErrors({});
  };
  const [friendRequestRecord, setFriendRequestRecord] = React.useState(
    friendRequestModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getFriendRequest.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getFriendRequest
        : friendRequestModelProp;
      setFriendRequestRecord(record);
    };
    queryData();
  }, [idProp, friendRequestModelProp]);
  React.useEffect(resetStateValues, [friendRequestRecord]);
  const validations = {
    UserId: [{ type: "Required" }],
    SenderId: [{ type: "Required" }],
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
          UserId,
          SenderId,
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
            query: updateFriendRequest.replaceAll("__typename", ""),
            variables: {
              input: {
                id: friendRequestRecord.id,
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
      {...getOverrideProps(overrides, "FriendRequestUpdateForm")}
      {...rest}
    >
      <TextField
        label="User id"
        isRequired={true}
        isReadOnly={false}
        value={UserId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              UserId: value,
              SenderId,
            };
            const result = onChange(modelFields);
            value = result?.UserId ?? value;
          }
          if (errors.UserId?.hasError) {
            runValidationTasks("UserId", value);
          }
          setUserId(value);
        }}
        onBlur={() => runValidationTasks("UserId", UserId)}
        errorMessage={errors.UserId?.errorMessage}
        hasError={errors.UserId?.hasError}
        {...getOverrideProps(overrides, "UserId")}
      ></TextField>
      <TextField
        label="Sender id"
        isRequired={true}
        isReadOnly={false}
        value={SenderId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              UserId,
              SenderId: value,
            };
            const result = onChange(modelFields);
            value = result?.SenderId ?? value;
          }
          if (errors.SenderId?.hasError) {
            runValidationTasks("SenderId", value);
          }
          setSenderId(value);
        }}
        onBlur={() => runValidationTasks("SenderId", SenderId)}
        errorMessage={errors.SenderId?.errorMessage}
        hasError={errors.SenderId?.hasError}
        {...getOverrideProps(overrides, "SenderId")}
      ></TextField>
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
          isDisabled={!(idProp || friendRequestModelProp)}
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
              !(idProp || friendRequestModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
