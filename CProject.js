#!/usr/bin/env node

'use strict';
var chalk = require('chalk');
var fs = require('fs-extra');

// The command line argument for the project name
var projectName = process.argv[2] || 'MyCProject';


// Tell the user that the project is being created.
console.log();
console.log('Creating a new C project named ' + chalk.magenta(projectName) );


// Create the project folder.
try {
    fs.ensureDirSync('./' + projectName);
    console.log( chalk.green('Created project folder!\n') );
} catch(err) {
    console.log( chalk.red("ERROR: " + err) );
}


// Create the source folder.
console.log( chalk.blue('Creating src folder...') );
try {
    fs.ensureDirSync('./' + projectName + '/src/main/c');
    console.log( chalk.green('Done creating source folder!\n') );
} catch(err) {
    console.log( chalk.red('ERROR: ' + err) );
}



// Create the template c file.
const template = fs.readFileSync('/usr/local/var/QP/templateFiles/TCF.txt', 'UTF-8');
fs.outputFileSync('./'+projectName+'/src/main/c/main.c', template);


// Create the build tool file.
const buildgradle_file = fs.readFileSync('/usr/local/var/QP/templateGradles/TGF_C.txt', 'UTF-8');
fs.outputFileSync('./'+projectName+'/build.gradle', buildgradle_file);
console.log( chalk.green('Generated build.gradle file!') );



// Print finished message.
console.log('\nFinished creating ' + chalk.magenta(projectName) + ' in ' + chalk.cyan('./' + projectName) );
console.log('To run your application, navigate to your project folder with '
    + chalk.cyan('cd ' + projectName) + ',\nThen type ' + chalk.cyan('gradle build') + ' to build the project.');
console.log('To run the project, either type ' + chalk.cyan('QP run-c') + chalk.yellow(' [main file]') + ' or navigate to the build/exe/main folder and run your main file.');