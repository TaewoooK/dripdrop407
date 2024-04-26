/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateDoublePointsTime = /* GraphQL */ `
  subscription OnCreateDoublePointsTime(
    $filter: ModelSubscriptionDoublePointsTimeFilterInput
  ) {
    onCreateDoublePointsTime(filter: $filter) {
      id
      date
      startTime
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateDoublePointsTime = /* GraphQL */ `
  subscription OnUpdateDoublePointsTime(
    $filter: ModelSubscriptionDoublePointsTimeFilterInput
  ) {
    onUpdateDoublePointsTime(filter: $filter) {
      id
      date
      startTime
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteDoublePointsTime = /* GraphQL */ `
  subscription OnDeleteDoublePointsTime(
    $filter: ModelSubscriptionDoublePointsTimeFilterInput
  ) {
    onDeleteDoublePointsTime(filter: $filter) {
      id
      date
      startTime
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreatePrivacy = /* GraphQL */ `
  subscription OnCreatePrivacy($filter: ModelSubscriptionPrivacyFilterInput) {
    onCreatePrivacy(filter: $filter) {
      id
      Username
      Private
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdatePrivacy = /* GraphQL */ `
  subscription OnUpdatePrivacy($filter: ModelSubscriptionPrivacyFilterInput) {
    onUpdatePrivacy(filter: $filter) {
      id
      Username
      Private
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeletePrivacy = /* GraphQL */ `
  subscription OnDeletePrivacy($filter: ModelSubscriptionPrivacyFilterInput) {
    onDeletePrivacy(filter: $filter) {
      id
      Username
      Private
      createdAt
      updatedAt
      __typename
    }
  }
`;
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
      actionedUsers
      tags
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
      actionedUsers
      tags
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
      actionedUsers
      tags
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
        actionedUsers
        tags
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
        actionedUsers
        tags
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
        actionedUsers
        tags
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
export const onCreateSavedPosts = /* GraphQL */ `
  subscription OnCreateSavedPosts(
    $filter: ModelSubscriptionSavedPostsFilterInput
  ) {
    onCreateSavedPosts(filter: $filter) {
      id
      username
      postIds
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateSavedPosts = /* GraphQL */ `
  subscription OnUpdateSavedPosts(
    $filter: ModelSubscriptionSavedPostsFilterInput
  ) {
    onUpdateSavedPosts(filter: $filter) {
      id
      username
      postIds
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteSavedPosts = /* GraphQL */ `
  subscription OnDeleteSavedPosts(
    $filter: ModelSubscriptionSavedPostsFilterInput
  ) {
    onDeleteSavedPosts(filter: $filter) {
      id
      username
      postIds
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateNotifications = /* GraphQL */ `
  subscription OnCreateNotifications(
    $filter: ModelSubscriptionNotificationsFilterInput
  ) {
    onCreateNotifications(filter: $filter) {
      id
      username
      notificationsList
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateNotifications = /* GraphQL */ `
  subscription OnUpdateNotifications(
    $filter: ModelSubscriptionNotificationsFilterInput
  ) {
    onUpdateNotifications(filter: $filter) {
      id
      username
      notificationsList
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteNotifications = /* GraphQL */ `
  subscription OnDeleteNotifications(
    $filter: ModelSubscriptionNotificationsFilterInput
  ) {
    onDeleteNotifications(filter: $filter) {
      id
      username
      notificationsList
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateBattle = /* GraphQL */ `
  subscription OnCreateBattle($filter: ModelSubscriptionBattleFilterInput) {
    onCreateBattle(filter: $filter) {
      id
      Player1
      Player2
      Player1Status
      Player2Status
      Player1Score
      Player2Score
      Player1ImageKey
      Player2ImageKey
      createdAt
      actionedUsers
      updatedAt
      __typename
    }
  }
`;
export const onUpdateBattle = /* GraphQL */ `
  subscription OnUpdateBattle($filter: ModelSubscriptionBattleFilterInput) {
    onUpdateBattle(filter: $filter) {
      id
      Player1
      Player2
      Player1Status
      Player2Status
      Player1Score
      Player2Score
      Player1ImageKey
      Player2ImageKey
      createdAt
      actionedUsers
      updatedAt
      __typename
    }
  }
`;
export const onDeleteBattle = /* GraphQL */ `
  subscription OnDeleteBattle($filter: ModelSubscriptionBattleFilterInput) {
    onDeleteBattle(filter: $filter) {
      id
      Player1
      Player2
      Player1Status
      Player2Status
      Player1Score
      Player2Score
      Player1ImageKey
      Player2ImageKey
      createdAt
      actionedUsers
      updatedAt
      __typename
    }
  }
`;
