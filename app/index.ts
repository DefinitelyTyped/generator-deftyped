/// <reference path="../typings/chalk/chalk.d.ts" />
/// <reference path="../typings/yeoman-generator/yeoman-generator.d.ts" />
/// <reference path="../typings/tsd.d.ts" />

'use strict';

import util = require('util');
import path = require('path');
import fs = require('fs');
import yeoman = require('yeoman-generator');
import chalk = require('chalk');

var greet: string = '';
greet = <any>chalk.bold.blue('   ___ _____                  _ \n');
greet += <any>chalk.bold.blue('  |   \\_   _|  _ _ __  ___ __| |\n');
greet += <any>chalk.bold.blue('  | |) || || || | \'_ \\/ -_) _` |\n');
greet += <any>chalk.bold.blue('  |___/ |_| \\_, | .__/\\___\\__,_|\n');
greet += <any>chalk.bold.blue('            |__/|_|             \n');

interface DefTypedAnswers extends inquirer.Answers {
    typingName: string;
    typingVersion: string;
    libraryUrl: string;
    githubName: string;
}

var deftypedGenerator = yeoman.generators.Base.extend({
    init: function() {

        this.on('end', function() {
            if (!this.options['skip-install']) {
                //...
            }
        });
    },

    askFor: function() {
        var done = this.async();

        this.log(greet);
        this.log(chalk.white(' Welcome to DefinitelyTyped typing boilerplate!\n'));

        var prompts: Array<inquirer.Question> = [];

        prompts.push({
            name: 'typingName',
            message: 'Please, inform the typing name?',
            validate: (answer: string) => {
                if (answer) {
                    return answer.trim() !== '';
                }
                return false;
            }
        });

        prompts.push({
            name: 'typingVersion',
            message: 'What the typing version?'
        });

        prompts.push({
            name: 'libraryUrl',
            message: 'What the project library url?',
            validate: (answer: string) => {
                if (answer) {
                    return answer.trim() !== '';
                }
                return false;
            }
        });

        prompts.push({
            name: 'githubName',
            message: 'Inform your Github name?',
            validate: (answer: string) => {
                if (answer) {
                    return answer.trim() !== '';
                }
                return false;
            }
        });

        this.prompt(prompts, function (props: DefTypedAnswers) {
            this.typingName = props.typingName;
            this.libraryUrl = props.libraryUrl;
            this.githubName = props.githubName;
            this.typingVersion = props.typingVersion;

            if (fs.existsSync('./' + this.typingName)) {
                throw new Error('The directory: "' + this.typingName + '" aleardy exists.');
            }

            done();
        }.bind(this));
    },

    app: function() {
        this.mkdir('./' + this.typingName);
        this.template('_typing.d.ts.tmpl', './' + this.typingName + '/' + this.typingName + '.d.ts');
        this.template('_typing-tests.ts.tmpl', './' + this.typingName + '/' + this.typingName + '-tests.ts');
        this.template('_typing-tests.ts.tscparams.tmpl', './' + this.typingName + '/' + this.typingName + '-tests.ts.tscparams');
    }
});

module.exports = deftypedGenerator;
