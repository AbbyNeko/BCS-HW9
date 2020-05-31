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
            message: "How do you use this project?",
            name: "usage"
        }, {
            message: "How would users contribute to the project?",
            name: "contributing"
        }, {
            message: "How do you test this project?",
            name: "testing"
        }
    ]).then(function(answers) {

        let readMeContents = createReadMeContents(answers);

        writeFileAsync("./output/README.md", readMeContents).then(function() {
            console.log("Success");
        }).catch(err => console.error(err));

    });

    function createReadMeContents({ githubuser, projectname, purpose, installation, techused, usage, contributing, testing }) {

        //Create project name and Purpose of project
        let fileContents = `# ${projectname}\n${purpose}\n\n`;

        //Creates Table of Contents
        fileContents += `##Table of Contents\n`;

        //If installation question is answered with N/A, no installation section wil be added and it will not be in table of contents
        if(installation != 'N/A') {
        fileContents += `* Installation\n* Usage\n* Technologies Used\n* License\n* Contributing\n* Tests\n* Questions`;
        fileContents += `## Installation\n${installation}\n\n`;
        } else {
            //Creating table of contents without Installation section
            fileContents += `* Usage\n* Built With\n* License\n* Contributing\n* Tests\n* Questions`;
            fileContents += `\n\n`;
        }    

        //Creates bulleted list of Tech Used
        let techArr = techused.split(',');

        fileContents += `## Usage\n${usage}\n\n## Built With\n`; 
        
        techArr.forEach(element => fileContents += `* ${element}\n`);

        //Licensing
        fileContents += `\n## License\n[MIT](https://choosealicense.com/licenses/mit/)`;

        //Contributing Section
        fileContents += `\n## Contributing\n`;

        //Tests Section
        fileContents += `\n## Tests\n`;

        //Questions Section
        fileContents += `\n## Questions\n`;


        return fileContents;

    }