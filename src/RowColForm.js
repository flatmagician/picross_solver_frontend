import React, { Component } from 'react'
import "./RowColForm.css"

export default class RowColForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: this.props.val };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.val !== this.props.val) {
            if (this.props.val !== this.state.value)
                this.setState({
                    value: this.props.val
                })
        }
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
        this.props.passValue(this.props.id, +event.target.value)
    }


    render() {
        return (
            <div className="rowColForm">
                <div className="input-group mb-3" onSubmit={this.handleSubmit}>
                    <span className="input-group-addon" id="basic-addon3">{this.props.name}</span>
                    <input type="text" className="form-control" value={this.state.value} onChange={this.handleChange} />
                </div>
            </div>
        );
    }
}