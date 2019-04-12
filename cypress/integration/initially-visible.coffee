{ viewportH, boxH } = require '../support/vars'
context 'Initially visible story', ->

	beforeEach -> 
		cy.viewport 800, 800
		cy.visit 'iframe.html?id=examples--initially-visible'

	it 'is initially visible', -> 
		cy.checkState 
			in:    true
			above: false
			below: false
	
	it 'is not fully visible after 1px of scroll', -> 
		cy.scroll 1
		cy.checkState 
			in:    true
			above: true
			below: false
	
	it 'is still not fully visible after 10px of scroll', -> 
		cy.scroll 10
		cy.checkState 
			in:    true
			above: true
			below: false
	
	it 'is hidden after scrolling the box height (200px)', -> 
		cy.scroll boxH
		cy.checkState 
			in:    false
			above: true
			below: false
		
