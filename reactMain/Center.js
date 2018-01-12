const createElement = React.createElement

// A Function Component
// function Center1(props) {
//   const style = { textAlign: 'center' }
//   return createElement('div', { style }, props.children)
// }

// Class components always extend from `React.Component`
class Center2 extends React.Component {
  // At minimum, class components have a `render()` method
  render() {
    const style = { textAlign: 'center' }
    // Props are accessed via `this.props`
    return createElement('div', { style }, this.props.children)
  }
}

function Center(props) {
  return createElement(Center2, {}, createElement('h1', {}, props.username))
  };
