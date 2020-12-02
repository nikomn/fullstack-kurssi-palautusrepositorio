const config = require('./utils/config')
const jwt = require('jsonwebtoken')

const { ApolloServer, UserInputError, gql, AuthenticationError } = require('apollo-server')

const uuid = require('uuid')
//const { uuid: uuidv1 } = require('uuid');

const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const author = require('./models/author')
const User = require('./models/user')

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

mongoose.set('useFindAndModify', false)

const MONGODB_URI = process.env.MONGODB_URI

mongoose.set('useCreateIndex', true)

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]


const typeDefs = gql`
    type Book {
        title: String!
        published: Int!
        author: String!
        genres: [String!]!
        id: ID!
        }  
    
    type Author {
        name: String!
        born: Int
        bookCount: Int!
        id: ID!
    }

    type User {
      username: String!
      favoriteGenre: String!
      id: ID!
    }
    
    type Token {
      value: String!
    }

    
    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        countBooksByAuthor: Int!
        findAuthor(name: String!): Author!
        allAuthors: [Author!]
        me: User
      }

      type Mutation {
        addBook(
          title: String!
          author: String!
          published: Int
          genres: [String!]!
        ): Book
        editAuthor(
            name: String!
            setBornTo: Int!
        ): Author
        createUser(
          username: String!
          favoriteGenre: String!
        ): User
        login(
          username: String!
          password: String!
        ): Token
      }  
`

const resolvers = {
  Query: {
    //bookCount: () => books.length,
    me: (root, args, context) => {
      return context.currentUser
    },
    bookCount: () => Book.collection.countDocuments(),
    //authorCount: () => authors.length,
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => {
        // kaikki kyselyt (paitsi kyselyn allBooks parametri author) 
        // sekä mutaatiot toimivat.
        if (args.author !== undefined) {
            if (args.genre !== undefined) {
                return books.filter(b => b.author === args.author).filter(q => q.genres.includes(args.genre))
            } else {
                return books.filter(b => b.author === args.author)
            }
        } else if (args.genre !== undefined) {
            //return books.filter(b => b.genres.includes(args.genre))
            return Book.find( { genres: { $in: [ args.genre ] } } )
        } else {
            //return books
            return Book.find({})
        }

    },
    //allAuthors:() => authors,
    allAuthors: () => Author.find({}),
    findAuthor: (root, args) => Author.findOne({ name: args.name }),
    /* countBooksByAuthor: (root, args) => {
        //const b = books.find(p => p.author === args.name)
        const a = Author.findOne( { name: root.name })
        const b = Book.find( { author: a.id})
        return b.length
        //return 0
        } */
    },
    Author: {
        bookCount: async (root) => {
          //const b = books.filter(p => p.author === root.name)
          //const b = Book.find( { author: root.name } )
          //const as = Author.find({})
          //console.log('root on', root.name)
          //const a = await Author.findOne( { name: root.name })
          //const person = await Person.findOne({ name: args.name })
          //console.log('a on:', a)
          const b = await Book.find( { author: root._id })
          //console.log('Books by author: ', root.name)
          //console.log(b.length)
          return b.length
          //return 0
        }
      },
      Mutation: {
        //addBook: (root, args) => {
          addBook: async (root, args, context) => {
          const currentUser = context.currentUser
          if (!currentUser) {
            throw new AuthenticationError("not authenticated")
          }
          //const authorId = null
          const bookExists = await Book.findOne({ title: args.title })
          //const t = args.title
          //const await x = Book.findOne( { title: t} )
          //console.log('tmp', tmp)
          //if (books.find(b => b.title === args.title)) {
          if (bookExists) {
            throw new UserInputError('Book title must be unique', {
              invalidArgs: args.title,
            })
          }
          const authorExists = await Author.findOne({ name: args.author })
          //if (!authors.find(a => a.name === args.author)) {
          if (!authorExists) {
            //const author = { name: args.author, id: uuid.v1() }
            const author = new Author({ name: args.author })
            try {
              await author.save()
            } catch (error) {
              // 8.15 Tietokanta, osa 3?
              throw new UserInputError(error.message, {
                invalidArgs: args,
              })
            }

            //authors = authors.concat(author)

          } 

          //const authorId = authors.find(a => a.name == args.author).id
          //const authorId = await Author.findOne({ name: args.author })._id
          const authorId = await Author.findOne({ name: args.author })
          //console.log('authorId', authorId)
          //const book = { ...args, id: uuid.v1() }
          const book = new Book({ title: args.title, published: args.published, author: authorId._id, genres: args.genres })
          //books = books.concat(book)
          try {
            await book.save()
          } catch (error) {
            // 8.15 Tietokanta, osa 3?
            throw new UserInputError(error.message, {
              invalidArgs: args,
            })
          }
          return book
        },
        editAuthor: async (root, args, context) => {
            const currentUser = context.currentUser
            if (!currentUser) {
              throw new AuthenticationError("not authenticated")
            }
            const author = await Author.findOne({ name: args.name })
            //const author = authors.find(a => a.name === args.name)
            if (!author) {
              return null
            }
            author.born = args.setBornTo

            try {
              await author.save()
            } catch (error) {
              throw new UserInputError(error.message, {
                invalidArgs: args,
              })
            }
        
            //const updatedAuthor = { ...author, born: args.setBornTo }
            //authors = authors.map(a => a.name === args.name ? updatedAuthor : a)
            //return updatedAuthor
            return author
          },
          createUser: (root, args) => {
            const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
        
            return user.save()
              .catch(error => {
                throw new UserInputError(error.message, {
                  invalidArgs: args,
                })
              })
          },
          login: async (root, args) => {
            const user = await User.findOne({ username: args.username })
        
            if ( !user || args.password !== 'secret' ) {
              throw new UserInputError("wrong credentials")
            }
        
            const userForToken = {
              username: user.username,
              id: user._id,
            }
        
            return { value: jwt.sign(userForToken, JWT_SECRET) }
          },   
      },
        
}


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)  //.populate('favouriteGenre')
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})