import { gql  } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      name
      born
      bookCount
      id
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

export const ALL_BOOKS_IN_GENRE = gql`
  query allInGenre($genre: String!) {
    allBooks(
      genre: $genre  
    ) {
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
export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const FAVOURITE = gql`
    query {
      me {
        favoriteGenre
      }
    }
`