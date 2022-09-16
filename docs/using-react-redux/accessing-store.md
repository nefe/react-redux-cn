---
id: accessing-store
title: Accessing the Store
hide_title: true
sidebar_label: Accessing the Store
description: 'Usage > Accessing the Store: techniques for getting the store in your components'
---

&nbsp;

# 访问 Store

React Redux 提供的 API 允许你的组件 dispatch actions 并从 store 中订阅数据更新。

作为其中的一部分，React Redux 抽象出你正在使用哪个 store 以及如何处理 store 交互的确切细节。在典型用法中，你自己的组件永远不需要关心这些细节，并且永远不会直接引用 store。 React Redux 还在内部处理 store 和 state 是如何传播到连接组件的细节，因此默认情况下按预期工作。

但是，在某些用例中，你可能需要自定义 store 和 state 是如何传播到连接的组件，或直接访问 store。以下是一些如何执行此操作的示例。

## 理解上下文用法

在内部，React Redux 使用 [React's "context" feature](https://reactjs.org/docs/context.html) 使深度嵌套的连接组件可以访问 Redux store。从 React Redux 版本 6 开始，这通常由 `React.createContext()` 生成的单个默认上下文对象实例处理，称为 `ReactReduxContext` 。

React Redux 的 `<Provider>` 组件使用 `<ReactReduxContext.Provider>` 将 Redux store 和当前 store state 放入上下文中，而 `connect` 使用 `<ReactReduxContext.Consumer>` 读取这些值并处理更新。

## 使用 `useStore` Hook

[`useStore` hook](../api/hooks.md#useStore) 从默认的 `ReactReduxContext` 返回当前的 store 实例。如果你确实需要访问 store，这是推荐的方法。
## 提供自定义上下文

你可以提供自己的自定义上下文实例，而不是使用 React Redux 中的默认上下文实例。

```jsx
<Provider context={MyContext} store={store}>
  <App />
</Provider>
```

如果你提供自定义上下文，React Redux 将使用该上下文实例，而不是默认创建和导出的上下文实例。

在向 `<Provider />` 提供自定义上下文后，你需要将此上下文实例提供给所有期望连接到同一 store 的连接组件：

```js
// 你可以将上下文作为可选项传递给 connect
export default connect(
  mapState,
  mapDispatch,
  null,
  { context: MyContext }
)(MyComponent)

// 或者，正常调用 connect 来开始
const ConnectedComponent = connect(
  mapState,
  mapDispatch
)(MyComponent)

// 之后，将自定义上下文作为 prop 传递给连接的组件
<ConnectedComponent context={MyContext} />
```

当 React Redux 在它正在查找的上下文中找不到 store 时，会发生以下 runtime error。例如：

- 你向 `<Provider />` 提供了一个自定义上下文实例，但没有向连接的组件提供相同的实例（或没有提供任何实例）。
- 你为连接的组件提供了自定义上下文，但没有向 `<Provider />` 提供相同的实例（或没有提供任何实例）。

> Invariant Violation
>
> Could not find "store" in the context of "Connect(MyComponent)". Either wrap the root component in a `<Provider>`, or pass a custom React context provider to `<Provider>` and the corresponding React context consumer to Connect(Todo) in connect options.

### 自定义上下文和 hooks API

要通过 hooks API 访问自定义上下文，你可以通过 [hook creator functions](../api/hooks.md#custom-context) 创建自定义 hooks。

## 多个 Stores

[Redux was designed to use a single store](https://redux.js.org/api/store#a-note-for-flux-users).
但是，如果你不可避免地需要使用多个 store，那么从 v6 开始，你可以通过提供（多个）自定义上下文来实现。
这也提供了 store 的自然隔离，因为它们存在于单独的上下文实例中。

```js
// 一个原生例子
const ContextA = React.createContext();
const ContextB = React.createContext();

// 假设 reducerA 和 reducerB 是合适的 reducer 函数
const storeA = createStore(reducerA);
const storeB = createStore(reducerB);

// 将上下文实例提供给 Provider
function App() {
  return (
    <Provider store={storeA} context={ContextA} />
      <Provider store={storeB} context={ContextB}>
        <RootModule />
      </Provider>
    </Provider>
  );
}

// 获取连接组件的对应 store
// 你需要使用正确的上下文
connect(mapStateA, null, null, { context: ContextA })(MyComponentA)

// 你也可以将备用上下文实例直接传递给连接的组件
<ConnectedMyComponentA context={ContextA} />

// 可以链式使用 connect()
// 在这种情况下，MyComponent 将从两个 store 接收合并的 props
compose(
  connect(mapStateA, null, null, { context: ContextA }),
  connect(mapStateB, null, null, { context: ContextB })
)(MyComponent);
```

## 直接使用 `ReactReduxContext`

在极少数情况下，你可能需要直接在自己的组件中访问 Redux store。这可以通过自己渲染适当的上下文消费者，并从上下文值访问 `store` 字段来完成。

:::caution 注意
这 **不被视为 React Redux 公共 API 的一部分，可能会在没有通知的情况下中断**。我们确实认识到社区在有需要的地方提供用例，并将尝试使用户能够在 React Redux 之上构建额外的功能，但我们对上下文的特定使用被认为是实现细节。
如果你有当前 API 未充分涵盖的其他用例，请提交问题以讨论可能的 API 改进。

:::

```jsx
import { ReactReduxContext } from 'react-redux'

// <Provider> 内部的某处
function MyConnectedComponent() {
  // 通过 `useContext` hook 访问 store
  const { store } = useContext(ReactReduxContext)

  // 或者，使用上下文的渲染 props 形式
  /*
  return (
    <ReactReduxContext.Consumer>
      {({ store }) => {
        // do something useful with the store, like passing it to a child
        // component where it can be used in lifecycle methods
      }}
    </ReactReduxContext.Consumer>
  )
  */
}
```

## 更多资源

- CodeSandbox 示例: [A reading list app with theme using a separate store](https://codesandbox.io/s/92pm9n2kl4)，通过提供（多个）自定义上下文来实现
- 相关的 issues:
  - [#1132: Update docs for using a different store key](https://github.com/reduxjs/react-redux/issues/1132)
  - [#1126: `<Provider>` misses state changes that occur between when its constructor runs and when it mounts](https://github.com/reduxjs/react-redux/issues/1126)
