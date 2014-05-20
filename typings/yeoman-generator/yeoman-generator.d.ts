/// <reference path="../inquirer/inquirer.d.ts" />

declare module yeoman {
    export module generators {
        export class Base {
            static extend(obj: any);
        }
    }

    export var test: any;
}

declare module "yeoman-generator" {
    export = yeoman;
}
