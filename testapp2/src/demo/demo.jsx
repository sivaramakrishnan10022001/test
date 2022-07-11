import React, { Component } from 'react';
import { SortableContainer, SortableElement } from '../react-sortable-hoc/react-sortable-hoc';
import './demo.css';

const SortableItem = SortableElement(({ value }) => <div className="sortableItem">
    <div className="sortableItem-handle">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z" />
        </svg>
    </div>
    <div className='content'>
        {value}
    </div>
</div>);

const SortableList = SortableContainer(({ items }) => {
    return (
        <div className='d-container'>
            {items.map((value, index) => (
                <SortableItem
                    key={`item-${index}`}
                    index={index}
                    value={value}
                />
            ))}
        </div>
    );
});

export default class SortableComponent extends Component {
    constructor() {
        super();
        this.state = {
            items: ['Mario', 'Luigi', 'Peach', 'Toad', 'Bowser', 'Goomba'],
        }
    }

    handleSortEnd = ({ oldIndex, newIndex }) => {
        this.setState(({ items }) => ({
            items: arrayMove(items, oldIndex, newIndex),
        }));
    };

    render() {
        return (
            <div className='d-wapper'>
                <SortableList
                    items={this.state.items}
                    lockAxis='y'
                    onSortEnd={this.handleSortEnd}
                />
            </div>
        );
    }
}

export function arrayMove(array, from, to) {
    if (process.env.NODE_ENV !== 'production') {
        if (typeof console !== 'undefined') {
            console.warn(
                "Deprecation warning: arrayMove will no longer be exported by 'react-sortable-hoc' in the next major release. Please install the `array-move` package locally instead. https://www.npmjs.com/package/array-move",
            );
        }
    }
    array = array.slice();
    array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
    return array;
}

