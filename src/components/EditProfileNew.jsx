/* eslint-disable */
import * as React from "react";
import { useState, useContext } from "react";
import { Button, Flex, Image, Text, TextField, CheckboxField } from "@aws-amplify/ui-react";
import { updateUserAttribute, deleteUser } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
import { UserContext } from './../UserContext';
import { listPosts, listComments, listFriends, listFriendRequests } from "../graphql/queries";
import { deletePost, deleteComment, deleteFriend, deleteFriendRequest } from "../graphql/mutations";
import { remove } from "aws-amplify/storage"

const client = generateClient();

export default function EditProfileNew(props) {
  const { onClickEvent } = props;
  const [prefUsername, setPrefUsername] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [gender, setGender] = useState(null);
  const [showMakeSure, setShowMakeSure] = useState(false);
  const { allUsers, myUser } = useContext(UserContext);

  async function handleSetAttribute(useStateFunc, value) {
    if (value == "") {
      useStateFunc(null);
    } else {
      useStateFunc(value);
    }
  }

  async function handleDeleteAccount() {
    try {
      handleDeletePosts()
      handleDeleteComments()
      handleDeleteFriends()
      handleDeleteFriendRequests()

      await deleteUser();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeletePosts() {
      const postFetchVariables = {
        filter: {
          owner: {
            eq: myUser.username
          }
        },
        limit: 10
      }
      let userPosts = await client.graphql({
        query: listPosts,
        variables: postFetchVariables
      });
      while (userPosts.data.listPosts.items.length > 0) {
        let userPostsArr = userPosts.data.listPosts.items
        for (let i = 0; i < userPostsArr.length; i++) {
          const post = userPostsArr[i]
          const deletePostInput = {
            input: {
              id: post.id
            }
          }
          console.log(i)
          console.log(deletePostInput)
          await remove({
            key: post.postImageKey
          })
          const deletedPost = await client.graphql({
            query: deletePost,
            variables: deletePostInput
          })
        }
        userPosts = await client.graphql({
          query: listPosts,
          variables: postFetchVariables
        });
      }
  }

  async function handleDeleteComments() {
    const commentFetchVariables = {
      filter: {
        commentAuthorId: {
          eq: myUser.username
        }
      },
      limit: 10
    }
    let userComments = await client.graphql({
      query: listComments,
      variables: commentFetchVariables
    });
    console.log(userComments)
    while (userComments.data.listComments.items.length > 0) {
      let userCommentsArr = userComments.data.listComments.items
      for (let i = 0; i < userCommentsArr.length; i++) {
        const comment = userCommentsArr[i]
        const deleteCommentInput = {
          input: {
            id: comment.id
          }
        }
        console.log(i)
        console.log(deleteCommentInput)
        const deletedComment = await client.graphql({
          query: deleteComment,
          variables: deleteCommentInput
        })
      }
      userComments = await client.graphql({
        query: listComments,
        variables: commentFetchVariables
      });
    }
  }

  async function handleDeleteFriends() {
    const friendFetchVariables = {
      filter: {
        or: [{ Username: { eq: myUser.username} }, { FriendUsername: { eq: myUser.username} }]
      },
      limit: 10
    };
    let userFriends = await client.graphql({
      query: listFriends,
      variables: friendFetchVariables
    });
    while (userFriends.data.listFriends.items.length > 0) {
        let userFriendsArr = userFriends.data.listFriends.items
        for (let i = 0; i < userFriendsArr.length; i++) {
          const friend = userFriendsArr[i]
          const deleteFriendInput = {
            input: {
              id: friend.id
            }
          }
          console.log(i)
          console.log(deleteFriendInput)
          const deletedFriend = await client.graphql({
            query: deleteFriend,
            variables: deleteFriendInput
          })
        }
        userFriends = await client.graphql({
          query: listFriends,
          variables: friendFetchVariables
        });
    }
  }

  async function handleDeleteFriendRequests() {
    const friendReqFetchVariables = {
      filter: {
        or: [{ Username: { eq: myUser.username} }, { SenderUsername: { eq: myUser.username} }]
      },
      limit: 10
    };
    let userFriendReqs = await client.graphql({
      query: listFriendRequests,
      variables: friendReqFetchVariables
    });
    while (userFriendReqs.data.listFriendRequests.items.length > 0) {
        let userFriendReqArr = userFriendReqs.data.listFriendRequests.items
        for (let i = 0; i < userFriendReqArr.length; i++) {
          const friendReq = userFriendReqArr[i]
          const deleteFriendReqInput = {
            input: {
              id: friendReq.id
            }
          }
          console.log(i)
          console.log(deleteFriendReqInput)
          const deletedFriend = await client.graphql({
            query: deleteFriendRequest,
            variables: deleteFriendReqInput
          })
        }
        userFriendReqs = await client.graphql({
          query: listFriendRequests,
          variables: friendReqFetchVariables
        });
    }
  }

  async function handleClick() {
    console.log("NEW PREFUSER: " + prefUsername);
    console.log("NEW FIRST NAME: " + firstName);
    console.log("NEW LAST NAME: " + lastName);
    console.log("NEW GENDER: " + gender);
    if (prefUsername) {
      await handleUpdateUserAttribute("preferred_username", prefUsername);
    }
    if (firstName) {
      await handleUpdateUserAttribute("name", firstName);
    }
    if (lastName) {
      await handleUpdateUserAttribute("family_name", lastName);
    }
    if (gender) {
      await handleUpdateUserAttribute("gender", gender);
    }

    onClickEvent();
  }

  async function handleUpdateUserAttribute(attributeKey, value) {
    try {
      const output = await updateUserAttribute({
        userAttribute: {
          attributeKey,
          value,
        },
      });
      handleUpdateUserAttributeNextSteps(output);
    } catch (error) {
      console.log(error);
    }
  }

  function handleUpdateUserAttributeNextSteps(output) {
    const { nextStep } = output;

    switch (nextStep.updateAttributeStep) {
      case "CONFIRM_ATTRIBUTE_WITH_CODE":
        const codeDeliveryDetails = nextStep.codeDeliveryDetails;
        console.log(
          `Confirmation code was sent to ${codeDeliveryDetails?.deliveryMedium}.`
        );
        // Collect the confirmation code from the user and pass to confirmUserAttribute.
        break;
      case "DONE":
        console.log(`attribute was successfully updated.`);
        break;
    }
  }

  const handlePrivacyChange = (event) => {

  }

  return (
    <Flex
      gap="16px"
      direction="column"
      width="640px"
      height="unset"
      justifyContent="flex-start"
      alignItems="flex-start"
      position="relative"
      padding="0px 0px 0px 0px"
      backgroundColor="rgba(255,255,255,1)"
    >
      <Flex
        gap="24px"
        direction="column"
        width="unset"
        height="unset"
        justifyContent="flex-start"
        alignItems="flex-start"
        shrink="0"
        alignSelf="stretch"
        position="relative"
        padding="24px 24px 24px 24px"
      >
        <Flex
          gap="16px"
          direction="row"
          width="unset"
          height="unset"
          justifyContent="flex-start"
          alignItems="center"
          shrink="0"
          alignSelf="stretch"
          position="relative"
          padding="0px 0px 0px 0px"
        >
          <Text
            fontFamily="Inter"
            fontSize="16px"
            fontWeight="700"
            color="rgba(13,26,38,1)"
            lineHeight="20px"
            textAlign="left"
            display="block"
            direction="column"
            justifyContent="unset"
            width="unset"
            height="unset"
            gap="unset"
            alignItems="unset"
            shrink="0"
            position="relative"
            padding="0px 0px 0px 0px"
            whiteSpace="pre-wrap"
            children="Edit Profile"
          ></Text>
        </Flex>
        <Flex
          gap="16px"
          direction="row"
          width="unset"
          height="unset"
          justifyContent="flex-start"
          alignItems="center"
          shrink="0"
          alignSelf="stretch"
          position="relative"
          padding="0px 0px 0px 0px"
        >
          <Image
            width="96px"
            height="96px"
            display="block"
            gap="unset"
            alignItems="unset"
            justifyContent="unset"
            shrink="0"
            position="relative"
            borderRadius="160px"
            padding="0px 0px 0px 0px"
            objectFit="cover"
          ></Image>
        </Flex>
        <Flex
          gap="16px"
          direction="column"
          width="unset"
          height="unset"
          justifyContent="flex-start"
          alignItems="flex-start"
          shrink="0"
          alignSelf="stretch"
          position="relative"
          padding="0px 0px 0px 0px"
        >
          <TextField
            width="unset"
            height="unset"
            label="Preferred Username"
            placeholder=""
            shrink="0"
            alignSelf="stretch"
            size="default"
            style={{ color: "black" }}
            isDisabled={false}
            labelHidden={false}
            variation="default"
            onChange={(e) =>
              handleSetAttribute(setPrefUsername, e.currentTarget.value)
            }
          ></TextField>
          <TextField
            width="unset"
            height="unset"
            label="First Name"
            placeholder=""
            shrink="0"
            alignSelf="stretch"
            size="default"
            style={{ color: "black" }}
            isDisabled={false}
            labelHidden={false}
            variation="default"
            onChange={(e) =>
              handleSetAttribute(setFirstName, e.currentTarget.value)
            }
          ></TextField>
          <TextField
            width="unset"
            height="unset"
            label="Last Name"
            placeholder=""
            shrink="0"
            alignSelf="stretch"
            size="default"
            style={{ color: "black" }}
            isDisabled={false}
            labelHidden={false}
            variation="default"
            onChange={(e) =>
              handleSetAttribute(setLastName, e.currentTarget.value)
            }
          ></TextField>
          <TextField
            width="unset"
            height="unset"
            label="Gender"
            placeholder=""
            shrink="0"
            alignSelf="stretch"
            size="default"
            style={{ color: "black" }}
            isDisabled={false}
            labelHidden={false}
            variation="default"
            onChange={(e) =>
              handleSetAttribute(setGender, e.currentTarget.value)
            }
          ></TextField>
        </Flex>
        <CheckboxField label="Private" name="private" value="yes" onChange={(e) => console.log(e.currentTarget.checked)} />

        <div
          style={{ display: "flex", justifyContent: "center", gap: "370px" }}
        >
          <Button
            width="unset"
            height="unset"
            shrink="0"
            size="default"
            isDisabled={false}
            variation="primary"
            children="Save"
            onClick={handleClick}
          ></Button>
          <Button
            width="unset"
            height="unset"
            shrink="0"
            size="default"
            variation="secondary"
            children="Delete account"
            isDisabled={false}
            onClick={() => {
              setShowMakeSure(true);
            }}
          ></Button>
        </div>
        {showMakeSure && (
          <Button
            variation="destructive"
            isFullWidth={true}
            loadingText=""
            onClick={handleDeleteAccount}
          >
            CLICK TO DELETE ACCOUNT
          </Button>
        )}
      </Flex>
    </Flex>
  );
}
