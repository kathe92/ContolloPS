/// <reference types="cypress" />
require('cypress-xpath');

describe('View Nodes', () => {

    beforeEach(() => {
        cy.fixture("users").then(function(testusers) {
            this.testusers = testusers
        })
        cy.fixture("nodes").then(function(testnodes) {
            this.testnodes = testnodes
        })
        cy.visit(Cypress.config('baseUrl'))
    })

    it('Login to olonyltest user and visualize a node', function () {
        cy.xpath('.//*[contains(@placeholder, "Username")]').type(this.testusers.user[1].email)
        cy.xpath('.//*[contains(@placeholder, "Password")]').type(this.testusers.user[1].password)
        cy.xpath('//a[@type="submit"]').click()
        var userName = this.testusers.user[1].userName
        //Click menu
        cy.xpath('//i[@class="ft-menu font-medium-3"]').click().then((response) => {
            //Click Enterprise Manager
            cy.xpath('.//*[text()="Enterprise Manager"]').click()
            //Click Data Manager
            cy.xpath('.//*[text()="Data Manager"]').click().then((response) => {
                var sizeOfNodes = this.testnodes.nodes
                for(let i=0; i<sizeOfNodes.length; i++){
                    cy.wait(1000);
                    var nodeName = this.testnodes.nodes[i].nodeName
                    if(cy.xpath("//span[contains(text(),'"+ nodeName +"')]").should('be.visible')){
                        cy.log("The node: '"+ nodeName + "' can be visualized by the user: '"+ userName + "'")
                    } else {
                        cy.log("The node: '"+ nodeName + "' can't be visualized by the user: '"+ userName + "'")
                    }
                }
            })
        })
    })
    it('Login to kathqa user and visualize a node', function () {
        cy.xpath('.//*[contains(@placeholder, "Username")]').type(this.testusers.user[2].email)
        cy.xpath('.//*[contains(@placeholder, "Password")]').type(this.testusers.user[2].password)
        cy.xpath('//a[@type="submit"]').click()
        var userName = this.testusers.user[2].userName
        //Click menu
        cy.xpath('//i[@class="ft-menu font-medium-3"]').click().then((response) => {
            //Click Enterprise Manager
            cy.xpath('.//*[text()="Enterprise Manager"]').click()
            //Click Data Manager
            cy.xpath('.//*[text()="Data Manager"]').click().then((response) => {
                var sizeOfNodes = this.testnodes.nodes
                for(let i=0; i<sizeOfNodes.length; i++){
                    cy.wait(1000);
                    var nodeName = this.testnodes.nodes[i].nodeName
                    if(cy.xpath("//span[contains(text(),'"+ nodeName +"')]").should('be.visible')){
                        cy.log("The node: '"+ nodeName + "' can be visualized by the user: '"+ userName + "'")
                    } else {
                        cy.log("The node: '"+ nodeName + "' can't be visualized by the user: '"+ userName + "'")
                    }
                }
            })
        })
    })
})