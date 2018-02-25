"use strict";
class Employee {
    addToSchedule() {
        console.log('Employee added to schedule.');
    }
    logTitle() {
        ;
        console.log(`Employee has the title ${this.title}.`);
    }
}
exports.Employee = Employee;
class Researcher {
    doResearch(topic) {
        console.log(`Doing research on ${topic}.`);
    }
}
exports.Researcher = Researcher;
exports.CLASS_INFO = Symbol();
class UniversityLibrarian {
    [exports.CLASS_INFO]() {
        console.log('This class represents a UniversityLibrarian.');
    }
    static [Symbol.hasInstance](obj) {
        return obj.hasOwnProperty('name') && obj.hasOwnProperty('assistCustomer');
    }
    assistCustomer(custName) {
        console.log(this.name + ' is assisting ' + custName);
    }
    assistFaculty() {
        console.log('Assisting faculty.');
    }
}
exports.UniversityLibrarian = UniversityLibrarian;
class PublicLibrarian {
    assistCustomer(custName) {
        console.log('Assisting customer.');
    }
    teachCommunity() {
        console.log('Teaching community.');
    }
}
exports.PublicLibrarian = PublicLibrarian;
class ReferenceItem {
    constructor(title, year) {
        this.title = title;
        this.year = year;
        console.log('Creating a new ReferenceItem...');
    }
    printItem() {
        console.log(`${this.title} was published in ${this.year}.`);
        console.log(`Department: ${ReferenceItem.department}`);
    }
    get publisher() {
        return this._publisher.toUpperCase();
    }
    set publisher(newPublisher) {
        this._publisher = newPublisher;
    }
}
ReferenceItem.department = 'Research';
exports.ReferenceItem = ReferenceItem;
//# sourceMappingURL=classes.js.map