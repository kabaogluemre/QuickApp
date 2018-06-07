import { Injector } from '@angular/core';

import { LocalizationService } from './services/localizationService';
import { SessionService } from './services/sessionService';
import { UserSessionInfoDto } from "@shared/models/session/userSessionInfoDto";
import { LanguageInfoDto } from "@shared/models/session/languageInfoDto";

declare var Metronic: any;

export abstract class BaseComponent {
    private localizationService: LocalizationService;
    private sessionService: SessionService;
    constructor(injector: Injector) {
        this.localizationService = injector.get(LocalizationService);
        this.sessionService = injector.get(SessionService);
    }

    protected loc(key: string): string {
        return this.localizationService.getLocalizedText(key);
    };

    get currentUser(): UserSessionInfoDto {
        return this.sessionService.currentUser;
    }

    get currentLanguage(): LanguageInfoDto {
        return this.sessionService.currentLanguage;
    }
    get languages(): LanguageInfoDto[] {
        return this.sessionService.languages;
    }
    protected isGranted(permissionName: string): boolean {
        return this.sessionService.isGranted(permissionName);
    };

    protected setUIBusy(): void {
        Metronic.blockUI();
    }

    protected removeUIBusy(): void {
        Metronic.unblockUI();
    }
}