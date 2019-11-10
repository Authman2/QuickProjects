#!/usr/bin/env node

'use strict';
var chalk = require('chalk');
var fs = require('fs-extra');


module.exports = {
    createPython: (projectName, buildTool) => {
        
        // Tell the user that the project is being created.
        console.log();
        console.log('Creating a new Python project named ' + chalk.magenta(projectName) );


        // Create the project folder.
        try {
            fs.ensureDirSync('./' + projectName);
            console.log( chalk.green('Created project folder!\n') );
        } catch(err) {
            console.log( chalk.red("ERROR: " + err) );
        }


        // Make the src, resources folders.
        console.log( chalk.blue('Creating src folder...') );
        try {
            fs.ensureDirSync('./' + projectName + '/src');
            console.log( chalk.green('Done creating src folder!') );
        } catch(err) {
            console.log( chalk.red("ERROR: " + err) );
        }

        console.log( chalk.blue('\nCreating resources folder...') );
        try {
            fs.ensureDirSync('./' + projectName + '/res');
            console.log( chalk.green('Done creating resources folder!') );
        } catch(err) {
            console.log( chalk.red("ERROR: " + err) );
        };

        // Create the build tool file. Always use a Makefile for python.
        const buildFile = fs.readFileSync('/usr/local/lib/node_modules/quickprojects/templateMakeFiles/TMF_Python.txt', 'utf8');
        fs.outputFileSync('./' + projectName + '/Makefile', buildFile);
        console.log( chalk.green('\nGenerated Makefile!') );


        // Create the template python file.
        const pythonTemplate = fs.readFileSync('/usr/local/lib/node_modules/quickprojects/templateFiles/TPythonF.txt', 'UTF-8');
        fs.outputFileSync('./'+projectName+'/src/app.py', pythonTemplate);


        console.log('\nFinished creating ' + chalk.magenta(projectName) + ' in ' + chalk.cyan('./' + projectName) );
        console.log('Type ' + chalk.cyan('QP help') + ' to learn how to run your application.');
    }
}