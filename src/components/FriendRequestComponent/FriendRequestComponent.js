/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import React, { useEffect, useContext } from "react";
import { UserContext } from './../../UserContext';

import { getOverrideProps, useAuth } from "../../ui-components/utils";
import { generateClient } from "aws-amplify/api";
import { createFriend, deleteFriendRequest } from "../../graphql/mutations";
import { Button, Icon, Text, View } from "@aws-amplify/ui-react";

const client = generateClient();

export default function FriendRequest(props) {
    const { key, friendRequest, onClickEvent } = props;
    const { allUsers, myUser } = useContext(UserContext);


    const handleDeleteFriendRequest = async () => {
        await client.graphql({
        query: deleteFriendRequest.replaceAll("__typename", ""),
        variables: {
            input: {
                id: friendRequest.id,
            },
        },
        });

        onClickEvent();
    };

    const handleAddFriend = async () => {
        // Insert friend record for current user
        await client.graphql({
        query: createFriend.replaceAll("__typename", ""),
        variables: {
            input: {
                Username: myUser.username,
                FriendUsername: friendRequest.SenderUsername,
            },
        },
        });

        // Insert friend record for friend user
        await client.graphql({
        query: createFriend.replaceAll("__typename", ""),
        variables: {
            input: {
                Username: friendRequest.SenderUsername,
                FriendUsername: myUser.username,
            },
        },
        });

        handleDeleteFriendRequest();
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
            children={friendRequest?.SenderUsername}
        ></Text>
        <Button
            width="unset"
            height="unset"
            position="absolute"
            top="25%"
            bottom="29.17%"
            left="79.9%"
            right="4.44%"
            size="small"
            isDisabled={false}
            variation="destructive"
            children="Deny"
            onClick={() => {
            handleDeleteFriendRequest();
            }}
        ></Button>
        <Button
            width="unset"
            height="unset"
            position="absolute"
            top="calc(50% - 16.5px - 1.5px)"
            left="calc(50% - 37px - -65.5px)"
            size="small"
            isDisabled={false}
            variation="primary"
            children="Accept"
            onClick={() => {
            handleAddFriend();
            }}
        ></Button>
        </View>
    );
}
