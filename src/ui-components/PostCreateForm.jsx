/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  SwitchField,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createPost } from "../graphql/mutations";
const client = generateClient();
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  runValidationTasks,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    const { hasError } = runValidationTasks();
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function PostCreateForm(props) {
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
    owner: "",
    description: "",
    drip_points: "",
    createdAt: "",
    enable_comments: false,
    postImageKey: "",
    hiddenPeople: [],
    actionedUsers: [],
    tags: [],
  };
  const [owner, setOwner] = React.useState(initialValues.owner);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
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
  const [hiddenPeople, setHiddenPeople] = React.useState(
    initialValues.hiddenPeople
  );
  const [actionedUsers, setActionedUsers] = React.useState(
    initialValues.actionedUsers
  );
  const [tags, setTags] = React.useState(initialValues.tags);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setOwner(initialValues.owner);
    setDescription(initialValues.description);
    setDrip_points(initialValues.drip_points);
    setCreatedAt(initialValues.createdAt);
    setEnable_comments(initialValues.enable_comments);
    setPostImageKey(initialValues.postImageKey);
    setHiddenPeople(initialValues.hiddenPeople);
    setCurrentHiddenPeopleValue("");
    setActionedUsers(initialValues.actionedUsers);
    setCurrentActionedUsersValue("");
    setTags(initialValues.tags);
    setCurrentTagsValue("");
    setErrors({});
  };
  const [currentHiddenPeopleValue, setCurrentHiddenPeopleValue] =
    React.useState("");
  const hiddenPeopleRef = React.createRef();
  const [currentActionedUsersValue, setCurrentActionedUsersValue] =
    React.useState("");
  const actionedUsersRef = React.createRef();
  const [currentTagsValue, setCurrentTagsValue] = React.useState("");
  const tagsRef = React.createRef();
  const validations = {
    owner: [{ type: "Required" }],
    description: [{ type: "Required" }],
    drip_points: [],
    createdAt: [],
    enable_comments: [],
    postImageKey: [],
    hiddenPeople: [],
    actionedUsers: [],
    tags: [],
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
          drip_points,
          createdAt,
          enable_comments,
          postImageKey,
          hiddenPeople,
          actionedUsers,
          tags,
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
            query: createPost.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "PostCreateForm")}
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
              drip_points,
              createdAt,
              enable_comments,
              postImageKey,
              hiddenPeople,
              actionedUsers,
              tags,
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
              drip_points,
              createdAt,
              enable_comments,
              postImageKey,
              hiddenPeople,
              actionedUsers,
              tags,
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
              drip_points: value,
              createdAt,
              enable_comments,
              postImageKey,
              hiddenPeople,
              actionedUsers,
              tags,
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
              drip_points,
              createdAt: value,
              enable_comments,
              postImageKey,
              hiddenPeople,
              actionedUsers,
              tags,
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
              drip_points,
              createdAt,
              enable_comments: value,
              postImageKey,
              hiddenPeople,
              actionedUsers,
              tags,
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
              drip_points,
              createdAt,
              enable_comments,
              postImageKey: value,
              hiddenPeople,
              actionedUsers,
              tags,
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
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              owner,
              description,
              drip_points,
              createdAt,
              enable_comments,
              postImageKey,
              hiddenPeople: values,
              actionedUsers,
              tags,
            };
            const result = onChange(modelFields);
            values = result?.hiddenPeople ?? values;
          }
          setHiddenPeople(values);
          setCurrentHiddenPeopleValue("");
        }}
        currentFieldValue={currentHiddenPeopleValue}
        label={"Hidden people"}
        items={hiddenPeople}
        hasError={errors?.hiddenPeople?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("hiddenPeople", currentHiddenPeopleValue)
        }
        errorMessage={errors?.hiddenPeople?.errorMessage}
        setFieldValue={setCurrentHiddenPeopleValue}
        inputFieldRef={hiddenPeopleRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Hidden people"
          isRequired={false}
          isReadOnly={false}
          value={currentHiddenPeopleValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.hiddenPeople?.hasError) {
              runValidationTasks("hiddenPeople", value);
            }
            setCurrentHiddenPeopleValue(value);
          }}
          onBlur={() =>
            runValidationTasks("hiddenPeople", currentHiddenPeopleValue)
          }
          errorMessage={errors.hiddenPeople?.errorMessage}
          hasError={errors.hiddenPeople?.hasError}
          ref={hiddenPeopleRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "hiddenPeople")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              owner,
              description,
              drip_points,
              createdAt,
              enable_comments,
              postImageKey,
              hiddenPeople,
              actionedUsers: values,
              tags,
            };
            const result = onChange(modelFields);
            values = result?.actionedUsers ?? values;
          }
          setActionedUsers(values);
          setCurrentActionedUsersValue("");
        }}
        currentFieldValue={currentActionedUsersValue}
        label={"Actioned users"}
        items={actionedUsers}
        hasError={errors?.actionedUsers?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("actionedUsers", currentActionedUsersValue)
        }
        errorMessage={errors?.actionedUsers?.errorMessage}
        setFieldValue={setCurrentActionedUsersValue}
        inputFieldRef={actionedUsersRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Actioned users"
          isRequired={false}
          isReadOnly={false}
          value={currentActionedUsersValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.actionedUsers?.hasError) {
              runValidationTasks("actionedUsers", value);
            }
            setCurrentActionedUsersValue(value);
          }}
          onBlur={() =>
            runValidationTasks("actionedUsers", currentActionedUsersValue)
          }
          errorMessage={errors.actionedUsers?.errorMessage}
          hasError={errors.actionedUsers?.hasError}
          ref={actionedUsersRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "actionedUsers")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              owner,
              description,
              drip_points,
              createdAt,
              enable_comments,
              postImageKey,
              hiddenPeople,
              actionedUsers,
              tags: values,
            };
            const result = onChange(modelFields);
            values = result?.tags ?? values;
          }
          setTags(values);
          setCurrentTagsValue("");
        }}
        currentFieldValue={currentTagsValue}
        label={"Tags"}
        items={tags}
        hasError={errors?.tags?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("tags", currentTagsValue)
        }
        errorMessage={errors?.tags?.errorMessage}
        setFieldValue={setCurrentTagsValue}
        inputFieldRef={tagsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Tags"
          isRequired={false}
          isReadOnly={false}
          value={currentTagsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.tags?.hasError) {
              runValidationTasks("tags", value);
            }
            setCurrentTagsValue(value);
          }}
          onBlur={() => runValidationTasks("tags", currentTagsValue)}
          errorMessage={errors.tags?.errorMessage}
          hasError={errors.tags?.hasError}
          ref={tagsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "tags")}
        ></TextField>
      </ArrayField>
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
