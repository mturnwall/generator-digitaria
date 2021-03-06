/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;


describe('digitaria generator', function () {
    beforeEach(function (done) {
        helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
            if (err) {
                return done(err);
            }

            this.app = helpers.createGenerator('digitaria:app', [
                '../../app'
            ]);
            done();
        }.bind(this));
    });

    it('creates expected files', function (done) {
        var expected = [
            // add files you expect to exist here.
            '.jshintrc',
            '.editorconfig',
            'config.rb',
            'bower.json',
            'Gruntfile.js',
            '.gitignore',
            '.jshintrc',
            '.editorconfig',
            'css/sass/_base.scss',
            'css/sass/_buttons.scss',
            'css/sass/_forms.scss',
            'css/sass/_typography.scss',
            'css/sass/master.scss',
            'js/.js',
            'index.html'
        ];

        helpers.mockPrompt(this.app, {
            'name': 'Hello World',
            'version': '0.1.0',
            'repository': '',
            'projectType': 'isDrupal',
            'libs': [ 'hasModernizr', 'hasUniform', 'hasHandlebars' ]
        });
        this.app.options['skip-install'] = true;
        this.app.run({}, function () {
            helpers.assertFiles(expected);
            done();
        });
    });
});
