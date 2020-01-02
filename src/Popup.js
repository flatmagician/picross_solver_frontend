import React, { Component } from 'react'

export default class Popup extends Component {
    constructor(props) {
        super(props)

        this.state = {
            text: "",
            value: [],
            axis: "",
            valid: true
        }

        this.getText = this.getText.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        this.getText()
    }

    getText() {
        let text
        console.log(this.props)
        if (this.props.row === 0) {
            text = "col " + (this.props.col - this.props.colConstraint)
            this.setState({ axis: "cols" })
        }
        else {
            text = "row " + (this.props.row - this.props.rowConstraint)
            this.setState({ axis: "rows" })
        }
        this.setState({ text: text })
    }

    handleChange(event) {
        let res = event.target.value.split(" ")
        let value = res.map(val => +val)
        this.setState({ value: value });
    }

    handleSubmit(event) {
        let constraint_block_total = this.state.value.length - 1
        this.state.value.forEach(constraint_val => {
            //if constraints are invalid, make block total an invalid number
            if (!Number.isInteger(constraint_val) || constraint_val < 1) {
                constraint_block_total += 25
            }
            else {
                constraint_block_total += constraint_val
            }
        })
        const axis = this.state.axis
        if (constraint_block_total <= this.props[axis]) {
            this.setState({ valid: true })
            //submit value
            this.props.passVal(this.state.value)
            this.props.resizeConstraints(this.state.value.length, this.state.axis)
        }
        else {
            this.setState({ valid: false })
        }
        event.preventDefault();
    }

    render() {
        return (
            <div className="popup">
                {this.state.text}
                <input type="text" value={this.props.value} onChange={this.handleChange} />
                <input type="submit" value="Submit" onClick={this.handleSubmit} />
                {this.state.valid ? <div></div> : <div>invalid constraint</div>}
            </div>
        )
    }
}
