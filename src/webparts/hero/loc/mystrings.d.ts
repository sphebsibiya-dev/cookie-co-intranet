declare interface IHeroWebPartStrings {
  PropertyPaneDescription: string;
  ContentGroupName: string;
  TagTextFieldLabel: string;
  TitleFieldLabel: string;
  SubtitleFieldLabel: string;
  ButtonTextFieldLabel: string;
  ButtonUrlFieldLabel: string;
  BackgroundImageUrlFieldLabel: string;
  BackgroundImageUrlFieldDescription: string;
}

declare module 'HeroWebPartStrings' {
  const strings: IHeroWebPartStrings;
  export = strings;
}
