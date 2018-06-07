import { NotificationConfig } from '@shared/models/notification/notificationConfig';

declare var NotificationUI: any;
export class NotificationService {
    static show(config: NotificationConfig):void {
        NotificationUI.showMessage(config.Title,config.Message,config.Type);
    }
}