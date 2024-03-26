#!/usr/bin/env node

const { prompt } = require('enquirer');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

async function scaffoldProject() {
    console.log('Need to install the following packages:');
    // List required packages here

    const response = await prompt({
        type: 'confirm',
        name: 'confirmed',
        message: 'Ok to proceed?',
        initial: true,
    });

    if (!response.confirmed) {
        console.log('Aborted.');
        return;
    }

    const projectNameResponse = await prompt({
        type: 'input',
        name: 'projectName',
        message: 'Project name:',
    });
    const projectName = projectNameResponse.projectName;

    console.log(`Scaffolding project in ${process.cwd()}/${projectName}...`);

    // Create project directory
    fs.mkdirSync(projectName);

    // Copy template files to project directory
    const templateDir = path.join(__dirname, '..', 'template');
    fs.readdirSync(templateDir).forEach((file) => {
        fs.copyFileSync(path.join(templateDir, file), path.join(projectName, file));
    });

    console.log('Done. Now run:\n');
    console.log(`  cd ${projectName}`);
    console.log('  npm install');
    console.log('  npm run dev');
}

scaffoldProject().catch((error) => {
    console.error('An error occurred:', error);
});
