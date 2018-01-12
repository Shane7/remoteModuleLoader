// Class components always extend from `React.Component`
//to build: jsx  -w src/ bld/

import {SubCmp1} from './subCmp1';

var poorState = 'inital value';

class Center2 extends React.Component {
  constructor(props) {
  super(props)
  this.state = {
    value: poorState
  };

  this.handleChange = this.handleChange.bind(this)
}

  handleChange(event) {
    poorState = event.target.value;
    this.setState({value: event.target.value});
  }

  render() {
    return(
      <div>
        <p>I am a simple component. - v2</p>
        <p>My input value is: <strong>{this.state.value}</strong></p>
        <input type='text' value={this.state.value} onChange={this.handleChange} />
        <SubCmp1></SubCmp1>
      </div>
    );
  }
}

export function SimpleComponent(props) {
  return React.createElement(
    Center2,
    {}
  )
}