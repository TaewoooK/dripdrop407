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
import { getFriend } from "../graphql/queries";
import { updateFriend } from "../graphql/mutations";
const client = generateClient();
export default function FriendUpdateForm(props) {
  const {
    id: idProp,
    friend: friendModelProp,
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
    FriendId: "",
  };
  const [UserId, setUserId] = React.useState(initialValues.UserId);
  const [FriendId, setFriendId] = React.useState(initialValues.FriendId);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = friendRecord
      ? { ...initialValues, ...friendRecord }
      : initialValues;
    setUserId(cleanValues.UserId);
    setFriendId(cleanValues.FriendId);
    setErrors({});
  };
  const [friendRecord, setFriendRecord] = React.useState(friendModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getFriend.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getFriend
        : friendModelProp;
      setFriendRecord(record);
    };
    queryData();
  }, [idProp, friendModelProp]);
  React.useEffect(resetStateValues, [friendRecord]);
  const validations = {
    UserId: [{ type: "Required" }],
    FriendId: [{ type: "Required" }],
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
          FriendId,
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
            query: updateFriend.replaceAll("__typename", ""),
            variables: {
              input: {
                id: friendRecord.id,
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
      {...getOverrideProps(overrides, "FriendUpdateForm")}
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
              FriendId,
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
        label="Friend id"
        isRequired={true}
        isReadOnly={false}
        value={FriendId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              UserId,
              FriendId: value,
            };
            const result = onChange(modelFields);
            value = result?.FriendId ?? value;
          }
          if (errors.FriendId?.hasError) {
            runValidationTasks("FriendId", value);
          }
          setFriendId(value);
        }}
        onBlur={() => runValidationTasks("FriendId", FriendId)}
        errorMessage={errors.FriendId?.errorMessage}
        hasError={errors.FriendId?.hasError}
        {...getOverrideProps(overrides, "FriendId")}
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
          isDisabled={!(idProp || friendModelProp)}
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
              !(idProp || friendModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
