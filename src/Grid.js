import React, { Component } from 'react'
import Constraint from "./Constraint"
import "./Grid.css"

export default class Grid extends Component {
    constructor(props) {
        super(props)
        const duck = {
            row_constraint_len: 4,
            col_constraint_len: 3,
            row_constraint: [[3], [5], [3, 4], [7], [5], [3], [5], [8, 1], [3, 3, 3], [2, 3, 7], [2, 4, 5], [2, 8], [10], [3, 2], [6]],
            col_constraint: [[1], [2, 4], [4, 6], [2, 6, 2, 1], [8, 2, 1, 1], [8, 2, 3], [4, 2, 6], [2, 2, 5], [3, 2, 1], [6], [5], [4], [5], [4], [3]],
        }
        const crab = {
            row_constraint_len: 5,
            col_constraint_len: 6,
            row_constraint: [[2, 3], [1, 2, 2], [2, 2, 2, 5], [2, 1, 2, 3], [2, 1, 1, 1], [2, 2, 4], [3, 10], [6, 8], [4, 11], [2, 1, 9], [2, 1, 1, 10], [2, 1, 12], [1, 12], [1, 1, 11], [2, 9], [3, 2, 10], [11, 1, 1, 3], [7, 1, 1, 1, 2], [2, 1, 1, 1], [1, 1, 1, 2], [1, 1, 2, 2, 1], [2, 2, 2, 3], [3, 2, 2], [1]],
            col_constraint: [[1], [2], [3], [4, 2, 2], [6, 4], [3, 3], [6, 2], [2, 2], [2, 1, 1, 1, 2], [4, 2, 2, 2], [1, 2, 1, 4, 2], [1, 1, 9, 4], [14, 2, 2], [2, 12, 2, 1], [2, 1, 10, 2, 3], [1, 15, 1], [2, 11, 4, 1], [2, 14, 3], [1, 2, 15, 1], [1, 2, 9, 2, 2, 1], [1, 3, 3], [1, 1], [1, 1], [1]]
        }

        let image = duck

        this.state = {
            grid: [],
            popupIndices: [-1, -1],
            solution: null
        }

        this.state["row_constraint_len"] = image["row_constraint_len"]
        this.state["col_constraint_len"] = image["col_constraint_len"]
        this.state["row_constraint"] = image["row_constraint"]
        this.state["col_constraint"] = image["col_constraint"]
        // let [row_constraint, col_constraint] = this.constructConstraints()
        // this.state.row_constraint = row_constraint
        // this.state.col_constraint = col_constraint
        this.state.grid = this.constructGrid()

        this.constructConstraints = this.constructConstraints.bind(this)
        this.populateGrid = this.populateGrid.bind(this)
        this.constructGrid = this.constructGrid.bind(this)
        this.renderGrid = this.renderGrid.bind(this)
        this.getPopupIndices = this.getPopupIndices.bind(this)
        this.getPopupVal = this.getPopupVal.bind(this)
        this.resizeConstraints = this.resizeConstraints.bind(this)
        this.passState = this.passState.bind(this)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.submit !== this.props.submit && this.props.submit === true) {
            this.passState()
        }
        else if (prevProps.popupIndices !== this.props.popupIndices && this.state.popupIndices !== this.props.popupIndices) {
            this.setState({
                popupIndices: [-1, -1]
            })
        }
        else if (prevProps.rows !== this.props.rows || prevProps.cols !== this.props.cols) {
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
        else if (prevProps.grid !== this.props.grid) {
            if (this.props.animation === false) {
                this.populateGrid(this.props.grid)
            }
            else {
                let grids = this.props.grid
                let display_grids = []
                for (let j = 0; j < this.props.grid.length; j++) {
                    let grid = grids[j]
                    if (grid[0].length === 1) {
                        grid = [grid]
                    }
                    if (grid.length < this.props.rows) {
                        const l = grid.length
                        for (let i = 0; i < this.props.rows - l; i++) {
                            let row = Array(this.props.cols)
                            row.fill(0)
                            grid.push(row)
                        }
                    }

                    if (j === 0) {
                        display_grids.push(grid)
                    }
                    else if (j !== 0 && grid !== display_grids[j - 1]) {
                        display_grids.push(grid)
                    }
                }
                let j = 0
                const id = setInterval(() => {
                    if (j >= display_grids.length) {
                        this.populateGrid(display_grids[display_grids.length - 1])
                        clearInterval(id)
                    }
                    else {
                        const grid = display_grids[j]
                        this.populateGrid(grid)
                        j += 3
                    }
                }, 20)
                // }                      

            }
        }
    }

    populateGrid(grid_input) {
        if (grid_input === "No Solution") {
            this.setState({
                solution: "No Solution Found",
                grid: this.constructGrid()
            })
            return
        }
        let grid = this.state.grid
        for (let i = 0; i < this.props.rows; i++) {
            for (let j = 0; j < this.props.cols; j++) {
                const i_offset = i + this.state.row_constraint_len
                const j_offset = j + this.state.col_constraint_len

                grid[i_offset][j_offset] = grid_input[i][j]
            }
        }
        this.setState({
            grid: grid,
            solution: "Solution Found!",
            popup: [-1, -1]
        })
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

                        let style = {
                            "border-top": "inherit",
                            "border-left": "inherit",
                            "border-right": "none",
                            "background-color": "inherit",
                            "border-radius": "none",
                            "border-bottom": "none",
                        }
                        if (i === 0 && j >= this.state.col_constraint_len) {
                            style["border-top"] = "2px solid black"
                        }



                        // if (i < this.state.row_constraint_len && j === this.state.row_constraint_len - 1) {
                        //     style["border-left"] = "2px solid black"

                        // }

                        // if (i === this.state.row_constraint_len && j < this.state.row_constraint_len) {
                        //     style["border-top"] = "2px solid black"

                        // }


                        if (i >= this.state.row_constraint_len && j === 0) {
                            style["border-left"] = "2px solid black"
                        }

                        // if (j === this.state.col_constraint_len - 1) {
                        //     style["border-right"] = "2px solid black"
                        // }

                        if (i === this.state.row_constraint_len && j < this.state.col_constraint_len) {
                            style["border-top"] = "2px solid black"
                        }

                        if (i <= this.state.row_constraint_len && j === this.state.col_constraint_len) {
                            style["border-left"] = "2px solid black"
                        }

                        //row constraint selectors
                        if (i >= this.state.row_constraint_len) {
                            const constraint = this.state.row_constraint[i - this.state.row_constraint_len]
                            let val
                            if (constraint != null && j - this.state.col_constraint_len + constraint.length >= 0) {
                                val = constraint[j - this.state.col_constraint_len + constraint.length]
                            }
                            else {
                                val = "X"
                            }
                            return <Constraint passPopupVal={this.getPopupVal} passPopupIndices={this.getPopupIndices}
                                rows={this.props.rows} cols={this.props.cols} row={i} col={j} rowConstraint={this.state.row_constraint_len}
                                colConstraint={this.state.col_constraint_len} showPopup={showPopup}
                                value={val} style={style} />
                        }
                        //column constraint selectors
                        if (j >= this.state.col_constraint_len) {
                            const constraint = this.state.col_constraint[j - this.state.col_constraint_len]
                            let val
                            if (constraint != null && i - this.state.row_constraint_len + constraint.length >= 0) {
                                val = constraint[i - this.state.row_constraint_len + constraint.length]
                            }
                            else {
                                val = "X"
                            }
                            return <Constraint passPopupVal={this.getPopupVal} passPopupIndices={this.getPopupIndices}
                                rows={this.props.rows} cols={this.props.cols} row={i} col={j} rowConstraint={this.state.row_constraint_len}
                                colConstraint={this.state.col_constraint_len} showPopup={showPopup} value={val} style={style} />
                        }
                        //unselectable gray area
                        else {
                            return <div className="gridSquare unused" style={style}> </div>
                        }
                    }

                    let style = {
                        "border-top": "1px dashed gray",
                        "border-left": "1px dashed gray",
                        "border-right": "",
                        "border-bottom": "none",
                        "background-color": "white",
                        "color": "white"
                    }

                    if ((i - this.state.row_constraint_len) % 5 === 0) {
                        if (i === this.state.row_constraint_len) {
                            style["border-top"] = "2px solid black"
                        }
                        else {
                            style["border-top"] = "2px solid gray"
                        }
                    }
                    if ((j - this.state.col_constraint_len) % 5 === 0) {
                        if (j === this.state.col_constraint_len) {
                            style["border-left"] = "2px solid black"
                        }
                        else {
                            style["border-left"] = "2px solid gray"
                        }
                    }

                    if (element === 0) {
                        return <div className="gridSquare" style={style}> </div>
                    }

                    else {
                        style["background-color"] = "black"
                        style["border-top"] = 0
                        style["border-left"] = 0

                        if (element === "X") {
                            return <div className="gridSquare" style={style} value="X"> </div>
                        }
                        else {
                            return <div className="gridSquare" style={style}> </div>
                        }
                    }
                })
            }</div>
        })
    }

    getPopupIndices(val) {
        this.props.passPopupIndices(val)
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

    passState() {
        this.props.passState(this.state)
    }

    render() {
        return (
            <div className="gridWrapper">
                <div className="grid">
                    {this.renderGrid()}
                </div>

                <div>
                    <h4>{this.state.solution}</h4>
                </div>
            </div>
        )
    }
}
