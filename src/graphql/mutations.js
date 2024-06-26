/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPrivacy = /* GraphQL */ `
  mutation CreatePrivacy(
    $input: CreatePrivacyInput!
    $condition: ModelPrivacyConditionInput
  ) {
    createPrivacy(input: $input, condition: $condition) {
      id
      Username
      Private
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updatePrivacy = /* GraphQL */ `
  mutation UpdatePrivacy(
    $input: UpdatePrivacyInput!
    $condition: ModelPrivacyConditionInput
  ) {
    updatePrivacy(input: $input, condition: $condition) {
      id
      Username
      Private
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deletePrivacy = /* GraphQL */ `
  mutation DeletePrivacy(
    $input: DeletePrivacyInput!
    $condition: ModelPrivacyConditionInput
  ) {
    deletePrivacy(input: $input, condition: $condition) {
      id
      Username
      Private
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createFriendRequest = /* GraphQL */ `
  mutation CreateFriendRequest(
    $input: CreateFriendRequestInput!
    $condition: ModelFriendRequestConditionInput
  ) {
    createFriendRequest(input: $input, condition: $condition) {
      id
      Username
      SenderUsername
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateFriendRequest = /* GraphQL */ `
  mutation UpdateFriendRequest(
    $input: UpdateFriendRequestInput!
    $condition: ModelFriendRequestConditionInput
  ) {
    updateFriendRequest(input: $input, condition: $condition) {
      id
      Username
      SenderUsername
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteFriendRequest = /* GraphQL */ `
  mutation DeleteFriendRequest(
    $input: DeleteFriendRequestInput!
    $condition: ModelFriendRequestConditionInput
  ) {
    deleteFriendRequest(input: $input, condition: $condition) {
      id
      Username
      SenderUsername
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createFriend = /* GraphQL */ `
  mutation CreateFriend(
    $input: CreateFriendInput!
    $condition: ModelFriendConditionInput
  ) {
    createFriend(input: $input, condition: $condition) {
      id
      Username
      FriendUsername
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateFriend = /* GraphQL */ `
  mutation UpdateFriend(
    $input: UpdateFriendInput!
    $condition: ModelFriendConditionInput
  ) {
    updateFriend(input: $input, condition: $condition) {
      id
      Username
      FriendUsername
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteFriend = /* GraphQL */ `
  mutation DeleteFriend(
    $input: DeleteFriendInput!
    $condition: ModelFriendConditionInput
  ) {
    deleteFriend(input: $input, condition: $condition) {
      id
      Username
      FriendUsername
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
      id
      owner
      description
      drip_points
      createdAt
      enable_comments
      postImageKey
      comments {
        nextToken
        __typename
      }
      hiddenPeople
      actionedUsers
      updatedAt
      __typename
    }
  }
`;
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
      id
      owner
      description
      drip_points
      createdAt
      enable_comments
      postImageKey
      comments {
        nextToken
        __typename
      }
      hiddenPeople
      actionedUsers
      updatedAt
      __typename
    }
  }
`;
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
      id
      owner
      description
      drip_points
      createdAt
      enable_comments
      postImageKey
      comments {
        nextToken
        __typename
      }
      hiddenPeople
      actionedUsers
      updatedAt
      __typename
    }
  }
`;
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
      id
      postId
      text
      commentAuthorId
      CommentsPost {
        id
        owner
        description
        drip_points
        createdAt
        enable_comments
        postImageKey
        hiddenPeople
        actionedUsers
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
      id
      postId
      text
      commentAuthorId
      CommentsPost {
        id
        owner
        description
        drip_points
        createdAt
        enable_comments
        postImageKey
        hiddenPeople
        actionedUsers
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
      id
      postId
      text
      commentAuthorId
      CommentsPost {
        id
        owner
        description
        drip_points
        createdAt
        enable_comments
        postImageKey
        hiddenPeople
        actionedUsers
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createPostReport = /* GraphQL */ `
  mutation CreatePostReport(
    $input: CreatePostReportInput!
    $condition: ModelPostReportConditionInput
  ) {
    createPostReport(input: $input, condition: $condition) {
      id
      reporter
      reason
      sentAt
      postId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updatePostReport = /* GraphQL */ `
  mutation UpdatePostReport(
    $input: UpdatePostReportInput!
    $condition: ModelPostReportConditionInput
  ) {
    updatePostReport(input: $input, condition: $condition) {
      id
      reporter
      reason
      sentAt
      postId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deletePostReport = /* GraphQL */ `
  mutation DeletePostReport(
    $input: DeletePostReportInput!
    $condition: ModelPostReportConditionInput
  ) {
    deletePostReport(input: $input, condition: $condition) {
      id
      reporter
      reason
      sentAt
      postId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createSavedPosts = /* GraphQL */ `
  mutation CreateSavedPosts(
    $input: CreateSavedPostsInput!
    $condition: ModelSavedPostsConditionInput
  ) {
    createSavedPosts(input: $input, condition: $condition) {
      id
      username
      postIds
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateSavedPosts = /* GraphQL */ `
  mutation UpdateSavedPosts(
    $input: UpdateSavedPostsInput!
    $condition: ModelSavedPostsConditionInput
  ) {
    updateSavedPosts(input: $input, condition: $condition) {
      id
      username
      postIds
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteSavedPosts = /* GraphQL */ `
  mutation DeleteSavedPosts(
    $input: DeleteSavedPostsInput!
    $condition: ModelSavedPostsConditionInput
  ) {
    deleteSavedPosts(input: $input, condition: $condition) {
      id
      username
      postIds
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createNotifications = /* GraphQL */ `
  mutation CreateNotifications(
    $input: CreateNotificationsInput!
    $condition: ModelNotificationsConditionInput
  ) {
    createNotifications(input: $input, condition: $condition) {
      id
      username
      notificationsList
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateNotifications = /* GraphQL */ `
  mutation UpdateNotifications(
    $input: UpdateNotificationsInput!
    $condition: ModelNotificationsConditionInput
  ) {
    updateNotifications(input: $input, condition: $condition) {
      id
      username
      notificationsList
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteNotifications = /* GraphQL */ `
  mutation DeleteNotifications(
    $input: DeleteNotificationsInput!
    $condition: ModelNotificationsConditionInput
  ) {
    deleteNotifications(input: $input, condition: $condition) {
      id
      username
      notificationsList
      createdAt
      updatedAt
      __typename
    }
  }
`;
