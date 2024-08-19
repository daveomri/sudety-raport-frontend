import { gql } from '@apollo/client';

export const LOAD_POSTS_PREVIEW = gql`
    query($categorySlug: String!) {
      posts(first: 5, where: { categoryName: $categorySlug}) {
        edges {
          node {
            id
            title
            excerpt
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