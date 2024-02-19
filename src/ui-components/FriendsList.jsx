/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "./utils";
import { Text, View } from "@aws-amplify/ui-react";
import Friend from "./Friend";
export default function FriendsList(props) {
  const { overrides, ...rest } = props;
  return (
    <View
      width="583px"
      height="643px"
      display="block"
      gap="unset"
      alignItems="unset"
      justifyContent="unset"
      position="relative"
      padding="0px 0px 0px 0px"
      {...getOverrideProps(overrides, "FriendsList")}
      {...rest}
    >
      <View
        width="583px"
        height="643px"
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
      <View
        padding="0px 0px 0px 0px"
        width="383px"
        height="517px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        position="absolute"
        top="13.69%"
        bottom="5.91%"
        left="17.15%"
        right="17.15%"
        {...getOverrideProps(overrides, "Friends Group")}
      >
        <Friend
          width="383px"
          height="72px"
          display="block"
          gap="unset"
          alignItems="unset"
          justifyContent="unset"
          position="absolute"
          top="445px"
          left="calc(50% - 191.5px - 0px)"
          padding="0px 0px 0px 0px"
          {...getOverrideProps(overrides, "Friend4997933")}
        ></Friend>
        <Friend
          width="383px"
          height="72px"
          display="block"
          gap="unset"
          alignItems="unset"
          justifyContent="unset"
          position="absolute"
          top="356px"
          left="calc(50% - 191.5px - 0px)"
          padding="0px 0px 0px 0px"
          {...getOverrideProps(overrides, "Friend4997934")}
        ></Friend>
        <Friend
          width="383px"
          height="72px"
          display="block"
          gap="unset"
          alignItems="unset"
          justifyContent="unset"
          position="absolute"
          top="267px"
          left="calc(50% - 191.5px - 0px)"
          padding="0px 0px 0px 0px"
          {...getOverrideProps(overrides, "Friend4997949")}
        ></Friend>
        <Friend
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
          {...getOverrideProps(overrides, "Friend4997950")}
        ></Friend>
        <Friend
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
          {...getOverrideProps(overrides, "Friend4997924")}
        ></Friend>
        <Friend
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
          {...getOverrideProps(overrides, "Friend4997916")}
        ></Friend>
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
        top="29px"
        left="70px"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children="Friends List"
        {...getOverrideProps(overrides, "Friends List")}
      ></Text>
    </View>
  );
}
