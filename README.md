=======
generator-digitaria [![Build Status](https://secure.travis-ci.org/mturnwall/generator-digitaria.png?branch=master)](https://travis-ci.org/mturnwall/generator-digitaria)
===================

This document contains instructions on how to setup and use both [Yeoman](http://yeoman.io) and [grunt.js](gruntjs.com) for project scaffolding and task running. This helps to standardize the front-end department’s workflow.

## Dependencies to Install

- Node.js - includes npm
- Compass - also installs SASS
- Yeoman - this will also install Grunt.js and Bower
- Sass-globbing
- Editorconfig plugin for their IDE

### Node.js

The easiest way to go to the Node.js [download page](http://nodejs.org/download/) and pick the installer for your operating system.

If you use homebrew on Mac OS you can also use homebrew to install, `brew install node`.

### NPM

This was installed when you installed Node.js. You can verify that npm is installed by running `node -v` from your terminal.

### Yeoman

From your terminal run `npm install -g yo`

This will install the Grunt.js and Bower dependencies. You will also need to install the Digitaria generator:
`npm install -g generator-digitaria`

###Compass

This is as simple as installing a couple of Ruby gems.

1. $ gem update --system
2. $ gem install compass

###Sass-globbing

This is a ruby gem so you install with `gem install sass-globbing`, https://github.com/chriseppstein/sass-globbing

### Editorconfig

Installing editorconfig will be determinate on which text-editor (IDE) you use. You can find a plugin for all the major plugins at http://editorconfig.org/#download

When on a project that uses Editorconfig be sure not to change make changes to the format settings in your IDE such as using tabs or spaces for indenting.

## Setup and Usage

### Quick setup

These commands need to be run from your terminal. If it’s a Drupal project be sure to do these steps in the correct theme folder.

1. Navigate to where you want to install the project.
2. Run the generator - $ yo digitaria
3. Install modules - $ npm install
4. Start the grunt server for watch and livereload - $ grunt serve

### Using the Generator

The Yeoman generator is used to set up and scaffold the front-end for a new project. Digitaria has created their own generator tailored to Digitaria projects.

You should have all the dependencies installed. If not be sure to install them from this list. Once you have everything installed using the generator is as simple as `yo digitaria`

You will be asked a series of questions such as the name of your project and if the project is for Drupal or Sitecore. If the question has a default it’ll be wrapped in parenthesis at the end of the question. Just hitting enter chooses the default answer. Once the generator is finished running you will need to run `npm install`

That command will install the default dependencies for the project. Once that is finished you will have a directory structure that looks like this:

### Using Grunt.js

Once the project is setup Grunt.js is used as the task runner. Grunt.js will handle tasks such as compiling SASS and running javascript through JSHint. Grunt is run from your terminal. You can simply navigate to your project folder where the Gruntfile.js is found and type `grunt` followed by the name of a task. If you just type `grunt` than the default task is run. You can view which tasks are available by looking in the Gruntfile.js. The methods `grunt.registerTask` are where the tasks are declared. The first argument is the name of the task and the second argument is an array of what commands are run for that particular task.

The task you will use the most is `grunt serve`. This task will start a server so that whenever you make changes to your code anything that needs to be compiled will be compiled and your browser will refresh itself. If you don’t want the livereload portion you can just use `grunt watch` instead to just compile files as they change.

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

