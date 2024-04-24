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
import { getBattle } from "../graphql/queries";
import { updateBattle } from "../graphql/mutations";
const client = generateClient();
export default function BattleUpdateForm(props) {
  const {
    id: idProp,
    battle: battleModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    Player1: "",
    Player2: "",
    Player1Status: "",
    Player2Status: "",
    Player1Score: "",
    Player2Score: "",
    Player1ImageKey: "",
    Player2ImageKey: "",
    createdAt: "",
  };
  const [Player1, setPlayer1] = React.useState(initialValues.Player1);
  const [Player2, setPlayer2] = React.useState(initialValues.Player2);
  const [Player1Status, setPlayer1Status] = React.useState(
    initialValues.Player1Status
  );
  const [Player2Status, setPlayer2Status] = React.useState(
    initialValues.Player2Status
  );
  const [Player1Score, setPlayer1Score] = React.useState(
    initialValues.Player1Score
  );
  const [Player2Score, setPlayer2Score] = React.useState(
    initialValues.Player2Score
  );
  const [Player1ImageKey, setPlayer1ImageKey] = React.useState(
    initialValues.Player1ImageKey
  );
  const [Player2ImageKey, setPlayer2ImageKey] = React.useState(
    initialValues.Player2ImageKey
  );
  const [createdAt, setCreatedAt] = React.useState(initialValues.createdAt);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = battleRecord
      ? { ...initialValues, ...battleRecord }
      : initialValues;
    setPlayer1(cleanValues.Player1);
    setPlayer2(cleanValues.Player2);
    setPlayer1Status(cleanValues.Player1Status);
    setPlayer2Status(cleanValues.Player2Status);
    setPlayer1Score(cleanValues.Player1Score);
    setPlayer2Score(cleanValues.Player2Score);
    setPlayer1ImageKey(cleanValues.Player1ImageKey);
    setPlayer2ImageKey(cleanValues.Player2ImageKey);
    setCreatedAt(cleanValues.createdAt);
    setErrors({});
  };
  const [battleRecord, setBattleRecord] = React.useState(battleModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getBattle.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getBattle
        : battleModelProp;
      setBattleRecord(record);
    };
    queryData();
  }, [idProp, battleModelProp]);
  React.useEffect(resetStateValues, [battleRecord]);
  const validations = {
    Player1: [{ type: "Required" }],
    Player2: [{ type: "Required" }],
    Player1Status: [{ type: "Required" }],
    Player2Status: [{ type: "Required" }],
    Player1Score: [{ type: "Required" }],
    Player2Score: [{ type: "Required" }],
    Player1ImageKey: [{ type: "Required" }],
    Player2ImageKey: [{ type: "Required" }],
    createdAt: [{ type: "Required" }],
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
          Player1,
          Player2,
          Player1Status,
          Player2Status,
          Player1Score,
          Player2Score,
          Player1ImageKey,
          Player2ImageKey,
          createdAt,
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
            query: updateBattle.replaceAll("__typename", ""),
            variables: {
              input: {
                id: battleRecord.id,
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
      {...getOverrideProps(overrides, "BattleUpdateForm")}
      {...rest}
    >
      <TextField
        label="Player1"
        isRequired={true}
        isReadOnly={false}
        value={Player1}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Player1: value,
              Player2,
              Player1Status,
              Player2Status,
              Player1Score,
              Player2Score,
              Player1ImageKey,
              Player2ImageKey,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.Player1 ?? value;
          }
          if (errors.Player1?.hasError) {
            runValidationTasks("Player1", value);
          }
          setPlayer1(value);
        }}
        onBlur={() => runValidationTasks("Player1", Player1)}
        errorMessage={errors.Player1?.errorMessage}
        hasError={errors.Player1?.hasError}
        {...getOverrideProps(overrides, "Player1")}
      ></TextField>
      <TextField
        label="Player2"
        isRequired={true}
        isReadOnly={false}
        value={Player2}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Player1,
              Player2: value,
              Player1Status,
              Player2Status,
              Player1Score,
              Player2Score,
              Player1ImageKey,
              Player2ImageKey,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.Player2 ?? value;
          }
          if (errors.Player2?.hasError) {
            runValidationTasks("Player2", value);
          }
          setPlayer2(value);
        }}
        onBlur={() => runValidationTasks("Player2", Player2)}
        errorMessage={errors.Player2?.errorMessage}
        hasError={errors.Player2?.hasError}
        {...getOverrideProps(overrides, "Player2")}
      ></TextField>
      <TextField
        label="Player1 status"
        isRequired={true}
        isReadOnly={false}
        value={Player1Status}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Player1,
              Player2,
              Player1Status: value,
              Player2Status,
              Player1Score,
              Player2Score,
              Player1ImageKey,
              Player2ImageKey,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.Player1Status ?? value;
          }
          if (errors.Player1Status?.hasError) {
            runValidationTasks("Player1Status", value);
          }
          setPlayer1Status(value);
        }}
        onBlur={() => runValidationTasks("Player1Status", Player1Status)}
        errorMessage={errors.Player1Status?.errorMessage}
        hasError={errors.Player1Status?.hasError}
        {...getOverrideProps(overrides, "Player1Status")}
      ></TextField>
      <TextField
        label="Player2 status"
        isRequired={true}
        isReadOnly={false}
        value={Player2Status}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Player1,
              Player2,
              Player1Status,
              Player2Status: value,
              Player1Score,
              Player2Score,
              Player1ImageKey,
              Player2ImageKey,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.Player2Status ?? value;
          }
          if (errors.Player2Status?.hasError) {
            runValidationTasks("Player2Status", value);
          }
          setPlayer2Status(value);
        }}
        onBlur={() => runValidationTasks("Player2Status", Player2Status)}
        errorMessage={errors.Player2Status?.errorMessage}
        hasError={errors.Player2Status?.hasError}
        {...getOverrideProps(overrides, "Player2Status")}
      ></TextField>
      <TextField
        label="Player1 score"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={Player1Score}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              Player1,
              Player2,
              Player1Status,
              Player2Status,
              Player1Score: value,
              Player2Score,
              Player1ImageKey,
              Player2ImageKey,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.Player1Score ?? value;
          }
          if (errors.Player1Score?.hasError) {
            runValidationTasks("Player1Score", value);
          }
          setPlayer1Score(value);
        }}
        onBlur={() => runValidationTasks("Player1Score", Player1Score)}
        errorMessage={errors.Player1Score?.errorMessage}
        hasError={errors.Player1Score?.hasError}
        {...getOverrideProps(overrides, "Player1Score")}
      ></TextField>
      <TextField
        label="Player2 score"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={Player2Score}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              Player1,
              Player2,
              Player1Status,
              Player2Status,
              Player1Score,
              Player2Score: value,
              Player1ImageKey,
              Player2ImageKey,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.Player2Score ?? value;
          }
          if (errors.Player2Score?.hasError) {
            runValidationTasks("Player2Score", value);
          }
          setPlayer2Score(value);
        }}
        onBlur={() => runValidationTasks("Player2Score", Player2Score)}
        errorMessage={errors.Player2Score?.errorMessage}
        hasError={errors.Player2Score?.hasError}
        {...getOverrideProps(overrides, "Player2Score")}
      ></TextField>
      <TextField
        label="Player1 image key"
        isRequired={true}
        isReadOnly={false}
        value={Player1ImageKey}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Player1,
              Player2,
              Player1Status,
              Player2Status,
              Player1Score,
              Player2Score,
              Player1ImageKey: value,
              Player2ImageKey,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.Player1ImageKey ?? value;
          }
          if (errors.Player1ImageKey?.hasError) {
            runValidationTasks("Player1ImageKey", value);
          }
          setPlayer1ImageKey(value);
        }}
        onBlur={() => runValidationTasks("Player1ImageKey", Player1ImageKey)}
        errorMessage={errors.Player1ImageKey?.errorMessage}
        hasError={errors.Player1ImageKey?.hasError}
        {...getOverrideProps(overrides, "Player1ImageKey")}
      ></TextField>
      <TextField
        label="Player2 image key"
        isRequired={true}
        isReadOnly={false}
        value={Player2ImageKey}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Player1,
              Player2,
              Player1Status,
              Player2Status,
              Player1Score,
              Player2Score,
              Player1ImageKey,
              Player2ImageKey: value,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.Player2ImageKey ?? value;
          }
          if (errors.Player2ImageKey?.hasError) {
            runValidationTasks("Player2ImageKey", value);
          }
          setPlayer2ImageKey(value);
        }}
        onBlur={() => runValidationTasks("Player2ImageKey", Player2ImageKey)}
        errorMessage={errors.Player2ImageKey?.errorMessage}
        hasError={errors.Player2ImageKey?.hasError}
        {...getOverrideProps(overrides, "Player2ImageKey")}
      ></TextField>
      <TextField
        label="Created at"
        isRequired={true}
        isReadOnly={false}
        value={createdAt}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Player1,
              Player2,
              Player1Status,
              Player2Status,
              Player1Score,
              Player2Score,
              Player1ImageKey,
              Player2ImageKey,
              createdAt: value,
            };
            const result = onChange(modelFields);
            value = result?.createdAt ?? value;
          }
          if (errors.createdAt?.hasError) {
            runValidationTasks("createdAt", value);
          }
          setCreatedAt(value);
        }}
        onBlur={() => runValidationTasks("createdAt", createdAt)}
        errorMessage={errors.createdAt?.errorMessage}
        hasError={errors.createdAt?.hasError}
        {...getOverrideProps(overrides, "createdAt")}
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
          isDisabled={!(idProp || battleModelProp)}
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
              !(idProp || battleModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
