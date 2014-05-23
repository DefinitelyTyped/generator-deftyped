/// <reference path="../typings/tsd.d.ts" />

'use strict';

import util = require('util');
import path = require('path');
import fs = require('fs');
import yeoman = require('yeoman-generator');
import chalk = require('chalk');
import open = require('open');
import model = require('./model');
import environment = require('./environment');
import validator = require('./validator');
import hStringify = require('./headerStringify');

var greet: string = '';
greet = <any>chalk.bold.blue('   ___ _____                  _ \n');
greet += <any>chalk.bold.blue('  |   \\_   _|  _ _ __  ___ __| |\n');
greet += <any>chalk.bold.blue('  | |) || || || | \'_ \\/ -_) _` |\n');
greet += <any>chalk.bold.blue('  |___/ |_| \\_, | .__/\\___\\__,_|\n');
greet += <any>chalk.bold.blue('            |__/|_|             \n');

var deftypedGenerator = yeoman.generators.Base.extend({

    init: function () {
        var self: model.DefTypedAnswers = this;
        this.on('end', function() {
            if (!this.options['skip-install']) {
                if (self.moreInfoAtTheEnd) {
                    open('http://definitelytyped.org/guides/creating.html');
                }
            }
        });
    },

    askFor: function() {
        var done = this.async();

        this.log(greet);
        this.log(chalk.white(' Welcome to DefinitelyTyped typing generator!\n'));

        var prompts: Array<inquirer.Question> = [];

        if (environment.isDefTypedEnvironment()) {
            if (environment.defTypedRoot() !== path.resolve('.')) {
                prompts.push({
                    type: 'confirm',
                    name: 'useSuggestedPath',
                    message: 'Hey! Looks like you\'re in a DefinitelyTyped repository.\n ' +
                    'Would you like to create the typing at ".\\' + path.relative('.', environment.defTypedRoot()) + '\\" dir?'
                });
            }
        } else if (environment.isTsdEnvironment()) {
            if (environment.tsdRoot() !== path.resolve('.')) {
                prompts.push({
                    type: 'confirm',
                    name: 'useSuggestedPath',
                    message: 'Hey! Looks like you\'re using TSD tool!\n ' +
                    'Would you like to create the typing at ".\\' + path.relative('.', environment.tsdRoot()) + '\\" dir?'
                });
            }
        }

        prompts.push({
            name: 'typingName',
            message: 'Please, inform the typing name?',
            validate: (answer: string) => {
                return validator.validateTypingName(answer);
            }
        });

        prompts.push({
            name: 'typingVersion',
            message: 'What the typing version?',
            validate: (answer: string) => {
                return validator.validateTypingVersion(answer);
            }
        });

        prompts.push({
            name: 'libraryUrl',
            message: 'What the project library url?',
            validate: (answer: string) => {
                return validator.validateProjectUrl(answer);
            }
        });

        prompts.push({
            name: 'githubName',
            message: 'Inform your Github name?',
            validate: (answer: string) => {
                return validator.validateAuthorName(answer);
            }
        });

        prompts.push({
            type: 'confirm',
            name: 'moreInfoAtTheEnd',
            message: 'Would you like more information about how to create TypeScript definitions\n at the end of this installation?',
            default: 'Y'
        });

        this.prompt(prompts, function (props: model.DefTypedAnswers) {
            this.typingName = props.typingName;
            this.libraryUrl = props.libraryUrl;
            this.githubName = props.githubName;
            this.typingVersion = props.typingVersion;
            this.useSuggestedPath = props.useSuggestedPath;
            this.moreInfoAtTheEnd = props.moreInfoAtTheEnd;

            this.serializedHeader = hStringify.serialize(
                props.typingName,
                props.typingVersion,
                props.libraryUrl,
                props.githubName,
                'http://github.com/' + props.githubName,
                'https://github.com/borisyankov/DefinitelyTyped');

            var typingDir: string = './';

            if (this.useSuggestedPath) {
                if (environment.isDefTypedEnvironment()) {
                    typingDir = path.relative('.', environment.defTypedRoot());
                } else if (environment.isTsdEnvironment()) {
                    typingDir = path.relative('.', environment.tsdRoot());
                }
            }

            typingDir = path.join(typingDir, this.typingName);

            if (fs.existsSync(typingDir)) {
                throw new Error('The directory: "' + typingDir + '" already exists.');
            }

            this.typingDir = typingDir;

            done();
        }.bind(this));
    },

    app: function() {
        this.mkdir('./' + this.typingDir);
        this.template('_typing.d.ts.tmpl', this.typingDir + '/' + this.typingName + '.d.ts');
        this.template('_typing-tests.ts.tmpl', this.typingDir + '/' + this.typingName + '-tests.ts');
        this.template('_typing-tests.ts.tscparams.tmpl', this.typingDir + '/' + this.typingName + '-tests.ts.tscparams');
    }
});

module.exports = deftypedGenerator;
