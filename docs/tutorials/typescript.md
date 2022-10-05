---
id: typescript-quick-start
title: TypeScript Quick Start
sidebar_label: TypeScript Quick Start
hide_title: true
---

&nbsp;

# React Redux TypeScript 快速入门

:::tip 你将学到什么

- 如何使用 TypeScript 设置和使用 Redux Toolkit 和 React Redux

:::

:::info 预置知识

- React [Hooks](https://reactjs.org/docs/hooks-intro.html) 的知识
- 理解 [Redux 术语和概念](https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow)
- 了解 TypeScript 语法和概念

:::

## 简介

欢迎来到 React Redux TypeScript 快速入门教程！**本教程将简要展示如何将 TypeScript 与 Redux Toolkit 一起使用**。

本页重点介绍如何设置 TypeScript 方面。有关 Redux 是什么，它是如何工作的，以及如何使用 Redux 的完整示例说明，请查阅 [Redux 核心文档教程](https://redux.js.org/tutorials/index)。

React-Redux 和 Redux Toolkit 都已经用 TypeScript 编写了，因此它们的 TS 类型定义是内置的。

[React Redux](https://react-redux.js.org) 在 NPM 上单独的 [`@types/react-redux` typedefs 包](https://npm.im/@types/react-redux) 中有其类型定义。除了键入库函数以外，这些类型还导出了一些帮助器，以便更轻松地在 Redux store 和 React 组件之间编写类型安全接口。

[Create-React-App 的 Redux+TS](https://github.com/reduxjs/cra-template-redux-typescript) 模版附带了这些已配置模式的工作示例。详情：

:::info

最近更新的 `@types/react@18` 主要版本更改了组件定义，以删除默认情况下的将 `children` 作为 prop。如果你的项目中有多个 `@types/react` 副本，这会导致错误。要解决此问题，请告诉你的包管理器将 `@types/react` 解析为单个版本。详情：

https://github.com/facebook/react/issues/24304#issuecomment-1094565891

:::

## 项目设置

### 定义 Root State 和 Dispatch Types

[Redux Toolkit 的 `configureStore` API](https://redux-toolkit.js.org/api/configureStore) 不需要任何额外的类型。但是，你需要提取 `RootState` 类型和 `Dispatch` 类型，以便可以根据需要引用它们。从 store 本身推断这些类型意味着它们会随着你添加更多 state slices 或修改 middleware 设置而正确更新。

由于这些是类型，因此可以安全地直接从你的 store 设置文件（例如 `app/store.ts`）导出它们并将它们直接导入其他文件。

```ts title="app/store.ts"
import { configureStore } from '@reduxjs/toolkit'
// ...

const store = configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
    users: usersReducer,
  },
})

// highlight-start
// 从 store 本身推断`RootState` 和 `AppDispatch` 类型
export type RootState = ReturnType<typeof store.getState>
// 推断类型：{posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
// highlight-end
```

### 定义类型 Hooks

虽然可以将 `RootState` 和 `AppDispatch` 类型导入每个组件，**但最好创建 `useDispatch` 和 `useSelector` hooks 类型化版本以供在应用程序中使用**。这很重要，有几个原因：

- 对于 `useSelector`，它省去了每次输入 `(state: RootState)` 的需要
- 对于 `useDispatch`，默认的 `Dispatch` 类型不知道 thunk。为了正确 dispatch thunks，你需要使用 store 中包含 thunk 中间件类型的特定自定义 `AppDispatch` 类型，并将其与 `useDispatch` 一起使用。添加一个预先输入的 `useDispatch` hook 可以防止你忘记在需要的地方导入 `AppDispatch`。

由于这些是实际变量，而不是类型，因此将它们定义在单独的文件例如 `app/hooks.ts` 中很重要，而不是 store 设置文件。这允许你将它们导入到任何需要使用的 hooks 的组件文件中，并避免潜在的循环导入的依赖问题。

```ts title="app/hooks.ts"
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

// highlight-start
// 在整个应用程序中使用，而不是简单的 `useDispatch` 和 `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
// highlight-end
```

## 应用程序使用

### 定义 Slice State 和 Action Types

每个 slice 文件都应该为其初始 state 值定义一个类型，以便 `createSlice` 能够推断每个案例 reducer 中的 `state` 类型。

所有生成的 action 都应该使用 Redux Toolkit 中的 `PayloadAction<T>` 类型定义，该类型将 `action.payload` 字段的类型作为其通用参数。

你可以从此处的储存文件中安全地导入 `RootState` 类型。这是一个循环导入，但 TypeScript 编译器可以正确处理类型。这对于编写选择器函数等用例可能是必需的。

```ts title="features/counter/counterSlice.ts"
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

// highlight-start
// 定义 slice state 的类型
interface CounterState {
  value: number
}

// 使用该类型定义初始 state
const initialState: CounterState = {
  value: 0,
}
// highlight-end

export const counterSlice = createSlice({
  name: 'counter',
  // `createSlice` 将从 `initialState` 参数推断 state 类型
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    // highlight-start
    // 使用 PayloadAction 类型声明 `action.payload` 的内容
    incrementByAmount: (state, action: PayloadAction<number>) => {
      // highlight-end
      state.value += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions

// selectors 等其他代码可以使用导入的 `RootState` 类型
export const selectCount = (state: RootState) => state.counter.value

export default counterSlice.reducer
```

生成的 action creators 将根据你为 reducer 提供的 `PayloadAction<T>` 类型正确输入以接收 `payload` 参数。例如，`incrementByAmount` 需要一个 `number` 作为其参数。

在某些情况下，[TypeScript 可能会不必要地收紧初始 state 的类型](https://github.com/reduxjs/redux-toolkit/pull/827)。如果发生这种情况，你可以通过使用 `as` 转换初始 state 来解决它，而不是声明变量的类型：

```ts
// 解决方法：强制转换状态而不是声明变量类型
const initialState = {
  value: 0,
} as CounterState
```

### 在组件中使用类型 Hooks

在组件文件中，从 React-Redux 导入预先键入的 hooks 而不是标准的 hooks。

```tsx title="features/counter/Counter.tsx"
import React, { useState } from 'react'

// highlight-next-line
import { useAppSelector, useAppDispatch } from 'app/hooks'

import { decrement, increment } from './counterSlice'

export function Counter() {
  // highlight-start
  // `state` arg 已经正确被键入 `RootState`
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()
  // highlight-end

  // 省略渲染逻辑
}
```

## 下一步是什么？

有关如何将 Redux Toolkit 的 API 与 TypeScript 一起使用的详细信息，请参阅 [使用 TypeScript 页面](../using-react-redux/usage-with-typescript.md)。
