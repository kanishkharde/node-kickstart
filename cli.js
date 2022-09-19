#!/usr/bin/env node
import meow from 'meow';
import NodeKickStart from './index.js';
import chalk from 'chalk';
import {isDir} from './utils/validator.js';

const cli = meow(`
	Usage
	  $ node-kickstart <path/of/project>

	Options
	  --name, -n  Name of the Project

	Examples
	  $ node-kickstart ./ --name test
`, {
	importMeta: import.meta,
	flags: {
		name: {
			type: 'string',
			alias: 'n',
            default: 'node-kickstart-sample',
            isRequired: true
		}
	}
});

if (!isDir(cli.input[0])) {
	console.log(chalk.red('Invalid Path, try again with valid project path.'));
	process.exit(0);
}

new NodeKickStart(cli.input[0], cli.flags.name).execute().then(() => {
	console.log("Completed, Happy Coding!");
	process.exit(0);
});