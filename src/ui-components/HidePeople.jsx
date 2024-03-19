import React, { useState, useContext } from "react";
import "./HidePeople.css";
import { generateClient } from "aws-amplify/api";
import { UserContext } from "./../UserContext";

export default function HidePeople(props) {
  const { selectedFriends, setSelectedFriends } = props;

  const { allUsers, myUser } = useContext(UserContext);

  // Checks if given username exists in pool of users
  const userExists = (username) => {
    const existingUser = allUsers.find((user) => user.Username === username);
    return !(existingUser === undefined);
  };

  const handleSearch = async () => {
    // Perform search logic here
    const searchInput = document.getElementById("searchInput");
    const searchQuery = searchInput.value;

    if (!userExists(searchQuery)) {
      // alert(searchQuery + " is not an existing user.");
      renderSearchResults([""]);
      return;
    }

    // If user searches own username
    if (searchQuery === myUser.username) {
      // alert("Can't add self");
      return;
    }

    renderSearchResults([searchQuery]);
  };

  function renderSearchResults(results) {
    const searchResultsContainer = document.querySelector(".search-results");

    // Clear previous search results
    searchResultsContainer.innerHTML = "";

    // Render each search result as a list item
    results.forEach((user) => {
      const listItem = document.createElement("li");
      listItem.textContent = user;
      searchResultsContainer.appendChild(listItem);

      if (user !== "") {
        const addButton = document.createElement("button");
        addButton.textContent = "Add";
        addButton.onclick = () => handleFriendSelect(user);
        listItem.appendChild(addButton);
      }
    });
  }

  const handleFriendSelect = (searchQuery) => {
    setSelectedFriends((prevSelectedFriends) => [
      ...prevSelectedFriends,
      searchQuery,
    ]);
  };

  const handleFriendDeselect = (friend) => {
    setSelectedFriends((prevSelectedFriends) =>
      prevSelectedFriends.filter((selectedFriend) => selectedFriend !== friend)
    );
  };

  return (
    <div class="container">
      <h3>Hidden from Users</h3>
      <input
        type="text"
        placeholder="Search for users"
        class="search-input"
        id="searchInput"
        onChange={handleSearch}
      />
      <ul class="search-results"></ul>
      <button>Search</button>
      <div class="selected-friends">
        <ul>
          {selectedFriends.map((friend) => (
            <li key={friend}>
              {friend}
              <button onClick={() => handleFriendDeselect(friend)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
