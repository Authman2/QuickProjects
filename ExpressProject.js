#!/usr/bin/env node

'use strict';
var chalk = require('chalk');
var fs = require('fs-extra');
var shell = require('shelljs');

module.exports = {
    createExpress: (projectName) => {
        
        // Tell the user that the project is being created.
        console.log();
        console.log('Creating a new ExpressJS project named ' + chalk.magenta(projectName) );


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
            fs.ensureDirSync('./' + projectName + '/src/js');
            fs.ensureDirSync('./' + projectName + '/src/css');
            console.log( chalk.green('Done creating src folder!') );
            console.log();
        } catch(err) {
            console.log( chalk.red('ERROR: ' + err) );
        }


        // Create the views folder.
        console.log( chalk.blue('Creating views folder...') );
        try {
            fs.ensureDirSync('./' + projectName + '/views/pages');
            fs.ensureDirSync('./' + projectName + '/views/partials');
            console.log( chalk.green('Done creating views folder!') );
            console.log();
        } catch(err) {
            console.log( chalk.red('ERROR: ' + err) );
        }


        // Create the package.json folder.
        console.log( chalk.blue('Creating package.json file...') );
        try {
            fs.writeJson('./' + projectName + '/package.json', {
                name: 'project-name',
                version: 'project-version',
                description: 'project-description',
                main: 'index.js',
                scripts: {},
                keywords: [],
                author: 'project-author',
                licence: 'MIT',
                dependencies: {
                    "ejs": "^2.5.7",
                    "express": "^4.16.2"
                }
            }, err => {
                if (err) { console.log( chalk.red('ERROR: ' + err) ); return; } 
            });
            console.log( chalk.green('Done creating package.json file!') );
            console.log();
        } catch(err) {
            console.log( chalk.red('ERROR: ' + err) );
        }



        // Create the template files.
        const templateJS = fs.readFileSync('/usr/local/lib/node_modules/quickprojects/templateFiles/TExpressIndexJS.txt', 'UTF-8');
        const templateHTML = fs.readFileSync('/usr/local/lib/node_modules/quickprojects/templateFiles/TExpressIndexHTML.txt', 'UTF-8');
        fs.outputFileSync('./'+projectName+'/index.js', templateJS);
        fs.outputFileSync('./'+projectName+'/views/pages/Home.ejs', templateHTML);
        fs.outputFileSync('./'+projectName+'/src/js/Home.js', '// JavaScript for the home page goes here.');
        fs.outputFileSync('./'+projectName+'/src/css/Home.css', 'body {}');


        // Print finished message.
        console.log('\nFinished creating ' + chalk.magenta(projectName) + ' in ' + chalk.cyan('./' + projectName) );
        console.log('Type ' + chalk.cyan('QP help') + ' to learn how to run your application.');
    }
}