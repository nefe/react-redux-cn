---
id: batch
title: batch
sidebar_label: batch()
hide_title: true
description: 'API > batch: batching React rendering updates'
---

&nbsp;

# `batch()`

```js
batch((fn: () => void))
```

_v7.0.0 新增_

:::info 说明

**如果你使用的是 React 18，则不需要使用 `batch` API**。 React 18 自动 batch _所有_ state 的更新，无论它们在哪等候处理。

:::

React 的 `unstable_batchedUpdates()` API 允许在事件循环 tick 中的任何 React 更新被打包到单个渲染通道。React 已经在内部将其用于自己的事件处理回调。这个API 实际上是 ReactDOM 和 React Native 等渲染程序包的一部分，而不是 React core 0本身。

由于 React-Redux 需要在 ReactDOM 和 React Native 环境中工作，因此我们已经在构建时从正确的渲染程序中导入这个 API 以供使用。我们现在也重新导出了这个函数，重命名为 `batch()`。你可以使用它来确保在 React 之外 dispatch 多个 action 仅导致一次渲染更新，如下所示：

```ts
import { batch } from 'react-redux'

function myThunk() {
  return (dispatch, getState) => {
    // 应该只导致一次而不是两次组合的重新渲染
    batch(() => {
      dispatch(increment())
      dispatch(increment())
    })
  }
}
```

## 引用

- [`unstable_batchedUpdates()` API from React](https://github.com/facebook/react/commit/b41883fc708cd24d77dcaa767cde814b50b457fe)
- [React 18 Working Group: Automatic Batching for Fewer Renders in React 18](https://github.com/reactwg/react-18/discussions/21)
