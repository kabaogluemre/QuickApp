export class ReturnUrlHelper {
    static readonly initialUrl = location.href;

    static getQueryParameters(): any {
        return document.location.search.replace(/(^\?)/, '').split("&").map(function (n: any) { return n = n.split("="), this[n[0]] = n[1], this }.bind({}))[0];
    }
}