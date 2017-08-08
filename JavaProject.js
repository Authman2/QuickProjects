#!/usr/bin/env node

'use strict';
var chalk = require('chalk');
var fs = require('fs-extra');

// The command line argument for the project name
var projectName = process.argv[2] || 'MyJavaProject';
var buildTool = process.argv[3] || "gradle";


// Tell the user that the project is being created.
console.log('Creating a new Java project named ' + chalk.magenta(projectName) );


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



// Create the build tool file.
if(buildTool == "maven") {
    const buildgradle_file = fs.readFileSync('/usr/local/var/QP/templateFiles/TMavenF.txt', 'UTF-8');
    fs.outputFileSync('./'+projectName+'/pom.xml', buildgradle_file);
    console.log( chalk.green('\nGenerated pom.xml file!') );
} else {
    const buildgradle_file = fs.readFileSync('/usr/local/var/QP/templateGradles/TGF_Java.txt', 'UTF-8');
    fs.outputFileSync('./'+projectName+'/build.gradle', buildgradle_file);
    console.log( chalk.green('\nGenerated build.gradle file!') );
}


// Create the template java file.
const javaTemplate = fs.readFileSync('/usr/local/var/QP/templateFiles/TJF.txt', 'UTF-8');
fs.outputFileSync('./'+projectName+'/src/main/java/mainPackage/Main.java', javaTemplate);


console.log('\nFinished creating ' + chalk.magenta(projectName) + ' in ' + chalk.cyan('./' + projectName) );

if(buildTool == 'maven') {

    console.log('To run your application, navigate to your project folder with '
        + chalk.cyan('cd ' + projectName) + ',');
    console.log('Then type ' + chalk.cyan('java -cp target/' + projectName + '-1.0.jar mainPackage.Main'));

} else {
    console.log('To run your application, navigate to your project folder with '
        + chalk.cyan('cd ' + projectName) + ',');
    console.log('Then type ' + chalk.cyan('gradle run') 
        + ' or, for javaFX projects, ' + chalk.cyan('gradle jfxRun') );
}