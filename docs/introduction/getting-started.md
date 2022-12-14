---
id: getting-started
title: 入门 React Redux
hide_title: true
sidebar_label: 入门 React Redux
description: 'Introduction > Getting Started: First steps with React Redux'
---

&nbsp;

import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'

# 入门 React Redux

[React Redux](https://github.com/reduxjs/react-redux) 是 [Redux](https://redux.js.org/) 的官方 [React](https://reactjs.org/) UI 绑定库。它使得你的 React 组件能够从 Redux store 中读取到数据，并且你可以通过`dispatch` `actions`去更新 store 中的 state。

## 安装

React Redux 8.x 需要 **React 16.8.3 或更高的版本** / **React Native 0.59 或更高的版本**，这样我们就可以使用 React Hooks 了。

### 使用 Create React App

我们推荐你新建一个 React 和 Redux 的应用，运行 [Create React App](https://github.com/facebook/create-react-app) 并选择[官方的 Redux+JS 模版](https://github.com/reduxjs/cra-template-redux)或者  [Redux+TS 模版](https://github.com/reduxjs/cra-template-redux-typescript)，它集成了 **[Redux Toolkit](https://redux-toolkit.js.org/)** 和 React Redux 与 React 组件。

```bash
# Redux + 普通 JS 模版
npx create-react-app my-app --template redux

# Redux + TypeScript 模版
npx create-react-app my-app --template redux-typescript
```

### 一个已有的 React 应用

在你的 React 应用中使用 React Redux，将它作为一个依赖安装：

```bash
# 如果你使用 npm:
npm install react-redux

# 或者你使用 Yarn:
yarn add react-redux
```

你也需要去[安装 Redux](https://redux.js.org/introduction/installation) 并且在你的应用中[创建 Redux store](https://redux.js.org/recipes/configuring-your-store/)。

React-Redux v8 是用 TypeScript 编写的，因此所有的类型都会自动包含在内。

## API 概述

### `Provider`

React Redux 包含一个 `<Provider />` 组件，这使得 Redux store 能够在应用的其他地方使用：

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'

import { Provider } from 'react-redux'
import store from './store'

import App from './App'

// 从 React 18 开始
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
```

### Hooks

React Redux 提供了一对自定义的 React hooks 使得 React 组件能够与 Redux store 通信。

`useSelector` 从 store state 中读取一个值，并且可以订阅和更新，而 `useDispatch` 返回 store 的 `dispatch` 方法让你可以去 dispatch actions。

```jsx
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount,
} from './counterSlice'
import styles from './Counter.module.css'

export function Counter() {
  const count = useSelector(selectCount)
  const dispatch = useDispatch()

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
      </div>
      {/* 此处省略额外的渲染输出 */}
    </div>
  )
}
```

## 学习 React Redux

### 学习现代 Redux Livestream

Redux 的维护者 Mark Erikson 在 Learn with Jason 节目中，推荐我们如何去使用 Redux。该节目包括一个在线编码的示例应用程序，展示了如何将 Redux Toolkit、React-Redux hooks 与 Typescript 一起使用，以及新的 RTK Query 数据获取 API。

请参阅 [the "Learn Modern Redux" show notes page](https://www.learnwithjason.dev/let-s-learn-modern-redux) 获取应用源代码的报告和链接。

<LiteYouTubeEmbed 
    id="9zySeP5vH9c"
    title="Learn Modern Redux - Redux Toolkit，React-Redux Hooks，and RTK Query"
/>

## 帮助和讨论

**[Reactiflux Discord 社区](http://www.reactiflux.com)** 的 **[#redux channel](https://discord.gg/0ZcbPKXt5bZ6au5t)** 是我们学习和使用所有与 Redux 相关问题的官方资源。Reactiflux 是一个闲逛、提问和学习的好地方 - 快来加入我们吧！

你还可以使用 **[#redux tag](https://stackoverflow.com/questions/tagged/redux)** 在 [Stack Overflow](https://stackoverflow.com) 上提问。

## 文档翻译

- [葡萄牙语](https://fernandobelotto.github.io/react-redux)
