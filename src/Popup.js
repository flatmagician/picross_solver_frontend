import React, { Component, useRef } from 'react'
import "./Popup.css"

export default class Popup extends Component {
    constructor(props) {
        super(props)

        const left_offset = -394 + 20 * (18 - this.props.cols - this.props.colConstraint)
        let top_offset = 375
        if (this.props.animation) {
            top_offset += 141
        }
        this.state = {
            text: "",
            value: [],
            axis: "",
            valid: true,
            buttonText: "Press Enter to Submit",
            left_offset: left_offset,
            top_offset: top_offset
        }



        this.getText = this.getText.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.onKeyDown = this.onKeyDown.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        this.getText()
        this.nameInput.focus()
    }

    getText() {
        let text

        if (this.props.row < this.props.rowConstraint) {
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

    onKeyDown = (event) => {
        console.log(event.key)
        // 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
        if (event.key === 'Enter') {
            event.preventDefault();
            event.stopPropagation();
            this.handleSubmit(event);
        }
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
        let axis
        if (this.state.axis === "cols") {
            axis = "rows"
        }
        else {
            axis = "cols"
        }
        if (constraint_block_total <= this.props[axis]) {
            this.setState({
                valid: true,
                buttonText: "Press Enter to Submit",
            })
            //submit value
            this.props.passVal(this.state.value, this.state.axis)
        }
        else {
            this.setState({
                valid: false,
                buttonText: "Invalid Entry"
            })
        }
        event.preventDefault();
    }

    render() {
        return (
            <div className="popup" onKeyDown={this.onKeyDown} style={{ "left": this.state.left_offset, "top": this.state.top_offset }}>

                <div className="input-group mb-3" onSubmit={this.handleSubmit}>
                    <span className="input-group-addon addon-small">{this.state.text}</span>
                    <input type="text" className="form-control" ref={(input) => { this.nameInput = input; }} value={this.props.value} onChange={this.handleChange} />
                </div>
                <input type="submit" value={this.state.buttonText} className="btn btn-danger btn-small" onClick={this.handleSubmit} />
            </div>
        )
    }
}
