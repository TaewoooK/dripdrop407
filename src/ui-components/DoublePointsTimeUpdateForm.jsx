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
import { getDoublePointsTime } from "../graphql/queries";
import { updateDoublePointsTime } from "../graphql/mutations";
const client = generateClient();
export default function DoublePointsTimeUpdateForm(props) {
  const {
    id: idProp,
    doublePointsTime: doublePointsTimeModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    date: "",
    startTime: "",
  };
  const [date, setDate] = React.useState(initialValues.date);
  const [startTime, setStartTime] = React.useState(initialValues.startTime);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = doublePointsTimeRecord
      ? { ...initialValues, ...doublePointsTimeRecord }
      : initialValues;
    setDate(cleanValues.date);
    setStartTime(cleanValues.startTime);
    setErrors({});
  };
  const [doublePointsTimeRecord, setDoublePointsTimeRecord] = React.useState(
    doublePointsTimeModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getDoublePointsTime.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getDoublePointsTime
        : doublePointsTimeModelProp;
      setDoublePointsTimeRecord(record);
    };
    queryData();
  }, [idProp, doublePointsTimeModelProp]);
  React.useEffect(resetStateValues, [doublePointsTimeRecord]);
  const validations = {
    date: [],
    startTime: [],
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
          date: date ?? null,
          startTime: startTime ?? null,
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
            query: updateDoublePointsTime.replaceAll("__typename", ""),
            variables: {
              input: {
                id: doublePointsTimeRecord.id,
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
      {...getOverrideProps(overrides, "DoublePointsTimeUpdateForm")}
      {...rest}
    >
      <TextField
        label="Date"
        isRequired={false}
        isReadOnly={false}
        value={date}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date: value,
              startTime,
            };
            const result = onChange(modelFields);
            value = result?.date ?? value;
          }
          if (errors.date?.hasError) {
            runValidationTasks("date", value);
          }
          setDate(value);
        }}
        onBlur={() => runValidationTasks("date", date)}
        errorMessage={errors.date?.errorMessage}
        hasError={errors.date?.hasError}
        {...getOverrideProps(overrides, "date")}
      ></TextField>
      <TextField
        label="Start time"
        isRequired={false}
        isReadOnly={false}
        value={startTime}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              startTime: value,
            };
            const result = onChange(modelFields);
            value = result?.startTime ?? value;
          }
          if (errors.startTime?.hasError) {
            runValidationTasks("startTime", value);
          }
          setStartTime(value);
        }}
        onBlur={() => runValidationTasks("startTime", startTime)}
        errorMessage={errors.startTime?.errorMessage}
        hasError={errors.startTime?.hasError}
        {...getOverrideProps(overrides, "startTime")}
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
          isDisabled={!(idProp || doublePointsTimeModelProp)}
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
              !(idProp || doublePointsTimeModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
