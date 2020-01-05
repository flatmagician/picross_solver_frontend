import React, { Component } from 'react'
import axios from 'axios'
import RowColForm from './RowColForm'
import Grid from './Grid.js'
import "./Page.css"


export default class Page extends Component {
    constructor(props) {
        super(props)

        this.state = {
            rows: 15,
            cols: 15,
            request_body: null,
            response: null,
            submit: false,
            popupIndices: [-1, -1],
            exitPopup: false,
            animation: false,
            solver: "DFS",
            image: "Duck",
            border_val: "1px dashed gray",
            show_border: true,
            excluded_val: "X"
        }
        this.getFormValue = this.getFormValue.bind(this)
        this.getGridState = this.getGridState.bind(this)
        this.getData = this.getData.bind(this)
        this.updateGrid = this.updateGrid.bind(this)
        this.submit = this.submit.bind(this)
        this.getPopupIndices = this.getPopupIndices.bind(this)
        this.clickHandler = this.clickHandler.bind(this)
        this.animationToggle = this.animationToggle.bind(this)
        this.solverToggle = this.solverToggle.bind(this)
        this.imageToggle = this.imageToggle.bind(this)
        this.borderToggle = this.borderToggle.bind(this)
        this.excludedValToggle = this.excludedValToggle.bind(this)
    }

    getFormValue = (name, value) => {
        let newState = this.state
        if (Number.isInteger(+value) && +value > 0 && +value < 26) {
            newState[name] = value
            newState["image"] = "None"
            if (+value > 15) {
                newState["solver"] = "heuristic"
            }
            this.setState(newState)
        }
    }


    getGridState(state) {
        const gridState = state
        const request_body = {
            w: this.state.cols,
            h: this.state.rows,
            x: gridState.col_constraint,
            y: gridState.row_constraint,
            solver: this.state.solver,
            animation: this.state.animation
        }
        this.setState({
            request_body: request_body
        }, () => this.getData())
    }

    getData() {
        // const url = "http://127.0.0.1:5000"
        const url = "https://picross-solver.herokuapp.com"
        axios({
            method: 'post',
            url: url,
            data: this.state.request_body
        }).then((response) => {
            let data = response.data
            if (typeof data === "string") {
                data = JSON.parse(data)
            }

            this.setState({
                response: response.data,
                submit: false
            })
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    updateGrid() {
        return this.state.response
    }

    submit() {
        this.setState({
            submit: true
        })
    }

    getPopupIndices(val) {
        this.setState({
            popupIndices: val,
            exitPopup: true
        })
    }

    clickHandler(event) {
        if (this.state.popupIndices[0] !== -1 && this.state.popupIndices[1] !== -1) {
            if (this.state.exitPopup === false) {
                this.setState({
                    exitPopup: true
                })
            }
            else {
                this.setState({
                    popupIndices: [-1, -1],
                    exitPopup: false
                })
            }
        }
    }

    animationToggle() {
        this.setState({
            animation: !this.state.animation
        })
    }

    solverToggle() {
        if (this.state.solver === "DFS") {
            this.setState({
                solver: "heuristic"
            })
        }
        if (this.state.solver === "heuristic") {
            if (this.state.rows <= 15 && this.state.cols <= 15) {
                this.setState({
                    solver: "DFS"
                })
            }
            else {
                alert("The dimensions of the grid are too large to use DFS")
            }
        }
    }

    imageToggle() {
        this.setState({
            exitPopup: true
        }, () => {
            if (this.state.image === "None") {
                this.setState({
                    image: "Duck",
                    rows: 15,
                    cols: 15,
                })
            }
            if (this.state.image === "Duck") {
                this.setState({
                    image: "Camera",
                    rows: 20,
                    cols: 20,
                    solver: "heuristic"
                })
            }
            if (this.state.image === "Camera") {
                this.setState({
                    image: "Teapot",
                    rows: 20,
                    cols: 20,
                    solver: "heuristic"
                })
            }
            if (this.state.image === "Teapot") {
                this.setState({
                    image: "Crab",
                    rows: 24,
                    cols: 24,
                    solver: "heuristic"
                })
            }
            if (this.state.image === "Crab") {
                this.setState({
                    image: "Koala",
                    rows: 25,
                    cols: 25,
                    solver: "heuristic"
                })
            }
            if (this.state.image === "Koala") {
                this.setState({
                    image: "Tea",
                    rows: 25,
                    cols: 25,
                    solver: "heuristic"
                })
            }
            if (this.state.image === "Tea") {
                this.setState({
                    image: "Duck",
                    rows: 15,
                    cols: 15,
                    solver: "heuristic"
                })
            }
        })
    }

    borderToggle() {
        if (this.state.border_val === "1px dashed gray")
            this.setState({
                show_border: !this.state.show_border,
                border_val: "0px"
            })
        else {
            this.setState({
                show_border: !this.state.show_border,
                border_val: "1px dashed gray"
            })
        }
    }

    excludedValToggle() {
        if (this.state.excluded_val === "X") {
            this.setState({
                excluded_val: ""
            })
        }
        else {
            this.setState({
                excluded_val: "X"
            })
        }
    }

    render() {
        return (
            <div className="page" onClick={this.clickHandler}>
                <h1 className="display-4 header">Picross Solver</h1>
                <p className="h4">Click on the rows and columns to add and remove constraints</p>
                <div className="contentWrapper">
                    <div className="leftSideWrapper">
                        <h5 className="settings">Grid Dimension Settings:</h5>
                        <div className="rowColWrapper">
                            <RowColForm name="Number of Rows (Max 25)" id="rows" passValue={this.getFormValue} val={this.state.rows} />
                            <RowColForm name="Number of Cols (Max 25)" id="cols" passValue={this.getFormValue} val={this.state.cols} />
                        </div>
                        <h5 className="settings">Display Settings:</h5>
                        <div className="submissionWrapper">
                            <div className="input-group-append">
                                <button onClick={this.excludedValToggle} className="btn btn-outline-secondary" type="button" id="button-addon2">Highlight Excluded Cells: {this.state.excluded_val === "X" ? "On" : "Off"}</button>
                            </div>
                            <div className="input-group-append">
                                <button onClick={this.borderToggle} className="btn btn-outline-secondary" type="button" id="button-addon2">Borders: {this.state.show_border ? "On" : "Off"}</button>
                            </div>
                        </div>
                        <h5 className="settings">Image Preset Setting:</h5>
                        <div className="submissionWrapper">
                            <div className="input-group-append">
                                <button onClick={this.imageToggle} className="btn btn-outline-secondary" type="button" id="button-addon2">Preset Image: {this.state.image}</button>
                            </div>
                        </div>
                        <h5 className="settings">Solver Settings:</h5>
                        <div className="submissionWrapper">
                            <div className="input-group-append">
                                <button onClick={this.animationToggle} className="btn btn-outline-secondary" type="button" id="button-addon2">Animation: {this.state.animation === true ? "On" : "Off"}</button>
                            </div>
                            <div className="input-group-append">
                                <button onClick={this.solverToggle} className="btn btn-outline-secondary" type="button" id="button-addon2">Solver: {this.state.solver}</button>
                            </div>
                            <input type="submit" value="Solve Puzzle!" className="btn btn-warning" onClick={this.submit} />
                        </div>
                    </div>
                    <Grid rows={this.state.rows} cols={this.state.cols} passState={this.getGridState} grid={this.state.response}
                        submit={this.state.submit} popupIndices={this.state.popupIndices} passPopupIndices={this.getPopupIndices}
                        animation={this.state.animation} image={this.state.image} border_val={this.state.border_val} show_border={this.state.show_border} excluded_val={this.state.excluded_val} />
                </div>
            </div>
        )
    }
}
