#!/usr/bin/env node
import { execSync } from "child_process";

const runCommand = command => {
    try {
        execSync(command, { stdio: 'inherit' });
        return true;
    } catch (error) {
        console.error(`Failed to execute command: ${command}`);
        console.error(`Error message: ${error.message}`);
        return false;
    }
}

const main = () => {
    const repoName = import.meta.argv[2];
    if (!repoName) {
        console.error("Please provide a repository name as an argument.");
        import.meta.exit(1);
    }

    const gitCheckoutCommand = `git clone --depth 1 https://github.com/eshanwp/template-react-ts ${repoName}`;
    const installDepsCommand = `cd ${repoName} && npm install`;

    console.log(`Cloning the repository: https://github.com/eshanwp/template-react-ts into folder: ${repoName}`);
    if (!runCommand(gitCheckoutCommand)) {
        console.error(`Cloning repository ${repoName} failed.`);
        import.meta.exit(1);
    }

    console.log(`Installing dependencies for ${repoName}...`);
    if (!runCommand(installDepsCommand)) {
        console.error(`Installation of dependencies for ${repoName} failed.`);
        import.meta.exit(1);
    }

    console.log(`Project setup for ${repoName} completed successfully.`);
}

main();