import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'ContentcontrolsWebPartStrings';
import Contentcontrols from './components/Contentcontrols';
import { IContentcontrolsProps } from './components/IContentcontrolsProps';

export interface IContentcontrolsWebPartProps {
  description: string;
}

export default class ContentcontrolsWebPart extends BaseClientSideWebPart<IContentcontrolsWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IContentcontrolsProps > = React.createElement(
      Contentcontrols,
      {
        description: this.properties.description,
        context:this.context
      }
    );

    ReactDom.render(element, this.domElement);
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
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
