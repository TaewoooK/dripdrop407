/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateFriendRequest = /* GraphQL */ `
  subscription OnCreateFriendRequest(
    $filter: ModelSubscriptionFriendRequestFilterInput
  ) {
    onCreateFriendRequest(filter: $filter) {
      id
      Username
      SenderUsername
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateFriendRequest = /* GraphQL */ `
  subscription OnUpdateFriendRequest(
    $filter: ModelSubscriptionFriendRequestFilterInput
  ) {
    onUpdateFriendRequest(filter: $filter) {
      id
      Username
      SenderUsername
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteFriendRequest = /* GraphQL */ `
  subscription OnDeleteFriendRequest(
    $filter: ModelSubscriptionFriendRequestFilterInput
  ) {
    onDeleteFriendRequest(filter: $filter) {
      id
      Username
      SenderUsername
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateFriend = /* GraphQL */ `
  subscription OnCreateFriend($filter: ModelSubscriptionFriendFilterInput) {
    onCreateFriend(filter: $filter) {
      id
      Username
      FriendUsername
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateFriend = /* GraphQL */ `
  subscription OnUpdateFriend($filter: ModelSubscriptionFriendFilterInput) {
    onUpdateFriend(filter: $filter) {
      id
      Username
      FriendUsername
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteFriend = /* GraphQL */ `
  subscription OnDeleteFriend($filter: ModelSubscriptionFriendFilterInput) {
    onDeleteFriend(filter: $filter) {
      id
      Username
      FriendUsername
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost($filter: ModelSubscriptionPostFilterInput) {
    onCreatePost(filter: $filter) {
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
      updatedAt
      __typename
    }
  }
`;
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost($filter: ModelSubscriptionPostFilterInput) {
    onUpdatePost(filter: $filter) {
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
      updatedAt
      __typename
    }
  }
`;
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost($filter: ModelSubscriptionPostFilterInput) {
    onDeletePost(filter: $filter) {
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
      updatedAt
      __typename
    }
  }
`;
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment($filter: ModelSubscriptionCommentFilterInput) {
    onCreateComment(filter: $filter) {
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
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment($filter: ModelSubscriptionCommentFilterInput) {
    onUpdateComment(filter: $filter) {
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
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment($filter: ModelSubscriptionCommentFilterInput) {
    onDeleteComment(filter: $filter) {
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
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreatePostReport = /* GraphQL */ `
  subscription OnCreatePostReport(
    $filter: ModelSubscriptionPostReportFilterInput
  ) {
    onCreatePostReport(filter: $filter) {
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
export const onUpdatePostReport = /* GraphQL */ `
  subscription OnUpdatePostReport(
    $filter: ModelSubscriptionPostReportFilterInput
  ) {
    onUpdatePostReport(filter: $filter) {
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
export const onDeletePostReport = /* GraphQL */ `
  subscription OnDeletePostReport(
    $filter: ModelSubscriptionPostReportFilterInput
  ) {
    onDeletePostReport(filter: $filter) {
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
