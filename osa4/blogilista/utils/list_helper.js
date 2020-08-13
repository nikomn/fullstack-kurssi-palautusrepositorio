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


  
  module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
  }