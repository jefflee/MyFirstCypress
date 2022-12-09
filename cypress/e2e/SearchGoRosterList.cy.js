/// <reference types="cypress" />

let pageSize = 5000;
let targetName = 'JeffLee';

describe('Go Roster', () => {
    it('Search', () => {
        for (let k = 1; k <= 8; k++) {
            cy.visit(`http://www.weiqi.org.tw/RosterList.asp?RosterLevel=${k}`);
            cy.visit(`http://www.weiqi.org.tw/RosterList.asp?nowPage=1&pagesize=${pageSize}&RosterLevel=${k}`);
            let page = 1
            Search(cy, k, page);
        }
    });
    function Search(cy, level, page) {
        cy.get('body')
            .then($body => {
                if ($body.html().includes(targetName)) {
                    cy.contains(targetName);
                    var r = `====== **Found ${targetName} in level=${level}, page=${page}** ======`;
                    cy.log(r);
                } else {
                    cy.log(`Not found in level ${level}, page=${page}`);
                }
                if ($body.html().includes('下一頁')) {
                    cy.visit(`http://www.weiqi.org.tw/RosterList.asp?nowPage=${page + 1}&pagesize=${pageSize}&RosterLevel=${level}`);
                    Search(cy, level, page + 1);
                }
            });
    };
})

