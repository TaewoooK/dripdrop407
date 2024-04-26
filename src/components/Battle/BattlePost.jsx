import React, { useState, useEffect } from "react";
import {
  Card,
  Flex,
  Icon,
  Text,
  TextField,
  View,
  Button,
  Image,
} from "@aws-amplify/ui-react";
import { MyIcon } from "../../ui-components";
import "./battlepost.css";
import { motion, useAnimate } from "framer-motion";
import awsconfig from "../../aws-exports";
import { fetchUserAttributes, getCurrentUser } from "aws-amplify/auth";
import { generateClient, post } from "aws-amplify/api";
import {
  createComment,
  createSavedPosts,
  deleteComment,
  updateSavedPosts,
  updatePost,
  updateNotifications,
  updateBattle,
} from "../../graphql/mutations";
import {
  listBattles,
  getPost,
  commentsByPostId,
  listSavedPosts,
  listNotifications,
} from "../../graphql/queries";
import { getUrl } from "aws-amplify/storage";
import PostActionCenter from "../PostActionCenter";
import ReportPost from "../ReportPost";
import toast, { Toaster } from "react-hot-toast";
import { useContext } from "react";
import { UserContext } from "../../UserContext";

const client = generateClient();

const BattlePost = () => {
  const [comment, setComment] = React.useState("");
  const [comments, setComments] = React.useState([]);
  const [commentsText, setCommentsText] = React.useState([]);
  const [showComment, setShow] = React.useState(false);

  const [nextToken, setNextToken] = React.useState(null);
  const [posts, setPosts] = React.useState([]);
  const [images, setImages] = React.useState([]);
  const [image, setImage] = React.useState("");
  const [images2, setImages2] = React.useState([]);
  const [image2, setImage2] = React.useState("");
  const [currentImageIndex, setCurrentImageIndex] = React.useState(1);
  const [currPostID, setCurrPostID] = React.useState(null);
  const [variablesN, setVariablesN] = React.useState(null);
  const [currUser, setCurrUser] = useState(null);
  const [gotVN, setGotVN] = useState(false);
  const [savedPosts, setSavedPosts] = useState([]);

  const date = new Date();
  let oneWeekFromToday = new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000);

  const fetchUserData = async () => {
    try {
      const currUserAttributes = await getCurrentUser();
      setCurrUser(currUserAttributes);
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };

  const setVariablesNFilter = () => {
    if (currUser != null) {
      console.log(currUser);
      if (!nextToken) {
        // This means either the page just loaded or the user has scrolled to the end of the list
        setVariablesN({
          filter: {
            not: {
              actionedUsers: { contains: currUser.username },
            },
            and: [
              { Player1Status: { eq: "Ready" } },
              { Player2Status: { eq: "Ready" } },
            ],
            createdAt: { between: [oneWeekFromToday.toJSON(), date.toJSON()] },
          },
          limit: 10,
        });
      } else {
        setVariablesN({
          filter: {
            not: {
              actionedUsers: { contains: currUser.username },
            },
            and: [
              { Player1Status: { eq: "Ready" } },
              { Player2Status: { eq: "Ready" } },
            ],
            createdAt: { between: [oneWeekFromToday.toJSON(), date.toJSON()] },
          },
          limit: 10,
          nextToken: nextToken,
        });
      }
      setGotVN(true);
    }
  };

  const fetchPost = async () => {
    if (variablesN != null) {
      try {
        //console.log("Logging fetchPost begin")
        // console.log("Variables");
        // console.log(variablesN);
        const postDataGraphQLResponse = await client.graphql({
          query: listBattles,
          variables: variablesN,
        });
        //console.log("graphql response"

        let postData = [];
        let nextTokenTemp = null;
        if (postDataGraphQLResponse.data.listBattles.items.length != 0) {
          postData = postDataGraphQLResponse.data.listBattles.items;
          nextTokenTemp = postDataGraphQLResponse.data.listBattles.nextToken;
          setPosts(postDataGraphQLResponse.data.listBattles.items);
          setNextToken(postDataGraphQLResponse.data.listBattles.nextToken);
          setVariablesN({
            filter: {
              not: {
                actionedUsers: { contains: currUser.username },
              },
              and: [
                { Player1Status: { eq: "Ready" } },
                { Player2Status: { eq: "Ready" } },
              ],
            },
            limit: 10,
            nextToken: nextTokenTemp,
            createdAt: { between: [oneWeekFromToday.toJSON(), date.toJSON()] },
          });
        } else {
          setNextToken(null);
        }
        console.log("posts");
        console.log(postData);
        if (postData.length != 0) {
          const imagePromises = postData.map(async (post) => {
            const postData = await getUrl({ key: post.Player1ImageKey });
            return {
              imageUrl: postData.url,
            };
          });
          const fetchedImages = await Promise.all(imagePromises);
          setImages(fetchedImages);
          console.log("Fetched images");
          console.log(fetchedImages);
          setImage(fetchedImages[0].imageUrl);

          const imagePromises2 = postData.map(async (post) => {
            const postData = await getUrl({ key: post.Player2ImageKey });
            return {
              description: post.description,
              imageUrl: postData.url,
            };
          });
          const fetchedImages2 = await Promise.all(imagePromises2);
          setImages2(fetchedImages2);
          console.log("Fetched images");
          console.log(fetchedImages2);
          setImage2(fetchedImages2[0].imageUrl);
          setCurrentImageIndex(0);
        } else {
          setImage(null);
          return <div>No More Posts, Check back later!</div>;
        }
        //console.log("End of fetchPost logging")
      } catch (error) {
        console.error("Error fetching posts: ", error);
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    setVariablesNFilter();
  }, [currUser]);

  // When nextToken changes, fetch more posts
  useEffect(() => {
    console.log("NextTok change calls fetchPost");
    setVariablesNFilter();
  }, [nextToken]);

  // When gotVN changes, fetch more posts
  useEffect(() => {
    console.log("VariablesN change calls fetchPost");
    fetchPost();
  }, [gotVN]);

  // useEffect(() => {
  //     console.log("ReRender")
  // }, [image])

  useEffect(() => {
    if (posts.length > 0 && images.length > 0) {
      setCurrPostID(posts[currentImageIndex].id);
    }
  }, [posts, currentImageIndex]);

  const updatePostFunction = async (currPost) => {
    const postData = await client.graphql({
      query: updateBattle,
      variables: {
        input: {
          id: currPost.id,
          actionedUsers: [...currPost.actionedUsers, currUser.username],
        },
      },
    });
    console.log(postData);
  };

  const [scope, animate] = useAnimate();

  const clickedOnChoice = async (choice) => {
    if (posts.length > 0) {
      setShow(false);
      console.log("Green button initial");
      console.log("Image index");
      console.log(currentImageIndex);
      let greenClickUpdateDetails = {};
      if (choice === 1) {
        greenClickUpdateDetails = {
          id: currPostID,
          Player1Score: posts[currentImageIndex].Player1Score + 1,
        };
      } else {
        greenClickUpdateDetails = {
          id: currPostID,
          Player2Score: posts[currentImageIndex].Player2Score + 1,
        };
      }

      await client.graphql({
        query: updateBattle,
        variables: { input: greenClickUpdateDetails },
      });

      console.log("THE CURRENT POST: ", posts[currentImageIndex]);
      updatePostFunction(posts[currentImageIndex]);
    }
  };

  const [showActionCenter, setShowActionCenter] = React.useState(false);
  const [showReportPost, setShowReportPost] = React.useState(false);

  const toggleActionCenter = () => {
    setShowActionCenter(!showActionCenter);
  };

  const toggleReportPost = () => {
    setShowReportPost(!showReportPost);
    setShowActionCenter(false);
  };

  const showReportNotification = () => {
    toast.success("Post reported successfully");
  };

  // const generateNotifs = async () => {
  //   try {
  //     console.log("fetching notif list for user");
  //     const result = await client.graphql({
  //       query: listNotifications,
  //       variables: { filter: { username: { eq: currUser.username } } },
  //     });
  //     if (result.data.listNotifications.items === null) {
  //       console.log("creating notification list ");
  //       await client.graphql({
  //         query: createNotifications,
  //         variables: {
  //           input: { username: currUser.username, notificationsList: [] },
  //         },
  //       });
  //       console.log("created notification list");
  //     } else {
  //       console.log("notification list already exists");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching notification list:", error);
  //   }
  // };

  const [percentageLeft, setPercentageLeft] = useState(0);
  const [percentageRight, setPercentageRight] = useState(0);
  const [choiceMade, setChoiceMade] = useState(false);

  // Function to handle click on the image
  const handleClick = (side) => {
    setChoiceMade(true);

    if (side === "left") {
      clickedOnChoice(1);
      setPercentageLeft(posts[currentImageIndex].Player1Score + 1);
      setPercentageRight(posts[currentImageIndex].Player2Score);
      console.log("Left win!");
    } else if (side === "right") {
      clickedOnChoice(2);
      setPercentageLeft(posts[currentImageIndex].Player1Score);
      setPercentageRight(posts[currentImageIndex].Player2Score + 1);
      console.log("Right win!");
    }
  };

  const handleNext = async () => {
    if ((currentImageIndex + 1) % images.length == 0) {
      //console.log("Green Calls fetch post")
      await fetchPost();
    } else {
      setCurrentImageIndex(
        (currentImageIndex) => (currentImageIndex + 1) % images.length
      );
      let tempImgIndex = (currentImageIndex + 1) % images.length;
      setImage(images[tempImgIndex].imageUrl);
      setImage2(images2[tempImgIndex].imageUrl);
    }
    // await fetchPost();
    // Perform any other actions or state updates as needed
    setChoiceMade(false);
  };

  return (
    <Flex direction="row" justifyContent="center" gap="0.5rem">
      {/* <Toaster position="top-right" reverseOrder={false} /> */}

      {showReportPost && (
        <div className="overlay" onClick={toggleReportPost}>
          <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
            <>{console.log(currPostID)}</>
            <ReportPost
              toggleReportPost={toggleReportPost}
              currPostID={currPostID}
              showReportNotification={showReportNotification}
            />
          </div>
        </div>
      )}
      <View className="big-post-containerv2">
        <Button
          className="next-button"
          variation="default"
          onClick={() => handleNext()}
        >
          Next
        </Button>
        <motion.View
          className="post-containerv2"
          initial={{ x: "100vw" }}
          animate={{ x: 0 }}
          ref={scope}
        >
          <Text className="battle-header-text">
            <span style={{ color: "#047d95" }}>Battle</span>
          </Text>
          <Text className="battle-sub-header-text">
            <span style={{ color: "white" }}>Choose!</span>
          </Text>

          {/* Left Image */}
          {image ? (
            <div>
              <Image
                className="post-img-one"
                onClick={() => handleClick("left")}
                src={image}
              ></Image>
              {choiceMade && (
                <div
                  className="left-img-percent"
                  style={{
                    position: "absolute",
                    top: "10%",
                    left: "25%",
                    transform: "translate(-50%, -50%)",
                    fontSize: "1.5rem",
                  }}
                >
                  {percentageLeft}
                </div>
              )}
            </div>
          ) : (
            <div>No More Posts, Check back later!</div>
          )}

          {/* Right Image */}
          {image ? (
            <div>
              <Image
                className="post-img-two"
                onClick={() => handleClick("right")}
                src={image2}
              ></Image>
              {choiceMade && (
                <div
                  className="right-img-percent"
                  style={{
                    position: "absolute",
                    top: "10%",
                    left: "80%",
                    transform: "translate(-50%, -50%)",
                    fontSize: "1.5rem",
                  }}
                >
                  {percentageRight}
                </div>
              )}
            </div>
          ) : (
            <div>No More Posts, Check back later!</div>
          )}
          <Flex
            gap="22px"
            direction="column"
            width="unset"
            height="unset"
            justifyContent="center"
            alignItems="center"
            position="absolute"
            top="425px"
            left="40px"
            padding="0px 0px 0px 0px"
          >
            {/* {image ? (
                <Text
                    className="username-textv2"
                    children={posts[currentImageIndex].owner}
                ></Text>
            ) : (
                <Text
                    className="username-textv2"
                    children={"No post"}
                ></Text>
            )} */}
          </Flex>
        </motion.View>
      </View>
    </Flex>
  );
};

export default BattlePost;
