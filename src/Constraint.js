import React, { Component } from 'react'
import Popup from "./Popup"
import "./Constraint.css"

export default class Constraint extends Component {
    constructor(props) {
        super(props)

        this.state = {
            value: [],
        }
        this.onClick = this.onClick.bind(this)
        this.getPopupVal = this.getPopupVal.bind(this)
        this.resizeConstraints = this.resizeConstraints.bind(this)
        this.closePopup = this.closePopup.bind(this)
    }

    onClick() {
        if (this.props.showPopup) {
            this.closePopup()
        }
        else {
            this.props.passPopupIndices([this.props.row, this.props.col])
        }

    }

    getPopupVal(value) {
        this.setState({
            value: value
        })
        this.closePopup()
    }

    resizeConstraints(new_len, axis) {
        this.props.resizeConstraints(new_len, axis)
    }

    closePopup() {
        this.props.passPopupIndices([-1, -1])
    }




    render() {
        return (
            <span className="constraintWrapper">
                <div className="gridSquare constraint" style={{ "background-color": "gray", "color": "black" }} onClick={this.onClick}>
                    0
                </div>
                <span>
                    {this.props.showPopup ? <Popup resizeConstraints={this.resizeConstraints}
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
