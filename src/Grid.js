import React, { Component } from 'react'
import Constraint from "./Constraint"
import "./Grid.css"

export default class Grid extends Component {
    constructor(props) {
        super(props)

        this.state = {
            grid: [],
            popupIndices: [-1, -1],
            rowConstraint: 1,
            colConstraint: 1
        }

        this.state.grid = this.constructGrid()

        this.constructGrid = this.constructGrid.bind(this)
        this.renderGrid = this.renderGrid.bind(this)
        this.getPopupIndices = this.getPopupIndices.bind(this)
        this.resizeConstraints = this.resizeConstraints.bind(this)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.rows !== this.props.rows || prevProps.cols !== this.props.cols) {
            let grid = this.constructGrid()
            this.setState({
                grid: grid
            })
        }
    }

    constructGrid() {
        let grid = new Array(this.props.rows + this.state.rowConstraint)
        const rows = this.props.rows
        const cols = this.props.cols
        const rowConstraint = this.state.rowConstraint
        const colConstraint = this.state.colConstraint

        //form empty grid of 0s
        for (let i = 0; i < this.props.rows + rowConstraint; i++) {
            let row = new Array(this.props.cols + colConstraint)
            for (let j = 0; j < this.props.cols + colConstraint; j++) {
                row[j] = 0
            }
            grid[i] = row
        }

        for (let i = 0; i < rowConstraint; i++) {
            let row = new Array(cols + colConstraint)
            for (let j = 0; j < cols + colConstraint; j++) {
                row[j] = -1
            }
            grid[i] = row
        }
        for (let i = rowConstraint; i < rowConstraint + rows; i++) {
            let row = new Array(cols + colConstraint)
            for (let j = 0; j < colConstraint; j++) {
                row[j] = -1
            }
            for (let j = colConstraint; j < cols + colConstraint; j++) {
                row[j] = 0
            }
            grid[i] = row
        }

        return grid
    }

    renderGrid() {
        return this.state.grid.map((row, i) => {
            return <div className="gridRow">{
                row.map((element, j) => {

                    if (element === -1) {
                        let showPopup = false
                        if (i === this.state.popupIndices[0] && j === this.state.popupIndices[1]) {
                            showPopup = true
                        }
                        return <Constraint passPopupIndices={this.getPopupIndices} resizeConstraints={this.resizeConstraints}
                            rows={this.props.rows} cols={this.props.cols} row={i} col={j} rowConstraint={this.state.rowConstraint}
                            colConstraint={this.state.colConstraint} showPopup={showPopup} />
                    }

                    if (element === 0) {
                        return <div className="gridSquare" style={{ "background-color": "white", "color": "black" }}>0</div>
                    }
                    else {
                        return <div className="gridSquare" style={{ "background-color": "black", "color": "white" }}>1</div>
                    }
                })
            }</div>
        })
    }

    getPopupIndices(val) {
        this.setState({
            popupIndices: val
        })
    }

    resizeConstraints(new_len, axis) {
        console.log(new_len, axis)
        if (axis !== "rows") {
            if (new_len > this.state.rowConstraint) {
                this.setState({
                    rowConstraint: new_len
                })
            }
        }
        if (axis !== "cols") {
            if (new_len > this.state.colConstraint) {
                this.setState({
                    colConstraint: new_len
                })
            }
        }
    }

    render() {
        return (
            <div className="grid">
                {this.renderGrid()}
            </div>
        )
    }
}
