#!/usr/bin/env node

'use strict';
var chalk = require('chalk');
var fs = require('fs-extra');


module.exports = {
    createCpp: (projectName, buildTool) => {
        
        // Tell the user that the project is being created.
        console.log();
        console.log('Creating a new C++ project named ' + chalk.magenta(projectName) );


        // Create the project folder.
        try {
            fs.ensureDirSync('./' + projectName);
            console.log( chalk.green('Created project folder!\n') );
        } catch(err) {
            console.log( chalk.red("ERROR: " + err) );
        }


        // Create src and resources folders
        console.log( chalk.blue('Creating src folder...') );
        try {
            fs.ensureDirSync('./' + projectName + '/src/main/headers');
            console.log( chalk.green('Done creating header files folder!') );
            
            fs.ensureDirSync('./' + projectName + '/src/main/cpp');
            console.log( chalk.green('Done creating cpp files folder!\n') );
        } catch(err) {
            console.log( chalk.red("ERROR: " + err) );
        }


        console.log( chalk.blue('Creating resources folder...') );
        try {
            fs.ensureDirSync('./' + projectName + '/src/resources');
            console.log( chalk.green('Done creating resources folder!\n') );
        } catch(err) {
            console.log( chalk.red("ERROR: " + err) );
        }



        // Create the build file.
        if(buildTool == "--gradle") {
            const buildgradle_file = fs.readFileSync('/usr/local/lib/node_modules/quickprojects/templateGradles/TGF_Cpp.txt', 'UTF-8');
            fs.outputFileSync('./'+projectName+'/build.gradle', buildgradle_file);
            console.log( chalk.green('Generated build.gradle file!\n') );
        } else {
            const buildFile = fs.readFileSync('/usr/local/lib/node_modules/quickprojects/templateMakeFiles/TMF_Cpp.txt', 'UTF-8');
            fs.outputFileSync('./'+projectName+'/Makefile', buildFile);
            console.log( chalk.green('Generated Makefile!\n') );
        }


        // Create the template java file.
        const template = fs.readFileSync('/usr/local/lib/node_modules/quickprojects/templateFiles/TCPPF.txt', 'UTF-8');
        fs.outputFileSync('./'+projectName+'/src/main/cpp/Main.cpp', template);





        // Show finished description.
        console.log('\nFinished creating ' + chalk.magenta(projectName) + ' in ' + chalk.cyan('./' + projectName) );
        console.log('Type ' + chalk.cyan('QP help') + ' to learn how to run your application.');
    }
}