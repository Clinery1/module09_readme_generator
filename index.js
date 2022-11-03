// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs/promises");
const QUESTIONS = [
    "What is the name for the repository?",
    "Enter a one-line description of the project:",
    "Is there a screenshot of the project? If so, what is the path?",
    "Enter any installation instructions:",
    "Enter any usage instructions:",
    "Enter any credits:",
    "Enter the license:",
];
async function prompt_user() {
    let outputs = [];
    for (let i = 0; i < QUESTIONS.length; i += 1) {
        const res = await inquirer.prompt({
            name: "0",
            message: QUESTIONS[i],
            type: "input",
        });
        outputs.push(res[0]);
    }
    return {
        project_title: outputs[0],
        description: outputs[1],
        screenshot: outputs[2],
        installation: outputs[3],
        usage: outputs[4],
        credits: outputs[5],
        license: outputs[6],
    };
}
async function write_to_file(file_name, data) {
    const file = await fs.open(file_name, "w");
    await fs.writeFile(file, data);
}
async function main() {
    const state = await prompt_user();
    let output = "# " + state.project_title + "\n";
    output += "## Description\n" + state.description + "\n\n";
    if (state.screenshot) {
        output += "## Screenshot\n![](" + state.screenshot + ")\n\n";
    }
    if (state.installation) {
        output += "## Installation\n" + state.installation + "\n\n";
    }
    if (state.usage) {
        output += "## Usage\n" + state.usage + "\n\n";
    }
    if (state.credits) {
        output += "## Credits\n" + state.credits + "\n\n";
    }
    if (state.license) {
        output += "## License\n" + state.license + "";
    }
    await write_to_file("README.md", output);
}
main();
