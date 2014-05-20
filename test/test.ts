/// <reference path="../typings/tsd.d.ts" />

import path = require('path');
import yeoman = require('yeoman-generator');
import model = require('../app/model');

import helpers = yeoman.test;

describe('generator-deftyped test', () => {
    beforeEach(function (done) {
        helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
            if (err) {
                return done(err);
            }

            this.generator = helpers.createGenerator('deftyped:app', [
                '../../app', [
                    helpers.createDummyGenerator(),
                    'mocha:app'
                ]
            ]);
            this.generator.options['skip-install'] = true;

            done();
        }.bind(this));
    });

    it('the generator can be required without throwing', function () {
        this.app = require('../app');
    });

    it('creates expected files', function (done) {
        var expected = [
            'ttt/ttt.d.ts',
            'ttt/ttt-tests.ts',
            'ttt/ttt-tests.ts.tscparams'
        ];

        helpers.mockPrompt(this.generator, <model.DefTypedAnswers>{
            typingName: 'ttt',
            typingVersion: '0.0.0',
            libraryUrl: 'http://ttt.ttt',
            githubName: 'name',
            useSuggestedPath: false,
            moreInfoAtTheEnd: false
        });

        this.generator.run({}, () => {
            helpers.assertFiles(expected);
            done();
        });
    });
});
