// React imports
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from './../UserContext';

// AWS Amplify imports
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import { Heading, Flex, View, Divider, SearchField, Button, withAuthenticator } from "@aws-amplify/ui-react";
import awsconfig from "../amplifyconfiguration.json";

// GraphQL imports
import { generateClient } from "aws-amplify/api";
import {
  listFriendRequests,
  listFriends
} from "./../graphql/queries";
import {
  createFriend,
  createFriendRequest,
  deleteFriendRequest
} from "./../graphql/mutations";

// UI imports
import "./Friends.css";
import FriendRequestComponent from "../components/FriendRequestComponent/FriendRequestComponent";
import FriendComponent from "../components/FriendComponent/FriendComponent";

Amplify.configure(awsconfig);

const Friends = () => {
  // # SETTING STATES
  const { allUsers, myUser } = useContext(UserContext);

  const [allRequests, setAllRequests] = useState([]);
  const [requests, setRequests] = useState([]);

  const [allFriends, setAllFriends] = useState([]);
  const [friends, setFriends] = useState([]);

  const [search, setSearch] = useState('');

  // # API CALLS
  const client = generateClient();

  useEffect(() => {
    fetchRequestsAndFriends(myUser.username);
  }, []);

  useEffect(() => {
    console.log('myUser: ', myUser);
    console.log('myUser.username: ', myUser.username);
    console.log('All Friend Requests: ', allRequests);
    console.log('My Friend Requests: ', requests);
    console.log('All Friends: ', allFriends);
    console.log('My Friends: ', friends);
  }, [friends])

  async function fetchRequestsAndFriends(username) {
    console.log('username: ', username);

    const requestData = await client.graphql({
      query: listFriendRequests
    });
    const requestsFromAPI = requestData.data.listFriendRequests.items;
    setAllRequests(requestsFromAPI);

    setRequests(requestsFromAPI.filter(request => request.Username === username));

    const friendData = await client.graphql({
      query: listFriends
    });
    const friendsFromAPI = friendData.data.listFriends.items;
    setAllFriends(friendsFromAPI);

    setFriends(friendsFromAPI.filter(friend => friend.Username === username));
  }

  async function rescindFriendRequest(requestedUsername) {
    const requestToDelete = allRequests.find(request => request.Username === requestedUsername);

    try {
      await client.graphql({
        query: deleteFriendRequest.replaceAll("__typename", ""),
        variables: {
          input: {
            id: requestToDelete.id,
          },
        },
      });

      alert('Friend Request sent to ' + requestedUsername + ' was rescinded.');

      fetchRequestsAndFriends(myUser.username);
    } catch (error) {
      console.log('Error rescinding friend request: ', error);
    }
  }

  async function sendFriendRequest(requestedUsername) {
    // Insert friend request for requested user
    try {
      await client.graphql({
      query: createFriendRequest.replaceAll("__typename", ""),
      variables: {
          input: {
              Username: requestedUsername,
              SenderUsername: myUser.username,
          },
      },
      });

      alert('Friend Request sent to ' + requestedUsername + '!');

      fetchRequestsAndFriends(myUser.username);
    } catch (error) {
      console.log('Error sending friend request: ', error);
    }
  }

  // # HANDLER METHODS

  const onSearchChange = (event) => {
    setSearch(event.target.value);
  }

  const handleClickAdd = () => {
    console.log('search: ', search);

    // If user searches own username
    if (search === myUser.username) {
      alert('Can\'t add self');
      return;
    }

    // If there's an existing outgoing friend request to the search, then rescind it
    const existingSentRequest = allRequests.find(request => request.Username === search && request.SenderUsername === myUser.username);
    
    if (existingSentRequest) {
      rescindFriendRequest(search);
      return;
    }

    // If there's an existing incoming friend request from search
    const existingRequest = allRequests.find(request => request.Username === myUser.username && request.SenderUsername === search);

    if (existingRequest) {
      alert(search + ` already sent you a friend request.`);
      return;
    }

    // If there's an existing friend relationship
    const existingFriend = allFriends.find(friend =>
      (friend.Username === myUser.username && friend.FriendUsername === search)
      || (friend.Username === search && friend.FriendUsername === myUser.username)
      );

    if (existingFriend) {
      alert(search + ' is already your friend.');
      return;
    }

    if (!userExists(search)) {
      alert(search + ' is not an existing user.');
      return;
    }

    sendFriendRequest(search);
  }

  const handleClickRefresh = () => {
    fetchRequestsAndFriends(myUser.username);
  }

  // # HELPER METHODS
  // Checks if given username exists in pool of users
  const userExists = (username) => {
    const existingUser = allUsers.find(user => user.Username === username);
    return !(existingUser === undefined);
  }

  // Re-fetch requests and friends after click event
  const handleClickChild = () => {
    fetchRequestsAndFriends(myUser.username);
  }

  // # GETTER METHODS
  const isEmptyFriendReqs = () => {
    return requests.length === 0;
  }

  const isEmptyFriends = () => {
    return friends.length === 0;
  }

  const getOtherFriend = (friend) => {
    return allFriends.find(otherFriend => otherFriend.Username === friend.FriendUsername && otherFriend.FriendUsername === friend.Username);
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
        <Flex
          direction ="row"
          justifyContent="center"
          wrap="nowrap"
          gap="1rem"

        >
          <SearchField
            label="Search"
            placeholder="Search username to add..."
            size="small"
            hasSearchButton={false}
            onChange={onSearchChange}
            value={search}
          />

          <Button
            isLoading={false}
            variation="primary"
            colorTheme="success"
            size="small"
            onClick={handleClickAdd}
          >
            Add
          </Button>

          <Button
            isLoading={false}
            variation="primary"
            size="small"
            onClick={handleClickRefresh}
          >
            Refresh
          </Button>
        </Flex>
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
                <FriendRequestComponent 
                  key={index} 
                  friendRequest={request} 
                  onClickEvent={handleClickChild}
                />
              ))}
            </Flex>
          </>
        )}

        <Divider
          size="large"
        ></Divider>

        {isEmptyFriends() ? 
        (
          <p>No Friends</p>
        ) 
        : 
        (
          <>
            <Heading level={3}> Friends </Heading>

            <Flex
            className="requests_container"
            direction="column"
            alignItems="center"
            wrap="nowrap"
            gap="1rem"
            >
              {friends.map((friend, index) => (
                <FriendComponent 
                  key={index} 
                  friend={friend} 
                  onClickEvent={handleClickChild} 
                  otherFriend={getOtherFriend(friend)}
                />
              ))}
            </Flex>
          </>
        )}

      </Flex>
    </View>
  );
};

export default withAuthenticator(Friends);