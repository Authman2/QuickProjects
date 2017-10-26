#!/usr/bin/env node

'use strict';
var chalk = require('chalk');
var fs = require('fs-extra');



module.exports = {
    createKotlin: (projectName) => {

        // Tell the user that the project is being created.
        console.log();
        console.log('Creating a new Kotlin project named ' + chalk.magenta(projectName) );


        // Create the project folder.
        try {
            fs.ensureDirSync('./' + projectName);
            console.log( chalk.green('Created project folder!\n') );
        } catch(err) {
            console.log( chalk.red("ERROR: " + err) );
        }


        // Make the src, resources, and external jars folders.
        console.log( chalk.blue('Creating src folder...') );
        try {
            fs.ensureDirSync('./' + projectName + '/src/main/kotlin');
            console.log( chalk.green('Done creating src/main/kotlin folder!') );
        } catch(err) {
            console.log( chalk.red("ERROR: " + err) );
        }

        console.log( chalk.blue('\nCreating resources folder...') );
        try {
            fs.ensureDirSync('./' + projectName + '/src/main/resources');
            console.log( chalk.green('Done creating resources folder!') );
        } catch(err) {
            console.log( chalk.red("ERROR: " + err) );
        };




        // Create the build.gradle file.
        const buildgradle_file = fs.readFileSync('/usr/local/lib/node_modules/quickprojects/templateGradles/TGF_Kotlin.txt', 'UTF-8');
        fs.outputFileSync('./'+projectName+'/build.gradle', buildgradle_file);
        console.log( chalk.green('\nGenerated build.gradle file!') );



        // Create the template java file.
        const template = fs.readFileSync('/usr/local/lib/node_modules/quickprojects/templateFiles/TKotlinF.txt', 'UTF-8');
        fs.outputFileSync('./'+projectName+'/src/main/kotlin/Main.kt', template);



        console.log('\nFinished creating ' + chalk.magenta(projectName) + ' in ' + chalk.cyan('./' + projectName) );
        console.log('To run your application, navigate to your project folder with '
            + chalk.cyan('cd ' + projectName) + ',\nThen type ' + chalk.cyan('gradle run') 
            + ' or ' + chalk.cyan('QP run-kot') );
    }
}