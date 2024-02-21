/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      owner
      description
      comments
      drip_points
      createdAt
      enable_comments
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
        comments
        drip_points
        createdAt
        enable_comments
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
