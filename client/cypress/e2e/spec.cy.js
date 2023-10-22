describe('Blog app', function () {
  it('front page can be opened', function () {
    cy.visit('http://localhost:5000');
    cy.contains('login').click();
    cy.get('#Username').type('test@test.com');
    cy.get('#Password').type('secret', { force: true });
    cy.contains('button', 'login').click();
    cy.contains('lmd');
    cy.contains('econoCoder');
    cy.get('aside').trigger('mouseenter', { force: true });
    cy.wait(3000);
    cy.contains('Add new blog')
      .invoke('attr', 'isExpanded', true)
      .click({ force: true });
    cy.get('#title').type('a blog created by cypress');
    cy.get('#author').type('cypress');
    cy.get('#url').type('a blog created by cypress');
    cy.contains('Submit').click();
    cy.contains('a blog created by cypress')
      .parent()
      .find('button')
      .contains('View details')
      .click({ force: true });
    cy.contains('a blog created by cypress')
      .parent()
      .find('button')
      .contains('Like')
      .click();
    cy.contains('Likes: 1');
    cy.contains('a blog created by cypress')
      .parent()
      .find('button')
      .contains('Delete')
      .click();
    cy.contains('a blog created by cypress').should('not.exist');
  });
});
