/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import React, { useState, useContext } from "react";
import { UserContext } from './../../UserContext';

import { generateClient } from "aws-amplify/api";
import { deleteFriend } from "../../graphql/mutations";
// import { getOverrideProps, useAuth } from "../../ui-components/utils";
import { Button, Icon, Text, View } from "@aws-amplify/ui-react";

const client = generateClient();

export default function Friend(props) {
  const { key, friend, onClickEvent, otherFriend } = props;
  const { allUsers, myUser } = useContext(UserContext);

  const handleRemoveFriend = async () => {
    console.log('Clicked remove friend: ', friend.FriendUsername)
    // Remove Friend record for current user
    try {
      await client.graphql({
        query: deleteFriend.replaceAll("__typename", ""),
        variables: {
          input: {
            id: friend.id,
          },
        },
      });
    } catch (error) {
      console.log('Removing Friend record for current user failed: ', error);
    }

    console.log('friend: ', friend);
    console.log('otherFriend: ', otherFriend);

    // Remove Friend record for ex-friend user
    try {
      await client.graphql({
        query: deleteFriend.replaceAll("__typename", ""),
        variables: {
          input: {
            id: otherFriend.id,
          },
        },
      });
    } catch (error) {
      console.log('Removing Friend record for ex-friend user failed: ', error);
    }

    onClickEvent();
  };
  
  return (
    <View
      width="383px"
      height="72px"
      display="block"
      gap="unset"
      alignItems="unset"
      justifyContent="unset"
      position="relative"
      padding="0px 0px 0px 0px"
    >
      <View
        width="383px"
        height="72px"
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
        borderRadius="50px"
        padding="0px 0px 0px 0px"
        backgroundColor="rgba(217,217,217,0.1)"
      ></View>
      <Icon
        width="11.81%"
        height="62.67%"
        viewBox={{
          minX: 0,
          minY: 0,
          width: 45.215274810791016,
          height: 45.12442398071289,
        }}
        paths={[
          {
            d: "M45.2153 22.5622C45.2153 35.023 35.0935 45.1244 22.6076 45.1244C10.1218 45.1244 0 35.023 0 22.5622C0 10.1014 10.1218 0 22.6076 0C35.0935 0 45.2153 10.1014 45.2153 22.5622Z",
            fillRule: "nonzero",
          },
        ]}
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        position="absolute"
        top="18.89%"
        bottom="18.43%"
        left="3.82%"
        right="84.38%"
      ></Icon>
      <Text
        fontFamily="Inter"
        fontSize="16px"
        fontWeight="400"
        color="rgba(255,255,255,1)"
        lineHeight="24px"
        textAlign="left"
        display="block"
        direction="column"
        justifyContent="unset"
        width="163.58px"
        height="25.89px"
        gap="unset"
        alignItems="unset"
        position="absolute"
        top="22.57%"
        bottom="41.47%"
        left="18.92%"
        right="38.37%"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children={friend?.FriendUsername}
      ></Text>
      <Button
        width="unset"
        height="unset"
        position="absolute"
        top="calc(50% - 16.5px - 0.5px)"
        left="calc(50% - 39.5px - -134px)"
        size="small"
        isDisabled={false}
        variation="destructive"
        children="Remove"
        onClick={() => {
          handleRemoveFriend();
        }}
      ></Button>
    </View>
  );
}
