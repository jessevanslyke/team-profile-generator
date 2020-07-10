const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");

// Push any new Employees into this array
var employeeArr = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

async function addEmployee() {
    // Setup the newEmployee variable
    var newEmployee;

    // Start our initial inquierer prompt questions for all employees
    await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter the employee's name: "
        },
        {
            type: "input",
            name: "id",
            message: "Enter the employee's id : "
        },
        {
            type: "input",
            name: "email",
            message: "Enter the employee's email: "
        },
        {
            type: "list",
            name: "role",
            message: "Enter the employee's role: ",
            choices: ["Manager", "Engineer", "Intern"],
        }
    ])
    .then(function(answers) {

        // Depending on the answers.role, we ask 1 more question
        inquirer.prompt([
            {
                type: "input",
                name: answers.role === "Manager" ? "officeNumber" : 
                    answers.role === "Engineer" ? "github" : 
                    "school",
                message: answers.role === "Manager" ? "Enter the manager's office number: " :
                        answers.role === "Engineer" ? "Enter the engineer's github: " : 
                        "Enter the intern's school: "
            }])
        .then(function(moreAnswers) {

            // Create a new instance of an object, based on the employee role
            if (answers.role === "Manager"){
                newEmployee = new Manager(answers.name, answers.id, answers.email, moreAnswers.officeNumber);
                console.log("New manager: ", newEmployee);
            }
            if (answers.role === "Engineer"){
                newEmployee = new Engineer(answers.name, answers.id, answers.email, moreAnswers.github);
                console.log("New engineer: ", newEmployee);
            }
            if (answers.role === "Intern"){
                newEmployee = new Intern(answers.name, answers.id, answers.email, moreAnswers.school);
                console.log("New intern: ", newEmployee);
            }
            employeeArr.push(newEmployee);
            checkForDone();
        }) 
    })
}

function checkForDone() {
    inquirer.prompt([{
        type: "confirm",
        name: "done",
        message: "Do you need to add another employee to the team?",
        default: true
    }])
    .then(function(answers) {
        if (answers.done){
            addEmployee();
            return;
        }
        else {
            html = render(employeeArr);
            fs.writeFile(outputPath, html, function(err) {
                if (err)
                    console.log(err);
                    
                console.log("team.html saved to: ", outputPath);
            })
        }
    })
}

addEmployee();