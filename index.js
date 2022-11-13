// TODO: Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');
const generateMarkdown = require('./generator/generateMarkdown.js');


// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'name', 
        message: "Congrats, you're about make a GREAT README! Let's get started. First, write your full name:",
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('We can only make the README if YOU provide the ME! Give us a name.');
                return false;
            }
        }
    }, 
    
    {
        type: 'input',
        name: 'github', 
        message: "Enter your GitHub Username:",
        validate: gitHubInput => {
            if (gitHubInput) {
                return true;
            } else {
                console.log('Linking your GitHub repo is key to letting other users find your code and admire it!');
                return false;
            }
        }
    }, 

    {
        type: 'input',
        name: 'email', 
        message: "Enter your email address:",
        validate: emailInput => {
            if (emailInput) {
                return true;
            } else {
                console.log('Giving people your contact info can lead to more business opportunities.');
                return false;
            }
        }
    }, 

    {
        type: 'input',
        name: 'title', 
        message: "What's your project title?",
        validate: titleInput => {
            if (titleInput) {
                return true;
            } else {
                console.log('An untilted project is a sad project. Give it a name, please.');
                return false;
            }
        }
    }, 

    {
        type: 'input',
        name: 'description', 
        message: "Tell us about your project:",
        validate: descInput => {
            if (descInput) {
                return true;
            } else {
                console.log('If you\'re unsure about the description of your project, feel free to check out this project\'s README!');
                return false;
            }
        }
    }, 

    {
        type: 'input',
        name: 'installation', 
        message: "How should one install this project?",
        validate: installationInput => {
            if (installationInput) {
                return true;
            } else {
                console.log('Make sure your users know how to run your program!');
                return false;
            }
        }
    }, 

    {
        type: 'input',
        name: 'usage', 
        message: "Give instructions for usage:",
        validate: usageInput => {
            if (usageInput) {
                return true;
            } else {
                console.log('Adding instructions on how to use the program is essential. Maybe provide some pictures and step-by-step instructions!');
                return false;
            }
        }
    }, 

    {
        type: 'input',
        name: 'contributing', 
        message: "How could one contribute to this project?",
        validate: contributionInput => {
            if (contributionInput) {
                return true;
            } else {
                console.log('Letting people help with your project could lead to some great rewards!');
                return false;
            }
        }
    }, 

    {
        type: 'input',
        name: 'tests', 
        message: "Did you write any tests for your project? List them here!",
        validate: testsInput => {
            if (testsInput) {
                return true;
            } else {
                console.log('Tests show that you, well, tested your project. It might not be a bad idea to add some to your README.');
                return false;
            }
        }
    },

    {
        type: 'confirm',
        name: 'confirmLicenses',
        message: 'Would you like to include a license?',
        default: false
    },
    {
        type: 'list',
        name: 'licenses',
        message: 'What license would you like to include?',
        choices: ['MIT', 'GPL', 'CC--0'],
        when: ({ confirmLicenses }) => {
            if (confirmLicenses) {
                return true;
            } else {
                return false;
            }
        }
    },
];

// TODO: Create a function to write README file
const writeToFile = data => {
    return new Promise((resolve, reject)=> {
        fs.writeFile('./README.md', data, err => {
            if (err) {
                reject (err);
                
                return;
            }

            resolve({
                ok: true,
                message: console.log('Good job! Navigate to the "dist" folder and check out your brand new README!')
            })
        })
    })
}

// TODO: Create a function to initialize app
const init = () => {
    return inquirer.prompt(questions);
}

// Function call to initialize app
init()
.then(userInput => {
    return generateMarkdown(userInput);
})
.then(readmeInfo => {
    return writeToFile(readmeInfo);
})
.catch(err => {
    console.log(err);
})