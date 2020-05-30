const inquirer = require("inquirer");
const fs = require('fs');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);

inquirer
    .prompt([
        {
            message: "What is your GitHub username?",
            name: "githubuser"
        }, {
            message: "What is the name of your project?",
            name: "projectname"
        }, {
            message: "Describe the purpose of this project.",
            name: "purpose"
        }, {
            message: "How do you install this project? If this question does not apply, reply with 'N/A'.",
            name: "installation"
        }, {
            message: "What are the technologies used? Please list them out and separate them out using commas.",
            name: "techused"
        }, {
            message: "How would a user use this project?",
            name: "usage"
        }
    ]).then(function({ githubuser, projectname, purpose, installation, techused, usage }) {

        const fileContents = `Test`;

        writeFileAsync("./output/README.md", fileContents).then(function() {
            console.log("Success");
        }).catch(err => console.error(err));

    });