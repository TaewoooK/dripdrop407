// React imports
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./../UserContext";

// AWS Amplify imports
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import {
  Heading,
  Flex,
  View,
  Divider,
  SearchField,
  Button,
  withAuthenticator,
} from "@aws-amplify/ui-react";
import awsconfig from "../amplifyconfiguration.json";

// GraphQL imports
import { generateClient } from "aws-amplify/api";
import { listFriendRequests, listFriends } from "./../graphql/queries";
import {
  createFriendRequest,
  deleteFriendRequest,
  createFriend,
  deleteFriend,
} from "./../graphql/mutations";
import {
  onCreateFriendRequest,
  onDeleteFriendRequest,
  onCreateFriend,
  onDeleteFriend,
} from "./../graphql/subscriptions";

// UI imports
import "./Friends.css";
import UserComponent from "../components/UserComponent";
import FriendRequestComponent from "../components/FriendRequestComponent";
import FriendComponent from "../components/FriendComponent";

// Toast notif import
import toast, { Toaster } from "react-hot-toast";

Amplify.configure(awsconfig);

const Friends = () => {
  // # SETTING STATES
  const { allUsers, myUser } = useContext(UserContext);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [allRequests, setAllRequests] = useState([]);
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);

  const [allFriends, setAllFriends] = useState([]);
  const [friends, setFriends] = useState([]);
  const [filteredFriends, setFilteredFriends] = useState([]);

  const [userSearch, setUserSearch] = useState("");
  const [requestSearch, setRequestSearch] = useState("");
  const [friendSearch, setFriendSearch] = useState("");

  // # API CALLS
  const client = generateClient();

  const handleSubscription = () => {
    fetchRequestsAndFriends(myUser.username);
  };

  useEffect(() => {
    fetchRequestsAndFriends(myUser.username);

    const subscriptions = [
      { subscriptionQuery: onCreateFriendRequest, action: handleSubscription },
      { subscriptionQuery: onDeleteFriendRequest, action: handleSubscription },
      { subscriptionQuery: onCreateFriend, action: handleSubscription },
      { subscriptionQuery: onDeleteFriend, action: handleSubscription },
    ];

    const subscriptionRefs = subscriptions.map(
      ({ subscriptionQuery, action }) => {
        return client
          .graphql({ query: subscriptionQuery })
          .subscribe({ next: action });
      }
    );

    return () => {
      subscriptionRefs.forEach((subscription) => subscription.unsubscribe());
    };
  }, []);

  // FOR DEBUGGING
  // useEffect(() => {
  //   console.log("allUsers: ", allUsers);
  //   console.log("myUser: ", myUser);
  //   console.log("myUser.username: ", myUser.username);
  //   console.log("All Friend Requests: ", allRequests);
  //   console.log("My Friend Requests: ", requests);
  //   console.log("filtered requests: ", filteredRequests);
  //   console.log("All Friends: ", allFriends);
  //   console.log("My Friends: ", friends);
  //   console.log("filtered friends: ", filteredFriends);
  // }, [filteredFriends]);

  // # GRAPHQL OPERATIONS

  async function fetchRequestsAndFriends(username) {
    const requestData = await client.graphql({
      query: listFriendRequests,
    });
    const requestsFromAPI = requestData.data.listFriendRequests.items;
    setAllRequests(requestsFromAPI);

    setRequests(
      requestsFromAPI.filter((request) => request.Username === username)
    );

    setFilteredRequests(
      requestsFromAPI.filter(
        (request) =>
          request.Username === username &&
          request.SenderUsername.startsWith(requestSearch)
      )
    );

    const friendData = await client.graphql({
      query: listFriends,
    });
    const friendsFromAPI = friendData.data.listFriends.items;
    setAllFriends(friendsFromAPI);

    setFriends(friendsFromAPI.filter((friend) => friend.Username === username));

    setFilteredFriends(
      friendsFromAPI.filter(
        (friend) =>
          friend.Username === username &&
          friend.FriendUsername.startsWith(friendSearch)
      )
    );
  }

  // Sending Friend Request to recepientUsername
  async function createFriendRequestByName(recepientUsername) {
    // Insert friend request for requested user
    await client.graphql({
      query: createFriendRequest.replaceAll("__typename", ""),
      variables: {
        input: {
          Username: recepientUsername,
          SenderUsername: myUser.username,
        },
      },
    });
  }

  // Rescind Friend Request from senderUsername
  async function rescindFriendRequestByName(recepientUsername) {
    console.log("recepient:", recepientUsername);
    const requestData = await client.graphql({
      query: listFriendRequests,
      variables: {
        filter: {
          Username: { eq: recepientUsername },
          SenderUsername: { eq: myUser.username },
        },
      },
      limit: 1,
    });

    const requestToDelete = requestData.data.listFriendRequests.items[0];

    await client.graphql({
      query: deleteFriendRequest.replaceAll("__typename", ""),
      variables: {
        input: {
          id: requestToDelete.id,
        },
      },
    });
  }

  // Deleting Friend Request from senderUsername
  async function deleteFriendRequestByName(senderUsername) {
    console.log("sender:", senderUsername);
    const requestData = await client.graphql({
      query: listFriendRequests,
      variables: {
        filter: {
          Username: { eq: myUser.username },
          SenderUsername: { eq: senderUsername },
        },
      },
      limit: 1,
    });

    const requestToDelete = requestData.data.listFriendRequests.items[0];

    await client.graphql({
      query: deleteFriendRequest.replaceAll("__typename", ""),
      variables: {
        input: {
          id: requestToDelete.id,
        },
      },
    });
  }

  // Creating a friend with current user and SenderUsername
  async function createFriendByName(senderUsername) {
    // Insert friend record for current user
    await client.graphql({
      query: createFriend.replaceAll("__typename", ""),
      variables: {
        input: {
          Username: myUser.username,
          FriendUsername: senderUsername,
        },
      },
    });

    // Insert friend record for friend user
    await client.graphql({
      query: createFriend.replaceAll("__typename", ""),
      variables: {
        input: {
          Username: senderUsername,
          FriendUsername: myUser.username,
        },
      },
    });

    await deleteFriendRequestByName(senderUsername);
  }

  // Removing current user's friend FriendUsername
  async function deleteFriendByName(friendUsername) {
    // Get and delete friend record where current user is set as Username
    const myFriendData = await client.graphql({
      query: listFriends,
      variables: {
        filter: {
          Username: { eq: myUser.username },
          FriendUsername: { eq: friendUsername },
        },
      },
      limit: 1,
    });

    const myFriendToDelete = myFriendData.data.listFriends.items[0];

    await client.graphql({
      query: deleteFriend.replaceAll("__typename", ""),
      variables: {
        input: {
          id: myFriendToDelete.id,
        },
      },
    });

    // Get and delete friend record where friend user is set as Username
    const theirFriendData = await client.graphql({
      query: listFriends,
      variables: {
        filter: {
          Username: { eq: friendUsername },
          FriendUsername: { eq: myUser.username },
        },
      },
      limit: 1,
    });

    const theirFriendToDelete = theirFriendData.data.listFriends.items[0];

    await client.graphql({
      query: deleteFriend.replaceAll("__typename", ""),
      variables: {
        input: {
          id: theirFriendToDelete.id,
        },
      },
    });
  }

  // # HANDLER METHODS

  /* User Search Handlers */
  const onUserSearchChange = (event) => {
    console.log("userSearch:", event.target.value);
    setUserSearch(event.target.value);

    setFilteredUsers(
      allUsers.filter((user) => user.Username.startsWith(event.target.value))
    );
  };

  const onUserSearchClear = () => {
    setUserSearch("");
  };

  const handleClickAdd = () => {
    // If user searches own username
    if (userSearch === myUser.username) {
      toast.error("Can't add self");
      return;
    }

    // If there's an existing outgoing friend request to the search, then rescind it
    const existingSentRequest = allRequests.find(
      (request) =>
        request.Username === userSearch &&
        request.SenderUsername === myUser.username
    );

    if (existingSentRequest) {
      toast.promise(rescindFriendRequestByName(userSearch), {
        loading: "Rescinding Friend Request...",
        success: <b>Friend Request sent to {userSearch} was rescinded.</b>,
        error: (error) => {
          console.error("Failed to rescind friend request:", error);
          return <b>Failed to rescind friend Request. Please try again.</b>;
        },
      });

      return;
    }

    // If there's an existing incoming friend request from search
    const existingRequest = allRequests.find(
      (request) =>
        request.Username === myUser.username &&
        request.SenderUsername === userSearch
    );

    if (existingRequest) {
      toast.error(userSearch + ` already sent you a friend request.`);
      return;
    }

    // If there's an existing friend relationship
    const existingFriend = allFriends.find(
      (friend) =>
        (friend.Username === myUser.username &&
          friend.FriendUsername === userSearch) ||
        (friend.Username === userSearch &&
          friend.FriendUsername === myUser.username)
    );

    if (existingFriend) {
      toast.error(userSearch + " is already your friend.");
      return;
    }

    if (!userExists(userSearch)) {
      toast.error(userSearch + " is not an existing user.");
      return;
    }

    toast.promise(createFriendRequestByName(userSearch), {
      loading: "Sending Friend Request...",
      success: <b>Friend Request sent to {userSearch}!</b>,
      error: (error) => {
        console.error("Failed to send friend request:", error);
        return <b>Failed to send friend Request. Please try again.</b>;
      },
    });
  };

  const handleClickRefresh = () => {
    fetchRequestsAndFriends(myUser.username);
  };

  /* Friend Request Search Handlers */
  const onRequestSearchChange = (event) => {
    setRequestSearch(event.target.value);

    setFilteredRequests(
      requests.filter((request) =>
        request.SenderUsername.startsWith(event.target.value)
      )
    );
  };

  const onRequestSearchClear = () => {
    setRequestSearch("");

    setFilteredRequests(requests);
  };

  /* Friend Search Handlers */
  const onFriendSearchChange = (event) => {
    setFriendSearch(event.target.value);

    setFilteredFriends(
      friends.filter((friend) =>
        friend.FriendUsername.startsWith(event.target.value)
      )
    );
  };

  const onFriendSearchClear = () => {
    setFriendSearch("");

    setFilteredFriends(friends);
  };

  /* Button Handlers */
  const handleClickSend = (recepientUsername) => {
    toast.promise(createFriendRequestByName(recepientUsername), {
      loading: "Sending Friend Request...",
      success: <b>Sent friend request to {recepientUsername}!</b>,
      error: (error) => {
        console.error("Failed to send friend request:", error);
        return <b>Failed to send friend request. Please try again.</b>;
      },
    });
  };
  const handleClickRescind = (recepientUsername) => {
    toast.promise(rescindFriendRequestByName(recepientUsername), {
      loading: "Rescinding Friend Request...",
      success: <b>Rescinded friend request to {recepientUsername}.</b>,
      error: (error) => {
        console.error("Failed to rescind friend request:", error);
        return <b>Failed to rescind friend request. Please try again.</b>;
      },
    });
  };
  const handleClickAccept = (senderUsername) => {
    console.log("handleClickAccept");
    toast.promise(createFriendByName(senderUsername), {
      loading: "Accepting Friend Request...",
      success: <b>Accepted friend request from {senderUsername}!</b>,
      error: (error) => {
        console.error("Failed to accept friend request:", error);
        return <b>Failed to accept friend request. Please try again.</b>;
      },
    });
  };
  const handleClickDeny = (senderUsername) => {
    toast.promise(deleteFriendRequestByName(senderUsername), {
      loading: "Denying Friend Request...",
      success: <b>Denied friend request from {senderUsername}.</b>,
      error: (error) => {
        console.error("Failed to deny friend request:", error);
        return <b>Failed to deny friend request. Please try again.</b>;
      },
    });
  };
  const handleClickRemove = (friendUsername) => {
    toast.promise(deleteFriendByName(friendUsername), {
      loading: "Removing Friend...",
      success: <b>Removed friend {friendUsername}.</b>,
      error: (error) => {
        console.error("Failed to remove friend:", error);
        return <b>Failed to remove friend. Please try again.</b>;
      },
    });
  };

  // # HELPER METHODS
  // Checks if given username exists in pool of users
  const userExists = (username) => {
    return !(allUsers.find((user) => user.Username === username) === undefined);
  };

  // # GETTER METHODS
  const getTypeUser = (username) => {
    if (filteredFriends.find((friend) => friend.FriendUsername === username))
      return "friend";
    else if (
      filteredRequests.find((request) => request.SenderUsername === username)
    )
      return "requestReceived";
    else if (
      allRequests.find(
        (request) =>
          request.Username === username &&
          request.SenderUsername === myUser.username
      )
    )
      return "requestSent";

    return "stranger";
  };

  const isEmptyUsers = () => {
    return userSearch === "" || filteredUsers.length === 0;
  };

  const isEmptyFriendReqs = () => {
    return filteredRequests.length === 0;
  };

  const isEmptyFriends = () => {
    return filteredFriends.length === 0;
  };

  return (
    <View className="Friends">
      <Toaster position="top-right" reverseOrder={false} />
      <Flex
        className="friends_content_container"
        direction="column"
        alignItems="center"
        wrap="nowrap"
        gap="1rem"
      >
        <Heading level={3}> Search For Users </Heading>

        <SearchField
          className="UserSearch"
          label="User Search"
          placeholder="Search users..."
          size="small"
          hasSearchButton={false}
          onChange={onUserSearchChange}
          onClear={onUserSearchClear}
          value={userSearch}
        />

        {isEmptyUsers() ? (
          <p>No Users Found</p>
        ) : (
          <>
            <Flex
              className="users_container"
              direction="column"
              alignItems="center"
              wrap="nowrap"
              gap="1rem"
            >
              {filteredUsers.map((user, index) => (
                <UserComponent
                  key={index}
                  user={user}
                  type={getTypeUser(user.Username)}
                  handleClickSend={handleClickSend}
                  handleClickRescind={handleClickRescind}
                  handleClickAccept={handleClickAccept}
                  handleClickDeny={handleClickDeny}
                  handleClickRemove={handleClickRemove}
                />
              ))}
            </Flex>
          </>
        )}

        <Divider size="large"></Divider>

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

        {isEmptyFriendReqs() ? (
          <p>No Friend Requests Found</p>
        ) : (
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
                  handleClickAccept={handleClickAccept}
                  handleClickDeny={handleClickDeny}
                />
              ))}
            </Flex>
          </>
        )}

        <Divider size="large"></Divider>

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

        {isEmptyFriends() ? (
          <p>No Friends Found</p>
        ) : (
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
                  handleClickRemove={handleClickRemove}
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
