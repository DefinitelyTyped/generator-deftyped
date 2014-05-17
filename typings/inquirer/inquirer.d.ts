declare module inquirer {

    export interface Question {
        type?: string;
        name: string;
        message: string;
        choices?: any;
        validate?: (answers: string) => any;
        filter?: Function;
        when?: Function;
        default?: any;
    }

    export interface Answers {
        (): { [key: string]: any };
    }

    //export var ui: any;

    export module ui {
        export interface BottomBar {
        }
    }

    export function prompt(question: Question, callback: (answers: Answers) => any);
    export function prompt(question: Array<Question>, callback: (answers: Answers) => any);
    export function prompt(question: Question, callback: <T extends Answers>(answers: T) => any);
    export function prompt(question: Array<Question>, callback: <T extends Answers>(answers: T) => any);

    export function Separator(): any;
}

declare module "inquirer" {
    export = inquirer;
}
