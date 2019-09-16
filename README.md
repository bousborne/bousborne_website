# Angular Version - ng --version
     _                      _                 ____ _     ___
    / \   _ __   __ _ _   _| | __ _ _ __     / ___| |   |_ _|
   / △ \ | '_ \ / _` | | | | |/ _` | '__|   | |   | |    | |
  / ___ \| | | | (_| | |_| | | (_| | |      | |___| |___ | |
 /_/   \_\_| |_|\__, |\__,_|_|\__,_|_|       \____|_____|___|
                |___/
    

Angular CLI: 7.1.0
Node: 11.2.0
OS: linux x64
Angular: 7.1.1
... animations, common, compiler, compiler-cli, core, forms
... language-service, platform-browser, platform-browser-dynamic
... router

Package                           Version
-----------------------------------------------------------
@angular-devkit/architect         0.11.0
@angular-devkit/build-angular     0.11.0
@angular-devkit/build-optimizer   0.11.0
@angular-devkit/build-webpack     0.11.0
@angular-devkit/core              7.1.0
@angular-devkit/schematics        7.1.0
@angular/cli                      7.1.0
@ngtools/webpack                  7.1.0
@schematics/angular               7.1.0
@schematics/update                0.11.0
rxjs                              6.3.3
typescript                        3.1.6
webpack                           4.23.1

# npm version 6.4.1

# Temp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Notes to self

This is run alongside mongoDB and nodejs. This is hosted on my pi. Deploy to /var/www/benousborne.com/html

Run node server with:
node --max_old_space_size=2000  server.js


## Testing

In one terminal, cd to api, then run
sudo node server.js
In another terminal, run
ng serve