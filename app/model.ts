/// <reference path="../typings/tsd.d.ts" />

'use strict';

export interface DefTypedAnswers extends inquirer.Answers {
    typingName: string;
    typingVersion: string;
    libraryUrl: string;
    githubName: string;
    useSuggestedPath: boolean;
    moreInfoAtTheEnd: boolean;
}
