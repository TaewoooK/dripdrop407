/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
// import { getOverrideProps } from "./utils";
import { Button, Flex, TextAreaField } from "@aws-amplify/ui-react";
export default function ReportPost(props) {
  const { overrides, ...rest } = props;
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
      {...rest}
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
          width="unset"
          height="unset"
          label="Reason for reporting post"
          shrink="0"
          alignSelf="stretch"
          placeholder=""
          size="default"
          isDisabled={false}
          labelHidden={false}
          variation="default"
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
          // {...getOverrideProps(overrides, "Button")}
        ></Button>
      </Flex>
    </Flex>
  );
}
