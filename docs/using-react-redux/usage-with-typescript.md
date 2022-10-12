---
id: usage-with-typescript
title: 与 TypeScript 一起使用
hide_title: true
sidebar_label: 与 TypeScript 一起使用
description: '使用指南 > TypeScript: how to correctly type React Redux APIs'
---

&nbsp;

# 与 TypeScript 一起使用

从 React-Redux v8 开始，React-Redux 完全使用 TypeScript 编写，并且已发布的包中包含了这些 types。这些 types 还导出了一些辅助器，以便更轻松地在 Redux store 和 React 组件之间编写类型安全的接口。

:::info

最近更新的 `@types/react@18` 主要版本已经更改了组件的定义，默认情况下不再将 `children` 作为一个 prop。如果你的项目中有多个 `@types/react` 副本，这会导致错误。要解决这个问题，请告诉你的包管理员将 `@types/react` 解析为单独的版本。更多细节见：

https://github.com/facebook/react/issues/24304#issuecomment-1094565891

:::

## 使用 TypeScript 创建的标准 Redux Toolkit 项目

我们假设典型的 Redux 项目同时使用了 Redux Toolkit 和 React Redux。

[Redux Toolkit](https://redux-toolkit.js.org) (RTK) 是编写现代 Redux 逻辑的标准方法。RTK 已经使用 TypeScript 编写，它的 API 旨在为使用 TypeScript 提供良好的体验。

[Redux+TS template for Create-React-App](https://github.com/reduxjs/cra-template-redux-typescript) 附带了一个配置好这些模式的工作示例。

### 定义 Root State 和 Dispatch Types

使用 [configureStore](https://redux-toolkit.js.org/api/configureStore) 无需任何额外的类型。但是，你需要提取 `RootState` 类型和 `Dispatch` 类型，以便可以按需引用它们。从 store 本身推断它们的类型意味着，当你添加更多的 state slices 或者修改了 middleware 的配置时，它们能被正确地更新。

由于这些都是 types，因此可以安全地直接从 `app/store.ts` 这样的 store 设置文件中导出它们，并将它们直接导入到其他文件中。

```ts title="app/store.ts"
import { configureStore } from '@reduxjs/toolkit';
// ...

const store = configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
    users: usersReducer,
  },
});

// highlight-start
// 从 store 本身推断出 `RootState` 和 `AppDispatch` types
export type RootState = ReturnType<typeof store.getState>;
// 类型推断: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
// highlight-end
```

### 定义 Typed Hooks

虽然可以将 `RootState` 和 `AppDispatch` types 导入每个组件，但最好 **创建 pre-typed 版本的 `useDispatch` 和 `useSelector` hooks 以供应用中使用**。有一些原因可以说明这很关键：

- 对于 `useSelector` 而言，它省去了每次定义 `(state: RootState)` 类型的需要
- 对于 `useDispatch` 而言，默认的 `Dispatch` type 不知道 thunks 或其他 middleware。为了正确 dispatch thunks，需要从包含 thunk middleware types 的 store 中，使用特定的自定义 `AppDispatch` type，并将其与 `useDispatch` 一起使用。添加一个 pre-typed 的 `useDispatch` hook 可以防止你忘记在需要的地方导入 `AppDispatch`。

由于它们是实际的变量而不是类型，因此在像 `app/hooks.ts` 这样单独的文件中，而不是 store 的设置文件中定义它们是很重要的。这允许你将它们导入到需要使用这些 hooks 的任何组件文件中，并避免了潜在的循环导入依赖问题。

```ts title="app/hooks.ts"
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// highlight-start
// 在整个应用中使用，而不是简单的使用 `useDispatch` 和 `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// highlight-end
```

## 手动定义 Hooks 类型

我们建议使用上面展示的 pre-typed `useAppSelector` 和 `useAppDispatch` hooks。如果你不想使用，接下来展现如何自己定义 hooks 类型。

### 定义 `useSelector` hook 类型

在编写与 `useSelector` 一起使用的 selector 函数时，你应该明确定义 `state` 参数的类型。TS 能够推断出 selector 的返回类型，它将被作为 `useSelector` hook 的返回类型进行复用：

```ts
interface RootState {
  isOn: boolean;
}

// TS 推断的类型：(state: RootState) => boolean
const selectIsOn = (state: RootState) => state.isOn;

// TS 推断 `isOn` 是布尔值
const isOn = useSelector(selectIsOn);
```

同样可以在一行内编写：

```ts
const isOn = useSelector((state: RootState) => state.isOn);
```

### 定义 `useDispatch` hook 类型

By default, the return value of `useDispatch` is the standard `Dispatch` type defined by the Redux core types, so no declarations are needed:

默认情况下，`useDispatch` 的返回值是由 Redux 核心 types 所定义的标准 `Dispatch` 类型，因此不需要声明：

```ts
const dispatch = useDispatch();
```

如果你有 `Dispatch` type 的自定义版本，则可以显式使用该类型：

```ts
// store.ts
export type AppDispatch = typeof store.dispatch;

// MyComponent.tsx
const dispatch: AppDispatch = useDispatch();
```

## 定义 `connect` 高阶组件类型

### 自动推断 Connected Props

`connect` 由两个按顺序调用的函数组成。第一个函数接受 `mapState` 和 `mapDispatch` 作为参数，并返回第二个函数。第二个函数接受要被包裹的组件，并返回一个新的包裹组件，该组件将来自 `mapState` 和 `mapDispatch` 的 props 向下传递。通常，这两个函数会一起调用，例如 `connect(mapState, mapDispatch)(MyComponent)`。

该包包含了一个辅助类型 `ConnectedProps`，它可以从第一个函数中提取 `mapStateToProps` 和 `mapDispatchToProps` 的返回类型。这意味着如果你将 `connect` 调用分成两个步骤，所有的“来自 Redux 的 props”都可以自动推断出来，而无需手动编写它们。如果你已经使用 React-Redux 一段时间了，可能会觉得这种方式异常，但它确实大大简化了类型声明。

```ts
import { connect, ConnectedProps } from 'react-redux';

interface RootState {
  isOn: boolean;
}

const mapState = (state: RootState) => ({
  isOn: state.isOn,
});

const mapDispatch = {
  toggleOn: () => ({ type: 'TOGGLE_IS_ON' }),
};

const connector = connect(mapState, mapDispatch);

// 推断出的类型如下：
// {isOn: boolean, toggleOn: () => void}
type PropsFromRedux = ConnectedProps<typeof connector>;
```

然后可以使用 `ConnectedProps` 的返回类型来定义 props 对象的类型。

```tsx
interface Props extends PropsFromRedux {
  backgroundColor: string;
}

const MyComponent = (props: Props) => (
  <div style={{ backgroundColor: props.backgroundColor }}>
    <button onClick={props.toggleOn}>
      Toggle is {props.isOn ? 'ON' : 'OFF'}
    </button>
  </div>
);

export default connector(MyComponent);
```

因为可以按任何顺序定义类型，所以需要的话，仍然可以在声明 connector 之前声明组件。

```tsx
// 或者声明 `type Props = PropsFromRedux & {backgroundColor: string}`
interface Props extends PropsFromRedux {
  backgroundColor: string;
}

const MyComponent = (props: Props) => /* same as above */

const connector = connect(/* same as above*/)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(MyComponent)
```

### 手动定义 `connect` 类型

`connect` 高阶组件难以定义类型，因为 props 有 3 个来源：`mapStateToProps`、`mapDispatchToProps` 和从父组件传入的 props。这是手动执行此操作的完整示例。

```tsx
import { connect } from 'react-redux';

interface StateProps {
  isOn: boolean;
}

interface DispatchProps {
  toggleOn: () => void;
}

interface OwnProps {
  backgroundColor: string;
}

type Props = StateProps & DispatchProps & OwnProps;

const mapState = (state: RootState) => ({
  isOn: state.isOn,
});

const mapDispatch = {
  toggleOn: () => ({ type: 'TOGGLE_IS_ON' }),
};

const MyComponent = (props: Props) => (
  <div style={{ backgroundColor: props.backgroundColor }}>
    <button onClick={props.toggleOn}>
      Toggle is {props.isOn ? 'ON' : 'OFF'}
    </button>
  </div>
);

// 典型的用法：在组件定义之后调用 `connect`
export default connect<StateProps, DispatchProps, OwnProps>(
  mapState,
  mapDispatch
)(MyComponent);
```

It is also possible to shorten this somewhat, by inferring the types of `mapState` and `mapDispatch`:
通过推断 `mapState` 和 `mapDispatch` 的类型，可以稍微缩短一些：

```ts
const mapState = (state: RootState) => ({
  isOn: state.isOn,
});

const mapDispatch = {
  toggleOn: () => ({ type: 'TOGGLE_IS_ON' }),
};

type StateProps = ReturnType<typeof mapState>;
type DispatchProps = typeof mapDispatch;

type Props = StateProps & DispatchProps & OwnProps;
```

但是，如果将 `mapDispatch` 定义为对象并且还引用了 thunks，则以这种方式推断 `mapDispatch` 的类型将会中断。

## 推荐

hooks API 通常更容易与静态类型一起使用。**如果你正在寻找在 React-Redux 中使用静态类型的最简单解决方案，请使用 hooks API。**

如果你使用 `connect`，**我们推荐使用 `ConnectedProps<T>` 方法从 Redux 推断 props**，因为这只需要最少的显式类型声明。

## 资源

有关其他信息，请参阅以下其他资源：

- [Redux docs: Usage with TypeScript](https://redux.js.org/recipes/usage-with-typescript)：如何使用 Redux Toolkit、Redux 核心和基于 TypeScript 的 React Redux 示例
- [Redux Toolkit docs: TypeScript Quick start](https://redux-toolkit.js.org/tutorials/typescript)：演示如何使用基于 TypeScript 的 RTK 和 React-Redux hooks API
- [React+TypeScript Cheatsheet](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet)：与 TypeScript 一起使用 React 的综合指南
- [React + Redux in TypeScript Guide](https://github.com/piotrwitek/react-redux-typescript-guide)：关于在 TypeScript 中使用 React 和 Redux 模式的大量信息
