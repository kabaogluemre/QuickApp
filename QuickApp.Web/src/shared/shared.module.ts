import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { CookieModule } from 'ngx-cookie';

//Inject them
import { LocalizationService } from '@shared/services/localizationService';
import { SessionService } from '@shared/services/sessionService';
import { RouteGuard } from '@shared/auth/route-guard';
import { CookieUtil } from '@shared/utils/cookieUtil';

//Shared
import { ConfirmationDialog } from '@shared/directives/confirmationDialog.component';

@NgModule({
    imports: [
        CommonModule,
        Ng2Bs3ModalModule,
        CookieModule.forRoot()
    ],
    declarations: [
        ConfirmationDialog
    ],
    exports: [
        ConfirmationDialog //Important for identify selectors in the another modules
    ]
})

export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                LocalizationService,
                SessionService,
                RouteGuard,
                CookieUtil
            ]
        }
    }
}