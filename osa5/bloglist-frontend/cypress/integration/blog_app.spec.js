describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Testi Testaaja',
      username: 'testaaja',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testaaja')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
  
      cy.contains('Testi Testaaja logged in')

      //cy.get('#logout-button').click()
    })
  
    it('fails with wrong credentials', function() {
      cy.get('#username').type('testaaja')
      cy.get('#password').type('asdsa')
      cy.get('#login-button').click()
      cy.get('.error')
        .should('contain', 'login error!')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
  
      cy.get('html').should('not.contain', 'Testi Testaaja logged in')
    })
  })
  
  describe('When logged in', function() {
    beforeEach(function() {
      /* cy.get('#username').type('testaaja')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click() */
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'testaaja', password: 'salainen'
      }).then(response => {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
    })
  })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('cypress automation')
      cy.get('#url').type('cypress')
      cy.contains('create').click()

      cy.contains('a blog created by cypress cypress automation')
    })

    it('A blog can be liked', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('cypress automation')
      cy.get('#url').type('cypress')
      cy.contains('create').click()

      cy.contains('show info').click()
      cy.get('#like-button').click()
      cy.contains('show info').click()
      
      cy.contains('likes 1')
    })

    it('A blog can be deleted by user who added it', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('cypress automation')
      cy.get('#url').type('cypress')
      cy.contains('create').click()

      cy.contains('a blog created by cypress cypress automation')
      cy.visit('http://localhost:3000')
      cy.contains('show info').click()
      cy.get('#delete-button').click()

      cy.get('html').should('not.contain', 'a blog created by cypress')
    })

  it('A blog can not be deleted by user who has not created it', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('cypress automation')
      cy.get('#url').type('cypress')
      cy.contains('create').click()


      cy.contains('a blog created by cypress cypress automation')


      cy.get('#logout-button').click()
      const otherUser = {
        name: 'Temp User',
        username: 'other',
        password: 'salainen'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', otherUser)
      cy.visit('http://localhost:3000')

      cy.get('#username').type('other')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Temp User logged in')
      cy.contains('show info').click()
      cy.get('html').should('not.contain', '#delete-button')

  })

    it('blogs are always shown in order of likes', function() {
      cy.createBlog({
        title: 'third',
        author: 'cypres automation',
        url: 'cypress',
        likes: 1
      })

      cy.createBlog({
        title: 'first',
        author: 'cypres automation',
        url: 'cypress',
        likes: 5
      })

      cy.createBlog({
        title: 'second',
        author: 'cypres automation',
        url: 'cypress',
        likes: 4
      })



      /* cy.contains('new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('cypress automation')
      cy.get('#url').type('cypress')
      cy.contains('create').click()
      cy.contains('a blog created by cypress cypress automation')
      
      cy.wait(5000)
      cy.contains('new blog').click()
      cy.get('#title').type('another blog created by cypress')
      cy.get('#author').type('cypress automation')
      cy.get('#url').type('cypress')
      cy.contains('create').click()
      cy.contains('another blog created by cypress')
      
      cy.wait(5000)
      cy.contains('new blog').click()
      cy.get('#title').type('yet another blog created by cypress')
      cy.get('#author').type('cypress automation')
      cy.get('#url').type('cypress')
      cy.contains('create').click()
      cy.contains('yet another blog created by cypress cypress automation') */


      cy.get('.blog').then( blogs => {
        console.log('number of blogs', blogs.length)
        //cy.wrap(buttons[0]).click()
        cy.wrap(blogs[0]).contains('show info').click()
        //cy.get('#like-button').click()
        cy.wrap(blogs[1]).contains('show info').click()
        //cy.get('#like-button').click()
        cy.wrap(blogs[2]).contains('show info').click()
        //cy.get('#like-button').click()
        cy.wrap(blogs[0]).contains('first')
        cy.wrap(blogs[0]).contains('likes 5')
        cy.wrap(blogs[1]).contains('second')
        cy.wrap(blogs[1]).contains('likes 4')
        cy.wrap(blogs[2]).contains('third')
        cy.wrap(blogs[2]).contains('likes 1')

      })

      cy.contains('new blog').click()
      cy.get('#title').type('new blog')
      cy.get('#author').type('cypress automation')
      cy.get('#url').type('cypress')
      cy.contains('create').click()
      cy.contains('new blog')
      cy.wait(5000)

      cy.get('.blog').then( blogs => {
        cy.wrap(blogs[3]).contains('new blog')
        cy.wrap(blogs[3]).contains('show info').click()
        cy.wrap(blogs[3]).contains('likes 0').click()
        cy.wrap(blogs[3]).contains('like').click()
      })

      cy.get('.blog').then( blogs => {
        cy.wrap(blogs[3]).contains('new blog')
        cy.wrap(blogs[3]).contains('show info').click()
        cy.wrap(blogs[3]).contains('likes 1').click()
        cy.wrap(blogs[3]).contains('like').click()
      })

      cy.get('.blog').then( blogs => {
        cy.wrap(blogs[3]).contains('third')
        cy.wrap(blogs[3]).contains('show info').click()
        cy.wrap(blogs[3]).contains('likes 1').click()
        cy.wrap(blogs[2]).contains('new blog')
        cy.wrap(blogs[2]).contains('show info').click()
        cy.wrap(blogs[2]).contains('likes 2').click()
      })


    })


  })
})