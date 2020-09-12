import { gql  } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks  {
      title
      author
      published
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $publishedInt: Int!, $genres: [String!]!) {
        addBook(
          title: $title,
          author: $author,
          published: $publishedInt,
          genres: $genres
        ) {
          title,
          author
        }
  }
`

export const UPDATE_AUTHOR = gql`
  mutation editAuthor($name: String!, $bornInt: Int!) {
        editAuthor(
          name: $name,
          setBornTo: $bornInt
        ) {
          name,
          born
        }
  }
`