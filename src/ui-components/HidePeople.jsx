import React, { useState } from "react";
import "./HidePeople.css";

const HidePeople = () => {
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // Perform search logic here


    
  };

  const handleFriendSelect = (friend) => {
    setSelectedFriends((prevSelectedFriends) => [
      ...prevSelectedFriends,
      friend,
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
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search for friends"
        class="search-input"
      />
      <ul class="search-results">{/* Render search results here */}</ul>
      <div class="selected-friends">
        <ul>
          {selectedFriends.map((friend) => (
            <li key={friend.id}>
              {friend.name}
              <button onClick={() => handleFriendDeselect(friend)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
        {selectedFriends.length === 0 && <p>No friends hidden from users.</p>}
      </div>
    </div>
  );
};

export default HidePeople;
