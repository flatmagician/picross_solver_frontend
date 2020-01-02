import React, { Component } from 'react'

export default class RowColForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
        this.props.passValue(this.props.id, +event.target.value)
    }


    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    {this.props.name}
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
            </form>
        );
    }
}