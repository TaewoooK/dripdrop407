/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "./utils";
import FriendRequestsListCondensed from "./FriendRequestsListCondensed";
import FriendsList from "./FriendsList";
import { Divider, View } from "@aws-amplify/ui-react";
export default function FullFriends(props) {
  const { overrides, ...rest } = props;
  return (
    <View
      width="583px"
      height="1100px"
      display="block"
      gap="unset"
      alignItems="unset"
      justifyContent="unset"
      position="relative"
      padding="0px 0px 0px 0px"
      {...getOverrideProps(overrides, "FullFriends")}
      {...rest}
    >
      <FriendRequestsListCondensed
        width="583px"
        height="406px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        position="absolute"
        top="0%"
        bottom="63.09%"
        left="0%"
        right="0%"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "Friend Requests List (Condensed)")}
      ></FriendRequestsListCondensed>
      <FriendsList
        width="583px"
        height="694px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        position="absolute"
        top="36.91%"
        bottom="0%"
        left="0%"
        right="0%"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "Friends List")}
      ></FriendsList>
      <Divider
        width="300px"
        position="absolute"
        top="36.91%"
        bottom="62.82%"
        left="24.01%"
        right="24.53%"
        size="large"
        orientation="horizontal"
        {...getOverrideProps(overrides, "Divider")}
      ></Divider>
    </View>
  );
}
