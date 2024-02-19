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
      width="629.55px"
      height="1050px"
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
        width="629.55px"
        height="406px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        position="absolute"
        top="0.1%"
        bottom="61.24%"
        left="calc(50% - 314.78px - 0px)"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "Friend Requests List (Condensed)")}
      ></FriendRequestsListCondensed>
      <FriendsList
        width="629.55px"
        height="643px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        position="absolute"
        top="38.76%"
        bottom="0%"
        left="calc(50% - 314.78px - 0px)"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "Friends List")}
      ></FriendsList>
      <Divider
        width="300px"
        position="absolute"
        top="404px"
        left="149px"
        size="large"
        orientation="horizontal"
        {...getOverrideProps(overrides, "Divider")}
      ></Divider>
    </View>
  );
}
