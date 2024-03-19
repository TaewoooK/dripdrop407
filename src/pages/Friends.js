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

// Toast notif import
import toast, { Toaster } from "react-hot-toast";

Amplify.configure(awsconfig);

const Friends = () => {
  // # SETTING STATES
  const { allUsers, myUser } = useContext(UserContext);

  const [allRequests, setAllRequests] = useState([]);
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);

  const [allFriends, setAllFriends] = useState([]);
  const [friends, setFriends] = useState([]);
  const [filteredFriends, setFilteredFriends] = useState([]);

  const [userSearch, setUserSearch] = useState('');
  const [requestSearch, setRequestSearch] = useState('');
  const [friendSearch, setFriendSearch] = useState('');

  // # API CALLS
  const client = generateClient();

  useEffect(() => {
    fetchRequestsAndFriends(myUser.username);
  }, []);

  // FOR DEBUGGING
  useEffect(() => {
    console.log('myUser: ', myUser);
    console.log('myUser.username: ', myUser.username);
    console.log('All Friend Requests: ', allRequests);
    console.log('My Friend Requests: ', requests);
    console.log('filtered requests: ', filteredRequests);
    console.log('All Friends: ', allFriends);
    console.log('My Friends: ', friends);
    console.log('filtered friends: ', filteredFriends);
  }, [filteredFriends])

  async function fetchRequestsAndFriends(username) {
    console.log('username: ', username);

    const requestData = await client.graphql({
      query: listFriendRequests
    });
    const requestsFromAPI = requestData.data.listFriendRequests.items;
    setAllRequests(requestsFromAPI);

    setRequests(requestsFromAPI.filter(request => request.Username === username));
    
    setFilteredRequests(requestsFromAPI.filter(request => request.Username === username && (request.SenderUsername).startsWith(requestSearch)));

    const friendData = await client.graphql({
      query: listFriends
    });
    const friendsFromAPI = friendData.data.listFriends.items;
    setAllFriends(friendsFromAPI);

    setFriends(friendsFromAPI.filter(friend => friend.Username === username));

    setFilteredFriends(friendsFromAPI.filter(friend => friend.Username === username && (friend.FriendUsername).startsWith(friendSearch)));
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

      fetchRequestsAndFriends(myUser.username);
    } catch (error) {
      console.log('Error sending friend request: ', error);
    }
  }

  // # HANDLER METHODS

  /* User Search Handlers */
  const onUserSearchChange = (event) => {
    setUserSearch(event.target.value);
  }

  const onUserSearchClear = () => {
    setUserSearch('');
  }

  const handleClickAdd = () => {
    console.log('userSearch: ', userSearch);

    // If user searches own username
    if (userSearch === myUser.username) {
      toast.error('Can\'t add self');
      return;
    }

    // If there's an existing outgoing friend request to the search, then rescind it
    const existingSentRequest = allRequests.find(request => request.Username === userSearch && request.SenderUsername === myUser.username);
    
    if (existingSentRequest) {
      toast.promise(
        rescindFriendRequest(userSearch),
        {
          loading: 'Rescinding Friend Request...',
          success: <b>Friend Request sent to {userSearch} was rescinded.</b>,
          error: <b>Failed to rescind friend Request. Please try again.</b>,
        }
      );

      return;
    }

    // If there's an existing incoming friend request from search
    const existingRequest = allRequests.find(request => request.Username === myUser.username && request.SenderUsername === userSearch);

    if (existingRequest) {
      toast.error(userSearch + ` already sent you a friend request.`);
      return;
    }

    // If there's an existing friend relationship
    const existingFriend = allFriends.find(friend =>
      (friend.Username === myUser.username && friend.FriendUsername === userSearch)
      || (friend.Username === userSearch && friend.FriendUsername === myUser.username)
      );

    if (existingFriend) {
      toast.error(userSearch + ' is already your friend.');
      return;
    }

    if (!userExists(userSearch)) {
      toast.error(userSearch + ' is not an existing user.');
      return;
    }

    toast.promise(
      sendFriendRequest(userSearch),
      {
        loading: 'Sending Friend Request...',
        success: <b>Friend Request sent to {userSearch}!</b>,
        error: <b>Failed to send friend Request. Please try again.</b>,
      }
    );
  }

  const handleClickRefresh = () => {
    fetchRequestsAndFriends(myUser.username);
  }

  /* Friend Request Search Handlers */
  const onRequestSearchChange = (event) => {
    setRequestSearch(event.target.value);

    setFilteredRequests(requests.filter(request => (request.SenderUsername).startsWith(event.target.value)));
  }

  const onRequestSearchClear = () => {
    setRequestSearch('');

    setFilteredRequests(requests);
  }

  /* Friend Search Handlers */
  const onFriendSearchChange = (event) => {
    setFriendSearch(event.target.value);

    setFilteredFriends(friends.filter(friend => (friend.FriendUsername).startsWith(event.target.value)));
  }

  const onFriendSearchClear = () => {
    setFriendSearch('');

    setFilteredFriends(friends);
  }

  // # HELPER METHODS
  // Checks if given username exists in pool of users
  const userExists = (username) => {
    return !(allUsers.find(user => user.Username === username) === undefined);
  }

  // Re-fetch requests and friends after click event
  const handleClickChild = () => {
    fetchRequestsAndFriends(myUser.username);
  }

  // # GETTER METHODS
  const isEmptyFriendReqs = () => {
    return filteredRequests.length === 0;
  }

  const isEmptyFriends = () => {
    return filteredFriends.length === 0;
  }

  const getOtherFriend = (friend) => {
    return allFriends.find(otherFriend => otherFriend.Username === friend.FriendUsername && otherFriend.FriendUsername === friend.Username);
  }

  return (
    <View className="Friends">
    <Toaster
      position="top-right"
      reverseOrder={false}
    />
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
            className="UserSearch"
            label="User Search"
            placeholder="Search username to add..."
            size="small"
            hasSearchButton={false}
            onChange={onUserSearchChange}
            onClear={onUserSearchClear}
            value={userSearch}
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

        <Heading level={3}> Friend Requests </Heading>

        <SearchField
          className="RequestSearch"
          label="Request Search"
          placeholder="Search username of friend requests..."
          size="small"
          hasSearchButton={false}
          onChange={onRequestSearchChange}
          onClear={onRequestSearchClear}
          value={requestSearch}
        />

        {isEmptyFriendReqs() ? 
        (
          <p>No Friend Requests Found</p>
        ) 
        : 
        (
          <>
            <Flex
              className="requests_container"
              direction="column"
              alignItems="center"
              wrap="nowrap"
              gap="1rem"
            >
              {filteredRequests.map((request, index) => (
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

        <Heading level={3}> Friends </Heading>

        <SearchField
          className="FriendSearch"
          label="Friend Search"
          placeholder="Search username of friends..."
          size="small"
          hasSearchButton={false}
          onChange={onFriendSearchChange}
          onClear={onFriendSearchClear}
          value={friendSearch}
        />

        {isEmptyFriends() ? 
        (
          <p>No Friends Found</p>
        ) 
        : 
        (
          <>
            <Flex
            className="requests_container"
            direction="column"
            alignItems="center"
            wrap="nowrap"
            gap="1rem"
            >
              {filteredFriends.map((friend, index) => (
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