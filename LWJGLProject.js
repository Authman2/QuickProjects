#!/usr/bin/env node

'use strict';
var chalk = require('chalk');
var fs = require('fs-extra');

// The command line argument for the project name
var projectName = process.argv[2] || 'MyLWJGLProject';


// Tell the user that the project is being created.
console.log('Creating a new LWJGL project named ' + chalk.magenta(projectName) );


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
    fs.ensureDirSync('./' + projectName + '/src/main/java/mainPackage');
    console.log( chalk.green('Done creating src/main/java folder!') );
} catch(err) {
    console.log( chalk.red("ERROR: " + err) );
}

console.log( chalk.blue('\nCreating resources folder...') );
try {
    fs.ensureDirSync('./' + projectName + '/src/resources');
    console.log( chalk.green('Done creating resources folder!') );
} catch(err) {
    console.log( chalk.red("ERROR: " + err) );
};

console.log( chalk.blue('\nCreating jars folder...') );
try {
    fs.ensureDirSync('./' + projectName + '/jars');
    console.log( chalk.green('Done creating jars folder!') );
} catch(err) {
    console.log( chalk.red("ERROR: " + err) );
};



// Create the build.gradle file.
const buildgradle_file = fs.readFileSync('/usr/local/lib/node_modules/quickprojects/templateGradles/TGF_LWJGL.txt', 'UTF-8');
fs.outputFileSync('./'+projectName+'/build.gradle', buildgradle_file);
console.log( chalk.green('\nGenerated build.gradle file!') );



// Create the template java file, input manager, and mac runner classes.
const javaTemplate = fs.readFileSync('/usr/local/lib/node_modules/quickprojects/templateFiles/TLWJGLF.txt', 'UTF-8');
fs.outputFileSync('./'+projectName+'/src/main/java/mainPackage/Main.java', javaTemplate);

const inputTemplate = fs.readFileSync('/usr/local/lib/node_modules/quickprojects/templateFiles/LWJGLInput.txt', 'UTF-8');
fs.outputFileSync('./'+projectName+'/src/main/java/mainPackage/InputManager.java', inputTemplate);

const MRTemplate = fs.readFileSync('/usr/local/lib/node_modules/quickprojects/templateFiles/LWJGLMacRunner.txt', 'UTF-8');
fs.outputFileSync('./'+projectName+'/src/main/java/mainPackage/MacRunner.java', MRTemplate);


console.log('\nFinished creating ' + chalk.magenta(projectName) + ' in ' + chalk.cyan('./' + projectName) );
console.log('To run your application, navigate to your project folder with '
    + chalk.cyan('cd ' + projectName) + ',\nThen type ' + chalk.cyan('gradle run') );