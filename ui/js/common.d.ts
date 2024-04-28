declare namespace App {
    function log(...msg: any[]): void;
}
declare namespace UI {
    function isElement(o: any): boolean;
    namespace Card {
        function create(options?: any): HTMLDivElement;
    }
    namespace EJS {
        function escape2Html(str: any): any;
        function renderImg(src: any, cls: any, alt: any): string;
        function renderTagProperty(flag: any, value: any): any;
        function renderWithEjsComponent(target: any, template: any, data: any): Promise<void>;
        function renderWithEjsTemplte(target: any, template: any, data: any): void;
        function render(target: any, template: any, data: any): void;
    }
    namespace HUD {
        export function show(): void;
        export function hide(id?: any): void;
        export function create_1(content?: any, mask?: boolean): HTMLDivElement;
        export { create_1 as create };
        export function showDialog(options: any): string;
        export function showLoading(showMask?: boolean): string;
    }
}
