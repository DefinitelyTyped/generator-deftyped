# generator-deftyped 

> [Yeoman](http://yeoman.io/) generator for [DefinitelyTyped](https://github.com/borisyankov/DefinitelyTyped) typings - lets you quickly set up a `typing` directory with a minimal template.

## Dependencies

To execute the deftyped generator you will need some npm packages:

* Yeoman

```bash
$ npm install -g yo
```

* Typescript

```bash
npm install -g typescript
```

* Grunt CLI

```bash
npm install -g grunt-cli
```

## Getting Started

This generator will sets up a new DefinitelyTyped typing template, generating the basic files you need to get started.

Clone this project

```bash
$ git clone [url]
```

Go to project directory and install npm dependencies

```bash
$ npm install
```

Build the typescript code using grunt

```bash
$ grunt
```

To run the generator to test while you still developing and improving the code you will need a symbolic link to project directory. To do that, run:

```bash
$ npm link
```

Goto another directory and execute the generator to test. Example:

```bash
yo deftyped
```

You will need to answer a little questions.

```bash
   ___ _____                  _
  |   \_   _|  _ _ __  ___ __| |
  | |) || || || | '_ \/ -_) _` |
  |___/ |_| \_, | .__/\___\__,_|
            |__/|_|

 Welcome to DefinitelyTyped typing boilerplate!

[?] Please, inform the typing name? jquery-abc
[?] What the typing version? 1.0.0
[?] What the project library url? http://jquery-abc.org
[?] Inform your Github name? Diullei

...

``` 

This will generate the following stuff:

``` 
- jquery-abc
   ├── jquery-abc.d.ts
   ├── jquery-abc-tests.ts
   └── jquery-abc-tests.ts.tscparams
``` 

Now all you need to do is edit the files, start to write the typing and send in a Pull Request!

## TODO

* Improve de question validations
* Improve template files
* Improve READ Getting Started section