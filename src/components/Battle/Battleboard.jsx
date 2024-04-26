import * as React from "react";
import { useEffect, useState, useContext } from "react";
import { generateClient } from "aws-amplify/api";
import { UserContext } from "../../UserContext";
import "./board.css";
import {
  listPosts,
  listBattles,
  listFriends,
  listFriendRequests,
} from "../../graphql/queries";
import { View, Text, Button } from "@aws-amplify/ui-react";
import BattlePending from "./BattlePending";
import BattleImages from "./BattleImages";
import { uploadData, getUrl } from "aws-amplify/storage";
import {
  createBattle,
  deleteBattle,
  updateBattle,
} from "../../graphql/mutations";
import toast, { Toaster } from "react-hot-toast";

const client = generateClient();

const modalContainerStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent black background
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999, // higher z-index to ensure it's above other content
};

const modalStyles = {
  backgroundColor: "rgba(34, 34, 34, 1)",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
};

export default function BattleBoard() {
  const { allUsers, myUser } = useContext(UserContext);
  const [selectedData, setSelectedData] = useState([]); // Initialize with an empty array
  const [battles, setBattles] = useState([]);
  const [showActionCenter, setShowActionCenter] = React.useState(false);
  const [showImageActionCenter, setShowImageActionCenter] =
    React.useState(false);
  const [selectedBattle, setSelectedBattle] = useState(null);
  const [image, setImage] = useState(null);
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");

  const handleSubmit = () => {
    return new Promise(async (resolve, reject) => {
      try {
        // Handle post submission logic here
        console.log("Image:", image);

        const currDate = new Date().toISOString();

        const imageUpload = await uploadData({
          key: `${myUser.username} + ${currDate}` + "battle.png",
          data: image,
          drip_points: 0,
          options: {
            contentType: "image/png",
          },
        }).result;

        const updatePostDetails = {
          id: selectedBattle.id,
          Player2ImageKey: imageUpload?.key,
          Player2Status: "Ready",
        };

        const updatePostResponse = await client.graphql({
          query: updateBattle,
          variables: { input: updatePostDetails },
        });

        const updatedPost = updatePostResponse.data.updateBattle;
        // console.log("Logging response from updatePost")
        // console.log(updatedPost)
        if (!updatedPost.Player1ImageKey) return;
        const signedURL = await getUrl({ key: updatedPost.postImageKey });
        console.log(signedURL);

        resolve("Battle created successfully");
      } catch (error) {
        reject("Failed to create post");
      }
      setImage(null);
      setShowActionCenter(false);
    });
  };

  const handleReject = () => {
    return new Promise(async (resolve, reject) => {
      try {
        // Handle post submission logic here
        console.log("Image:", image);

        const currDate = new Date().toISOString();

        const updatePostDetails = {
          id: selectedBattle.id,
        };

        const updatePostResponse = await client.graphql({
          query: deleteBattle,
          variables: { input: updatePostDetails },
        });

        resolve("Battle rejected successfully");
      } catch (error) {
        reject("Failed to create post");
      }
      setImage(null);
      setShowActionCenter(false);
    });
  };

  const getImagePlayer = async (entry) => {
    console.log(selectedBattle);

    const postData = await getUrl({ key: entry.Player1ImageKey });
    const postData2 = await getUrl({ key: entry.Player2ImageKey });
    setImage1(postData.url);
    setImage2(postData2.url);

    console.log("image1: " + image1);
  };

  async function getAllPending(username) {
    let nextToken = null; // Initialize pagination token

    let battleData = [];

    do {
      const postFetchVariables = {
        filter: {
          Player2: {
            eq: username,
          },
          and: [
            { Player1Status: { eq: "Ready" } },
            { Player2Status: { eq: "Pending" } },
          ],
        },
        limit: 10, // Adjust the limit as needed
        nextToken: nextToken, // Include the pagination token
      };

      const userPosts = await client.graphql({
        query: listBattles,
        variables: postFetchVariables,
      });

      const posts = userPosts.data.listBattles.items;

      battleData.push(...posts);

      // Update the pagination token for the next iteration
      nextToken = userPosts.data.listBattles.nextToken;
    } while (nextToken); // Continue fetching until there are no more posts

    setSelectedData(battleData);
  }

  const onCloseHidden = () => {
    setShowActionCenter(false);
    setShowImageActionCenter(false);
  };

  async function getAllPostsRankedByDripPoints(username) {
    let nextToken = null; // Initialize pagination token

    let battleData = [];

    do {
      const postFetchVariables = {
        filter: {
          and: [
            {
              or: [
                {
                  Player1: {
                    eq: username,
                  },
                },
                { Player2: { eq: username } },
              ],
            },
            {
              and: [
                { Player1Status: { eq: "Ready" } },
                { Player2Status: { eq: "Ready" } },
              ],
            },
          ],
        },
        limit: 10, // Adjust the limit as needed
        nextToken: nextToken, // Include the pagination token
      };

      const userPosts = await client.graphql({
        query: listBattles,
        variables: postFetchVariables,
      });

      const posts = userPosts.data.listBattles.items;

      battleData.push(...posts);

      // Update the pagination token for the next iteration
      nextToken = userPosts.data.listBattles.nextToken;
    } while (nextToken); // Continue fetching until there are no more posts

    console.log(battleData);

    setSelectedData(battleData);
  }

  useEffect(() => {
    getAllPostsRankedByDripPoints(myUser.username);
  }, [allUsers]);

  useEffect(() => {
    getAllPending(myUser.username);
  }, [showActionCenter]);

  return (
    <View className="leaderboard-container">
      <View className="board">
        <View className="board2">
          <Text className="rank-text" children="Player 1" />
          <Text className="user-text" children="Player 2" />
          <Text className="point-text" children="Status" />
          <hr className="separator" />
          <div className="columns-container" style={{ overflow: "auto" }}>
            {/* First, add a div to contain the columns */}
            <View className="rank-column">
              {selectedData.map((entry, index) => (
                <h2 key={index} style={{ color: "white" }}>
                  {entry.Player1}
                </h2>
              ))}
            </View>
            <View className="user-column">
              {selectedData.map((entry, index) => (
                <h2 key={index} style={{ color: "white" }}>
                  {entry.Player2}
                </h2>
              ))}
            </View>
            <View className="points-column">
              {selectedData.map((entry, index) => {
                // Example of an if statement for entry
                if (entry.Player2Status === "Pending") {
                  // Replace 'condition' with the property you want to check
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        setSelectedBattle(entry);
                        setShowActionCenter(true);
                      }}
                    >
                      <h2 style={{ color: "white" }}>{"Click To Play"}</h2>
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        setSelectedBattle(entry);
                        getImagePlayer(entry);
                        setShowImageActionCenter(true);
                      }}
                    >
                      <h2 key={index} style={{ color: "white" }}>
                        {entry.Player1Score + " | " + entry.Player2Score}
                      </h2>
                    </div>
                  );
                }
              })}
            </View>
          </div>
        </View>
        <Text className="board-header-text">
          <span style={{ color: "#047d95" }}>Battle</span>
          <span>board</span>
        </Text>
        <Button
          className="button-by-view"
          variation="default"
          onClick={() => {
            getAllPostsRankedByDripPoints(myUser.username);
          }}
        >
          My Battle(s)
        </Button>
        <Button
          className="button-by-post"
          variation="default"
          onClick={() => {
            getAllPending(myUser.username);
          }}
        >
          Pending Battle(s)
        </Button>
        <Button
          className="button-by-user"
          variation="default"
          onClick={() => {
            window.location.href = "/battle-request";
          }}
        >
          New Battle
        </Button>
      </View>
      {showActionCenter && (
        <div style={modalContainerStyles}>
          <div style={modalStyles}>
            <BattlePending
              entry={selectedBattle}
              image={image}
              setImage={setImage}
            />
            <button
              style={{
                backgroundColor: "#047d95",
                color: "white",
                border: "none",
                padding: "15px 24px", // Increased padding for the button
                borderRadius: "5px",
                cursor: "pointer",
                display: "block",
                width: "100%",
                fontSize: "16px",
                fontWeight: "bold",
              }}
              onClick={() => {
                toast.promise(handleSubmit(), {
                  pending: "Uploading...",
                  success: "Post created successfully",
                  error: "Failed to create post",
                });
              }}
            >
              Play!
            </button>
            <button
              onClick={() => {
                toast.promise(handleReject(), {
                  pending: "Uploading...",
                  success: "Post created successfully",
                  error: "Failed to create post",
                });
              }}
            >
              Reject Battle
            </button>
            <button onClick={() => onCloseHidden()}>Close</button>
          </div>
        </div>
      )}
      {showImageActionCenter && (
        <div style={modalContainerStyles}>
          <div style={modalStyles}>
            <BattleImages
              entry={selectedBattle}
              image1={image1}
              image2={image2}
            />
            <button onClick={() => onCloseHidden()}>Close</button>
          </div>
        </div>
      )}
    </View>
  );
}
