{ viewportH, boxH } = require '../support/vars'
context 'Scroll to reveal story', ->

	beforeEach -> 
		cy.viewport 800, viewportH
		cy.visit 'iframe.html?id=examples--scroll-to-reveal'

	it 'is initially hidden', -> 
		cy.checkState 
			in:    false
			above: false
			below: true
	
	it 'is visible after 1px of scroll', -> 
		cy.scroll 1
		cy.checkState 
			in:    true
			above: false
			below: true
	
	it 'is fully visible after scrolling the box height (200px)', -> 
		cy.scroll boxH
		cy.checkState 
			in:    true
			above: false
			below: false
	
	it 'is still fully visible after scrolling 100vh', -> 
		cy.scroll viewportH
		cy.checkState 
			in:    true
			above: false
			below: false
	
	it 'is still no longer fully visible after 1 more px of scroll', -> 
		cy.scroll viewportH + 1
		cy.checkState 
			in:    true
			above: true
			below: false
	
	it 'is fully hidden after scrolling 100vh plus box height', -> 
		cy.scroll viewportH + boxH
		cy.checkState 
			in:    false
			above: true
			below: false
