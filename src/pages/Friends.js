// React imports
import React, { useState, useEffect } from "react";

// AWS Amplify imports
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import { Heading, Flex, View, Divider, SearchField, withAuthenticator } from "@aws-amplify/ui-react";
import awsconfig from "../amplifyconfiguration.json";

// GraphQL imports
import { fetchUserAttributes } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
import {
  listFriendRequests,
  listFriends
} from "./../graphql/queries";

// UI imports
import "./Friends.css";
import FriendRequestComponent from "../ui-components/FriendRequest";
import FriendComponent from "../ui-components/Friend";
import { isEmpty } from "@aws-amplify/ui";
// import { FullFriends } from '../ui-components';

// @ TEST DATA @
// @ f19b2590-e021-70ef-fee2-d35ee019e8a7
// @ 911bd5b0-e051-7009-df54-1a5ea9481ed7

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
    
    fetchFriendRequests(userAttributes.sub);
    fetchFriends(userAttributes.sub);
  }

  // async function fetchFriendRequests here
  async function fetchFriendRequests(userId) {
    const apiData = await client.graphql({
      query: listFriendRequests,
      variables: { filter: { UserId: { eq: userId } } }
    })
    const requestsFromAPI = apiData.data.listFriendRequests.items;
    setRequests(requestsFromAPI);

    // debugging
    // console.log('Friend Requests: ', requests);
    // console.log('Friend Requests length: ', requests.length);
    // console.log('isEmptyFriendReqs: ', isEmptyFriendReqs());
  }

  useEffect(() => {
    console.log('Friend Requests: ', requests);
    console.log('Friend Requests length: ', requests.length);
    console.log('isEmptyFriendReqs: ', isEmptyFriendReqs());
  }, [requests])

  // async function fetchFriends here
  async function fetchFriends(userId) {
    const apiData = await client.graphql({
      query: listFriends,
      variables: { filter: { UserId: { eq: userId } } }
    })
    const friendsFromAPI = apiData.data.listFriends.items;
    setFriends(friendsFromAPI);

    // debugging
    console.log('Friends: ', friends);
    console.log('Friend boolean: ', friends.length === 0);
    console.log('isEmptyFriends: ', isEmptyFriends());
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
                <FriendRequestComponent key={index} object={request} />
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
                <FriendComponent key={index} object={friend} />
              ))}
            </Flex>
          </>
        )}

      </Flex>
    </View>
  );
};

export default withAuthenticator(Friends);