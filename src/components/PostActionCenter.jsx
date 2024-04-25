/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex } from "@aws-amplify/ui-react";
import { isDevGlobal } from "../App";

export default function PostActionCenter({
  toggleReportPost,
  toggleSavePost,
  saved,
  deleteCurrPost,
}) {
  // const { overrides, ...rest } = props;

  const handleReportButtonClick = () => {
    toggleReportPost();
  };

  const handleSavePostButtonClick = () => {
    console.log("save post");
    toggleSavePost();
  };

  const handleDeleteButtonClick = () => {
    console.log("delete post");
    deleteCurrPost();
  };

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
      // {...rest}
    >
      <Button
        width="367px"
        height="unset"
        shrink="0"
        size="large"
        isDisabled={false}
        variation="primary"
        children="View Profile"
        // onClick={"/profile"}
      ></Button>

      <Button
        width="367px"
        height="unset"
        shrink="0"
        size="large"
        isDisabled={false}
        variation="primary"
        children={saved ? "Unsave Post" : "Save Post"}
        onClick={handleSavePostButtonClick}
      ></Button>

      <Button
        width="367px"
        height="unset"
        shrink="0"
        size="large"
        isDisabled={false}
        variation="primary"
        children="Report Post"
        onClick={handleReportButtonClick}
      ></Button>

      {isDevGlobal && (
        <Button
          width="367px"
          height="unset"
          shrink="0"
          size="large"
          isDisabled={false}
          variation="primary"
          children="Delete Post"
          style={{ backgroundColor: "#8B0000" }}
          onClick={handleDeleteButtonClick}
        ></Button>
      )}
    </Flex>
  );
}
