/// <reference path="../typings/tsd.d.ts" />

import fs = require('fs');
import path = require('path');
import yeoman = require('yeoman-generator');
import model = require('../app/model');

import helpers = yeoman.test;

function createGenerator(context, dir, name, appPath, done) {
    helpers.testDirectory(dir, function (err) {
        if (err) { return done(err); }
        this[name] = helpers.createGenerator('deftyped:app', [appPath, [helpers.createDummyGenerator(), 'mocha:app']]);
        this[name].options['skip-install'] = true;
        done();
    }.bind(context));
}

describe('generator-deftyped tests', function() {
    this.timeout(2000);

    var root = path.join(__dirname, 'temp');

    beforeEach(function (done) {
        createGenerator(this, root, 'generator', '../../app', done);
    });

    //afterEach(done => {
    //    //deleteFolderRecursive(root, done);
    //});

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

describe('generator-deftyped tsd environment test', function () {
    this.timeout(2000);

    var root = path.join(__dirname, 'temp-tsd', 'tsd');

    beforeEach(function (done) {
        createGenerator(this, root, 'generator', '../../../app', done);
    });

    //afterEach(done => {
    //    deleteFolderRecursive(root, done);
    //});

    it('shold identify tsd environment', function (done) {
        var expected = [
            '../typing/ttt/ttt.d.ts',
            '../typing/ttt/ttt-tests.ts',
            '../typing/ttt/ttt-tests.ts.tscparams'
        ];

        // create a tsd.json file on test root to simulate that tsd is in use
        fs.writeFileSync(path.join(root, '../tsd.json'), JSON.stringify({ path: 'typing' }));

        helpers.mockPrompt(this.generator, <model.DefTypedAnswers>{
            typingName: 'ttt',
            typingVersion: '0.0.0',
            libraryUrl: 'http://ttt.ttt',
            githubName: 'name',
            useSuggestedPath: true,
            moreInfoAtTheEnd: false
        });

        this.generator.run({}, () => {
            helpers.assertFiles(expected);
            done();
        });
    });
});

describe('generator-deftyped DefinitelyTyped environment test', function () {
    this.timeout(2000);

    var root = path.join(__dirname, 'temp-dt', 'dt');

    beforeEach(function (done) {
        createGenerator(this, root, 'generator', '../../../app', () => {
            done();
        });
    });

    //afterEach(done => {
    //    deleteFolderRecursive(root, done);
    //});

    it('shold identify DefinitelyTyped environment', function (done) {
        var expected = [
            '../ttt/ttt.d.ts',
            '../ttt/ttt-tests.ts',
            '../ttt/ttt-tests.ts.tscparams'
        ];

        // create a package.json file on test root to simulate DefinitelyTyped repository
        fs.writeFileSync(path.join(root, '../package.json'), JSON.stringify({ name: 'DefinitelyTyped' }));

        helpers.mockPrompt(this.generator, <model.DefTypedAnswers>{
            typingName: 'ttt',
            typingVersion: '0.0.0',
            libraryUrl: 'http://ttt.ttt',
            githubName: 'name',
            useSuggestedPath: true,
            moreInfoAtTheEnd: false
        });

        this.generator.run({}, () => {
            helpers.assertFiles(expected);
            done();
        });
    });
});
