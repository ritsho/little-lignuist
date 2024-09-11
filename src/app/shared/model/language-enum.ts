export enum LanguageEnum {
  Hebrew = 'Hebrew',
  English = 'English',
}

export class LanguageEnumConverter {
  public static getLangFromInt(num: number): string {
    return Object.entries(LanguageEnum)[num][0];
  }
}
