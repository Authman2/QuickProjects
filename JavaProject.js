#!/usr/bin/env node

'use strict';
var chalk = require('chalk');
var fs = require('fs-extra');

// The command line argument for the project name
var projectName = process.argv[2] || 'MyJavaProject';
var buildTool = process.argv[3] || "gradle";


// Tell the user that the project is being created.
console.log();
console.log('Creating a new Java project named ' + chalk.magenta(projectName) );


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
    fs.ensureDirSync('./' + projectName + '/src/main/java/mainPackage');
    console.log( chalk.green('Done creating src/main/java folder!') );
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



// Create the build tool file.
if(buildTool == "maven") {
    const buildFile = fs.readFileSync('/usr/local/lib/node_modules/quickprojects/templateFiles/TMavenF.txt', 'UTF-8');
    fs.outputFileSync('./'+projectName+'/pom.xml', buildFile);
    console.log( chalk.green('\nGenerated pom.xml file!') );

} else if(buildTool == "makefile") {
    const buildFile = fs.readFileSync('/usr/local/lib/node_modules/quickprojects/templateMakeFiles/TMF_Java.txt', 'utf8');
    fs.outputFileSync('./' + projectName + '/Makefile', buildFile);
    console.log( chalk.green('\nGenerated Makefile!') );

} else {
    const buildFile = fs.readFileSync('/usr/local/lib/node_modules/quickprojects/templateGradles/TGF_Java.txt', 'UTF-8');
    fs.outputFileSync('./'+projectName+'/build.gradle', buildFile);
    console.log( chalk.green('\nGenerated build.gradle file!') );
}


// Create the template java file.
const javaTemplate = fs.readFileSync('/usr/local/lib/node_modules/quickprojects/templateFiles/TJF.txt', 'UTF-8');
fs.outputFileSync('./'+projectName+'/src/main/java/mainPackage/Main.java', javaTemplate);


console.log('\nFinished creating ' + chalk.magenta(projectName) + ' in ' + chalk.cyan('./' + projectName) );
console.log('Type ' + chalk.cyan('QP help') + ' to learn how to run your application.');