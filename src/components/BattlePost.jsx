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
import { MyIcon } from "../ui-components";
import "./battlepost.css";
import { motion, useAnimate } from "framer-motion";
import awsconfig from "../aws-exports";
import { fetchUserAttributes, getCurrentUser } from "aws-amplify/auth";
import { generateClient, post } from "aws-amplify/api";
import {
  createComment,
  createSavedPosts,
  deleteComment,
  updateSavedPosts,
  updatePost,
  updateNotifications,
 } from "../graphql/mutations";
import {
  listPosts,
  getPost,
  commentsByPostId,
  listSavedPosts,
  listNotifications,
} from "../graphql/queries";
import { getUrl } from "aws-amplify/storage";
import PostActionCenter from "./PostActionCenter";
import ReportPost from "./ReportPost";
import toast, { Toaster } from "react-hot-toast";
import { useContext } from "react";
import { UserContext } from "../UserContext";

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
              hiddenPeople: { contains: currUser.username },
            },
            not: {
              actionedUsers: { contains: currUser.username },
            },
            createdAt: { between: [oneWeekFromToday.toJSON(), date.toJSON()] },
          },
          limit: 10,
        });
      } else {
        setVariablesN({
          filter: {
            not: {
              hiddenPeople: { contains: currUser.username },
            },
            not: {
              actionedUsers: { contains: currUser.username },
            },
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
          query: listPosts,
          variables: variablesN,
        });
        //console.log("graphql response"

        let postData = [];
        let nextTokenTemp = null;
        if (postDataGraphQLResponse.data.listPosts.items.length != 0) {
          postData = postDataGraphQLResponse.data.listPosts.items;
          nextTokenTemp = postDataGraphQLResponse.data.listPosts.nextToken;
          setPosts(postDataGraphQLResponse.data.listPosts.items);
          setNextToken(postDataGraphQLResponse.data.listPosts.nextToken);
          setVariablesN({
            filter: {
              not: {
                hiddenPeople: { contains: currUser.username },
              },
              not: {
                actionedUsers: { contains: currUser.username },
              },
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
            const postData = await getUrl({ key: post.postImageKey });
            return {
              description: post.description,
              imageUrl: postData.url,
            };
          });
          const fetchedImages = await Promise.all(imagePromises);
          setImages(fetchedImages);
          console.log("Fetched images");
          console.log(fetchedImages);
          setImage(fetchedImages[0].imageUrl);
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
    if (currUser) {
      getSavedPosts();
      // generateNotifs();
    }
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
      query: updatePost,
      variables: {
        input: {
          id: currPost.id,
          actionedUsers: [currPost.actionedUsers, currUser.username],
        },
      },
    });
    console.log(postData);
  };

  const [scope, animate] = useAnimate();
  const handleGreenButtonClick = async () => {
    if (posts.length > 0) {
      setShow(false);
      console.log("Green button initial");
      console.log("Image index");
      console.log(currentImageIndex);
      const greenClickUpdateDetails = {
        id: currPostID,
        drip_points: posts[currentImageIndex].drip_points + 1,
      };
      await client.graphql({
        query: updatePost,
        variables: { input: greenClickUpdateDetails}
      });
      console.log(posts[currentImageIndex].drip_points);

      console.log("THE CURRENT POST: ", posts[currentImageIndex]);
      updatePostFunction(posts[currentImageIndex]);

      if ((currentImageIndex + 1) % images.length == 0) {
        //console.log("Green Calls fetch post")
        await fetchPost();
      } else {
        setCurrentImageIndex(
          (currentImageIndex) => (currentImageIndex + 1) % images.length
        );
        let tempImgIndex = (currentImageIndex + 1) % images.length;
        setImage(images[tempImgIndex].imageUrl);
      }
      // await fetchPost();
      await animate(scope.current, { x: "80vw" });
      await animate(scope.current, { x: 0 });
      // Perform any other actions or state updates as needed
    }
  };

  const handleRedButtonClick = async () => {
    if (posts.length > 0) {
      setShow(false);

      const redClickUpdateDetails = {
        id: currPostID,
        drip_points: posts[currentImageIndex].drip_points - 1,
      };
      await client.graphql({
        query: updatePost,
        variables: { input: redClickUpdateDetails}
      });
      console.log(posts[currentImageIndex].drip_points);

      updatePostFunction(posts[currentImageIndex]);

      if ((currentImageIndex + 1) % images.length == 0) {
        //console.log("Green Calls fetch post")
        await fetchPost();
      } else {
        setCurrentImageIndex(
          (currentImageIndex) => (currentImageIndex + 1) % images.length
        );
        let tempImgIndex = (currentImageIndex + 1) % images.length;
        setImage(images[tempImgIndex].imageUrl);
      }
      await animate(scope.current, { x: "-80vw" });
      await animate(scope.current, { x: 0 });
      // console.log('curr idx:',currentImageIndex, 'postID:', currPostID)
      // Perform any other actions or state updates as needed
    }
  };

  const handleCommentsExpansionClick = async () => {
    const currPostFields = await client.graphql({
      query: getPost,
      variables: { id: currPostID },
    });
    console.log(currPostFields);
    let enableCommentsValue =
      currPostFields.data.getPost.enable_comments && !showComment;
    setShow(enableCommentsValue);
    if (enableCommentsValue) {
      const getComments = await client.graphql({
        query: commentsByPostId,
        variables: { postId: currPostID },
      });
      const commentsList = getComments.data.commentsByPostId.items;
      const commentsTextArray = commentsList.map((comment) => comment.text);
      setComments(commentsList);
      setCommentsText(commentsTextArray);
      console.log(commentsList);
    }
  };

  const onClickHandler = async () => {
    const currPost = posts[currentImageIndex];
    console.log(
      "currPostID:",
      currPost.id,
      "currPostOwner:",
      currPost.owner,
      "currUserId:",
      currUser.username
    );
    await client.graphql({
      query: createComment,
      variables: {
        input: {
          postId: currPost.id,
          text: comment,
          commentAuthorId: currUser.username,
        },
      },
    });

    // notifify post owner
    const notif = ["Comment", currUser.username, currPost.id, comment];
    console.log("send notif to:", currPost.owner);
    console.log("notif:", notif);

    const notifToPostOwner = await client.graphql({
      query: listNotifications,
      variables: { filter: { username: { eq: currPost.owner } } },
    });
    if (notifToPostOwner.data.listNotifications.items != null) {
      console.log("notifToPostOwner:", notifToPostOwner);
      const notifList = notifToPostOwner.data.listNotifications.items[0];
      const input = {
        id: notifList.id,
        notificationsList: [notif, ...notifList.notificationsList],
      };
      const condition = { username: { eq: currPost.owner } };
      await client.graphql({
        query: updateNotifications,
        variables: { input, condition },
      });
      console.log("notif sent to post owner");
    } else {
      console.log("no notif list for post owner");
    }

    console.log("no error");
    const getComments = await client.graphql({
      query: commentsByPostId,
      variables: { postId: currPost.id },
    });
    console.log("no error 2");
    const commentsList = getComments.data.commentsByPostId.items;
    const commentsTextArray = commentsList.map((comment) => comment.text);
    setComments(commentsList);
    setCommentsText(commentsTextArray);
    setComment("");
  };

    // Handler function to toggle the comment deletion state
  const handleIconClick = async ({ index }) => {
    //   setIsCommentDeleted(!isCommentDeleted);
    //   console.log("comment deleted:", index);
    console.log("comment deleted id:", comments[index].id);
    const currPost = posts[currentImageIndex];
    await client.graphql({
      query: deleteComment,
      variables: {
        input: { id: comments[index].id },
      },
    });
    const getComments = await client.graphql({
      query: commentsByPostId,
      variables: { postId: currPost.id },
    });
    const commentsList = getComments.data.commentsByPostId.items;
    const commentsTextArray = commentsList.map((comment) => comment.text);
    setComments(commentsList);
    setCommentsText(commentsTextArray);
    toast.success("Comment deleted successfully");
  };

  const onChangeHandler = (e) => {
    setComment(e.target.value);
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

  const getSavedPosts = async () => {
    if (currUser != null) {
      try {
        console.log("fetching saved posts");
        const result = await client.graphql({
          query: listSavedPosts,
          variables: { filter: { username: { eq: currUser.username } } },
        });
        if (result.data.listSavedPosts.items.length > 0) {
          setSavedPosts(result.data.listSavedPosts.items[0]);
          console.log(
            "saved posts:",
            result.data.listSavedPosts.items[0].postIds
          );
          // return result.data.listSavedPosts.items; // Return the data from the GraphQL response
        } else {
          const createdSavedPosts = await client.graphql({
            query: createSavedPosts,
            variables: {
              input: { username: currUser.username, postIds: [] },
            },
          });
          console.log("created saved posts");
          setSavedPosts(createdSavedPosts.data.createSavedPosts[0]);
          // return createdSavedPosts.data.listSavedPosts.items; // Return the data from the GraphQL response
        }
      } catch (error) {
        console.error("Error fetching saved posts:", error);
        return null; // Return null in case of error
      }
    }
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

  const toggleSavePost = async () => {
    setShowActionCenter(false);
    try {
      // const savedPostsList = (await getSavedPosts())[0];
      // if (savedPostsList.length === 0) {
      //   console.log("no saved posts data");
      //   const currPost = posts[currentImageIndex];
      //   const createdSavedPosts = await client.graphql({
      //     query: createSavedPosts,
      //     variables: {
      //       input: { username: currUser.username, postIds: [currPost.id] },
      //     },
      //   });
      //   console.log("created saved posts");
      //   toast.success("Post saved");
      //   setSavedPosts(createdSavedPosts.data.updateSavedPosts.postIds);
      // } else {
      if (savedPosts.postIds.includes(posts[currentImageIndex].id)) {
        console.log("unsaving post");
        const input = {
          id: savedPosts.id,
          postIds: savedPosts.postIds.filter(
            (id) => id !== posts[currentImageIndex].id
          ),
        };
        const condition = { username: { eq: currUser.username } };
        const updatedSavedPosts = await client.graphql({
          query: updateSavedPosts,
          variables: { input, condition },
        });
        setSavedPosts(updatedSavedPosts.data.updateSavedPosts);
        toast.success("Post unsaved");
      } else {
        console.log("post not saved");
        const input = {
          id: savedPosts.id,
          postIds: [...savedPosts.postIds, posts[currentImageIndex].id],
        };
        const condition = { username: { eq: currUser.username } };
        const updatedSavedPosts = await client.graphql({
          query: updateSavedPosts,
          variables: { input, condition },
        });
        setSavedPosts(updatedSavedPosts.data.updateSavedPosts);
        toast.success("Post saved");
      }
      // }
    } catch (e) {
      console.log("error:", e);
      toast.error("error saving/unsaving post");
    }
  };

  const [percentageLeft, setPercentageLeft] = useState(0);
  const [percentageRight, setPercentageRight] = useState(0);
  const [choiceMade, setChoiceMade] = useState(false);

  // Function to handle click on the image
  const handleClick = (side) => {
    setChoiceMade(true);

    if (side === 'left') {
      setPercentageLeft(70);
      setPercentageRight(30);
      console.log('Left win!');
    } else if (side === 'right') {
      setPercentageRight(60);
      setPercentageLeft(40);
      console.log('Right win!');
    }
  };

  const handleNext = () => {
    setChoiceMade(false);
  };

  // const [isCommentDeleted, setIsCommentDeleted] = useState(false);


  return (
    <Flex direction="row" justifyContent="center" gap="0.5rem">
      {/* <Toaster position="top-right" reverseOrder={false} /> */}
      {showActionCenter && (
        <div className="overlay" onClick={toggleActionCenter}>
          <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
            <PostActionCenter
              toggleReportPost={toggleReportPost}
              toggleSavePost={toggleSavePost}
              saved={savedPosts.postIds.includes(posts[currentImageIndex].id)}
            />
          </div>
        </div>
      )}

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
              <Image className="post-img-one" onClick={() => handleClick('left')} src={image}></Image>
              {choiceMade && (
                <div className="left-img-percent" 
                style={{ position: 'absolute', top: '10%', left: '25%', transform: 'translate(-50%, -50%)', fontSize: '1.5rem' }}>{percentageLeft}%</div>
              )}
            </div>
            
          ) : (
            <div>No More Posts, Check back later!</div>
          )}


          {/* Right Image */}
          {image ? (
          <div>
            <Image className="post-img-two" onClick={() => handleClick('right')} src={image}></Image>
            {choiceMade && (
              <div className="right-img-percent" style={{ position: 'absolute', top: '10%', left: '80%', transform: 'translate(-50%, -50%)', fontSize: '1.5rem' }}>{percentageRight}%</div>
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
