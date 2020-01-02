import React, { Component } from 'react'
import RowColForm from './RowColForm'
import Grid from './Grid.js'
import "./Page.css"


export default class Page extends Component {
    constructor(props) {
        super(props)

        this.state = {
            rows: 15,
            cols: 15
        }
        this.getFormValue = this.getFormValue.bind(this)
    }

    getFormValue = (name, value) => {
        let newState = this.state
        if (Number.isInteger(+value) && value > 0 && value < 26) {
            newState[name] = value
            this.setState(newState)
        }
    }

    render() {
        return (
            <div className="page">
                <RowColForm name="Number of Rows (Max 25)" id="rows" passValue={this.getFormValue} />
                <RowColForm name="Number of Cols (Max 25)" id="cols" passValue={this.getFormValue} />
                <Grid rows={this.state.rows} cols={this.state.cols} />
            </div>
        )
    }
}
