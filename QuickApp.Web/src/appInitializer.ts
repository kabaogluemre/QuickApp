import { Injector } from '@angular/core';
import { LocalizationService } from '@shared/services/localizationService';
import { SessionService } from '@shared/services/sessionService';

export class AppInitializer {
    // Wait until the localizations and session has been loaded
    static run(injector: Injector): Promise<any> { 
        var localizationService: LocalizationService = injector.get(LocalizationService);
        var sessionService: SessionService = injector.get(SessionService);
        let localizationPromise = localizationService.init();
        let sessionPromise = sessionService.init();
        return Promise.all([localizationPromise, sessionPromise]);
    }
}