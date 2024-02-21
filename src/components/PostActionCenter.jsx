/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
// import { getOverrideProps } from "./utils";
import { Button, Flex } from "@aws-amplify/ui-react";
export default function PostActionCenter(props) {
  const { overrides, ...rest } = props;
  return (
    <Flex
      gap="26px"
      direction="column"
      width="unset"
      height="unset"
      justifyContent="flex-start"
      alignItems="flex-start"
      overflow="hidden"
      position="relative"
      borderRadius="8px"
      padding="48px 32px 48px 32px"
      backgroundColor="rgba(255,255,255,1)"
      {...rest}
    >
      <Button
        width="367px"
        height="unset"
        shrink="0"
        size="large"
        isDisabled={false}
        variation="primary"
        children="Report Post"
      ></Button>
      <Button
        width="367px"
        height="unset"
        shrink="0"
        size="large"
        isDisabled={false}
        variation="primary"
        children="View Profile"
      ></Button>
      <Button
        width="367px"
        height="unset"
        shrink="0"
        size="large"
        isDisabled={false}
        variation="primary"
        children="Something"
      ></Button>
    </Flex>
  );
}
