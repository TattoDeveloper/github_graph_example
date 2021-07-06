import { gql } from '@apollo/client'

export const GET_REPOSITORIES = gql`
    query GetRepositories($login: String!) {  
      user(login: $login){
        name,
        repositories(first: 50, isFork: false) {
           nodes {
              id,
              name
              url,
              viewerHasStarred,
              isPrivate,
              primaryLanguage{
                name
              },
            }
        }
      }
    }
`; 