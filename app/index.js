'use strict';
var util = require('util'),
	path = require('path'),
	yeoman = require('yeoman-generator');


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
		name: 'repository',
		message: 'What is the URL for the repository?'
	}, {
		type: 'list',
		name: 'projectType',
		message: 'What type of project is this?',
		choices: [{
			name: 'Drupal',
			value: 'isDrupal'
		}, {
			name: 'SiteCore',
			value: 'isSitecore'
		}, {
			name: 'Generic',
			value: 'isGeneric'
		}],
		default: 2
	}, {
		type: 'checkbox',
		name: 'libs',
		message: 'Along with jQuery, which libraries would you like to include?',
		choices: [{
			name: 'Modernizr',
			value: 'hasModernizr',
			checked: true
		}, {
			name: 'Uniform.js',
			value: 'hasUniform',
			checked: false
		}, {
			name: 'Handlebars.js',
			value: 'hasHandlebars',
			checked: false
		}]
	}];

	this.prompt(prompts, function (props) {
		var libs = props.libs;

		function hasLibrary(lib) {
			return libs.indexOf(lib) !== -1;
		}

		this.projectName = props.projectName;
		this.slugProjectName = this._.slugify(this.projectName);
		this.version = props.version;
		this.repository = props.repository;
		this.projectType = props.projectType;

		// find out which libraries to include
		// this.includeJquery = hasLibrary('hasJquery');
		this.includeModernizr = hasLibrary('hasModernizr');
		this.includeUniform = hasLibrary('hasUniform');
		this.includeHandlebars = hasLibrary('hasHandlebars');

		cb();
	}.bind(this));
};

DigitariaGenerator.prototype.compassConfig = function () {
	var path;
	switch (this.projectType) {
		case 'isDrupal':
			path = 'sites/all/themes/' + this.slugProjectName;
			break;
		case 'isSitecore':
		case 'isGeneric':
			path = '/';
			break;
	}
	this.configRbPath = path;
	this.template('_config.rb', 'config.rb');
};

DigitariaGenerator.prototype.packageJSON = function () {
	this.template('_package.json', 'package.json');
};

DigitariaGenerator.prototype.bower = function () {
	this.template('_bower.json', 'bower.json');
};

DigitariaGenerator.prototype.gruntfile = function () {
	this.template('Gruntfile.js', 'Gruntfile.js');
};

DigitariaGenerator.prototype.git = function () {
	this.copy('gitignore', '.gitignore');
};

DigitariaGenerator.prototype.jshint = function () {
	this.copy('jshintrc', '.jshintrc');
};

DigitariaGenerator.prototype.editorconfig = function () {
	this.copy('editorconfig', '.editorconfig');
};

DigitariaGenerator.prototype.sass = function () {
    // copy sass default files
    this.directory('css', 'css');

    // create folder structure
	this.mkdir('css/sass/buttons');
	this.mkdir('css/sass/forms');
	this.mkdir('css/sass/layouts');
	this.mkdir('css/sass/modules');
	this.mkdir('css/sass/typography');
	this.mkdir('css/sass/vendor');
};

DigitariaGenerator.prototype.js = function () {
    this.mkdir('js');
    this.mkdir('js/vendor');
    this.copy('js/name.js', 'js/' + this.slugProjectName + '.js');
};

DigitariaGenerator.prototype.misc = function () {
    this.mkdir('images');
    this.mkdir('fonts');
};

DigitariaGenerator.prototype.writeIndex = function writeIndex() {
    var sourceFileListArr = ['bower_components/jquery/jquery.js'];

    this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'index.html'));
    this.indexFile = this.engine(this.indexFile, this);

    if (this.includeUniform) {
        sourceFileListArr.push('bower_components/jquery.uniform/jquery.uniform.min.js');
    }

    if (this.includeHandlebars) {
        sourceFileListArr.push('bower_components/handlebars/handlebars.min.js');
    }

    // this.indexFile = this.appendScripts(this.indexFile, 'scripts/plugins.js', sourceFileListArr)
    sourceFileListArr.push('js/' + this.slugProjectName + '.js');

    this.indexFile = this.appendFiles({
        html: this.indexFile,
        fileType: 'js',
        optimizedPath: 'js/' + this.slugProjectName + '.min.js',
        sourceFileList: sourceFileListArr
    });

    this.write('index.html', this.indexFile);
};
