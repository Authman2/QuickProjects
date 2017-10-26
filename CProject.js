#!/usr/bin/env node

'use strict';
var chalk = require('chalk');
var fs = require('fs-extra');
var shell = require('shelljs');

module.exports = {
    createC: (projectName, buildTool) => {
        
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
            fs.ensureDirSync('./' + projectName + '/src/main/headers');
            console.log( chalk.green('Done creating header files folder!') );
            
            fs.ensureDirSync('./' + projectName + '/src/main/c');
            console.log( chalk.green('Done creating source folder!\n') );
        } catch(err) {
            console.log( chalk.red('ERROR: ' + err) );
        }



        // Create the template c file.
        const template = fs.readFileSync('/usr/local/lib/node_modules/quickprojects/templateFiles/TCF.txt', 'UTF-8');
        fs.outputFileSync('./'+projectName+'/src/main/c/main.c', template);


        // Create the build tool file.
        if(buildTool == "--gradle") {
            const buildgradle_file = fs.readFileSync('/usr/local/lib/node_modules/quickprojects/templateGradles/TGF_C.txt', 'UTF-8');
            fs.outputFileSync('./'+projectName+'/build.gradle', buildgradle_file);
            console.log( chalk.green('Generated build.gradle file!') );
        } else {
            const buildFile = fs.readFileSync('/usr/local/lib/node_modules/quickprojects/templateMakeFiles/TMF_C.txt', 'utf8');
            fs.outputFileSync('./' + projectName + '/Makefile', buildFile);
            console.log( chalk.green('Generated Makefile!') );
        }


        // Print finished message.
        console.log('\nFinished creating ' + chalk.magenta(projectName) + ' in ' + chalk.cyan('./' + projectName) );
        console.log('Type ' + chalk.cyan('QP help') + ' to learn how to run your application.');
    }
}