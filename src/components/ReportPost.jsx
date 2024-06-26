/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
// import { getOverrideProps } from "./utils";
import { Button, Flex, TextAreaField } from "@aws-amplify/ui-react";
import { fetchUserAttributes } from "aws-amplify/auth";
import { createPostReport } from "../graphql/mutations";
import { generateClient } from "aws-amplify/api";

export default function ReportPost({toggleReportPost, currPostID, showReportNotification}) {
  // const { overrides, ...rest } = props;
  const client = generateClient();

  const [reasoning, setReasoning] = React.useState("");
  const [currUser, setCurrUser] = React.useState(null);
  // const [currPostID, setCurrPostID] = React.useState(null);
  
  // const isCurrUserNull = () => {
  //   return currUser ==  null ? true : false
  // }

  const handleReasonChange = (event) => {
    setReasoning(event.target.value);
  }

  React.useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userAttributes = await fetchUserAttributes();
        console.log(userAttributes);
        setCurrUser(userAttributes);
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async() => {
    // const currUserAttributes = await getCurrentUser();
    // setCurrUser(currUserAttributes);
    // console.log(currUserAttributes)
    const currDate = new Date().toISOString();
    // setCurrPostID(currPostID);
    // console.log("Reasoning:", reasoning, "\nUser:", (isCurrUserNull? currUser : currUser.username));
    console.log("Reporter:", currUser.username, "\nreason:", reasoning, "\nSentAt:", currDate, "\nPostID:", currPostID);
    
    const response = await client.graphql({
      query: createPostReport,
      variables: {
        input: {
          reporter: currUser.username,
          reason: reasoning,
          sentAt: currDate,
          postId: currPostID
        },
      },
    });

    const postReportContext = response.data.createPostReport;
    if (!postReportContext) {
      console.log('Failed to send report');
      return;
    }

    toggleReportPost();
    showReportNotification();
  }

  return (
    <Flex
      gap="0"
      direction="column"
      width="431px"
      height="282px"
      justifyContent="center"
      alignItems="center"
      position="relative"
      borderRadius="8px"
      padding="0px 0px 0px 0px"
      // {...getOverrideProps(overrides, "ReportPost")}
      // {...rest}
    >
      <Flex
        gap="24px"
        direction="column"
        width="unset"
        height="282px"
        justifyContent="center"
        alignItems="center"
        shrink="0"
        alignSelf="stretch"
        position="relative"
        borderRadius="8px"
        padding="32px 32px 32px 32px"
        backgroundColor="rgba(250,250,250,1)"
        // {...getOverrideProps(overrides, "Report")}
      >
        <TextAreaField
          width="100%"
          height="auto"
          label="Reason for reporting post"
          shrink="0"
          alignSelf="stretch"
          placeholder=""
          size="default"
          isDisabled={false}
          labelHidden={false}
          variation="default"
          style={{textAlign:"left"}}
          onChange={handleReasonChange}
          // {...getOverrideProps(overrides, "TextAreaField")}
        ></TextAreaField>
        <Button
          width="unset"
          height="unset"
          shrink="0"
          alignSelf="stretch"
          size="large"
          isDisabled={false}
          variation="primary"
          children="Send Report"
          onClick={handleSubmit}
          // {...getOverrideProps(overrides, "Button")}
        ></Button>
      </Flex>
    </Flex>
  );
}