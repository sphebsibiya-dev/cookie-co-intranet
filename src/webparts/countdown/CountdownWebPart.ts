import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'CountdownWebPartStrings';
import Countdown from './components/Countdown';
import { ICountdownProps } from './components/ICountdownProps';

export interface ICountdownWebPartProps {
  title: string;
  subtitle: string;
  targetDate: string;
  finishedText: string;
}

export default class CountdownWebPart extends BaseClientSideWebPart<ICountdownWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ICountdownProps> = React.createElement(
      Countdown,
      {
        title: this.properties.title,
        subtitle: this.properties.subtitle,
        targetDate: this.properties.targetDate,
        finishedText: this.properties.finishedText
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

  private _validateTargetDate(value: string): string {
    return isNaN(Date.parse(value)) ? strings.TargetDateInvalid : '';
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
                PropertyPaneTextField('title', {
                  label: strings.TitleFieldLabel
                }),
                PropertyPaneTextField('subtitle', {
                  label: strings.SubtitleFieldLabel,
                  multiline: true
                }),
                PropertyPaneTextField('targetDate', {
                  label: strings.TargetDateFieldLabel,
                  description: strings.TargetDateFieldDescription,
                  onGetErrorMessage: (value: string) => this._validateTargetDate(value)
                }),
                PropertyPaneTextField('finishedText', {
                  label: strings.FinishedTextFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
