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
  
      cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
  
  
    })
  })
})


