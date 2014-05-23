/// <reference path="../typings/tsd.d.ts" />

import defHeader = require('../definition-header/src/index');
import model = require('../definition-header/src/model');

export function serialize(
    typingName: string,
    typingVersion: string,
    projectUrl: string,
    authorName: string,
    authorUrl: string,
    repositoryUrl: string) {
    return defHeader.stringify(<model.Header>{
        label: <model.Label>{ name: typingName, version: typingVersion },
        project: <model.Project>{ url: projectUrl },
        authors: <model.Author[]>[{ name: authorName, url: authorUrl }],
        repository: <model.Repository>{ url: repositoryUrl }
    }).join('\n');
}
