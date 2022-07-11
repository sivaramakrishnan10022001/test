import React, { useState, useEffect, useRef } from 'react';
import EyeCloseIcon from './assets/icons/eyecloseicon.svg';
import MinusIcon from './assets/icons/minusicon.svg';
import PlusIcon from './assets/icons/plusicon.svg';
import EyeOpenIcon from './assets/icons/eyeopenicon.svg';
import FileJsxIcon from './assets/icons/jsxicon.svg';
import FolderIcon from './assets/icons/folder.svg';
import FileIcon from './assets/icons/file.svg';
import MoreIcon from './assets/icons/more.svg';
// import { sortableContainer, sortableElement, sortableHandle } from '../react-sortable-hoc/react-sortable-hoc';
// import { arrayMove } from '../react-sortable-hoc/utils';
import './sampletest.css';

export const TreeView = (props) => {


    const [indx, setIndex] = useState(null);
    const [itemID, setItemId] = useState(null);
    const [dropIndex, setDropIndex] = useState(null);
    const [tempObject, setTempObject] = useState({});
    const [editingRow, setEditingRow] = useState(false);
    const [treeList, setTreeList] = useState([]);
    const [popupCoordinates, setPopupCoordinates] = useState({});
    const [popupList, setPopupList] = useState([]);
    const [popUpRow, setPopUpRow] = useState("");
    const [selectedRowEdit, setSelectedRowEdit] = useState(false);
    const popupdata = ["Rename", "Delete"];
    const [reload, setReload] = useState(false);
    const contextMenu = useRef(null);
    const [isEditing, setIsEditing] = useState(false);
    const [draggedObject, setDraggedObject] = useState({
        children: [],
        id: '',
        title: ''
    });
    const dragItem = useRef();
    const dragOverItem = useRef();
    useEffect(() => {
        setPopupList(popupdata);
        setTreeList(props.list);
    }, [props.list]);
    var drop2 = null;
    // const DragHandle = sortableHandle(() =>
    //     <span className='handle'>
    //         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height='20px' width='20px'>
    //             <path d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z" />
    //         </svg>
    //     </span>
    // );
    // const dragStart = (e, row) => {
    //     // e.preventDefault();
    //     e.stopPropagation();
    //     console.log(row)
    //     e.dataTransfer.effectAllowed = "move"
    //     e.dataTransfer.setData("source", JSON.stringify(row));
    //     // setDraggedObject({ ...row });

    // }

    // const dragEnter = (e, position, value) => {
    //     e.stopPropagation();
    //     //console.log("enter", e.target);
    //     //console.log('set ', e.dataTransfer.setData("source2", e.target.text));
    //     console.log('set e', e.dataTransfer.getData("source"));
    //     // e.preventDefault();

    //     // setDropIndex(value.id);
    //     // drop2 = value.id;
    //     // e.dataTransfer.setData("source", value.id);
    //     // setReload(!reload);
    //     // console.log('outside and drop2', dropIndex, drop2);
    // }

    // const onItemDrop = (e, row) => {
    //     console.log("drop")
    //     e.stopPropagation();
    //     e.preventDefault();

    //     //console.log('row while dropping = ', dropIndex, drop2);
    //     console.log('', e.dataTransfer.getData("source"));
    //     searchIndex(treeList, row);
    // };

    const searchIndex = (treeList, row, source) => {
        var list = treeList;
        treeList.map((rw, ky) => {
            if (rw.id === row.id) {
                deleteDraggedItem(treeList, source);
                rw.children.unshift(source);
            }
            else if (rw.children) {
                searchIndex(rw.children, row, source);
            }
        })
        setReload(!reload);
    }

    const deleteDraggedItem = (treeList, row) => {
        for (const [i, e] of treeList.entries()) {
            console.log('item found', e.id, row.id);
            if (e.id === row.id) {
                treeList.splice(i, 1);
                continue;
            }
            else if (e.children) {
                deleteDraggedItem(e.children, row);
            }
        }
        setReload(!reload);

    }

    // const SortableItem = sortableElement(({ row, className, indx, key, index }) => (
    //     <div className={"c-container " + className}>
    //         <DragHandle />
    //     </div>
    //     // **********************************************************************************************
    // ));

    const showPopUp = (e, row) => {
        e.stopPropagation();
        const coordinates = e.target.getBoundingClientRect();
        setPopupCoordinates({ top: coordinates.top + 20, left: coordinates.left - 100 });
        setEditingRow(true);
        setPopUpRow(row);
        setTimeout(() => {
            if (contextMenu.current)
                contextMenu.current.focus();
        }, 100);
    };

    const onPopupOptionClick = (option, row) => {
        if (option.trim().toLowerCase() === "rename") {
            setEditingRow(false);
            setSelectedRowEdit(true);
        } else {
            onDeleteClick(row);
        }
    }

    const onInputChange = (e, row) => {
        row.title = e.target.value;
        row.id = e.target.value.trim().toLowerCase();
        setReload(!reload);
    }

    const onInputBlur = () => {
        setSelectedRowEdit(false);
        setPopUpRow("");
        setEditingRow(false);
    }

    const onDeleteClick = (row) => {
        var list = treeList;
        var indx = list.findIndex(i => i.id === row.id);
        if (indx !== -1) {
            list.splice(indx, 1);
        }
        setEditingRow(false);
        setReload(!reload);
    }

    const onAddFolderClick = (e, row) => {
        e.stopPropagation();
        const folderStructure = {
            "children": [],
            "id": "",
            "title": "",
        }
        row.children.unshift(folderStructure);
        setReload(!reload);
    }

    const onAddFileClick = (e, row) => {
        e.stopPropagation();
        const fileStructure = {
            "id": "",
            "title": "",
        }
        var indx = row.children.findIndex((rw) => !rw.children);
        row.children.splice(indx, 0, fileStructure);
        setReload(!reload);
    }

    const onNewFileFolderAdd = (e, row) => {
        row.title = e.target.value;
        row.id = e.target.value.trim().toLowerCase();
        setPopUpRow(row);
        setSelectedRowEdit(true);
    }

    const onKeyboardClick = (e, row) => {
        if (e.keyCode === 27 || e.keyCode === 46) {
            // escape or delete key press
            onDeleteClick(row);
        } else if (e.keyCode === 13) {
            // enter key press
            onInputBlur();
        }
    }
    const dragStart = (e, row) => {

        e.stopPropagation();
        e.dataTransfer.setData("source", JSON.stringify(row));
        e.dataTransfer.setData("list", JSON.stringify(treeList));
    }

    const onTargetEnter = (e, row) => {

    }
    const onTargetOver = (e, row) => {
        e.stopPropagation();
        e.preventDefault();
    }

    const onTargetLeave = (e, row) => {

    }

    const onTargetDrop = (e, row) => {
        e.stopPropagation();
        e.preventDefault();
        var source = e.dataTransfer.getData("source");
        searchIndex(treeList, row, JSON.parse(source));
    }

    const onTargetEnd = (e, row) => {

    }
    return (
        <div className="tree-view">

            {editingRow &&
                <div ref={contextMenu} className='tree-popup-container' style={{ position: "fixed", display: editingRow ? "block" : "none", ...popupCoordinates }}
                    tabIndex="-1" onBlur={() => setEditingRow(false)}>
                    {popupList.map((row, key) =>
                        <div key={key} className='popup-content' onClick={() => onPopupOptionClick(row, popUpRow)}>{row}</div>
                    )}
                </div>}
            {console.log('Treelist inside = ', treeList)}
            {treeList.map((row, key) => {

                if (row.children)
                    var indx = row.children.findIndex((rw) => rw.id === "");
                return (
                    <div key={key} className="tree-item" >

                        {row.children ?

                            <div className={row.expanded || indx > -1 ? "folder expanded" : "folder"}>
                                <div className={popUpRow === row && !selectedRowEdit ? "title active" : "title"}
                                    onClick={() => props.onItemClick(row)}
                                    onDragStart={(e) => dragStart(e, row)}
                                    onDragEnter={(e) => onTargetEnter(e, row)}
                                    onDragOver={(e) => onTargetOver(e, row)}
                                    onDragLeave={(e) => onTargetLeave(e, row)}
                                    onDrop={(e) => onTargetDrop(e, row)}
                                    onDragEnd={(e) => onTargetEnd(e, row)}

                                    draggable>
                                    <div className='name'>
                                        <img className='caret' src={row.expanded || indx > -1 ? MinusIcon : PlusIcon} alt="" />
                                        {row.expanded || indx > -1 ?
                                            <img className='icon' src={EyeOpenIcon} alt="" />
                                            :
                                            <img className='icon' src={EyeCloseIcon} alt="" />
                                        }
                                        {row === popUpRow && selectedRowEdit
                                            ?
                                            <input className='rename-box' type="text"
                                                onChange={(e) => onInputChange(e, row)} value={row.title} autoFocus={true}
                                                onKeyUp={(e) => onKeyboardClick(e, row)} onBlur={() => onInputBlur()} />
                                            :
                                            row.id === "" ? <input className='rename-box' type="text"
                                                onChange={(e) => onNewFileFolderAdd(e, row)} value={row.title} autoFocus={true}
                                                onKeyUp={(e) => onKeyboardClick(e, row)} onBlur={() => onDeleteClick(row)} />
                                                :
                                                <div>{row.title}</div>
                                        }
                                    </div>
                                    {props.isEditing ?
                                        <div className='options'>
                                            <button type="button" className='sb-btn' > <img className='icon' src={FolderIcon} alt="" onClick={(e) => onAddFolderClick(e, row)} /> </button>
                                            <button type="button" className='sb-btn' > <img className='icon' src={FileIcon} alt="" onClick={(e) => onAddFileClick(e, row)} /> </button>
                                            <button type="button" className='sb-btn' > <img className='icon' src={MoreIcon} alt="" onClick={(e) => showPopUp(e, row)} /> </button>
                                        </div>
                                        :
                                        ''
                                    }
                                </div>
                                {row.expanded || indx > -1 ?
                                    <div className="content">
                                        <TreeView list={row.children} selectedItem={props.selectedItem} isEditing={props.isEditing} onItemClick={props.onItemClick} />
                                    </div>
                                    :
                                    ''
                                }
                            </div>

                            :
                            <div className={props.selectedItem === row ? "item selected" : "item"}
                                onDragStart={(e) => dragStart(e, row)}
                                onDragEnter={(e) => onTargetEnter(e, row)}
                                onDragOver={(e) => onTargetOver(e, row)}
                                onDragLeave={(e) => onTargetLeave(e, row)}
                                onDrop={(e) => onTargetDrop(e, row)}
                                onDragEnd={(e) => onTargetEnd(e, row)}

                                draggable
                            >
                                <div className="title" onClick={() => props.onItemClick(row)} >
                                    <div className='name'>
                                        <img className='icon' src={FileJsxIcon} alt="" />
                                        {row === popUpRow && selectedRowEdit
                                            ?
                                            <input className='rename-box' type="text"
                                                onChange={(e) => onInputChange(e, row)} value={row.title} autoFocus={true}
                                                onKeyUp={(e) => onKeyboardClick(e, row)} onBlur={() => onInputBlur()} />
                                            :
                                            row.id === "" ? <input className='rename-box' type="text"
                                                onChange={(e) => onNewFileFolderAdd(e, row)} value={row.title} autoFocus={true}
                                                onKeyUp={(e) => onKeyboardClick(e, row)} onBlur={() => onDeleteClick(row)} />
                                                :
                                                <div>{row.title}</div>
                                        }
                                    </div>
                                    {props.isEditing ?
                                        <div className='options'>
                                            <button type="button" className='sb-btn' > <img className='icon' src={MoreIcon} alt="" onClick={(e) => showPopUp(e, row)} /> </button>
                                        </div>
                                        :
                                        ''
                                    }
                                </div>
                            </div>
                        }
                    </div>
                    //<SortableItem key={`item-${row}`} className="sample" index={key} value={row} ind={indx}/>
                )
            })}
        </div>
    )
}
