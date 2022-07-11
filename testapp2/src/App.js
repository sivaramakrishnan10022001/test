import './App.css';
import React, { useState, useEffect } from 'react';
import { ListView } from './components/ListView';
import { SampleCompOne } from './components/samplecomp/SampleCompOne';
import SortableComponent from "./demo/demo";

import Dnd from './dnd/dnd';
import DragDrop from './DragDrop';
// import Learn from './learn';
import { TreeView } from './sampletest';


function App() {

  const [categories, setCategories] = useState([]);
  const [reload, setReload] = useState(false);
  const [selectedItem, setSelectedItem] = useState();

  const data = [
    {
      title: "A1",
      name: "title1",
    },
    {
      title: "A2",
      name: "title1",
    },
    {
      title: "A3",
      name: "title1",
    },
    {
      title: "A4",
      name: "title1",
    },
    {
      title: "A5",
      name: "title1",
    },
    {
      title: "A6",
      name: "title1",
    },
  ]

  // simple list view
  // animated list view with entry animation
  // reorderable list with no entry animation only drag and rearrange dragoption={fulldrag / icondrag}


  // click enabled list view with ripple effect
  // hover to give options
  // sorting list view
  // complete dragable on edit
  // pagination
  // sub list with child view or tree view


  // list view with drag and rearrange : {whole item / icon drag}
  // list view with content menu
  // list view with animation

  const treeList = {
    "categories": [
      {
        "id": "buttons",
        "title": "Buttons"
      },
      {
        "children": [
          {
            "children": [
              {
                "id": "textboxes",
                "title": "Textboxes"
              },
              {
                "id": "passwordboxes",
                "title": "Passwordboxes"
              },
              {
                "id": "textareas",
                "title": "Textareas"
              }
            ],
            "id": "textinputs",
            "title": "Text Inputs"
          },
          {
            "children": [
              {
                "id": "radios",
                "title": "Radios"
              },
              {
                "id": "dropdowns",
                "title": "Dropdowns"
              },
              {
                "id": "chips",
                "title": "Chips"
              }
            ],
            "id": "singleselection",
            "title": "Single Selection"
          },
          {
            "children": [
              {
                "id": "checkboxes",
                "title": "Checkboxes"
              },
              {
                "id": "chips",
                "title": "Chips"
              }
            ],
            "id": "multiselection",
            "title": "Multi Selection"
          },
          {
            "id": "datetime pickers",
            "title": "Date Time Pickers"
          },
          {
            "id": "fileuploads",
            "title": "File Uploads"
          },
          {
            "id": "ratings",
            "title": "Ratings"
          },
          {
            "id": "sliders",
            "title": "Sliders"
          },
          {
            "id": "consentinputs",
            "title": "Consent Inputs"
          }
        ],
        "id": "forminputs",
        "title": "Form Inputs"
      },
      {
        "children": [
          {
            "id": "listviews",
            "title": "Listviews"
          },
          {
            "id": "tables",
            "title": "Tables"
          },
          {
            "id": "carousels",
            "title": "Carousels"
          }
        ],
        "id": "informationdisplay",
        "title": "Information Display"
      },
      {
        "children": [
          {
            "id": "progressindicators",
            "title": "Progress Indicators"
          },
          {
            "id": "timers",
            "title": "Timers"
          }
        ],
        "id": "indicators",
        "title": "Indicators"
      },
      {
        "children": [
          {
            "id": "breadcrumbs",
            "title": "Bread Crumbs"
          },
          {
            "id": "steppers",
            "title": "Steppers"
          },
          {
            "id": "tabs",
            "title": "Tabs"
          }
        ],
        "id": "navigations",
        "title": "Navigations"
      },
      {
        "children": [
          {
            "id": "chartjs",
            "title": "ChartJs"
          },
          {
            "id": "googlecharts",
            "title": "Google Charts"
          }
        ],
        "id": "charts",
        "title": "Charts"
      }
    ]
  }
  useEffect(() => {
    setCategories(treeList.categories);

  }, []);

  const onTreeElementClick = (item) => {
    if (item.children) {
      //TODO: just hacked this way. find best way to do this.
      // not changing address location of parent tree, tree has to reload.
      item.expanded = !item.expanded;

      setReload(!reload);
    } else {
      // item clicked
      setSelectedItem(item);
    }
  }

  return (
    <div className="App" >
      {/* <div className="test"></div> */}

      <SortableComponent />
      <Dnd />

      <DragDrop />

      {/* <Learn className="sample" /> */}

      <ListView className="sample" position="left" data={data} itemTemplate={SampleCompOne} mapping={{
        symbol: "title",
        company: "name"
      }} />

      <TreeView list={categories} onItemClick={onTreeElementClick} />







    </div >
  );
}

export default App;
