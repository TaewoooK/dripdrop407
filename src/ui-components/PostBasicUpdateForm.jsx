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
import { getPost } from "../graphql/queries";
import { updatePost } from "../graphql/mutations";
const client = generateClient();
export default function PostBasicUpdateForm(props) {
  const {
    id: idProp,
    postBasic: postBasicModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    username: "",
    outfitimage: "",
    userphoto: "",
  };
  const [username, setUsername] = React.useState(initialValues.username);
  const [outfitimage, setOutfitimage] = React.useState(
    initialValues.outfitimage
  );
  const [userphoto, setUserphoto] = React.useState(initialValues.userphoto);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = postBasicRecord
      ? { ...initialValues, ...postBasicRecord }
      : initialValues;
    setUsername(cleanValues.username);
    setOutfitimage(cleanValues.outfitimage);
    setUserphoto(cleanValues.userphoto);
    setErrors({});
  };
  const [postBasicRecord, setPostBasicRecord] =
    React.useState(postBasicModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getPost.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getPost
        : postBasicModelProp;
      setPostBasicRecord(record);
    };
    queryData();
  }, [idProp, postBasicModelProp]);
  React.useEffect(resetStateValues, [postBasicRecord]);
  const validations = {
    username: [],
    outfitimage: [{ type: "URL" }],
    userphoto: [{ type: "URL" }],
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
          username: username ?? null,
          outfitimage: outfitimage ?? null,
          userphoto: userphoto ?? null,
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
            query: updatePost.replaceAll("__typename", ""),
            variables: {
              input: {
                id: postBasicRecord.id,
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
      {...getOverrideProps(overrides, "PostBasicUpdateForm")}
      {...rest}
    >
      <TextField
        label="Username"
        isRequired={false}
        isReadOnly={false}
        value={username}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              username: value,
              outfitimage,
              userphoto,
            };
            const result = onChange(modelFields);
            value = result?.username ?? value;
          }
          if (errors.username?.hasError) {
            runValidationTasks("username", value);
          }
          setUsername(value);
        }}
        onBlur={() => runValidationTasks("username", username)}
        errorMessage={errors.username?.errorMessage}
        hasError={errors.username?.hasError}
        {...getOverrideProps(overrides, "username")}
      ></TextField>
      <TextField
        label="Outfitimage"
        isRequired={false}
        isReadOnly={false}
        value={outfitimage}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              username,
              outfitimage: value,
              userphoto,
            };
            const result = onChange(modelFields);
            value = result?.outfitimage ?? value;
          }
          if (errors.outfitimage?.hasError) {
            runValidationTasks("outfitimage", value);
          }
          setOutfitimage(value);
        }}
        onBlur={() => runValidationTasks("outfitimage", outfitimage)}
        errorMessage={errors.outfitimage?.errorMessage}
        hasError={errors.outfitimage?.hasError}
        {...getOverrideProps(overrides, "outfitimage")}
      ></TextField>
      <TextField
        label="Userphoto"
        isRequired={false}
        isReadOnly={false}
        value={userphoto}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              username,
              outfitimage,
              userphoto: value,
            };
            const result = onChange(modelFields);
            value = result?.userphoto ?? value;
          }
          if (errors.userphoto?.hasError) {
            runValidationTasks("userphoto", value);
          }
          setUserphoto(value);
        }}
        onBlur={() => runValidationTasks("userphoto", userphoto)}
        errorMessage={errors.userphoto?.errorMessage}
        hasError={errors.userphoto?.hasError}
        {...getOverrideProps(overrides, "userphoto")}
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
          isDisabled={!(idProp || postBasicModelProp)}
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
              !(idProp || postBasicModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
