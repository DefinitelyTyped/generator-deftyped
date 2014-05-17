declare module chalk {
    export interface ChalkStyle {
        (...text: string[]): ChalkStyle;

        // General
        reset: ChalkStyle;
        bold: ChalkStyle;
        italic: ChalkStyle;
        underline: ChalkStyle;
        inverse: ChalkStyle;
        strikethrough: ChalkStyle;

        // Text colors
        black: ChalkStyle;
        red: ChalkStyle;
        green: ChalkStyle;
        yellow: ChalkStyle;
        blue: ChalkStyle;
        magenta: ChalkStyle;
        cyan: ChalkStyle;
        white: ChalkStyle;
        gray: ChalkStyle;

        // Background colors
        bgBlack: ChalkStyle;
        bgRed: ChalkStyle;
        bgGreen: ChalkStyle;
        bgYellow: ChalkStyle;
        bgBlue: ChalkStyle;
        bgMagenta: ChalkStyle;
        bgCyan: ChalkStyle;
        bgWhite: ChalkStyle;

        enabled: Boolean;
        supportsColor: any;
        styles: ChalkStyle;
        stripColor(value: string): any;
    }

    export var reset: ChalkStyle;
    export var bold: ChalkStyle;
    export var italic: ChalkStyle;
    export var underline: ChalkStyle;
    export var inverse: ChalkStyle;
    export var strikethrough: ChalkStyle;

    // Text colors
    export var black: ChalkStyle;
    export var red: ChalkStyle;
    export var green: ChalkStyle;
    export var yellow: ChalkStyle;
    export var blue: ChalkStyle;
    export var magenta: ChalkStyle;
    export var cyan: ChalkStyle;
    export var white: ChalkStyle;
    export var gray: ChalkStyle;

    // Background colors
    export var bgBlack: ChalkStyle;
    export var bgRed: ChalkStyle;
    export var bgGreen: ChalkStyle;
    export var bgYellow: ChalkStyle;
    export var bgBlue: ChalkStyle;
    export var bgMagenta: ChalkStyle;
    export var bgCyan: ChalkStyle;
    export var bgWhite: ChalkStyle;

    export var enabled: Boolean;
    export var supportsColor: any;
    export var styles: ChalkStyle;
    export function  stripColor(value: string): any;

}

declare module "chalk" {
    export = chalk;
}

