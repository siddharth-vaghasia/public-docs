import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'PropertypanesWebPartStrings';
import Propertypanes from './components/Propertypanes';
import { IPropertypanesProps } from './components/IPropertypanesProps';
import { PropertyFieldMultiSelect } from '@pnp/spfx-property-controls/lib/PropertyFieldMultiSelect';
import { PropertyFieldColorPicker, PropertyFieldColorPickerStyle } from '@pnp/spfx-property-controls/lib/PropertyFieldColorPicker';

export interface IPropertypanesWebPartProps {
  description: string;
  multiSelect: string[];
  color: string;

}

export default class PropertypanesWebPart extends BaseClientSideWebPart<IPropertypanesWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IPropertypanesProps > = React.createElement(
      Propertypanes,
      {
        description: this.properties.description,
        multiSelect:this.properties.multiSelect,
        color:this.properties.color
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
                }),
                PropertyFieldMultiSelect('multiSelect', {
                  key: 'multiSelect',
                  label: "Multi select field",
                  options: [
                    {
                      key: "EN",
                      text: "EN"
                    },
                    {
                      key: "FR",
                      text: "FR"
                    },
                    {
                      key: "NL",
                      text: "NL"
                    }
                  ],
                  selectedKeys: this.properties.multiSelect
                }),
                PropertyFieldColorPicker('color', {
                  label: 'Color',
                  selectedColor: this.properties.color,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  isHidden: false,
                  alphaSliderHidden: false,
                  style: PropertyFieldColorPickerStyle.Full,
                  iconName: 'Precipitation',
                  key: 'colorFieldId'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
