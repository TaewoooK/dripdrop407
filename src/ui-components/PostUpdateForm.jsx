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
import { getPost } from "../graphql/queries";
import { updatePost } from "../graphql/mutations";
const client = generateClient();
export default function PostUpdateForm(props) {
  const {
    id: idProp,
    post: postModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    owner: "",
    description: "",
    comments: "",
    drip_points: "",
    createdAt: "",
    enable_comments: false,
    postImageKey: "",
  };
  const [owner, setOwner] = React.useState(initialValues.owner);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [comments, setComments] = React.useState(initialValues.comments);
  const [drip_points, setDrip_points] = React.useState(
    initialValues.drip_points
  );
  const [createdAt, setCreatedAt] = React.useState(initialValues.createdAt);
  const [enable_comments, setEnable_comments] = React.useState(
    initialValues.enable_comments
  );
  const [postImageKey, setPostImageKey] = React.useState(
    initialValues.postImageKey
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = postRecord
      ? { ...initialValues, ...postRecord }
      : initialValues;
    setOwner(cleanValues.owner);
    setDescription(cleanValues.description);
    setComments(cleanValues.comments);
    setDrip_points(cleanValues.drip_points);
    setCreatedAt(cleanValues.createdAt);
    setEnable_comments(cleanValues.enable_comments);
    setPostImageKey(cleanValues.postImageKey);
    setErrors({});
  };
  const [postRecord, setPostRecord] = React.useState(postModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getPost.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getPost
        : postModelProp;
      setPostRecord(record);
    };
    queryData();
  }, [idProp, postModelProp]);
  React.useEffect(resetStateValues, [postRecord]);
  const validations = {
    owner: [{ type: "Required" }],
    description: [{ type: "Required" }],
    comments: [],
    drip_points: [],
    createdAt: [],
    enable_comments: [],
    postImageKey: [],
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
          owner,
          description,
          comments: comments ?? null,
          drip_points: drip_points ?? null,
          createdAt: createdAt ?? null,
          enable_comments: enable_comments ?? null,
          postImageKey: postImageKey ?? null,
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
                id: postRecord.id,
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
      {...getOverrideProps(overrides, "PostUpdateForm")}
      {...rest}
    >
      <TextField
        label="Owner"
        isRequired={true}
        isReadOnly={false}
        value={owner}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              owner: value,
              description,
              comments,
              drip_points,
              createdAt,
              enable_comments,
              postImageKey,
            };
            const result = onChange(modelFields);
            value = result?.owner ?? value;
          }
          if (errors.owner?.hasError) {
            runValidationTasks("owner", value);
          }
          setOwner(value);
        }}
        onBlur={() => runValidationTasks("owner", owner)}
        errorMessage={errors.owner?.errorMessage}
        hasError={errors.owner?.hasError}
        {...getOverrideProps(overrides, "owner")}
      ></TextField>
      <TextField
        label="Description"
        isRequired={true}
        isReadOnly={false}
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              owner,
              description: value,
              comments,
              drip_points,
              createdAt,
              enable_comments,
              postImageKey,
            };
            const result = onChange(modelFields);
            value = result?.description ?? value;
          }
          if (errors.description?.hasError) {
            runValidationTasks("description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("description", description)}
        errorMessage={errors.description?.errorMessage}
        hasError={errors.description?.hasError}
        {...getOverrideProps(overrides, "description")}
      ></TextField>
      <TextField
        label="Comments"
        isRequired={false}
        isReadOnly={false}
        value={comments}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              owner,
              description,
              comments: value,
              drip_points,
              createdAt,
              enable_comments,
              postImageKey,
            };
            const result = onChange(modelFields);
            value = result?.comments ?? value;
          }
          if (errors.comments?.hasError) {
            runValidationTasks("comments", value);
          }
          setComments(value);
        }}
        onBlur={() => runValidationTasks("comments", comments)}
        errorMessage={errors.comments?.errorMessage}
        hasError={errors.comments?.hasError}
        {...getOverrideProps(overrides, "comments")}
      ></TextField>
      <TextField
        label="Drip points"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={drip_points}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              owner,
              description,
              comments,
              drip_points: value,
              createdAt,
              enable_comments,
              postImageKey,
            };
            const result = onChange(modelFields);
            value = result?.drip_points ?? value;
          }
          if (errors.drip_points?.hasError) {
            runValidationTasks("drip_points", value);
          }
          setDrip_points(value);
        }}
        onBlur={() => runValidationTasks("drip_points", drip_points)}
        errorMessage={errors.drip_points?.errorMessage}
        hasError={errors.drip_points?.hasError}
        {...getOverrideProps(overrides, "drip_points")}
      ></TextField>
      <TextField
        label="Created at"
        isRequired={false}
        isReadOnly={false}
        value={createdAt}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              owner,
              description,
              comments,
              drip_points,
              createdAt: value,
              enable_comments,
              postImageKey,
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
      <SwitchField
        label="Enable comments"
        defaultChecked={false}
        isDisabled={false}
        isChecked={enable_comments}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              owner,
              description,
              comments,
              drip_points,
              createdAt,
              enable_comments: value,
              postImageKey,
            };
            const result = onChange(modelFields);
            value = result?.enable_comments ?? value;
          }
          if (errors.enable_comments?.hasError) {
            runValidationTasks("enable_comments", value);
          }
          setEnable_comments(value);
        }}
        onBlur={() => runValidationTasks("enable_comments", enable_comments)}
        errorMessage={errors.enable_comments?.errorMessage}
        hasError={errors.enable_comments?.hasError}
        {...getOverrideProps(overrides, "enable_comments")}
      ></SwitchField>
      <TextField
        label="Post image key"
        isRequired={false}
        isReadOnly={false}
        value={postImageKey}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              owner,
              description,
              comments,
              drip_points,
              createdAt,
              enable_comments,
              postImageKey: value,
            };
            const result = onChange(modelFields);
            value = result?.postImageKey ?? value;
          }
          if (errors.postImageKey?.hasError) {
            runValidationTasks("postImageKey", value);
          }
          setPostImageKey(value);
        }}
        onBlur={() => runValidationTasks("postImageKey", postImageKey)}
        errorMessage={errors.postImageKey?.errorMessage}
        hasError={errors.postImageKey?.hasError}
        {...getOverrideProps(overrides, "postImageKey")}
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
          isDisabled={!(idProp || postModelProp)}
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
              !(idProp || postModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}