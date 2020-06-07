import * as React from 'react';
import styles from './Listviewdemo.module.scss';
import { IListviewdemoProps } from './IListviewdemoProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { ListView, IViewField, SelectionMode, GroupOrder, IGrouping } from "@pnp/spfx-controls-react/lib/ListView";
//importsp
 import { sp } from "@pnp/sp";

//listviewdemostate
export interface IListviewdemoState {
  items:any[];
  lists:string |string[];
}

export default class Listviewdemo extends React.Component<IListviewdemoProps,IListviewdemoState> {

//listviewconstructor
constructor(props: IListviewdemoProps,state:IListviewdemoState) {
    super(props);
    this.state = { items:[],lists:this.props.lists};
}


//listviewmount
public componentDidMount() {
  if (this.props.lists !== null && this.props.lists !== "" && this.props.lists !== undefined) {
    this._getItems();
  }
}


 //listviewgetitems
  private async _getItems() {
     let select = '*';
     let expand = 'File';
     let filter = '';
 
     var listID:string = this.props.lists.toString();
    const items = await sp.web.lists.getById(listID).items
       .select(select)
       .expand(expand)
       .filter(filter)
       .get();
 
     // update state
     this.setState({
       items: items ? items : []
     });
     console.log('List Items:', this.state.items);
   }
  

//listviewfieldsvariable
private viewFields: IViewField[] = [
  {
    name: "Id",
    displayName: "ID",
    maxWidth: 25,
    minWidth: 25,
    sorting: true
  },
  {
    name: "File.Name",
    linkPropertyName: "File.ServerRelativeUrl",
    displayName: "Name",
    sorting: true,
    render: (item: any) => {
      if(item["File.Name"] == "" || item["File.Name"] == undefined)
      {
        return item["Title"];
        //<a href={item['File.ServerRelativeUrl']}>{item['File.Name']}</a>;
      }
      else{
        return  <a href={item['File.ServerRelativeUrl']}>{item['File.Name']}</a>;
      }
    }
  }
];


//listviewcompupdate
public componentDidUpdate(prevProps, prevState) {
  //If statement checking if your property or state has changed.
  //Re run API call
  if(prevProps.lists != this.props.lists) 
  {
    this._getItems();
  }
}

public render(): React.ReactElement<IListviewdemoProps> {
    return (
      <div className={ styles.listviewdemo }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
        </div>

        <ListView
  items={this.state.items}
  viewFields={this.viewFields}
  iconFieldName="ServerRelativeUrl"
  compact={true}
  selectionMode={SelectionMode.multiple}
  selection={this._getSelection}
  showFilter={true}
  defaultFilter=""
  filterPlaceHolder="Search..."
   />
      </div>
    );
  }

  private _getSelection(items: any[]) {
    console.log('Selected items:', items);
  }
}
