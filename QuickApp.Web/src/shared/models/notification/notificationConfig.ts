export class NotificationConfig {
    Title: string;
    Message: string;
    Type:string;
    constructor(title: string, message: string, type: string) {
        this.Title = title;
        this.Message = message;
        this.Type = type;
    }
}