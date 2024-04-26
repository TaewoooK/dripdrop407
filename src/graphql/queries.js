/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getDoublePointsTime = /* GraphQL */ `
  query GetDoublePointsTime($id: ID!) {
    getDoublePointsTime(id: $id) {
      id
      date
      startTime
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listDoublePointsTimes = /* GraphQL */ `
  query ListDoublePointsTimes(
    $filter: ModelDoublePointsTimeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDoublePointsTimes(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        date
        startTime
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getPrivacy = /* GraphQL */ `
  query GetPrivacy($id: ID!) {
    getPrivacy(id: $id) {
      id
      Username
      Private
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listPrivacies = /* GraphQL */ `
  query ListPrivacies(
    $filter: ModelPrivacyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPrivacies(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        Username
        Private
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getFriendRequest = /* GraphQL */ `
  query GetFriendRequest($id: ID!) {
    getFriendRequest(id: $id) {
      id
      Username
      SenderUsername
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listFriendRequests = /* GraphQL */ `
  query ListFriendRequests(
    $filter: ModelFriendRequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFriendRequests(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        Username
        SenderUsername
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getFriend = /* GraphQL */ `
  query GetFriend($id: ID!) {
    getFriend(id: $id) {
      id
      Username
      FriendUsername
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listFriends = /* GraphQL */ `
  query ListFriends(
    $filter: ModelFriendFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFriends(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        Username
        FriendUsername
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
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
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
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
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        postId
        text
        commentAuthorId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const commentsByPostId = /* GraphQL */ `
  query CommentsByPostId(
    $postId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    commentsByPostId(
      postId: $postId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        postId
        text
        commentAuthorId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getPostReport = /* GraphQL */ `
  query GetPostReport($id: ID!) {
    getPostReport(id: $id) {
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
export const listPostReports = /* GraphQL */ `
  query ListPostReports(
    $filter: ModelPostReportFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostReports(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        reporter
        reason
        sentAt
        postId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getSavedPosts = /* GraphQL */ `
  query GetSavedPosts($id: ID!) {
    getSavedPosts(id: $id) {
      id
      username
      postIds
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listSavedPosts = /* GraphQL */ `
  query ListSavedPosts(
    $filter: ModelSavedPostsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSavedPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        postIds
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getNotifications = /* GraphQL */ `
  query GetNotifications($id: ID!) {
    getNotifications(id: $id) {
      id
      username
      notificationsList
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listNotifications = /* GraphQL */ `
  query ListNotifications(
    $filter: ModelNotificationsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotifications(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        notificationsList
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getBattle = /* GraphQL */ `
  query GetBattle($id: ID!) {
    getBattle(id: $id) {
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
      updatedAt
      __typename
    }
  }
`;
export const listBattles = /* GraphQL */ `
  query ListBattles(
    $filter: ModelBattleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBattles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
