import * as React from 'react';
import styles from './Propertypanes.module.scss';
import { IPropertypanesProps } from './IPropertypanesProps';
import { escape } from '@microsoft/sp-lodash-subset';


export default class Propertypanes extends React.Component<IPropertypanesProps, {}> {
  public render(): React.ReactElement<IPropertypanesProps> {
    return (
      <div className={ styles.propertypanes }>
        <div className={ styles.container }>
          <div className={ styles.row } style={{backgroundColor:this.props.color}} >
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <p className={ styles.description }>{(this.props.multiSelect.slice().join(","))}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
