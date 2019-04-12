{ viewportH, boxH } = require '../support/vars'
context 'Trigger late story', ->

	beforeEach -> 
		cy.viewport 800, viewportH
		cy.visit 'iframe.html?id=examples--trigger-late-px'

	it 'is initially hidden', -> 
		cy.checkState 
			in:   false
			above: false
			below: true
	
	it 'is not visible after 1px of scroll', -> 
		cy.scroll 1
		cy.checkState 
			in:   false
			above: false
			below: true
	
	it 'becomes visible after 20px of scroll', -> 
		cy.scroll 20
		cy.checkState 
			in:   true
			above: false
			below: true
	
	it 'becomes fully visible after 220px of scroll', -> 
		cy.scroll boxH + 20
		cy.checkState 
			in:   true
			above: false
			below: false
		