import { exec } from 'node:child_process';
import fs from 'fs/promises';
import chalk from 'chalk';
import {
    DEPENDENCIES,
    DEV_DEPENDENCIES,
    ROOT_FILES,
    ROOT_FOLDERS,
    SRC_FILES,
    SRC_FOLDERS
} from './constant.js';
import cliProgress from 'cli-progress';

export default class NodeKickStart {
    constructor(path, name) {
        this._path = path,
        this._name = name,
        this._projectPath = `${this._path}/${this._name}`;
    }
    async execute() {
        try {
            const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
            progressBar.start(200, 0);
            await this.initialseProject();
            progressBar.update(50);
            await this.installDependencies();
            progressBar.update(100);
            await this.createFiles();
            progressBar.update(150);
            await this.writeStarterCode();
            progressBar.update(200);
            progressBar.stop();
        } catch (err) {
            console.log(chalk.red(err.message));
            process.exit(0);
        }
    }

    async initialseProject() {
        await Promise.all([
            exec(`mkdir ${this._projectPath}`),
            exec(`cd ${this._projectPath};npm init -y`),
        ]);
    }

    async installDependencies() {
        exec(`
          cd ${this._projectPath};
          npm i ${DEPENDENCIES.join(" ")};
          npm i -D ${DEV_DEPENDENCIES.join(" ")}
        `);
    }

    async createFiles() {
        await this.createRootFilesAndFolders();
        await this.createSrcFilesAndFolders();
    }

    async createRootFilesAndFolders() {
        await Promise.all([
            exec(`cd ${this._projectPath}; touch ${ROOT_FILES.join(" ")}`),
            exec(`cd ${this._projectPath}; mkdir ${ROOT_FOLDERS.join(" ")}`),
        ]);
    }

    async createSrcFilesAndFolders() {
        await Promise.all([
            exec(`cd ${this._projectPath}/src; touch ${SRC_FILES.join(" ")}`),
            exec(`cd ${this._projectPath}/src; mkdir ${SRC_FOLDERS.join(" ")}`),
        ]);
    }

    async writeStarterCode() {
        await fs.copyFile('./sample-code/server.js', this._projectPath + '/src/server.js');
    }
}
