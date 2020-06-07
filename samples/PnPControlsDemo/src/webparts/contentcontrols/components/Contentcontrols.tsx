import * as React from 'react';
import styles from './Contentcontrols.module.scss';
import { IContentcontrolsProps } from './IContentcontrolsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { FilePicker, IFilePickerResult } from '@pnp/spfx-controls-react/lib/FilePicker';
import { IButtonProps, PrimaryButton } from 'office-ui-fabric-react/lib/Button'; 
import { TaxonomyPicker, IPickerTerms } from "@pnp/spfx-controls-react/lib/TaxonomyPicker";
import { TreeView, ITreeItem, TreeViewSelectionMode, TreeItemActionsDisplayMode } from "@pnp/spfx-controls-react/lib/TreeView";

export interface IContentcontrolsState{
  filePickerResult:IFilePickerResult;
}

export default class Contentcontrols extends React.Component<IContentcontrolsProps,IContentcontrolsState> {

  private items =  [
    {
      key: "R1",
      label: "Root",
      subLabel: "This is a sub label for node",
      
      actions: [{
        title: "Get item",
        iconProps: {
          iconName: 'Warning',
          style: {
            color: 'salmon',
          },
        },
        id: "GetItem",
        actionCallback: async (treeItem: ITreeItem) => {
          console.log(treeItem);
        }
      }],
      children: [
        {
          key: "1",
          label: "Parent 1",
          selectable: false,
          children: [
            {
              key: "3",
              label: "Child 1",
              subLabel: "This is a sub label for node",
              actions: [{
                title:"Share",
                iconProps: {
                  iconName: 'Share'
                },
                id: "GetItem",
                actionCallback: async (treeItem: ITreeItem) => {
                  console.log(treeItem);
                }
              }],
              children: [
                {
                  key: "gc1",
                  label: "Grand Child 1",
                  actions: [{
                    title: "Get Grand Child item",
                    iconProps: {
                      iconName: 'Mail'
                    },
                    id: "GetItem",
                    actionCallback: async (treeItem: ITreeItem) => {
                      console.log(treeItem);
                    }
                  }]
                }
              ]
            },
            {
              key: "4",
              label: "Child 2"
              
            }
          ]
        },
        {
          key: "2",
          label: "Parent 2"
        },
        {
          key: "5",
          label: "Parent 3",
          disabled: true
        },
        {
          key: "6",
          label: "Parent 4",
          selectable: true
        }
      ]
    },
    {
      key: "R2",
      label: "Root 2",
      children: [
        {
          key: "8",
          label: "Parent 5"
        }
      ]
    }
  ];
  constructor (props:IContentcontrolsProps,state:IContentcontrolsState) {
      super(props);
      this.state ={filePickerResult:null};
      
    }

  public render(): React.ReactElement<IContentcontrolsProps> {
    return (
      <div className={styles.contentcontrols}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>Welcome to SharePoint!</span>
              <p className={styles.subTitle}>Customize SharePoint experiences using Web Parts.</p>
              <p className={styles.description}>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={styles.button}>
                <span className={styles.label}>Learn more</span>
              </a>
            </div>
          </div>
          <br></br>
          <br></br>
          <br></br>

          <FilePicker
  bingAPIKey="<BING API KEY>"
  accepts= {[".gif", ".jpg", ".jpeg", ".bmp", ".dib", ".tif", ".tiff", ".ico", ".png", ".jxr", ".svg"]}
  buttonLabel="Select File"
  onSave={(filePickerResult: IFilePickerResult) => { this.setState({filePickerResult }) }}
  onChanged={(filePickerResult: IFilePickerResult) => { this.setState({filePickerResult }) }}
  context={this.props.context}
/>

<br></br>
<br></br>


<TaxonomyPicker allowMultipleSelections={true}
                termsetNameOrID="Countries"
                panelTitle="Select Term"
                label="Taxonomy Picker"
                context={this.props.context}
                onChange={this.onTaxPickerChange}
                isTermSetSelectable={false} />




<br></br>
<br></br>

<TreeView 
    items={this.items}
    defaultExpanded={false}
    selectionMode={TreeViewSelectionMode.Multiple}
    selectChildrenIfParentSelected={true}
    showCheckboxes={true}
    treeItemActionsDisplayMode={TreeItemActionsDisplayMode.ContextualMenu}
    defaultSelectedKeys={['key1', 'key2']}
    onSelect={this.onTreeItemSelect}
    onExpandCollapse={this.onTreeItemExpandCollapse}
    />

<PrimaryButton    
  data-automation-id="submit"    
  text="Submit"    
  onClick={()=>this.submit()} />

        </div>
      </div>
    );
  }

 private submit(){
   alert(JSON.stringify(this.state.filePickerResult));
 }

 private onTaxPickerChange(terms : IPickerTerms) {
  alert(JSON.stringify(terms));
}

private onTreeItemSelect(items: ITreeItem[]) {
  console.log("Items selected: ", items);
}

private onTreeItemExpandCollapse(item: ITreeItem, isExpanded: boolean) {
  console.log((isExpanded ? "Item expanded: " : "Item collapsed: ") + item);  
}


}
