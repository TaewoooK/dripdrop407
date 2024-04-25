import * as React from "react";
import { useEffect, useState, useContext } from "react";
import { generateClient } from "aws-amplify/api";
import { UserContext } from '../../UserContext';
import "./board.css";
import { listPosts, listComments, listFriends, listFriendRequests } from "../../graphql/queries";
import { View, Text, Button } from "@aws-amplify/ui-react";
import BoardProfile from "./LeaderProfile";

const client = generateClient();


export default function Board() {
  const { allUsers } = useContext(UserContext);
  const [user, setSelectedUser] = useState(); 
  const [selectedData, setSelectedData] = useState([]); // Initialize with an empty array
  const [toggleUser, setUser] = useState(false);
  async function getTotalDripPointsForUser(username) {
    let totalDripPoints = 0;
    let nextToken = null; // Initialize pagination token

    do {
        const postFetchVariables = {
            filter: {
                owner: {
                    eq: username
                }
            },
            limit: 10, // Adjust the limit as needed
            nextToken: nextToken // Include the pagination token
        };

        const userPosts = await client.graphql({
            query: listPosts,
            variables: postFetchVariables
        });

        const posts = userPosts.data.listPosts.items;
        for (let i = 0; i < posts.length; i++) {
            const post = posts[i];
            totalDripPoints += post.drip_points || 0;
        }

        // Update the pagination token for the next iteration
        nextToken = userPosts.data.listPosts.nextToken;
    } while (nextToken); // Continue fetching until there are no more posts

    return totalDripPoints;
}


  async function getAllPostsRankedByDripPoints() {
      try {
          const postData = await client.graphql({ query: listPosts });
          const posts = postData.data.listPosts.items;
  
          // Sort the posts by drip_points in descending order
          posts.sort((a, b) => b.drip_points - a.drip_points);
  
          // Convert the posts data into the desired format
          const convertedData = posts.map((post, index) => ({
              toShow: post.description,
              username: post.owner,
              totalDripPoints: post.drip_points,
              rank: index + 1 // Adding 1 to make the ranks start from 1
          }));
  
          return convertedData;
      } catch (error) {
          console.error('Error fetching and ranking posts:', error);
          return [];
      }
  }
  
  async function getUserDripPointsLeaderboard(allUsers) {
    const userDripPointsList = [];
  
    for (const user of allUsers) {
      const username = user.Username;
      try {
        const totalDripPoints = await getTotalDripPointsForUser(username);
        userDripPointsList.push({
          toShow: user.Username, // Adjust as needed
          username: user.Username,
          totalDripPoints: totalDripPoints,
          rank: 0, // Rank will be assigned later
        });
      } catch (error) {
        console.error(`Error fetching drip points for user ${username}:`, error);
      }
    }
  
    // Sort the list by totalDripPoints in descending order
    userDripPointsList.sort((a, b) => b.totalDripPoints - a.totalDripPoints);
  
    // Assign ranks to each user
    userDripPointsList.forEach((user, index) => {
      user.rank = index + 1; // Adding 1 to make the ranks start from 1
    });
  
    return userDripPointsList;
  }
  

  useEffect(() => {
    const fetchData = async () => {
        const data = await getAllPostsRankedByDripPoints();
        setSelectedData(data);
    };
    fetchData();
}, []); // empty dependency array ensures the effect runs only once on mount

  
  const [isModalOpen, setIsModalOpen] = useState(false);

//   const PostModal = ({ onClose }) => {
//     return (
//       <div style={modalContainerStyles}>
//         <div style={modalStyles}>
//           <h1>PUT CONTENT HERE</h1>
//           <button onClick={onClose}>Close</button>
//         </div>
//       </div>
//     );
//   };

  //const user = allUsers.find((user) => user.Username === username); 
  const modalContainerStyles = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent black background
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    boxSizing: "border-box", // Ensure padding is included in the width and height
    overflow: "auto", // Enable scrolling if the content overflows the viewport
    zIndex: 9999, // higher z-index to ensure it's above other content
  };
  
  const modalStyles = {
    backgroundColor: "rgba(34, 34, 34, 1)",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  };

  const PostModal = ({ onClose }) => {
    return (
      <div style={modalContainerStyles}>
        <div style={modalStyles}>
          <BoardProfile user={user} />
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  };

  const openModal = (username) => {
    const user = allUsers.find((user) => user.Username === username); // Find the user by username
    setSelectedUser(allUsers.find((user) => user.Username === username)); // Set the user
    setIsModalOpen(true); // Open the modal
  };
  

  const closeModal = () => {
    setIsModalOpen(false);
  };


  
  return (
      <View className="leaderboard-container">
          <View className="board">
              <View className="board2">
                  <Text className="rank-text" children="Rank" />
                  <Text className="user-text" children={toggleUser ? "User" : "Post"} />
                  <Text className="point-text" children="Points" />
                  <hr className="separator" />
                  <div className="columns-container" style={{ cursor: "pointer", overflow: "auto" }} 
                        >
                      <View className="rank-column">
                          {selectedData.map((entry, index) => (
                              <h2 key={index} onClick={() => openModal(entry.username)} style={{ color: "white" }}>{entry.rank}</h2>
                          ))}
                      </View>
                      <View className="user-column">
                          {selectedData.map((entry, index) => (
                              <h2 key={index} onClick={() => openModal(entry.username)} style={{ color: "white" }}>{entry.toShow}</h2>
                          ))}
                      </View>
                      <View className="points-column">
                          {selectedData.map((entry, index) => (
                              <h2 key={index} onClick={() => openModal(entry.username)} style={{ color: "white" }}>{entry.totalDripPoints}</h2>
                          ))}
                      </View>
                  </div>
                  <div>
                    {isModalOpen && <PostModal onClose={closeModal} />}
                  </div>
              </View>
              <Text className="board-header-text">
                  <span style={{ color: "#047d95" }}>Leader</span>
                  <span>board</span>
              </Text>
              <Button
                  className="button-by-post"
                  variation="default"
                  onClick={async () => {
                      const data = await getAllPostsRankedByDripPoints();
                      setSelectedData(data);
                      setUser(false);
                  }}
              >
                  By Single Post
              </Button>
              <Button
                  className="button-by-user"
                  variation="default"
                  onClick={async () => {
                      const data = await getUserDripPointsLeaderboard(allUsers);
                      setSelectedData(data);
                      setUser(true);
                  }}
              >
                  By User total
              </Button>
          </View>
      </View>
  );    
}



