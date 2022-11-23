/// <reference types="cypress" />
require('cypress-xpath');

describe('Login to Contollo app with admin role for creating nodes and list, and set permissions to users', () => {

    beforeEach(() => {
        cy.fixture("users").then(function(testusers) {
            this.testusers = testusers
        })
        cy.fixture("nodes").then(function(testnodes) {
            this.testnodes = testnodes
        })
        cy.visit(Cypress.config('baseUrl'))
    })

    it('Crete nodes with a user with the admin role and set permissions', function () {
        cy.xpath('.//*[contains(@placeholder, "Username")]').type(this.testusers.user[0].email)
        cy.xpath('.//*[contains(@placeholder, "Password")]').type(this.testusers.user[0].password)
        cy.xpath('//a[@type="submit"]').click()
         //Click menu
        cy.xpath('//i[@class="ft-menu font-medium-3"]').click().then((response) => {
        //Click Enterprise Manager
            cy.xpath('.//*[text()="Enterprise Manager"]').click()
            //Click Data Manager
            cy.xpath('.//*[text()="Data Manager"]').click().then((response) => { 
                var sizeOfNodes = this.testnodes.nodes
                for(let i=0; i<sizeOfNodes.length; i++){
                    cy.wait(1000);
                    if((i) != (sizeOfNodes.length)){
                        cy.xpath('//button[contains(text(),"Add")]').click()
                        var nodeName = this.testnodes.nodes[i].nodeName
                        var parentType = this.testnodes.nodes[i].parentType
                        var sizeOfList = Object.keys(this.testnodes.nodes[i].list.columns)
                        cy.wait(1000)
                        cy.xpath('//div//input[@name="name" and @class="dx-texteditor-input"]').eq(i).type(nodeName)
                        cy.get('.dx-template-wrapper > .dx-show-invalid-badge > .dx-dropdowneditor-input-wrapper > .dx-texteditor-container > .dx-texteditor-buttons-container > .dx-button-normal > .dx-button-content > .dx-dropdowneditor-icon').click()
                        cy.xpath("//div[contains(text(),'"+ parentType +"')]").click()
                        cy.xpath('.//*[contains(text(),"Add node")]').click()
                        cy.xpath('//button[contains(text(),"New list")]').click()
                        //Add list Name
                        var listName = this.testnodes.nodes[i].list.name
                        cy.xpath('//body/div[2]/div[1]/div[1]/dx-form[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/dxi-tab[1]/div[1]/div[1]/dx-form[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]').type(listName)
                        for(let k=0;k<sizeOfList.length;k++){
                            var fieldName = this.testnodes.nodes[i].list.columns[k].name
                            var fieldType = this.testnodes.nodes[i].list.columns[k].type
                            cy.get('.ng-star-inserted > .dx-show-invalid-badge > .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').eq(k).type(fieldName)
                            cy.get('.mb-1 > .dx-dropdowneditor-input-wrapper > .dx-texteditor-container > .dx-texteditor-buttons-container > .dx-button-normal > .dx-button-content > .dx-dropdowneditor-icon').eq(k).click()
                            cy.xpath("//div[contains(text(),'"+ fieldType +"')]").click()
                            if((k + 1) != (sizeOfList.length)){
                                cy.xpath('//span[contains(text(),"New Field")]').click()
                            } else {
                                cy.get('.dx-popup-wrapper > .dx-popup-draggable > .dx-toolbar > .dx-toolbar-items-container > .dx-toolbar-after > :nth-child(2) > .ng-star-inserted > .dx-button > .dx-button-content').click()
                            }
                        }
                        cy.wait(2000);
                        cy.xpath("//span[contains(text(), '"+ nodeName +"')]").rightclick()
                        cy.xpath('//span[contains(text(),"Set permissions")]').eq(i).click()
                        cy.xpath('//span[contains(text(),"Permissions")]').eq(0).click()
                        cy.wait(3000)
                        if(i>0){
                            cy.get('[text="Select All"] > .dx-checkbox-container > .dx-checkbox-icon').click()
                        }
                        cy.get('[text="Select All"] > .dx-checkbox-container > .dx-checkbox-icon').click()
                        cy.wait(1000)
                        cy.xpath('//span[contains(text(),"Save")]').eq(2).click()

                        //Another permission
                        cy.xpath('//span[contains(text(),"Permissions")]').eq(1).click()
                        cy.wait(3000)
                        cy.get('[text="Select All"] > .dx-checkbox-container > .dx-checkbox-icon').click()
                        cy.wait(2000)
                        cy.get('[text="Select All"] > .dx-checkbox-container > .dx-checkbox-icon').click()
                        cy.wait(2000)
                        cy.xpath('//span[contains(text(),"Save")]').eq(2).click()
                        cy.xpath('//i[@class="dx-icon dx-icon-close"]').eq(0).click()
                    }
                    else {
                        cy.log("Test Finished")
                    }
                }
            })    
        })
    })
})