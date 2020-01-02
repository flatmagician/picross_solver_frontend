import React, { Component } from 'react'
import RowColForm from './RowColForm'
import Grid from './Grid.js'
import "./Page.css"


export default class Page extends Component {
    constructor(props) {
        super(props)

        this.state = {
            rows: 4,
            cols: 4
        }
        this.getFormValue = this.getFormValue.bind(this)
        this.update = this.update.bind(this)
    }

    getFormValue = (name, value) => {
        let newState = this.state
        if (Number.isInteger(+value) && value > 0 && value < 26) {
            newState[name] = value
            this.setState(newState)
        }
    }

    update() {
        console.log("parent updating")
        this.forceUpdate()
    }

    render() {
        return (
            <div className="page">
                <RowColForm name="Number of Rows (Max 25)" id="rows" passValue={this.getFormValue} />
                <RowColForm name="Number of Cols (Max 25)" id="cols" passValue={this.getFormValue} />
                <Grid rows={this.state.rows} cols={this.state.cols} updateParent={this.update} />
            </div>
        )
    }
}
