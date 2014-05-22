/// <reference path="../typings/tsd.d.ts" />

import defHeader = require('../definition-header/src/index');
import model = require('../definition-header/src/model');

class Validator {

    private static validHeader() {
        return <model.Header>{
            label: <model.Label>{ name: 'typing_name', version: null },
            project: <model.Project>{ url: 'www.url.url' },
            authors: <model.Author[]>[{ name: 'author', url: 'www.author.url' }],
            repository: <model.Repository>{ url: 'www.repo.url' }
        };
    }

    private static validatorHelper(fn: (header: model.Header) => void): boolean {
        var header = Validator.validHeader();
        fn(header);
        try {
            defHeader.assert(header);
        } catch (e) {
            return false;
        }
        return true;
    }

    public static validateTypingName(value: string): boolean {
        return Validator.validatorHelper((header: model.Header) => {
            header.label.name = value;
        });
    }

    public static validateTypingVersion(value: string): boolean {
        return Validator.validatorHelper((header: model.Header) => {
            header.label.version = value;
        });
    }

    public static validateProjectUrl(value: string): boolean {
        return Validator.validatorHelper((header: model.Header) => {
            header.project.url = value;
        });
    }

    public static validateAuthorName(value: string): boolean {
        return Validator.validatorHelper((header: model.Header) => {
            header.authors[0].name = value;
        });
    }

    public static validateAuthorUrl(value: string): boolean {
        return Validator.validatorHelper((header: model.Header) => {
            header.authors[0].url = value;
        });
    }

    public static validateRepositoryUrl(value: string): boolean {
        return Validator.validatorHelper((header: model.Header) => {
            header.repository.url = value;
        });
    }
}

export = Validator;
