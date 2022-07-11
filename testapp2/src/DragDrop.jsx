import React, { Component } from 'react';
import "./DragDrop.css";


class DragDrop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // Numbers: [1, 2, 3, 4, 5],
            Numbers: [
                {
                    id: 1,
                    name: "html5"
                },
                {
                    id: 2,
                    name: "css3"
                },
                {
                    id: 3,
                    name: "javacript"
                },
                {
                    id: 4,
                    name: "reactjs"
                },
                {
                    id: 5,
                    name: "nodejs"
                }
            ],
            clientY: [],
            dragging: 0,
            start: false,
            startIndex: null,
            hover: null,
            bottom: false,
            top: false,

        };
        this.headingRef = React.createRef();
        this.DragHoverRef = React.createRef();
        this.itemRef = React.createRef();
        // this.itemRefComponent = []
    }

    DragStart = (e, index) => {
        this.headingRef = index;
        this.setState({
            start: true,
            startIndex: index
        })
    };


    MouseDown = (e) => {
        // this.setState({
        //   diffX: e.screenX - e.currentTarget.getBoundingClientRect().left,
        //   diffY: e.screenY - e.currentTarget.getBoundingClientRect().top,
        //   dragging: true,
        // });
    };

    DragHover = (e, index) => {
        this.DragHoverRef = index;



        this.setState({
            hover: index
        }, () => console.log(this.state.hover, "hover"))
    };

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
    };

    DragEnd = () => {
        let data = [...this.state.Numbers];
        let copyheading = data[this.headingRef];
        data.splice(this.headingRef, 1);
        data.splice(this.DragHoverRef, 0, copyheading);
        this.headingRef = null;
        this.DragHoverRef = null;
        this.setState({
            Numbers: data,
            dragging: 0,
            bottom: false,
            top: false,
            start: false,
            startIndex: null
        });
    };

    MouseUp = () => {
        this.setState({
            dragging: 0,
            bottom: false,
            top: false,
            start: false
        });
    };

    drag = (e) => {
        if (this.state.top === true) {
            this.setState({
                dragging: this.state.dragging + 1
            })
        }
        else {
            this.setState({
                dragging: this.state.dragging - 1
            })
        }
    }

    render() {
        return (
            <div className="container" >
                <div className="content" onMouseMove={(e) => this.MouseMove(e)} style={{ "--dragging": `translate3d(0px, ${this.state.dragging}px, 0px)` }}>
                    {this.state.Numbers.map((num, index) => {
                        return (
                            <div
                                className={`item 
                                ${index === this.state.hover && this.state.top === true && this.state.start ? "top-hover" : index === this.state.hover && this.state.bottom === true && this.state.start ? "bottom-hover" : ""}
                                ${index === this.state.startIndex && this.state.start ? "start" : ""}`}
                                key={index}
                                // ref={this.itemRefComponent[index]}
                                onDragStart={(e) => this.DragStart(e, index)}
                                onMouseDown={(e) => this.MouseDown(e)}
                                onDragEnter={(e) => this.DragHover(e, index)}
                                onDragEnd={(e) => this.DragEnd(e)}
                                onMouseUp={(e) => this.MouseUp(e)}
                                onDrag={(e) => this.drag(e)}
                                draggable="true"
                            >
                                <div>{num.id}</div>
                                <div>{num.name}</div>
                            </div>
                        );
                    })}

                    <div className="testing"
                        style={{ "--iHeight": this.state.startIndex * 59 }}
                        onDragStart={(e) => this.DragStart(encodeURI)}
                        onMouseDown={(e) => this.MouseDown(e)}
                        onDragEnter={(e) => this.DragHover(e)}
                        onDragEnd={(e) => this.DragEnd(e)}
                        onMouseUp={(e) => this.MouseUp(e)}
                        onDrag={(e) => this.drag(e)}
                        draggable="true"
                    >

                    </div>
                </div>
            </div >
        );
    }
}

export default DragDrop;
