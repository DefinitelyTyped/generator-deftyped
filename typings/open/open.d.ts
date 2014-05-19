// Type definitions for open v0.0.5
// Project: https://github.com/pwnall/node-open
// Definitions by: Diullei <http://github.com/Diullei>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

declare module 'open' {
    function openFn(url: string, browser?: string): void;
    module openFn {}
    export = openFn;
}
