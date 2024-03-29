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
import "./postandcomment.css";
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
} from "../graphql/mutations";
import {
  listPosts,
  getPost,
  commentsByPostId,
  listSavedPosts,
  listFriends,
} from "../graphql/queries";
import { getUrl } from "aws-amplify/storage";
import PostActionCenter from "./PostActionCenter";
import ReportPost from "./ReportPost";
import toast, { Toaster } from "react-hot-toast";
import { useContext } from "react";
import { UserContext } from "./../UserContext";

const client = generateClient();

const FriendsOnlyPage = () => {
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
  const [listOfFriends, setListOfFriends] = useState([]);

  let filter = {};

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

  // Find Friends using updated filter
  const fetchFriends = async () => {
    if (currUser != null) {
      try {
        const friendsData = await client.graphql({
          query: listFriends,
          variables: { filter: { Username: { eq: currUser.username } } },
        });
        setListOfFriends(friendsData.data.listFriends.items);
        let temp = friendsData.data.listFriends.items;
        setListOfFriends(temp.map((friend) => friend.FriendUsername));
      } catch (error) {
        console.error("Error fetching friends: ", error);
      }
    }
  };

  const setVariablesNFilter = () => {
    if (currUser != null) {
      let filterMembers = listOfFriends.map((id) =>
        JSON.parse(`{"owner": {"eq": "${id}"}}`)
      );
      let filter = {
        or: filterMembers,
        not: {
          hiddenPeople: { contains: currUser.username },
        },
        not: {
          actionedUsers: { contains: currUser.username },
        },
        createdAt: { between: [oneWeekFromToday.toJSON(), date.toJSON()] },
      };

      console.log(filter);

      if (!nextToken) {
        // This means either the page just loaded or the user has scrolled to the end of the list
        setVariablesN({
          filter: filter,
          limit: 10,
        });
      } else {
        setVariablesN({
          filter: filter,
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
            filter: filter,
            limit: 10,
            nextToken: nextTokenTemp,
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
    getSavedPosts();
    fetchFriends();
  }, [currUser]);

  useEffect(() => {
    setVariablesNFilter();
  }, [listOfFriends]);

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
    await client.graphql({
      query: createComment,
      variables: {
        input: {
          postId: currPost.id,
          text: comment,
          commentAuthorId: currUser.userId,
        },
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
    setComment("");
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
  // const [isCommentDeleted, setIsCommentDeleted] = useState(false);

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

  return (
    <Flex direction="row" justifyContent="center" gap="0.5rem">
      <Toaster position="top-right" reverseOrder={false} />
      {showActionCenter && (
        <div className="overlay" onClick={toggleActionCenter}>
          <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
            <PostActionCenter
              toggleReportPost={toggleReportPost}
              toggleSavePost={toggleSavePost}
              saved={savedPosts.includes(posts[currentImageIndex].id)}
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
      <View className="big-post-container">
        <motion.View
          className="post-container"
          initial={{ x: "100vw" }}
          animate={{ x: 0 }}
          ref={scope}
        >
          <View className="thumb-container1">
            <Icon
              width="33.52px"
              height="30.94px"
              viewBox={{ minX: 0, minY: 0, width: 44.6875, height: 41.25 }}
              paths={[
                {
                  d: "M0.155834 21.851L-0.589964 21.9303L-0.589928 21.9307L0.155834 21.851ZM3.89034e-07 18.9063L0.75 18.9064L0.75 18.9063L3.89034e-07 18.9063ZM6.07063 1.67063L6.6547 2.14112L6.65486 2.14092L6.07063 1.67063ZM18.9521 1.92714e-06L18.9521 0.750002L18.9525 0.750002L18.9521 1.92714e-06ZM22.2131 0.527085L22.4507 -0.184291L22.4498 -0.184581L22.2131 0.527085ZM29.3494 2.91042L29.1118 3.62179L29.1127 3.62209L29.3494 2.91042ZM32.6104 3.4375L32.6104 2.6875L32.61 2.6875L32.6104 3.4375ZM35.5758 3.4375L36.3113 3.29041L36.3101 3.28462L35.5758 3.4375ZM13.6881 28.7192L13.0111 28.3964L13.0107 28.3973L13.6881 28.7192ZM12.0312 36.0938L12.7813 36.0938L12.7812 36.0926L12.0312 36.0938ZM17.1875 41.25L17.1875 40.5L17.1875 41.25ZM19.6442 34.249L18.9478 33.9704L18.9474 33.9713L19.6442 34.249ZM23.4323 30.3188L23.7848 30.9807L23.7854 30.9804L23.4323 30.3188ZM29.9865 24.8188L29.3967 24.3555L29.3961 24.3562L29.9865 24.8188ZM17.0729 26.5313C17.4871 26.5313 17.8229 26.1955 17.8229 25.7813C17.8229 25.367 17.4871 25.0313 17.0729 25.0313L17.0729 26.5313ZM35.6927 3.77667L35.0163 4.10078L35.0203 4.10894L35.6927 3.77667ZM43.4935 4.85375L42.7761 5.07236L42.7762 5.07282L43.4935 4.85375ZM42.7831 22.9694L43.4806 23.2451L43.481 23.244L42.7831 22.9694ZM34.8288 23.5813L34.1878 23.1918L34.1875 23.1924L34.8288 23.5813ZM12.0267 25.0313L4.86292 25.0313L4.86292 26.5313L12.0267 26.5313L12.0267 25.0313ZM4.86292 25.0313C2.82424 25.0313 1.10359 23.6635 0.901596 21.7714L-0.589928 21.9307C-0.292336 24.7182 2.1991 26.5313 4.86292 26.5313L4.86292 25.0313ZM0.901632 21.7718C0.800455 20.82 0.74984 19.8635 0.75 18.9064L-0.75 18.9061C-0.750169 19.9163 -0.696748 20.9258 -0.589964 21.9303L0.901632 21.7718ZM0.75 18.9063C0.75 12.5568 2.96091 6.72658 6.6547 2.14112L5.48656 1.20013C1.58576 6.04259 -0.75 12.2023 -0.75 18.9063L0.75 18.9063ZM6.65486 2.14092C7.38169 1.238 8.52567 0.750002 9.74875 0.750002L9.74875 -0.749998C8.13933 -0.749998 6.53789 -0.105908 5.4864 1.20033L6.65486 2.14092ZM9.74875 0.750002L18.9521 0.750002L18.9521 -0.749998L9.74875 -0.749998L9.74875 0.750002ZM18.9525 0.750002C19.9802 0.749374 21.0013 0.914407 21.9764 1.23875L22.4498 -0.184581C21.3217 -0.559804 20.1405 -0.750725 18.9516 -0.749998L18.9525 0.750002ZM21.9755 1.23846L29.1118 3.62179L29.587 2.19904L22.4507 -0.18429L21.9755 1.23846ZM29.1127 3.62209C30.2408 3.99731 31.422 4.18823 32.6109 4.1875L32.61 2.6875C31.5823 2.68813 30.5612 2.5231 29.5861 2.19875L29.1127 3.62209ZM32.6104 4.1875L35.5758 4.1875L35.5758 2.6875L32.6104 2.6875L32.6104 4.1875ZM12.0267 26.5313C12.4138 26.5313 12.7521 26.7524 12.9592 27.1308C13.1698 27.5155 13.2022 27.9957 13.0111 28.3964L14.3651 29.0419C14.7837 28.1639 14.6935 27.1751 14.275 26.4106C13.853 25.6397 13.0558 25.0313 12.0267 25.0313L12.0267 26.5313ZM13.0107 28.3973C11.868 30.8023 11.2771 33.4323 11.2813 36.0949L12.7812 36.0926C12.7774 33.6534 13.3187 31.2442 14.3655 29.041L13.0107 28.3973ZM11.2812 36.0938C11.2812 37.6602 11.9035 39.1625 13.0112 40.2701L14.0718 39.2094C13.2455 38.3831 12.7812 37.2624 12.7812 36.0938L11.2812 36.0938ZM13.0112 40.2701C14.1188 41.3777 15.6211 42 17.1875 42L17.1875 40.5C16.0189 40.5 14.8981 40.0358 14.0718 39.2094L13.0112 40.2701ZM17.1875 42C17.8423 42 18.4702 41.7399 18.9332 41.2769L17.8725 40.2163C17.6908 40.3979 17.4444 40.5 17.1875 40.5L17.1875 42ZM18.9332 41.2769C19.3962 40.8139 19.6562 40.186 19.6562 39.5312L18.1562 39.5312C18.1562 39.7882 18.0542 40.0346 17.8725 40.2163L18.9332 41.2769ZM19.6562 39.5312L19.6562 38.0806L18.1562 38.0806L18.1562 39.5312L19.6562 39.5312ZM19.6562 38.0806C19.6562 36.8636 19.8899 35.6584 20.3409 34.5266L18.9474 33.9713C18.4268 35.2779 18.1562 36.6714 18.1562 38.0806L19.6562 38.0806ZM20.3405 34.5275C20.952 32.9989 22.2307 31.8083 23.7848 30.9807L23.0798 29.6568C21.3201 30.5938 19.7297 32.0157 18.9478 33.9704L20.3405 34.5275ZM23.7854 30.9804C26.4211 29.574 28.7342 27.6329 30.5768 25.2813L29.3961 24.3562C27.6823 26.5434 25.5308 28.3489 23.0792 29.6571L23.7854 30.9804ZM30.5763 25.282C31.6134 23.9617 33.0815 23.0938 34.6431 23.0938L34.6431 21.5938C32.5106 21.5938 30.642 22.77 29.3967 24.3555L30.5763 25.282ZM34.6431 23.0938L35.5231 23.0938L35.5231 21.5938L34.6431 21.5938L34.6431 23.0938ZM12.0267 26.5313L17.0729 26.5313L17.0729 25.0313L12.0267 25.0313L12.0267 26.5313ZM34.8404 3.58459C34.878 3.77277 34.9427 3.94709 35.0163 4.10076L36.3691 3.45258C36.3373 3.38625 36.3195 3.3314 36.3113 3.29042L34.8404 3.58459ZM35.0203 4.10894C36.3293 6.75769 37.0625 9.73796 37.0625 12.8906L38.5625 12.8906C38.5625 9.50288 37.7741 6.29565 36.3651 3.4444L35.0203 4.10894ZM37.0625 12.8906C37.0625 16.176 36.2674 19.2733 34.857 21.9991L36.1892 22.6884C37.7076 19.7538 38.5625 16.4207 38.5625 12.8906L37.0625 12.8906ZM36.3101 3.28462C36.2167 2.83627 36.5471 2.46875 36.8935 2.46875L36.8935 0.968752C35.4433 0.968752 34.5866 2.36581 34.8416 3.59039L36.3101 3.28462ZM36.8935 2.46875L38.9744 2.46875L38.9744 0.968752L36.8935 0.968752L36.8935 2.46875ZM38.9744 2.46875C40.7381 2.46875 42.2943 3.49102 42.7761 5.07236L44.211 4.63515C43.5057 2.32065 41.2852 0.968752 38.9744 0.968752L38.9744 2.46875ZM42.7762 5.07282C43.5317 7.54631 43.9375 10.1698 43.9375 12.8906L45.4375 12.8906C45.4375 10.0198 45.0092 7.24869 44.2108 4.63469L42.7762 5.07282ZM43.9375 12.8906C43.9375 16.3538 43.2798 19.6593 42.0852 22.6947L43.481 23.244C44.7431 20.0369 45.4375 16.5453 45.4375 12.8906L43.9375 12.8906ZM42.0857 22.6936C41.5149 24.1373 40.0367 25.0313 38.3877 25.0313L38.3877 26.5313C40.5521 26.5313 42.6488 25.349 43.4806 23.2451L42.0857 22.6936ZM38.3877 25.0313L35.9746 25.0313L35.9746 26.5313L38.3877 26.5313L38.3877 25.0313ZM35.9746 25.0313C35.7565 25.0313 35.5666 24.9094 35.4537 24.6878C35.3379 24.4608 35.3375 24.1887 35.47 23.9702L34.1875 23.1924C33.367 24.5452 34.2252 26.5313 35.9746 26.5313L35.9746 25.0313ZM35.4697 23.9707C35.7244 23.5515 35.9644 23.1237 36.1895 22.6879L34.8568 21.9996C34.6476 22.4046 34.4244 22.8023 34.1878 23.1918L35.4697 23.9707Z",
                  stroke: "rgba(0,0,0,1)",
                  fillRule: "nonzero",
                  strokeLinejoin: "round",
                  strokeWidth: 1,
                },
              ]}
              display="block"
              gap="unset"
              alignItems="unset"
              justifyContent="unset"
              position="absolute"
              top="16.67%"
              bottom="8.33%"
              left="9.37%"
              right="9.38%"
            ></Icon>
          </View>

          <View className="thumb-container2">
            <Icon
              width="33.52px"
              height="30.94px"
              viewBox={{
                minX: 0,
                minY: 0,
                width: 42.25003433227539,
                height: 39,
              }}
              paths={[
                {
                  d: "M9.49651 17.125C9.08229 17.125 8.74651 17.4608 8.74651 17.875C8.74651 18.2892 9.08229 18.625 9.49651 18.625L9.49651 17.125ZM13.897 15.535L14.4868 15.9983L14.4873 15.9977L13.897 15.535ZM20.0958 10.335L19.744 9.67263L19.7429 9.67324L20.0958 10.335ZM23.6773 6.61917L22.981 6.3405L22.9808 6.3411L23.6773 6.61917ZM24.375 2.9965L23.625 2.9965L23.625 2.99663L24.375 2.9965ZM26 0L26 -0.75L26 0ZM29.3085 11.8473L29.9855 12.1701L29.986 12.1691L29.3085 11.8473ZM42.1027 18.3408L42.8484 18.2613L42.8484 18.2612L42.1027 18.3408ZM42.25 21.125L41.5 21.125L41.5 21.1261L42.25 21.125ZM36.5105 37.4205L35.9268 36.9496L35.9263 36.9502L36.5105 37.4205ZM21.2485 38.5017L21.0109 39.213L21.0127 39.2136L21.2485 38.5017ZM14.5015 36.2483L14.7391 35.537L14.7382 35.5367L14.5015 36.2483ZM11.4183 35.75L11.4183 36.5L11.4188 36.5L11.4183 35.75ZM7.91701 35.75L7.91701 35C7.66758 35 7.43448 35.124 7.29508 35.3308C7.15567 35.5377 7.12822 35.8003 7.22183 36.0315L7.91701 35.75ZM26 13.875C25.5858 13.875 25.25 14.2108 25.25 14.625C25.25 15.0392 25.5858 15.375 26 15.375L26 13.875ZM8.50201 37.0543L7.82915 37.3856L7.82918 37.3857L8.50201 37.0543ZM1.12884 36.036L0.411404 36.2546L0.411407 36.2546L1.12884 36.036ZM8.11383e-06 28.4375L0.750008 28.4381L0.750008 28.4375L8.11383e-06 28.4375ZM1.80051 18.9085L1.10304 18.6328L1.10261 18.6339L1.80051 18.9085ZM9.32317 18.33L9.96416 18.7194L9.96447 18.7189L9.32317 18.33ZM6.50217 28.4375L7.25218 28.4375L7.25217 28.4363L6.50217 28.4375ZM7.91917 35.75L7.91917 36.5C8.16861 36.5 8.40173 36.376 8.54113 36.1691C8.68052 35.9623 8.70796 35.6997 8.61433 35.4685L7.91917 35.75ZM9.49651 18.625C11.5286 18.625 13.3039 17.5042 14.4868 15.9983L13.3072 15.0717C12.3321 16.3131 10.9571 17.125 9.49651 17.125L9.49651 18.625ZM14.4873 15.9977C16.1048 13.934 18.1353 12.2307 20.4488 10.9968L19.7429 9.67324C17.2451 11.0054 15.053 12.8443 13.3067 15.0723L14.4873 15.9977ZM20.4476 10.9974C22.1178 10.1103 23.6323 8.75493 24.3739 6.89723L22.9808 6.3411C22.4094 7.7724 21.2068 8.8957 19.744 9.67263L20.4476 10.9974ZM24.3736 6.89783C24.8702 5.65704 25.1252 4.33283 25.125 2.99637L23.625 2.99663C23.6252 4.14209 23.4066 5.27704 22.981 6.3405L24.3736 6.89783ZM25.125 2.9965L25.125 1.625L23.625 1.625L23.625 2.9965L25.125 2.9965ZM25.125 1.625C25.125 1.39294 25.2172 1.17038 25.3813 1.00628L24.3206 -0.0543788C23.8752 0.39102 23.625 0.99511 23.625 1.625L25.125 1.625ZM25.3813 1.00628C25.5454 0.842187 25.7679 0.75 26 0.75L26 -0.75C25.3701 -0.75 24.766 -0.499778 24.3206 -0.0543788L25.3813 1.00628ZM26 0.75C27.094 0.75 28.1432 1.1846 28.9168 1.95818L29.9775 0.897524C28.9226 -0.157368 27.4918 -0.75 26 -0.75L26 0.75ZM28.9168 1.95818C29.6904 2.73177 30.125 3.78098 30.125 4.875L31.625 4.875C31.625 3.38316 31.0324 1.95242 29.9775 0.897524L28.9168 1.95818ZM30.125 4.875C30.125 7.25704 29.5876 9.51121 28.631 11.5256L29.986 12.1691C31.0357 9.95846 31.625 7.48496 31.625 4.875L30.125 4.875ZM28.6315 11.5246C28.2296 12.3677 28.3165 13.3164 28.7178 14.0496C29.1226 14.7892 29.8889 15.375 30.8793 15.375L30.8793 13.875C30.5308 13.875 30.2235 13.6765 30.0336 13.3294C29.8401 12.9761 29.8111 12.5359 29.9855 12.1701L28.6315 11.5246ZM30.8793 15.375L37.6523 15.375L37.6523 13.875L30.8793 13.875L30.8793 15.375ZM37.6523 15.375C39.5628 15.375 41.1685 16.656 41.3569 18.4205L42.8484 18.2612C42.5645 15.6013 40.1879 13.875 37.6523 13.875L37.6523 15.375ZM41.3569 18.4204C41.4516 19.3082 41.5 20.209 41.5 21.125L43 21.125C43 20.156 42.9488 19.2021 42.8484 18.2613L41.3569 18.4204ZM41.5 21.1261C41.5087 26.8832 39.5414 32.4688 35.9268 36.9496L37.0942 37.8914C40.9245 33.1432 43.0092 27.2244 43 21.1239L41.5 21.1261ZM35.9263 36.9502C35.2479 37.7929 34.1788 38.25 33.033 38.25L33.033 39.75C34.5652 39.75 36.0917 39.1368 37.0947 37.8908L35.9263 36.9502ZM33.033 38.25L24.3317 38.25L24.3317 39.75L33.033 39.75L33.033 38.25ZM24.3317 38.25C23.3658 38.25 22.4032 38.094 21.4843 37.7897L21.0127 39.2136C22.0828 39.568 23.2046 39.75 24.3317 39.75L24.3317 38.25ZM21.4861 37.7903L14.7391 35.537L14.2639 36.9597L21.0109 39.213L21.4861 37.7903ZM14.7382 35.5367C13.6674 35.1806 12.5463 34.9994 11.4179 35L11.4188 36.5C12.386 36.4994 13.347 36.6548 14.2648 36.96L14.7382 35.5367ZM11.4183 35L7.91701 35L7.91701 36.5L11.4183 36.5L11.4183 35ZM30.8793 13.875L26 13.875L26 15.375L30.8793 15.375L30.8793 13.875ZM7.22183 36.0315C7.40879 36.4932 7.6113 36.9432 7.82915 37.3856L9.17486 36.723C8.97238 36.3118 8.78489 35.8951 8.61219 35.4685L7.22183 36.0315ZM7.82918 37.3857C7.92364 37.5775 7.90866 37.8002 7.80592 37.98C7.70582 38.1551 7.54828 38.25 7.36884 38.25L7.36884 39.75C8.95831 39.75 9.81559 38.024 9.17483 36.723L7.82918 37.3857ZM7.36884 38.25L5.40151 38.25L5.40151 39.75L7.36884 39.75L7.36884 38.25ZM5.40151 38.25C3.74888 38.25 2.29574 37.2925 1.84627 35.8174L0.411407 36.2546C1.08427 38.4629 3.2018 39.75 5.40151 39.75L5.40151 38.25ZM1.84628 35.8174C1.11749 33.4255 0.748032 30.9386 0.750008 28.4381L-0.749992 28.4369C-0.752084 31.0859 -0.360682 33.7206 0.411404 36.2546L1.84628 35.8174ZM0.750008 28.4375C0.750008 25.1684 1.37086 22.0483 2.49841 19.1832L1.10261 18.6339C-0.0925108 21.6707 -0.749992 24.9769 -0.749992 28.4375L0.750008 28.4375ZM2.49798 19.1842C3.0304 17.8375 4.41101 17 5.95834 17L5.95834 15.5C3.89601 15.5 1.89661 16.6255 1.10304 18.6328L2.49798 19.1842ZM5.95834 17L8.23984 17L8.23984 15.5L5.95834 15.5L5.95834 17ZM8.23984 17C8.42844 17 8.595 17.1045 8.69592 17.3024C8.79956 17.5057 8.79912 17.7478 8.68188 17.9411L9.96447 18.7189C10.7543 17.4165 9.93023 15.5 8.23984 15.5L8.23984 17ZM8.68218 17.9406C6.7601 21.1045 5.74638 24.7367 5.75218 28.4387L7.25217 28.4363C7.24681 25.0098 8.1851 21.6479 9.96416 18.7194L8.68218 17.9406ZM5.75217 28.4375C5.75217 31.1224 6.27401 33.6858 7.22402 36.0315L8.61433 35.4685C7.73568 33.2989 7.25217 30.9266 7.25217 28.4375L5.75217 28.4375ZM7.91917 35L7.91701 35L7.91701 36.5L7.91917 36.5L7.91917 35Z",
                  stroke: "rgba(0,0,0,1)",
                  fillRule: "nonzero",
                  strokeLinejoin: "round",
                  strokeWidth: 1,
                },
              ]}
              display="block"
              gap="unset"
              alignItems="unset"
              justifyContent="unset"
              position="absolute"
              top="8.33%"
              bottom="16.67%"
              left="9.37%"
              right="9.37%"
            ></Icon>
          </View>
          {image ? (
            <Image className="post-img" src={image}></Image>
          ) : (
            //src={Post?.outfitimage}
            //src="https://cdn.discordapp.com/attachments/1120152118272213053/1201614916788965536/IMG_5675.jpg?ex=65dceb19&is=65ca7619&hm=277e5088a148d22bbb7935216d52437d827a889d0d6e4e7dded8eeb7a4af1336&"
            //src="https://images.unsplash.com/photo-1707879487614-72b421e4393f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8"

            <div>No More Posts, Check back later!</div>
          )}

          <MyIcon
            className="more-icon"
            type="more_vert"
            onClick={toggleActionCenter}
          />

          <Flex
            gap="22px"
            direction="column"
            width="unset"
            height="unset"
            justifyContent="center"
            alignItems="center"
            position="absolute"
            top="457px"
            left="190px"
            padding="0px 0px 0px 0px"
          >
            <Icon
              className="profile-picture"
              width="51px"
              height="51px"
              viewBox={{ minX: 0, minY: 0, width: 68, height: 68 }}
              paths={[
                {
                  d: "M65 34C65 51.1208 51.1208 65 34 65L34 71C54.4345 71 71 54.4345 71 34L65 34ZM34 65C16.8792 65 3 51.1208 3 34L-3 34C-3 54.4345 13.5655 71 34 71L34 65ZM3 34C3 16.8792 16.8792 3 34 3L34 -3C13.5655 -3 -3 13.5655 -3 34L3 34ZM34 3C51.1208 3 65 16.8792 65 34L71 34C71 13.5655 54.4345 -3 34 -3L34 3Z",
                  stroke: "rgba(0,0,0,0.5)",
                  fillRule: "nonzero",
                  strokeWidth: 3,
                },
                {
                  d: "M68 34C68 52.7777 52.7777 68 34 68C15.2223 68 0 52.7777 0 34C0 15.2223 15.2223 0 34 0C52.7777 0 68 15.2223 68 34Z",
                  fillRule: "nonzero",
                },
              ]}
              display="block"
              gap="unset"
              alignItems="unset"
              justifyContent="unset"
              shrink="0"
              position="relative"
              //src={Post?.userphoto}
              src="https://cdn.discordapp.com/attachments/1120152118272213053/1200211293995544636/IMG_5670.jpg?ex=65d7cfdf&is=65c55adf&hm=d848327c70636c5c7e10ae24e3e8ae877f0b7c12c4d1c38da5b74c577d30b384&"
            ></Icon>
            <Text
              className="username-text"
              //children={Post?.username}
              children={"Test User"}
            ></Text>
          </Flex>

          <MyIcon
            className="chat-icon"
            type="chat"
            onClick={handleCommentsExpansionClick}
          ></MyIcon>

          <Button
            className="green-button"
            onClick={handleGreenButtonClick}
            whilehover={{ x: [-2, 2, -2, 2, 0], transition: { duration: 0.3 } }}
            whiletap={{}}
            size="default"
            isDisabled={false}
            variation="default"
            //onClick={() => setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)}
          ></Button>

          <Button
            className="red-button"
            onClick={handleRedButtonClick}
            whilehover={{ x: [-2, 2, -2, 2, 0], transition: { duration: 0.3 } }}
            whiletap={{}}
            size="default"
            isDisabled={false}
            variation="default"
            //onClick={() => setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)}
          ></Button>
        </motion.View>
      </View>

      {showComment && (
        <motion.View
          className="comment-container"
          initial={{ x: "25vw" }}
          animate={{ x: 0 }}
        >
          <motion.Text
            initial={{ x: "100vw" }}
            animate={{ x: 0 }}
            className="header-text"
          >
            Comments
          </motion.Text>
          <Flex className="text-field-container">
            <TextField
              width="253px"
              height="unset"
              placeholder="Add a comment...."
              shrink="0"
              boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
              size="default"
              isDisabled={false}
              labelHidden={false}
              variation="default"
              value={comment}
              onChange={onChangeHandler}
              style={{ color: "white" }}
            ></TextField>
            <MyIcon
              width="33px"
              height="33px"
              display="block"
              gap="unset"
              alignItems="unset"
              justifyContent="unset"
              overflow="hidden"
              shrink="0"
              position="relative"
              padding="0px 0px 0px 0px"
              type="send"
              onClick={onClickHandler}
              style={{ cursor: "pointer" }}
            ></MyIcon>
          </Flex>
          <View
            className="icon-container"
            width="40px"
            height="40px"
            display="block"
            gap="unset"
            alignItems="unset"
            justifyContent="unset"
            overflow="hidden"
            position="absolute"
            top="28px"
            left="292px"
            padding="0px 0px 0px 0px"
          >
            <Icon
              width="22.5px"
              height="25px"
              viewBox={{ minX: 0, minY: 0, width: 22.5, height: 25 }}
              paths={[
                {
                  d: "M23.2071 0.707107C23.5976 0.316583 23.5976 -0.316583 23.2071 -0.707107C22.8166 -1.09763 22.1834 -1.09763 21.7929 -0.707107L23.2071 0.707107ZM10 12.5L9.29289 11.7929C8.90237 12.1834 8.90237 12.8166 9.29289 13.2071L10 12.5ZM21.7929 25.7071C22.1834 26.0976 22.8166 26.0976 23.2071 25.7071C23.5976 25.3166 23.5976 24.6834 23.2071 24.2929L21.7929 25.7071ZM13.2071 0.707107C13.5976 0.316583 13.5976 -0.316583 13.2071 -0.707107C12.8166 -1.09763 12.1834 -1.09763 11.7929 -0.707107L13.2071 0.707107ZM0 12.5L-0.707107 11.7929C-1.09763 12.1834 -1.09763 12.8166 -0.707107 13.2071L0 12.5ZM11.7929 25.7071C12.1834 26.0976 12.8166 26.0976 13.2071 25.7071C13.5976 25.3166 13.5976 24.6834 13.2071 24.2929L11.7929 25.7071ZM21.7929 -0.707107L9.29289 11.7929L10.7071 13.2071L23.2071 0.707107L21.7929 -0.707107ZM9.29289 13.2071L21.7929 25.7071L23.2071 24.2929L10.7071 11.7929L9.29289 13.2071ZM11.7929 -0.707107L-0.707107 11.7929L0.707107 13.2071L13.2071 0.707107L11.7929 -0.707107ZM-0.707107 13.2071L11.7929 25.7071L13.2071 24.2929L0.707107 11.7929L-0.707107 13.2071Z",
                  stroke: "rgba(255,255,255,1)",
                  fillRule: "nonzero",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                },
              ]}
              display="block"
              gap="unset"
              alignItems="unset"
              justifyContent="unset"
              position="absolute"
              top="18.75%"
              bottom="18.75%"
              left="21.88%"
              right="21.88%"
            ></Icon>
          </View>
          <View
            width="280px"
            height="310px"
            display="block"
            gap="unset"
            alignItems="unset"
            justifyContent="unset"
            overflow="auto" // Set overflow to "auto" for scrollbars only when needed
            position="absolute"
            top="50px"
            left="0px"
            padding="0px 0px 0px 0px"
          >
            {commentsText.map((text, index) => {
              // Calculate the top position dynamically based on the height of previous cards
              const topPosition =
                index === 0
                  ? 11
                  : comments
                      .slice(0, index)
                      .reduce(
                        (acc, curr) => acc + (curr.length > 50 ? 90 : 60),
                        11
                      ); // Adjust the height accordingly
              return (
                <Card
                  key={index}
                  width="240px"
                  height="auto"
                  position="absolute"
                  display="flex"
                  backgroundColor="rgba(70,70,70,1)"
                  top={`${topPosition}px`}
                  left="10px"
                  borderRadius="25px"
                  variation="outline"
                  style={{ margin: 10, display: "flex", alignItems: "center" }}
                >
                  <Text
                    color="rgba(255,255,255,1)"
                    style={{ fontSize: 12, margin: 2, wordBreak: "break-word" }}
                  >
                    {text}
                  </Text>
                  <Icon
                    width="22.5px"
                    height="25px"
                    viewBox={{ minX: 0, minY: 0, width: 22.5, height: 25 }}
                    position="absolute"
                    left="210px"
                    style={{ cursor: "pointer" }} // Add cursor: pointer style
                    onClick={() => handleIconClick((index = { index }))} // Call the handler function on icon click
                    paths={[
                      {
                        d: "m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
                        stroke: "rgba(255,255,255,1)",
                        fillRule: "nonzero",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                      },
                    ]}
                  ></Icon>
                </Card>
              );
            })}
          </View>
        </motion.View>
      )}
    </Flex>
  );
};

export default FriendsOnlyPage;
