#!/usr/bin/env node

'use strict';
var chalk = require('chalk');
var fs = require('fs-extra');
var shelljs = require('shelljs');
var xml2js = require('xml2js');

// Require the code that creates the projects so you don't have to rewrite it.
var cProject = require('./CProject');
var cppProject = require('./CppProject');
var javaProject = require('./JavaProject');
var kotlinProject = require('./KotlinProject');
var lwjglProject = require('./LWJGLProject');



var command = process.argv[2] || 'help';
var projectType = process.argv[3];

// Parse the commands.
if(command === 'help') { printHelpCommands(); return ;}
else if(command === 'uninstall') { uninstallQP(); return ;}
else if(command === 'update') { updateQP(); return ;}
else {
    // If it is not one of the top three, then consider it the name of the project.
    const projectName = command;
    const buildTool = process.argv[4];

    // Check if the project type was specified. If not, print error.
    if(projectType) {
        
        switch(projectType) {
            case '--java':
                _createJavaProject(projectName, buildTool);
                break;
            case '--c':
                _createCProject(projectName, buildTool);
                break;
            case '--cpp':
                _createCppProject(projectName, buildTool);
                break;
            case '--kotlin':
                _createKotlinProject(projectName);
                break;
            case '--lwjgl':
                _createLWJGLProject(projectName);
                break;
        }

        return;
    } else {
        console.log( chalk.red('ERROR!') );
        console.log();
        console.log('When creating a new project you must specify the type using the following form:');
        console.log( chalk.yellow('qp [project name] --[java/c/cpp/kotlin/lwjgl] --[gradle/maven/make]') );
        console.log();

        return;
    }
}




/************************
*                       *
*     QUICK PROJECTS    *
*                       *
*************************/

// Uninstalls the QuickProjects CLI from your computer.
function uninstallQP() {
    shelljs.exec('npm uninstall -g quickprojects');
    console.log( chalk.bold('Finished uninstalling QuickProjects. Commands used to create project templates will no longer work.') );
}


// Updates to the latest version of QuickProjects.
function updateQP() {
    console.log( chalk.green('Updating QuickProjects...') );
    shelljs.exec('npm install -g quickprojects');
    console.log('\n');

    var latestVersion = require('./package.json');
    console.log('Updated to the latest version of QuickProjects: ' + chalk.cyan('Version ' + latestVersion.version));
    console.log();
}


// Prints out all of the help commands.
function printHelpCommands() {
    console.log('--------------------------------------------------------');
    console.log('\n' + chalk.blue('QUICK PROJECTS HELP:') + '\n');
    console.log('--------------------------------------------------------');

    console.log();
    console.log('To create a project using QuickProjects, follow the commands below:');
    console.log( chalk.yellow('qp [project name] --[java/c/cpp/kotlin/lwjgl] --[gradle/maven/make]') );
    console.log();


    console.log();
    console.log();
    console.log('--------------------------------------------------------');
    console.log('RUNNING JAVA PROJECTS: ');
    console.log('--------------------------------------------------------');
    console.log('--> MAKEFILE: Navigate to your project folder and type, ' + chalk.cyan('make run'));
    console.log('--> MAVEN: Navigate to your project folder and type, ' + chalk.cyan('mvn package') + ', and then, ' + chalk.cyan('java -cp target/{PROJECT-NAME}-1.0.jar {PACKAGE-NAME}.{MAIN-FILE}'));
    console.log('--> GRADLE: Navigate to your project folder and type, ' + chalk.cyan('gradle run') + ', or ' + chalk.cyan('gradle jfxRun') + ' for javafx projects.');

    console.log();
    console.log();
    console.log('--------------------------------------------------------');
    console.log('RUNNING C PROJECTS: ');
    console.log('--------------------------------------------------------');
    console.log( chalk.magenta('Option 1:') );
    console.log('--> Type ' + chalk.cyan('gradle build') + ' then navigate to the build/exe/main folder and run your main file.');
    console.log( chalk.magenta('Option 2:') );
    console.log('--> Navigate to your project folder and type, ' + chalk.cyan('make run'));


    console.log();
    console.log();
    console.log('--------------------------------------------------------');
    console.log('RUNNING C++ PROJECTS: ');
    console.log('--------------------------------------------------------');
    console.log('Navigate to your project folder and type, ' + chalk.cyan('make run'));



    console.log();
    console.log();
    console.log('--------------------------------------------------------');
    console.log('RUNNING KOTLIN PROJECTS: ');
    console.log('--------------------------------------------------------');
    console.log('Navigate to your project folder and type ' + chalk.cyan('gradle run') );



    console.log();
    console.log();
    console.log('--------------------------------------------------------');
    console.log('COMMANDS: ');
    console.log('--------------------------------------------------------');
    console.log('For help, type ' + chalk.cyan('QP help'));
    console.log('To update QuickProjects, type ' + chalk.cyan('QP update'));
    console.log('To uninstall QuickProjects, type ' + chalk.cyan('QP uninstall'));
    console.log();
}



/************************
*                       *
*        CREATING       *
*                       *
*************************/

/** Creates a C Project. */
function _createCProject(projectName, buildTool = '--makefile') {
    cProject.createC(projectName, buildTool);
}

/** Creates a C++ Project. */
function _createCppProject(projectName, buildTool = '--makefile') {
    cppProject.createCpp(projectName, buildTool);
}

/** Creates a Java Project. */
function _createJavaProject(projectName, buildTool = '--gradle') {
    javaProject.createJava(projectName, buildTool);
}

/** Creates a Kotlin Project. */
function _createKotlinProject(projectName) {
    kotlinProject.createKotlin(projectName);
}

/** Creates a LWJGL Project. */
function _createLWJGLProject(projectName) {
    lwjglProject.createLWJGL(projectName);
}
