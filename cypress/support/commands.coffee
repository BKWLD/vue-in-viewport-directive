# Check the state of the Box component
Cypress.Commands.add 'checkState', (state) ->
	for key,val of state
		klass = "#{key}-viewport"
		if val
		then cy.get('.box').should 'have.class', klass
		else cy.get('.box').should 'not.have.class', klass
	return

# Scroll the storybook ifrmae
Cypress.Commands.add 'scroll', (y) ->
	cy.get('.viewport').scrollTo(0,y)
