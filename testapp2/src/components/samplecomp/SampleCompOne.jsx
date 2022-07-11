import React from "react";

export const SampleCompOne = (props) => {
    let po = ""
    return (
        <div className="content">
            <div className="symbol">{props.symbol}</div>
            <div className="company">{props.company}</div>
        </div>
    )
}
