const chalk = require('chalk');

async function errors() {
    process.on('unhandledRejection', async(error) => {
        console.log(chalk.white(`[${chalk.red("ERROR")}]${chalk.white(" - ")}${error.stack}`))
    });

    process.on('uncaughtException', async(error) => {
        console.log(chalk.white(`[${chalk.red("ERROR")}]${chalk.white(" - ")}${error.stack}`))
    });
};

module.exports = errors;