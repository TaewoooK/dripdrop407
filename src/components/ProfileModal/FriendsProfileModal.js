// React imports
import React, { useState, useEffect } from "react";

// AWS Amplify imports
import { Amplify } from "aws-amplify";
import awsconfig from "../../amplifyconfiguration.json";
import { Heading, Flex, View, SearchField } from "@aws-amplify/ui-react";

// GraphQL imports
import { generateClient } from "aws-amplify/api";
import { listFriends } from "../../graphql/queries";

// UI imports
import ChipComponent from "../ChipComponent";
import "./FriendsProfileModal.css";

Amplify.configure(awsconfig);

const FriendsProfileModal = ({ user }) => {
  // # SETTINGS STATES
  const [allFriends, setAllFriends] = useState([]);
  const [friends, setFriends] = useState([]);
  const [filteredFriends, setFilteredFriends] = useState([]);
  const [friendSearch, setFriendSearch] = useState("");

  // # CREATE CLIENT FOR API
  const client = generateClient();

  useEffect(() => {
    fetchFriends(user.Username);
  }, []);

  // # GRAPHQL FETCH FOR FRIENDS
  async function fetchFriends(username) {
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

  const isEmptyFriends = () => {
    return filteredFriends.length === 0;
  };

  return (
    <View className="FriendsList">
      <Flex
        className="friends_list_content_container"
        direction="column"
        alignItems="center"
        wrap="nowrap"
        gap="1rem"
      >
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
                <ChipComponent
                  key={index}
                  username={friend.FriendUsername}
                  type={"none"}
                />
              ))}
            </Flex>
          </>
        )}
      </Flex>
    </View>
  );
};

export default FriendsProfileModal;
