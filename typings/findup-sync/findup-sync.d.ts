// Type definitions for findup-sync v0.1.3
// Project: https://github.com/cowboy/node-findup-sync
// Definitions by: Diullei <http://github.com/Diullei>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

declare module "findup-sync" {
    module findupSync {
        export interface FindupSyncOptions {
            cwd: string;
            nocase: boolean;
        }
    }
    function findupSync(pattern: string, options?: findupSync.FindupSyncOptions): string;
    export = findupSync;
}
