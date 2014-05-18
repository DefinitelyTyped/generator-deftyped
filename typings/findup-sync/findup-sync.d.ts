interface FindupSyncOptions {
    cwd: string;
    nocase: boolean;
}

interface FindupSync {
    (pattern: string, options?: FindupSyncOptions): string;
}

declare module "findup-sync" {
    export = FindupSync;
}
