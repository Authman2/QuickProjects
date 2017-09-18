#!/usr/bin/env node

'use strict';
var chalk = require('chalk');
var fs = require('fs-extra');
var shelljs = require('shelljs');
var xml2js = require('xml2js');

var command = process.argv[2] || 'help';
var mainFile = process.argv[3] || null;

switch (command) {
    case 'help':
        printHelpCommands();
        break;
    case 'uninstall':
        uninstallQP();
        break;
    case 'update':
        updateQP();
        break;
    

    // Commands for running programs.
    case 'run-c':
        runC(mainFile);
        break;
    case 'run-cpp':
        runCpp();
        break;
    case 'run-java':
        runJava(mainFile);
        break;
    case 'run-kot':
        runKotlin();
        break;
    case 'run-kotlin':
        runKotlin();
        break;
    default:
        break;
}


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
    console.log( 'To create a new Java project, type ' + chalk.cyan('JavaProject ') + chalk.yellow('[project name]') + chalk.yellow('[maven/gradle/makefile]'));
    console.log( '--> To create a new LWJGL project, type ' + chalk.cyan('LWJGLProject ') + chalk.yellow('[project name]') );

    console.log();
    console.log( 'To create a new C project, type ' + chalk.cyan('CProject ') + chalk.yellow('[project name]') + chalk.yellow('[makefile/gradle]') );

    console.log();
    console.log( 'To create a new C++ project, type ' + chalk.cyan('CppProject ') + chalk.yellow('[project name]') + chalk.yellow('[makefile/gradle]') );

    console.log();
    console.log( 'To create a new Kotlin project, type ' + chalk.cyan('KotlinProject ') + chalk.yellow('[project name]') );


    console.log();
    console.log();
    console.log('--------------------------------------------------------');
    console.log('RUNNING JAVA PROJECTS: ');
    console.log('--------------------------------------------------------');
    console.log('--> Navigate to your project folder and type ' + chalk.cyan('QP run-java') + chalk.yellow(' [main file]') );
    console.log('--> MAKEFILE: Navigate to your project folder and type, ' + chalk.cyan('make run'));
    console.log('--> MAVEN: Navigate to your project folder and type, ' + chalk.cyan('mvn package') + ', and then, ' + chalk.cyan('java -cp target/{PROJECT-NAME}-1.0.jar {PACKAGE-NAME}.{MAIN-FILE}'));
    console.log('--> GRADLE: Navigate to your project folder and type, ' + chalk.cyan('gradle run') + ', or ' + chalk.cyan('gradle jfxRun') + ' for javafx projects.');

    console.log();
    console.log();
    console.log('--------------------------------------------------------');
    console.log('RUNNING C PROJECTS: ');
    console.log('--------------------------------------------------------');
    console.log( chalk.magenta('Option 1:') );
    console.log('--> Navigate to your project folder and type ' + chalk.cyan('QP run-c') + chalk.yellow(' [main file]') );
    console.log( chalk.magenta('Option 2:') );
    console.log('--> Type ' + chalk.cyan('gradle build') + ' then navigate to the build/exe/main folder and run your main file.');
    console.log( chalk.magenta('Option 3:') );
    console.log('--> Navigate to your project folder and type, ' + chalk.cyan('make run'));


    console.log();
    console.log();
    console.log('--------------------------------------------------------');
    console.log('RUNNING C++ PROJECTS: ');
    console.log('--------------------------------------------------------');
    console.log('Navigate to your project folder and type ' + chalk.cyan('QP run-cpp') );
    console.log('Or, Navigate to your project folder and type, ' + chalk.cyan('make run'));



    console.log();
    console.log();
    console.log('--------------------------------------------------------');
    console.log('RUNNING KOTLIN PROJECTS: ');
    console.log('--------------------------------------------------------');
    console.log('Navigate to your project folder and type either ' + chalk.cyan('QP run-kot') + ', ' + chalk.cyan('QP run-kotlin') + ', or ' + chalk.cyan('gradle run') );



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



/*
* 
* RUNNING PROJECTS.
* 
* It is not required that you use these commands. They are just here to make 
* things easier for you.
*/


/** Builds and runs a C project.
* @param {string} opt opt: The name of the main file.
*/
function runC(opt) {
    if(fs.existsSync('Makefile')) {
        // Just run the makefile's 'run' command, which should compile first.
        shelljs.exec('make run');

    }
    else if(fs.existsSync('build.gradle')) {

        // Build the project.
        shelljs.exec('gradle build');

        // Run the project.
        if(opt !== null) {
            // Here, 'opt' will be the name of the main file.
            if(fs.existsSync('./build/exe/main/' + opt)) {
                shelljs.exec('open ./build/exe/main/' + opt);
            } else {
                console.log( chalk.red('\nThere is no file with the name ' + opt) + '. Make sure that you typed the name correctly and try again.' );
                return;
            }
        } else {
            shelljs.exec('open ./build/exe/main/main');
        }

    } else {
        console.log( chalk.red('Could not find a gradle file in this directory to build from.') );
        return;
    }
}


/** Builds and runs a C++ project. */
function runCpp() {
    if(fs.existsSync('Makefile')) {
        // Just run the makefile's 'run' command, which should compile first.
        shelljs.exec('make run');

    }
    else if(fs.existsSync('build.gradle')) {

        // Build the project.
        shelljs.exec('gradle compileMain');

    } else {
        console.log( chalk.red('Could not find a gradle file in this directory to build from.') );
        return;
    }
}


/** Builds and runs a Java project. 
* @param {string} opt opt: The name of the main file. Only for maven projects.
*/
function runJava(opt = 'Main') {
    if(fs.existsSync('build.gradle')) {

        // Build and run the project.
        shelljs.exec('gradle run');

    } 
    else if(fs.existsSync('pom.xml')) {
        
        var parser = new xml2js.Parser();
        fs.readFile('pom.xml', (err, data) => {
            if(err) { console.log( chalk.red('There was an error parsing your pom.xml file.') ); return; }
            parser.parseString(data, (err, result) => {
                var groupID = result['project']['groupId'];
                var name = result['project']['artifactId'];

                shelljs.exec('mvn clean package');

                // Here, 'opt' will be the name of the main file.
                if(opt !== null) {
                    if(fs.existsSync('./target/' + name + '-1.0.jar')) {
                        shelljs.exec('java -cp target/' + name + '-1.0.jar ' + groupID + '.' + opt);
                    } else {
                        console.log( chalk.red('\nThere is no file with the name ' + opt) + '. Make sure that you typed the name correctly and try again.' );
                        return;
                    }
                } else {
                    if(fs.existsSync('./target/' + name + '-1.0.jar')) {
                        shelljs.exec('java -cp target/' + name + '-1.0.jar ' + groupID + '.Main');
                    } else {
                        console.log( chalk.red('\nThere is no file with the name ' + opt) + '. Make sure that you typed the name correctly and try again.' );
                        return;
                    }
                }
            });
        });

    } if(fs.existsSync('Makefile')) {
        // Just run the makefile's 'run' command, which should compile first.
        shelljs.exec('make run');

    } else {
        console.log( chalk.red('Could not find a gradle file in this directory to build from.') );
        return;
    }
}




/** Builds and runs a Kotlin project using gradle. */
function runKotlin() {
    if(fs.existsSync('build.gradle')) {
        
        // Build and run the project.
        shelljs.exec('gradle run'); 

    } else {
        console.log( chalk.red('Could not find a gradle file in this directory to build from.') );
        return;
    }     
}