'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var DigitariaGenerator = module.exports = function DigitariaGenerator(args, options, config) {
	yeoman.generators.Base.apply(this, arguments);

	this.on('end', function () {
		console.log('B');
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
		this.repository = props.repository;
		this.handlebars = props.handlebars;

		cb();
	}.bind(this));
};

// DigitariaGenerator.prototype.gruntfile = function () {
// 	this.template('Gruntfile.js', 'Gruntfile.js');
// };

// DigitariaGenerator.prototype.git = function () {
// 	this.copy('gitignore', '.gitignore');
// };

// DigitariaGenerator.prototype.jshint = function () {
// 	this.copy('jshint', '.jshint');
// };

// DigitariaGenerator.prototype.editorconfig = function () {
// 	this.copy('editorconfig', '.editorconfig');
// };

// DigitariaGenerator.prototype.sass = function () {
// 	// create sass folder structure
// 	// this.mkdir('css');
// 	// this.mkdir('css/sass');
// 	// this.mkdir('css/sass/buttons');
//  //    this.mkdir('css/sass/forms');
//  //    this.mkdir('css/sass/layouts');
//  //    this.mkdir('css/sass/modules');
//  //    this.mkdir('css/sass/typography');
//  //    this.mkdir('css/sass/vendor');

//     // copy sass default files
//     this.directory('css', 'css');
// };

// DigitariaGenerator.prototype.js = function () {
// 	this.mkdir('js');
// 	this.mkdir('js');
// };

DigitariaGenerator.prototype.app = function app() {
	this.mkdir('app');
	this.mkdir('app/templates');

	this.template('_package.json', 'package.json');
	this.template('_bower.json', 'bower.json');
};

// DigitariaGenerator.prototype.projectfiles = function projectfiles() {
// 	console.log('A');
// 	this.copy('editorconfig', '.editorconfig');
// 	this.copy('jshintrc', '.jshintrc');
// };
