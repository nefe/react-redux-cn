---
id: quick-start
title: Quick Start
sidebar_label: Quick Start
hide_title: true
---

&nbsp;

# React Redux 快速开始

:::tip 你将学到什么

- 如何通过 React Redux 设置和使用 Redux Toolkit 

:::

:::info 预置知识

- 熟悉 [ES6 语法和特性](https://www.taniarascia.com/es6-syntax-and-feature-overview/)
- React 术语知识：[JSX](https://reactjs.org/docs/introducing-jsx.html)，[State](https://reactjs.org/docs/state-and-lifecycle.html)，[Function Components，Props](https://reactjs.org/docs/components-and-props.html)，和 [Hooks](https://reactjs.org/docs/hooks-intro.html)
- 理解 [Redux 术语和概念](https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow)

:::

## 简介

欢迎来到 React Redux 快速开始的教程！**本教程将向你简要介绍 React Redux，并教你如何正确开始使用它**。

### 如何阅读本教程

本页将重点介绍如何使用 Redux Toolkit 和你将使用的主要 API 设置 Redux 应用程序。有关 Redux 是什么，它是如何工作的，以及如何使用 Redux Toolkit 的完整示例说明，请参阅 [Redux 核心文档教程](https://redux.js.org/tutorials/index)。

对于本教程，我们假设你同时使用 Redux Toolkit 和 React Redux，因为这是标准的 Redux 使用模式。这些示例基于[典型的Create-React-App 文件夹结构](https://create-react-app.dev/docs/folder-structure) 其中所有应用程序代码都在一个 `src` 中，但这些模式可以适应你正在使用的任何项目或文件夹设置。

[Create-React-App 的 Redux+JS 模版](https://github.com/reduxjs/cra-template-redux)已经配置了相同的项目设置。

## 使用总结

### 安装 Redux Toolkit 和 React Redux

将 Redux Toolkit 和 React Redux 文件夹加入到你的项目中：

```sh
npm install @reduxjs/toolkit react-redux
```

### 创建 Redux Store

创建一个命名为 `src/app/store.js` 的文件。从 Redux Toolkit 中 导入 `configureStore` API。我们将开始创建一个空的 Redux store，并导出它：

```js title="app/store.js"
import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: {},
})
```

这将创建一个 Redux store，并自动配置 Redux DevTools 扩展，以便你可以在开发时检查 store。

### 为 React 提供 Redux Store

创建 store 后，我们可以通过在 `src/index.js` 中的应用程序外层放置一个 React Redux `<Provider>` 来使其对我们的 React 组件可用。导入我们刚刚创建的 Redux store，在 `<App>` 的外层放置一个 `<Provider>`，并将 store 作为 prop 传递：

```js title="index.js"
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
// highlight-start
import store from './app/store'
import { Provider } from 'react-redux'
// highlight-end

// 从 React 18 开始
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  // highlight-next-line
  <Provider store={store}>
    <App />
  </Provider>
)
```

### 创建 Redux State Slice

添加一个名为 `src/features/counter/counterSlice.js` 的新文件。在该文件中，从 Redux Toolkit 导入 `createSlice` API。

创建 slice 需要一个字符串名称来标识 slice，一个初始 state 值，以及一个或多个 reducer 函数来定义如何更新 state。创建 slice 后，我们可以导出生成的 Redux action creators 和整个 slice reducer 函数。

Redux 要求[我们通过制作数据副本和更新副本来不可变地写入所有的 state 更新](https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow#immutability)。但是，Redux Toolkit 的 `createSlice` 和 `createReducer` API 在内部使用 [Immer](https://immerjs.github.io/immer/) 允许我们[编写 mutating 更新逻辑从而成为正确的不可变更新](https://redux.js.org/tutorials/fundamentals/part-8-modern-redux#immutable-updates-with-immer)。

```js title="features/counter/counterSlice.js"
import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      // Redux Toolkit 允许我们在 reducers 中编写 mutating 逻辑。它
      // 实际上并没有 mutate state 因为它使用了 Immer 库，
      // 它检测到草稿 state 的变化并产生一个全新的
      // 基于这些更改的不可变 state
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

// 为每个 case reducer 函数生成 Action creators
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer
```

### 添加 Slice Reducers 到 Store

接下来，我们需要从 counter slice 中导入 reducer 函数并将其添加到我们的 store 中。通过在 `reducers` 参数中定义一个字段，我们告诉 store 使用这个 slice reducer 函数来处理该 state 的所有更新。

```js title="app/store.js"
import { configureStore } from '@reduxjs/toolkit'
// highlight-next-line
import counterReducer from '../features/counter/counterSlice'

export default configureStore({
  reducer: {
    // highlight-next-line
    counter: counterReducer,
  },
})
```

### 在 React 组件中使用 Redux State 和 Actions

现在我们可以使用 React Redux hooks 让 React 组件与 Redux store 交互。我们可以使用 `useSelector` 从 store 中读取数据，并使用 `useDispatch` dispatch actions。创建一个包含 `<Counter>` 组件的 `src/features/counter/Counter.js` 文件，然后将该组件导入 `App.js` 并在 `<App>` 中渲染它。

```jsx title="features/counter/Counter.js"
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './counterSlice'
import styles from './Counter.module.css'

export function Counter() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  )
}
```

从现在起单击 Increment 和 Decrement 按钮：

- 对应的 Redux action 会 dispatch store
- 计数 slice reducer 将看到 actions 更新其 state
- `<Counter>` 组件将从 store 中看到新的 state 值，并使用新的数据重新渲染自己

## 你学到了什么

这是关于如何通过 React 设置，使用 Redux Toolkit 的简要概述。重新总结一下细节。

:::tip 总结

- **使用 `configureStore` 创建 Redux store**
  - `configureStore` 接收 `reducer` 函数作为命名参数
  - `configureStore` 使用良好的默认设置自动设置 store
- **为 React 应用程序组件提供 Redux store**
  - 在你的 `<App />` 外层包裹一个 React Redux `<Provider>` 组件
  - 将 Redux store 作为 `<Provider store={store}> 传递`
- **使用 `createSlice` 创建一个 Redux slice reducer**
  - 使用字符串名称，初始 state 和命名的 reducer 函数调用 `createSlice`
  - Reducer 函数可以使用 Immer 来 mutate state 
  - 导出生成的 slice reducer 和 action creators
- **在 React 组件中使用 React Redux `useSelector/useDispatch` hooks**
  - 使用 `useSelector` hook 从 store 读取数据 
  - 使用 `useDispatch` hook 获取 `dispatch` 函数，并根据需要 dispatch actions

:::

### 完整的 Counter 应用示例

此处显示的计数器示例应用程序也是

这是作为运行 CodeSandbox 的完整计数器应用程序：

<iframe
  class="codesandbox"
  src="https://codesandbox.io/embed/github/reduxjs/redux-essentials-counter-example/tree/master/?fontsize=14&hidenavigation=1&module=%2Fsrc%2Ffeatures%2Fcounter%2FcounterSlice.js&theme=dark&runonclick=1"
  title="redux-essentials-example"
  allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>

## 下一步是什么？

我们建议你阅读 [**Redux 核心文档中的 Redux Essentials 和 Redux Fundamentals 教程**](https://redux.js.org/tutorials/index)，这将使你全面了解 Redux 的工作原理，Redux Toolkit 和 React Redux 的作用，以及如何正确使用它。
