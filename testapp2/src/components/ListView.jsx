import React from "react";
import './listview.css';



export const ListView = (props) => {
    return (
        <div className={`mf-listview  ${props.className}`} style={{ "--position": props.position }}>
            {props.data.map((row, key) => {
                var ItemTemplate = props.itemTemplate;
                var itemprops = { ...ItemTemplate.props };
                {
                    Object.keys(props.mapping).map((rw, ky) => {
                        itemprops[rw] = row[props.mapping[rw]];
                    })
                }
                return <div className="mf-listview-item" style={{ "--i": key }} key={key}>
                    <ItemTemplate {...itemprops} />
                </div>
            })}
        </div>
    )
}