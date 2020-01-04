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
            image: "Duck"
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
    }

    getFormValue = (name, value) => {
        let newState = this.state
        if (Number.isInteger(+value) && value > 0 && value < 26) {
            newState[name] = value
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
            this.setState({
                solver: "DFS"
            })
        }
    }

    imageToggle() {
        if (this.state.image === "Duck") {
            this.setState({
                image: "Crab",
                rows: 24,
                cols: 24
            })
        }
        if (this.state.image === "Crab") {
            this.setState({
                image: "Duck",
                rows: 15,
                cols: 15
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
                        <div className="rowColWrapper">
                            <RowColForm name="Number of Rows (Max 25)" id="rows" passValue={this.getFormValue} />
                            <RowColForm name="Number of Cols (Max 25)" id="cols" passValue={this.getFormValue} />
                        </div>
                        <div className="submissionWrapper">
                            <div className="input-group-append">
                                <button onClick={this.imageToggle} className="btn btn-outline-secondary" type="button" id="button-addon2">Image: {this.state.image}</button>
                            </div>
                        </div>
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
                        animation={this.state.animation} image={this.state.image} />
                </div>
            </div>
        )
    }
}
