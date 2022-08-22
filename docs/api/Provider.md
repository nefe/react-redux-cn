---
id: provider
title: Provider
sidebar_label: Provider
hide_title: true
description: 'API > Provider: providing the Redux store to your React app'
---

&nbsp;

# `Provider`

## 概述

`<Provider>` 组件使 Redux `store` 可用于任何需要访问 Redux store 的嵌套组件。

由于 React Redux 应用中的任何 React 组件都可以连接到 store，因此大多数应用会在顶层渲染一个 `<Provider>`，将整个应用的组件树包裹其中。

[Hooks](./hooks.md) 和 [`connect`](./connect.md) API 可以通过 React 的 Context 机制访问所提供的 store 实例。

### Props

```ts
interface ProviderProps<A extends Action = AnyAction, S = any> {
  /**
   * 应用程序中的单个 Redux store。
   */
  store: Store<S, A>

  /**
   * 可选的服务器状态快照。将在初始 hydration 渲染期间使用
   * 如果该项参数可用，确保输出的 UI 与服务器上生成的 HTML 一致。
   * 8.0 中的新功能
   */
  serverState?: S

  /**
   * 在 react-redux 内部使用的可选上下文。 使用 React.createContext()
   * 创建要使用的上下文。
   * 如果使用该项参数，你将需要通过向 Provider 提供相同的上下文
   * 来自定义 `connect`。
   * 初始值无关紧要，因为它会被 Provider 内部的 state 覆盖。
   */
  context?: Context<ReactReduxContextValue<S, A>>

  /** 组件树中的顶层 React 元素，比如 `<App />` **/
  children: ReactNode
}
```

通常情况下，你只需要传入 `<Provider store={store}>`。

你可以提供一个上下文实例。如果这样做的话，你还需要为所有连接的组件提供相同的上下文实例。未能提供正确的上下文实例会导致以下运行报错：

> Invariant Violation
>
> Could not find "store" in the context of "Connect(MyComponent)". Either wrap the root component in a `<Provider>`, or pass a custom React context provider to `<Provider>` and the corresponding React context consumer to Connect(Todo) in connect options.

## React 18 使用 SSR

从 React-Redux v8 开始，`<Provider>` 接受一个 `serverState` 属性以用于 SSR hydration 的场景。
如果你调用 `hydraRoot` 来避免 hydration 不匹配，该属性是必要的。

你应该从服务器传递整个序列化的 state 作为 `serverState` 属性，React 将使用此 state 进行初始的 hydration 渲染。之后，在渲染过程中它会依赖客户端发生的变更而进行更新。

## 示例

### 基本用法

在下面的示例中，`<App />` 组件是我们的根级组件。这意味着它位于我们组件层次的最顶层。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { App } from './App'
import createStore from './createReduxStore'

const store = createStore()

// 从 React 18 起
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
```

### React 18 SSR hydration

在这个例子中，客户端收到了服务器渲染的 HTML，以及一个附加到 `window` 的序列化 Redux state。序列化 state 用于预填充 store 的内容，并作为 `serverState` 属性传递给 `<Provider>`

```tsx title="src/index.ts"
import { hydrateRoot } from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

const preloadedState = window.__PRELOADED_STATE__

const clientStore = configureStore({
  reducer: rootReducer,
  preloadedState,
})

hydrateRoot(
  document.getElementById('root'),
  <Provider store={clientStore} serverState={preloadedState}>
    <App />
  </Provider>
)
```
