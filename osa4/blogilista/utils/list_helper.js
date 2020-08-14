var lodash = require('lodash');

const blog = require("../models/blog")

const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
  
}

const favouriteBlog = (blogs) => {

    /* var favourite = 
      {
        "title": "null",
        "author": "null",
        "likes": -9999
      }

    console.log(favourite) */

    const favourite = blogs.reduce(function(prev, current) {
      return (prev.likes > current.likes) 
        ? prev 
        : current
    })

    /* const title = favourite.title
    const author = favourite.author
    const likes = favourite.likes

    const x = {
      title,
      author,
      likes
    } */

    return favourite
    

    /* var favourite = blogs.reduce(function(a, b) {

      return Math.max(a, b);
    }); */
    
    /* for (var i = 0; i < blogs.lenght; i++) {
      if (blogs[i].likes > favourite.likes) {
        favourite = blogs[i]
        console.log(favourite)
        console.log(blogs[i])
      }
    } */


  
}

const mostBlogs = (blogs) => {

  const authors = blogs.map(blog => blog.author)
  const tmp1 = authors.map(a => lodash.countBy(authors, lodash.matches(a)))
  const tmp2 = tmp1.map(i => i.true)

  const mostWritenIndex = tmp2.indexOf(Math.max(...tmp2))
  const numberOfBlogs = Math.max(...tmp2)
  const mostWriten = `\{"author":"${authors[mostWritenIndex]}", "blogs":${numberOfBlogs}\}`
  //return authors[popularIndex]
  return JSON.parse(mostWriten)
  /* var numberOfBlogs = 0
  tmp2.map(a => )



  for (var i = 0; i < authors.lenght; i++) {
    if (tmp2[i] > numberOfBlogs) {
      numberOfBlogs = tmp2[1]
      popularAuthor = authors[i]
      popularIndex = i
    }
  }
 */
  //blogs.map(blog => console.log(blog.author))
  //authors.map(a => console.log(a))

  /* var mostpopular = [['', -1]]

  for (var i = 0; i < authors.lenght; i++) {
    count = authors.filter(n => n == authors[0]).length
    console.log('Nimi ',authors[0], ' on mukana ', count, ' kertaa')
    if (count > mostpopular[0][1]) {
      mostpopular[0][0] = authors[0]
      mostpopular[0][1] = count
    }
  } */

  //array.filter((v) => (v === value)).length;
  //return mostpopular[0][0]
  //return popularAuthor



}

  
  module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
  }