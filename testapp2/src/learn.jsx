import React, { Component } from 'react';
import "./learn.css";

export default class Learn extends Component {
    constructor() {
        super();
        this.state = {
            data: [
                { id: 1, name: "child1" },
                { id: 2, name: "child2" },
                { id: 3, name: "child3" },
                { id: 4, name: "child4" },
                { id: 5, name: "child5" },
            ],

            start: null,
            hover: null,
            Down: null,
            duplicate: null,
            dragging: false,
            preState: null,
            count: 0,

            clientY: [],
            bottom: false,
            top: false



        }
        this.duplicate = React.createRef();
    }

    DragStart = (e, row, key) => {
        this.setState({
            start: key,
            duplicate: row.name,
            dragging: true
        })



    }
    DragEnter = (e, key) => {
        e.preventDefault();
        this.setState({
            hover: key
        })
    }
    DragEnd = (e, key) => {
        this.setState({
            Down: false,
            bottom: false,
            top: false
        })
    }

    MouseMove = (e) => {
        this.state.clientY.push(e.clientY);
        let lastbackElement = this.state.clientY[this.state.clientY.length - 2];
        let lastElement = this.state.clientY[this.state.clientY.length - 1];
        if (lastbackElement > lastElement) {
            this.setState({
                bottom: true,
                top: false
            })
        }
        else {
            this.setState({
                top: true,
                bottom: false
            })
        }
    }

    MouseDown = (e, row, key) => {
        let data = row;
        this.setState({
            Down: key
        })
    }

    MouseUp = () => {
        this.setState({
            Down: null,
            y: null,
            dragging: false,
            count: 0
        })
    }

    Drag = (e) => {
        console.log(e.target.step)
        this.setState({
            count: this.state.count + 1,
            dragging: true
        })
    }

    render() {
        return (
            <div className='learn-waper'>
                <div className="learn-content"
                    onMouseMove={(e) => this.MouseMove(e)}
                    style={{ "--count": `${this.state.count}px`, "--pos": `translate3d(0px,${this.state.dragging ? this.state.hover * 60 : ""}px,0px` }}
                >
                    {
                        this.state.data.map((row, key) => {
                            return (
                                <div
                                    className={`learn ${this.state.dragging ? "dragging" : ""} ${key == this.state.start ? "start" : ""} ${key == this.state.hover ? "hover" : ""} `}
                                    onDragStart={(e) => this.DragStart(e, row, key)}
                                    onDragEnter={(e) => this.DragEnter(e, key)}
                                    onDragEnd={(e) => this.DragEnd(e, key)}
                                    onMouseDown={(e) => this.MouseDown(e, row, key)}
                                    onMouseUp={() => this.MouseUp()}
                                    onDrag={(e) => this.Drag(e)}
                                    draggable="true"
                                    key={key}
                                >
                                    <span>{row.id}</span>
                                    <span>{row.name}</span>
                                </div>
                            )
                        })
                    }
                    <div className={`duplicate ${this.state.start != null ? "hidden" : ""}`}>
                        {this.state.duplicate}
                    </div>
                </div>
            </div>
        )
    }
}


