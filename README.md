# Automation Framework for Cypress with cucumber integration 
Automation test repository for UI automation tests.

Page object model is followed, where all tests are present under **cypress/integration** and page objects are in **cypress/support**

## Prerequisites
Make sure you have installed all of the following prerequisites on your development machine:
* Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager. If you encounter any problems, you can also use this [GitHub Gist](https://gist.github.com/isaacs/579814) to install Node.js.

## Installation
A step by step series of examples that tell you how to get a development env running.
Use node package manager to install [Cypress](https://docs.cypress.io/guides/getting-started/installing-cypress.html#System-requirements), or direct download [Cypress](https://www.cypress.io/)

![installing-cli](https://user-images.githubusercontent.com/78784343/107340471-d21a6e00-6ae3-11eb-8c22-24995a566928.gif)

## Test Execution
1. This command will execute all available tests:
```npm run test```

## Individual Test Execution
1. This command will execute individual test:
```npm run test -- --spec "cypress/integration/contactForm.feature"```

## Test Execution through UI
1. This command will open Cypress GUI:
```npm run cypress:open```

## Reports
1. Open mochawesome.html in browser to view test report - ./mochawesome-report/mochawesome.html
2. Screenshot and videos under ./cypress folder

### Note
You can change site url in baseUrl parameter from cypress.json
1. Use this command:
```npm run test -- --config baseUrl=http://localhost:PORT```