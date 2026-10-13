import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'HeroWebPartStrings';
import Hero from './components/Hero';
import { IHeroProps } from './components/IHeroProps';

export interface IHeroWebPartProps {
  tagText: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonUrl: string;
  backgroundImageUrl: string;
}

export default class HeroWebPart extends BaseClientSideWebPart<IHeroWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IHeroProps> = React.createElement(
      Hero,
      {
        tagText: this.properties.tagText,
        title: this.properties.title,
        subtitle: this.properties.subtitle,
        buttonText: this.properties.buttonText,
        buttonUrl: this.properties.buttonUrl,
        backgroundImageUrl: this.properties.backgroundImageUrl
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.ContentGroupName,
              groupFields: [
                PropertyPaneTextField('tagText', {
                  label: strings.TagTextFieldLabel
                }),
                PropertyPaneTextField('title', {
                  label: strings.TitleFieldLabel
                }),
                PropertyPaneTextField('subtitle', {
                  label: strings.SubtitleFieldLabel,
                  multiline: true
                }),
                PropertyPaneTextField('buttonText', {
                  label: strings.ButtonTextFieldLabel
                }),
                PropertyPaneTextField('buttonUrl', {
                  label: strings.ButtonUrlFieldLabel
                }),
                PropertyPaneTextField('backgroundImageUrl', {
                  label: strings.BackgroundImageUrlFieldLabel,
                  description: strings.BackgroundImageUrlFieldDescription
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
