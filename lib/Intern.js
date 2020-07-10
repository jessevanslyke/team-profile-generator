const Employee = require("./Employee");

class Intern extends Employee {
    constructor(school) {
        super(name, id, email);
        this.school = school;
    }

    getRole() {
        return 'Intern';
    }
}

module.exports = Intern;