'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var DigitariaGenerator = module.exports = function DigitariaGenerator(args, options, config) {
	yeoman.generators.Base.apply(this, arguments);

	this.on('end', function () {
		this.installDependencies({ skipInstall: options['skip-install'] });
	});

	this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(DigitariaGenerator, yeoman.generators.Base);

DigitariaGenerator.prototype.askFor = function askFor() {
	var cb = this.async();

	// have Yeoman greet the user.
	console.log(this.yeoman);

	var prompts = [{
		type: 'input',
		name: 'projectName',
		message: 'What is the name of your project?'
	}, {
		type: 'input',
		name: 'version',
		message: 'What is the version of the project?',
		default: '0.1.0'
	}, {
		type: 'input',
		name: 'jqueryVersion',
		message: 'What version of jQuery?',
		default: '1.10.2'
	}, {
		type: 'input',
		name: 'repository',
		message: 'What is the URL for the repository?'
	}, {
		type: 'confirm',
		name: 'handlebars',
		message: 'Are handlebars templates going to be used?',
		default: false
	}];

	this.prompt(prompts, function (props) {
		this.projectName = props.projectName;
		this.slugProjectName = this._.slugify(this.projectName);
		this.version = props.version;
		this.jqueryVersion = props.jqueryVersion;
		this.handlebars = props.handlebars;

		cb();
	}.bind(this));
};

DigitariaGenerator.prototype.app = function app() {
	this.mkdir('app');
	this.mkdir('app/templates');

	this.copy('_package.json', 'package.json');
	this.copy('_bower.json', 'bower.json');
};

DigitariaGenerator.prototype.projectfiles = function projectfiles() {
	this.copy('editorconfig', '.editorconfig');
	this.copy('jshintrc', '.jshintrc');
};
