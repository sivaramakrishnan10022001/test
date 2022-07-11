

import React, { Component } from 'react';
import {
    sortableContainer,
    sortableElement,
    sortableHandle,
} from '../react-sortable-hoc/react-sortable-hoc';
import { arrayMove } from '../react-sortable-hoc/utils';
import "./dnd.css";

const DragHandle = sortableHandle(() =>
    <span className='handle'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z" />
        </svg>
    </span>
);

const SortableItem = sortableElement(({ value, className }) => (
    <div className={"c-container " + className}>
        <DragHandle />
        <span className='value'>{value}</span>
    </div>
));

const SortableContainer = sortableContainer(({ children }) => {
    return <div className='p-container'>{children}</div>;
});

export default class Dnd extends Component {
    state = {
        items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
    };

    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState(({ items }) => ({
            items: arrayMove(items, oldIndex, newIndex),
        }));
    };

    render() {
        const { items } = this.state;
        return (
            <SortableContainer onSortEnd={this.onSortEnd} useDragHandle>
                {
                    items.map((value, index) => (
                        <SortableItem key={`item-${value}`} className="sample" index={index} value={value} />
                    ))
                }
            </SortableContainer>
        );
    }
}


