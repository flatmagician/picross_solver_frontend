import React, { Component } from 'react'
import Popup from "./Popup"
import "./Constraint.css"

export default class Constraint extends Component {
    constructor(props) {
        super(props)

        this.state = {
            value: [],
            style: []
        }
        this.state.style = this.props.style
        this.state.style["color"] = this.updateColor()

        this.updateColor = this.updateColor.bind(this)
        this.onClick = this.onClick.bind(this)
        this.getPopupVal = this.getPopupVal.bind(this)
        this.closePopup = this.closePopup.bind(this)
    }

    componentDidUpdate() {
        if (this.state.color !== this.updateColor()) {
            this.setState({
                color: this.updateColor()
            })
        }
    }

    updateColor() {
        let color = "rgb(155,155,155)"
        if (this.props.value !== "X") {
            color = "black"
        }
        return color
    }


    onClick() {
        if (this.props.showPopup) {
            this.closePopup()
        }
        else {
            this.props.passPopupIndices([this.props.row, this.props.col])
        }

    }

    getPopupVal(value, axis) {
        this.setState({
            value: value
        })
        if (axis !== "rows") {
            this.props.passPopupVal(value, axis, this.props.col)
        }
        else if (axis !== "cols") {
            this.props.passPopupVal(value, axis, this.props.row)
        }

        this.closePopup()
    }

    closePopup() {
        this.props.passPopupIndices([-1, -1])
    }




    render() {
        return (
            <span className="constraintWrapper">
                <div className="gridSquare constraint" onClick={this.onClick} style={this.state.style}>
                    {this.props.value}
                </div>
                <span>
                    {this.props.showPopup ? <Popup
                        passVal={this.getPopupVal}
                        rows={this.props.rows} cols={this.props.cols}
                        row={this.props.row} col={this.props.col}
                        rowConstraint={this.props.rowConstraint}
                        colConstraint={this.props.colConstraint} /> : <span></span>}
                </span>
            </span>
        )
    }
}
