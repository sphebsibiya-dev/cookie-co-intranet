declare interface ICountdownWebPartStrings {
  PropertyPaneDescription: string;
  ContentGroupName: string;
  TitleFieldLabel: string;
  SubtitleFieldLabel: string;
  TargetDateFieldLabel: string;
  TargetDateFieldDescription: string;
  TargetDateInvalid: string;
  FinishedTextFieldLabel: string;
}

declare module 'CountdownWebPartStrings' {
  const strings: ICountdownWebPartStrings;
  export = strings;
}
