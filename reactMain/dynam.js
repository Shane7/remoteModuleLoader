function XKCDComic(props) {
  return React.createElement(
    'div',
    {},
    React.createElement('img', {
      src: `https://imgs.xkcd.com/comics/${props.path}.png`,
      title: props.altText,
    })
  )
}

function dynam(props) {
  return React.createElement(XKCDComic, {
    path: 'compiling',
    number: '303',
    altText: props.username,
  });
  };