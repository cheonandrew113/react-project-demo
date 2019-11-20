import React, { Component } from "react";

export default class Selector extends Component {
  state = {
    entered: ""
  };

  render() {
    console.log("entered", this.state.entered)
    const { getData, getStock } = this.props;
    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          getData(this.state.entered.toLowerCase());
          getStock(this.state.entered.toLowerCase());
          this.setState({
            entered: ""
          });
        }}
      >
        <div className="input-group mb-3">
          <input
            className="form-control"
            aria-label="stock-symbol"
            aria-describedby="enter-stock-symbol"
            type="text"
            placeholder="Enter a Symbol"
            value={this.state.entered}
            onChange={e => {
              this.setState({
                entered: e.target.value
              });
            }}
          />
          <div className="input-group-append" />
          <button
            className="btn btn-secondary"
            type="button"
            onClick={e => {
              e.preventDefault();
              getData(this.state.entered.toLowerCase());
              getStock(this.state.entered.toLocaleLowerCase());
              this.setState({
                entered: ""
              });
            }}
          >
            ENTER
          </button>
        </div>
      </form>
    );
  }
}
