# @itseasy21/react-elastic-carousel

> A flexible and responsive carousel component for react, a fork of [react-elastic-carousel](https://github.com/sag1v/react-elastic-carousel) 

[![NPM](https://img.shields.io/npm/v/@itseasy21/react-elastic-carousel.svg?style=flat-square)](https://www.npmjs.com/package/@itseasy21/react-elastic-carousel) ![npm](https://img.shields.io/npm/dw/@itseasy21/react-elastic-carousel?style=flat-square)

## Why do we need yet another carousel component

- **Element resize support (true responsiveness)**  
  Most of the carousel components are responsive to the viewport size, but this is not a real responsive support as we can have an element with a `width:500px` on a `1200px` screen, most carousel component will "think" we are on a `1200px` mode because they "watch" the view-port's size and not the wrapping element's size.
  This is the reason why `react-eleastic-carousel` is using the [resize-observer](https://developers.google.com/web/updates/2016/10/resizeobserver) which gives us a true responsive support, not matter on what screen size we are.
  
- **RTL (right-to-left) support**  
  Supporting right-to-left languages requires a full support for right-to-left rendering and animations which is not supported in most of the carousel components out there. also, right-to-left support is [important and should be a standard for most applications](https://www.youtube.com/watch?v=A_3BfONFRUc).

## [Live Demos & Docs](https://itseasy21.github.io/react-elastic-carousel/)

## Install

```bash
npm install --save @itseasy21/react-elastic-carousel
```

or

```bash
yarn add @itseasy21/react-elastic-carousel
```

### Note

`@itseasy21/react-elastic-carousel` is using [styled-components](https://github.com/styled-components/styled-components) for styling, this means that you should install it as well:

```bash
npm install --save styled-components
```

## Usage

```jsx
import React, { Component } from 'react';
import Carousel from '@itseasy21/react-elastic-carousel';

class App extends Component {
  state = {
    items: [
      {id: 1, title: 'item #1'},
      {id: 2, title: 'item #2'},
      {id: 3, title: 'item #3'},
      {id: 4, title: 'item #4'},
      {id: 5, title: 'item #5'}
    ]
  }

  render () {
    const { items } = this.state;
    return (
      <Carousel>
        {items.map(item => <div key={item.id}>{item.title}</div>)}
      </Carousel>
    )
  }
}
```

## Playground

[![Edit react-elastic-carousel](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-elastic-carousel-forked-qkc31r?file=/src/index.js)

## Development

```console
git clone https://github.com/itseasy21/react-elastic-carousel.git
cd react-elastic-carousel
yarn
```

### To run the docs site run

```console
yarn start
```

### to run a demo Application run

```console
yarn demo
```

The application is running at http://localhost:8888

## License

MIT © [`sag1v`](https://github.com/sag1v) & [`itseasy21`](https://github.com/itseasy21)
