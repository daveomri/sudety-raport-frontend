import { gql } from '@apollo/client';

export const LOAD_POSTS_PREVIEW = gql`
    query($categorySlug: String!) {
      posts(first: 5, where: { categoryName: $categorySlug}) {
        edges {
          node {
            id
            title
            excerpt
            slug
            translations {
              title
            }
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
      }
    }
`;

export const LOAD_SECTION_POSTS = gql`
    query($categorySlug: String!, $numberOfPosts: Int!, $lastPoint: String) {
      posts(first: $numberOfPosts, after: $lastPoint, where: { categoryName: $categorySlug}) {
        edges {
          node {
            id
            title
            excerpt
            slug
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
      }
    }
`;

export const LOAD_POST_BY_SLUG = gql`
query($postSlug: String!) {
    post(id: $postSlug, idType: SLUG) {
	  id
    title
    content
    date
    dateGmt
    link
    status
    slug
    uri
    language {
      locale
      name
      slug
    }
    translations {
      id
      slug
    }
    featuredImage {
      node {
        id
        altText
        link
        mediaItemUrl
        sourceUrl
      }
    }
    author {
      node {
        id
        email
        description
        firstName
        lastName
        locale
        name
        nickname
        uri
        url
        slug
        username
      }
    }
	}
}`;