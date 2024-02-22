// React imports
import React, { useState, useEffect, useReducer } from "react";

// AWS Amplify imports
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import { Heading, Flex, View, Divider, SearchField, withAuthenticator } from "@aws-amplify/ui-react";
import awsconfig from "../amplifyconfiguration.json";
import { getOverrideProps } from "./../ui-components/utils";

// GraphQL imports
import { fetchUserAttributes } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
import {
  listFriendRequests,
  listFriends
} from "./../graphql/queries";

// UI imports
import "./Friends.css";
import FriendRequestComponent from "../components/FriendRequestComponent/FriendRequestComponent";
import FriendComponent from "../components/FriendComponent/FriendComponent";
import { isEmpty } from "@aws-amplify/ui";
import { useForceUpdate } from "framer-motion";

// @ TEST DATA @
// @ 413b35a0-1031-7049-36e6-d8c0ffbb2b3c
// @ d12bc5c0-f071-705a-8591-be06b94b3d1e

Amplify.configure(awsconfig);

const Friends = () => {
  // # SETTING STATES
  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState([]);
  const [friends, setFriends] = useState([]);

  // # API CALLS
  const client = generateClient();

  useEffect(() => {
    fetchUserData();
  }, []);

  async function fetchUserData() {
    const userAttributes = await fetchUserAttributes();
    
    // Debugging
    console.log('userAttributes: ', userAttributes);

    setUser(userAttributes);
    
    fetchRequestsAndFriends(userAttributes?.sub);
  }

  async function fetchRequestsAndFriends(userId) {
    const requestData = await client.graphql({
      query: listFriendRequests,
      variables: { filter: { UserId: { eq: userId } } }
    })
    const requestsFromAPI = requestData.data.listFriendRequests.items;
    setRequests(requestsFromAPI);

    console.log('Friend Requests: ', requests);

    const apiData = await client.graphql({
      query: listFriends,
      variables: { filter: { UserId: { eq: userId } } }
    })
    const friendsFromAPI = apiData.data.listFriends.items;
    setFriends(friendsFromAPI);

    console.log('Friends: ', friends);
  }

  // # HANDLER METHODS

  // Re-fetch requests and friends after click event
  const handleClickEvent = () => {
    console.log('Received click event');
    fetchRequestsAndFriends(user?.sub);
  }

  // # GETTER METHODS
  const isEmptyFriendReqs = () => {
    return requests.length === 0;
  }

  const isEmptyFriends = () => {
    return friends.length === 0;
  }

  return (
    <View className="Friends">
      <Flex
        className="friends_content_container"
        direction="column"
        alignItems="center"
        wrap="nowrap"
        gap="1rem"
      >
        {isEmptyFriendReqs() ? 
        (
          <p>No Friend Requests</p>
        ) 
        : 
        (
          <>
            <Heading level={3}> Friend Requests </Heading>

            <Flex
              className="requests_container"
              direction="column"
              alignItems="center"
              wrap="nowrap"
              gap="1rem"
            >
              {requests.map((request, index) => (
                <FriendRequestComponent key={index} friendRequest={request} onClickEvent={handleClickEvent}/>
              ))}
            </Flex>
          </>
        )}

        <Divider
          size="large"
          orientation="horizontal"
        ></Divider>

        {isEmptyFriends() ? 
        (
          <p>No Friends</p>
        ) 
        : 
        (
          <>
            <Heading level={3}> Friends </Heading>

            <SearchField
              label="Search"
              placeholder="Search here..."
            />

            <Flex
            className="requests_container"
            direction="column"
            alignItems="center"
            wrap="nowrap"
            gap="1rem"
            >
              {friends.map((friend, index) => (
                <FriendComponent key={index} friend={friend} onClickEvent={handleClickEvent}/>
              ))}
            </Flex>
          </>
        )}

      </Flex>
    </View>
  );
};

export default withAuthenticator(Friends);