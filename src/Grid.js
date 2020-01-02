import React, { Component } from 'react'
import Constraint from "./Constraint"
import "./Grid.css"

export default class Grid extends Component {
    constructor(props) {
        super(props)

        this.state = {
            grid: [],
            popupIndices: [-1, -1],
            row_constraint_len: 1,
            col_constraint_len: 1,
            row_constraint: [],
            col_constraint: []
        }
        let [row_constraint, col_constraint] = this.constructConstraints()
        this.state.row_constraint = row_constraint
        this.state.col_constraint = col_constraint
        this.state.grid = this.constructGrid()

        this.constructConstraints = this.constructConstraints.bind(this)
        this.constructGrid = this.constructGrid.bind(this)
        this.renderGrid = this.renderGrid.bind(this)
        this.getPopupIndices = this.getPopupIndices.bind(this)
        this.getPopupVal = this.getPopupVal.bind(this)
        this.resizeConstraints = this.resizeConstraints.bind(this)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.rows !== this.props.rows || prevProps.cols !== this.props.cols) {
            let [row_constraint, col_constraint] = this.constructConstraints()
            this.setState({
                row_constraint_len: 1,
                col_constraint_len: 1,
                row_constraint: row_constraint,
                col_constraint: col_constraint
            }, this.setState({
                grid: this.constructGrid()
            }))
        }
        else if (prevState.row_constraint_len !== this.state.row_constraint_len || prevState.col_constraint_len !== this.state.col_constraint_len) {
            let grid = this.constructGrid()
            this.setState({
                grid: grid
            })
        }
    }

    constructConstraints() {
        let row_constraint = new Array(this.props.rows)
        for (let i = 0; i < this.props.rows; i++) {
            row_constraint[i] = []
        }
        let col_constraint = new Array(this.props.cols)
        for (let i = 0; i < this.props.cols; i++) {
            col_constraint[i] = []
        }
        return [row_constraint, col_constraint]
    }

    constructGrid() {
        const rows = this.props.rows
        const cols = this.props.cols
        const row_constraint_len = this.state.row_constraint_len
        const col_constraint_len = this.state.col_constraint_len


        let grid = new Array(this.props.rows + row_constraint_len)
        //form empty grid of 0s
        for (let i = 0; i < this.props.rows + row_constraint_len; i++) {
            let row = new Array(this.props.cols + col_constraint_len)
            for (let j = 0; j < this.props.cols + col_constraint_len; j++) {
                row[j] = 0
            }
            grid[i] = row
        }

        for (let i = 0; i < row_constraint_len; i++) {
            let row = new Array(cols + col_constraint_len)
            for (let j = 0; j < cols + col_constraint_len; j++) {
                row[j] = -1
            }
            grid[i] = row
        }
        for (let i = row_constraint_len; i < row_constraint_len + rows; i++) {
            let row = new Array(cols + col_constraint_len)
            for (let j = 0; j < col_constraint_len; j++) {
                row[j] = -1
            }
            for (let j = col_constraint_len; j < cols + col_constraint_len; j++) {
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
                        //row constraint selectors
                        if (i >= this.state.row_constraint_len) {
                            const constraint = this.state.row_constraint[i - this.state.row_constraint_len]
                            let val
                            if (constraint != null && j < constraint.length) {
                                val = constraint[j]
                            }
                            else {
                                val = "X"
                            }
                            return <Constraint passPopupVal={this.getPopupVal} passPopupIndices={this.getPopupIndices}
                                rows={this.props.rows} cols={this.props.cols} row={i} col={j} rowConstraint={this.state.row_constraint_len}
                                colConstraint={this.state.col_constraint_len} showPopup={showPopup}
                                value={val} />
                        }
                        //column constraint selectors
                        if (j >= this.state.col_constraint_len) {
                            const constraint = this.state.col_constraint[j - this.state.col_constraint_len]
                            let val
                            if (constraint != null && i < constraint.length) {
                                val = constraint[i]
                            }
                            else {
                                val = "X"
                            }
                            return <Constraint passPopupVal={this.getPopupVal} passPopupIndices={this.getPopupIndices}
                                rows={this.props.rows} cols={this.props.cols} row={i} col={j} rowConstraint={this.state.row_constraint_len}
                                colConstraint={this.state.col_constraint_len} showPopup={showPopup} value={val} />
                        }
                        //unselectable gray area
                        else {
                            return <Constraint passPopupIndices={this.getPopupIndices}
                                rows={this.props.rows} cols={this.props.cols} row={i} col={j} rowConstraint={this.state.row_constraint_len}
                                colConstraint={this.state.col_constraint_len} showPopup={showPopup} value={-1} />
                        }
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

    getPopupVal(val, axis, index) {
        if (axis === "rows") {
            let row_constraint = this.state.row_constraint
            row_constraint[index - this.state.row_constraint_len] = val
            this.setState({
                row_constraint: row_constraint
            })
            this.resizeConstraints(val.length, axis)
            return
        }
        else if (axis === "cols") {
            let col_constraint = this.state.col_constraint
            col_constraint[index - this.state.col_constraint_len] = val
            this.setState({
                col_constraint: col_constraint
            })
            this.resizeConstraints(val.length, axis)
            return
        }
    }

    resizeConstraints(new_len, axis) {
        if (axis !== "rows") {
            if (new_len > this.state.row_constraint_len) {
                this.setState({
                    row_constraint_len: new_len
                })
            }
            return
        }
        if (axis !== "cols") {
            if (new_len > this.state.col_constraint_len) {
                this.setState({
                    col_constraint_len: new_len
                })
            }
            return
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
