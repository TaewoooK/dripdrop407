/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "./utils";
import { Text, View } from "@aws-amplify/ui-react";
import FriendRequest from "./FriendRequest";
export default function FriendRequestsListCondensed(props) {
  const { overrides, ...rest } = props;
  return (
    <View
      width="583px"
      height="406px"
      display="block"
      gap="unset"
      alignItems="unset"
      justifyContent="unset"
      position="relative"
      padding="0px 0px 0px 0px"
      {...getOverrideProps(overrides, "FriendRequestsListCondensed")}
      {...rest}
    >
      <View
        width="583px"
        height="406px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        position="absolute"
        top="0%"
        bottom="0%"
        left="0%"
        right="0%"
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        padding="0px 0px 0px 0px"
        backgroundColor="rgba(34,34,34,1)"
        {...getOverrideProps(overrides, "Backdrop")}
      ></View>
      <Text
        fontFamily="Inter"
        fontSize="16px"
        fontWeight="600"
        color="rgba(255,255,255,1)"
        lineHeight="24px"
        textAlign="left"
        display="block"
        direction="column"
        justifyContent="unset"
        width="unset"
        height="unset"
        gap="unset"
        alignItems="unset"
        position="absolute"
        top="349px"
        left="115px"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children="See More..."
        {...getOverrideProps(overrides, "See More...")}
      ></Text>
      <View
        padding="0px 0px 0px 0px"
        width="383px"
        height="250px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        position="absolute"
        top="21.18%"
        bottom="17.24%"
        left="17.15%"
        right="17.15%"
        {...getOverrideProps(overrides, "Requests Group")}
      >
        <FriendRequest
          width="383px"
          height="72px"
          display="block"
          gap="unset"
          alignItems="unset"
          justifyContent="unset"
          position="absolute"
          top="178px"
          left="calc(50% - 191.5px - 0px)"
          padding="0px 0px 0px 0px"
          {...getOverrideProps(overrides, "Friend Request49591312")}
        ></FriendRequest>
        <FriendRequest
          width="383px"
          height="72px"
          display="block"
          gap="unset"
          alignItems="unset"
          justifyContent="unset"
          position="absolute"
          top="89px"
          left="calc(50% - 191.5px - 0px)"
          padding="0px 0px 0px 0px"
          {...getOverrideProps(overrides, "Friend Request49591299")}
        ></FriendRequest>
        <FriendRequest
          width="383px"
          height="72px"
          display="block"
          gap="unset"
          alignItems="unset"
          justifyContent="unset"
          position="absolute"
          top="0px"
          left="calc(50% - 191.5px - 0px)"
          padding="0px 0px 0px 0px"
          {...getOverrideProps(overrides, "Friend Request49591286")}
        ></FriendRequest>
      </View>
      <Text
        fontFamily="Inter"
        fontSize="32px"
        fontWeight="500"
        color="rgba(255,255,255,1)"
        lineHeight="40px"
        textAlign="left"
        display="block"
        direction="column"
        justifyContent="unset"
        width="457px"
        height="37px"
        gap="unset"
        alignItems="unset"
        position="absolute"
        top="27px"
        left="70px"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children="Friend Requests"
        {...getOverrideProps(overrides, "Friend Requests")}
      ></Text>
    </View>
  );
}
