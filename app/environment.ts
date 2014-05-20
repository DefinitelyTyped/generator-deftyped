/// <reference path="../typings/tsd.d.ts" />

'use strict';

import path = require('path');
import findup = require('findup-sync');

interface IEnvironment {
    verify(): boolean;
    getRoot(): string;
}

class DefTypedEnvironment implements IEnvironment {
    verify(): boolean {
        var pkg = findup('package.json');

        if (pkg == null) {
            return false;
        }

        var pkgFile = require(pkg);
        return pkgFile.name === 'DefinitelyTyped';
    }

    public getRoot(): string {
        if (this.verify()) {
            var root = path.dirname(findup('package.json'));
            return path.resolve(root);
        }
        return null;
    }
}

class TsdEnvironment implements IEnvironment {
    path: string;

    verify(): boolean {
        var pkg = findup('tsd.json');

        if (pkg == null) {
            return false;
        }

        var pkgFile = require(pkg);

        var root = path.dirname(findup('tsd.json'));
        this.path = path.join(path.resolve(root), pkgFile.path);

        return pkgFile.path != null;
    }

    public getRoot(): string {
        if (this.verify()) {
            return path.resolve(this.path);
        }
        return null;
    }
}

export function isDefTypedEnvironment(): boolean {
    var env = new DefTypedEnvironment();
    return env.verify();
}

export function defTypedRoot(): string {
    var env = new DefTypedEnvironment();
    return env.getRoot();
}

export function isTsdEnvironment(): boolean {
    var env = new TsdEnvironment();
    return env.verify();
}

export function tsdRoot(): string {
    var env = new TsdEnvironment();
    return env.getRoot();
}
