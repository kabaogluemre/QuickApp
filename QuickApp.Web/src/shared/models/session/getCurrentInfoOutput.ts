import { UserSessionInfoDto } from './userSessionInfoDto'
import { LanguageInfoDto } from "@shared/models/session/languageInfoDto";

export class GetCurrentInfoOutput {
    CurrentUser: UserSessionInfoDto;
    Languages: LanguageInfoDto[];
}