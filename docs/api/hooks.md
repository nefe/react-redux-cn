---
id: hooks
title: Hooks
sidebar_label: Hooks
hide_title: true
description: 'API > Hooks: the `useSelector` and `useDispatch` hooks`'
---

&nbsp;

# Hooks

React 的 ["hooks" API](https://reactjs.org/docs/hooks-intro.html) 为函数组件提供了使用本地组件 state、执行副作用以及更多方面的能力。React 还允许我们编写 [自定义 hooks](https://reactjs.org/docs/hooks-custom.html)，让我们提取可复用的 hooks，在 React 的内置 hooks 顶层添加我们自己的行为。

React Redux 包括了它自己的自定义 hook API，它允许你的 React 组件订阅 Redux store、dispatch action。

:::tip 提示

**我们推荐你在 React 组件中使用 React-Redux hooks API 作为默认方法。**

现有的 `connect` API 仍然有效，并将继续得到支持，但 hooks API 更简单，与 TypeScript 配合得更好。

:::

hooks 在 7.1.0 版本首次添加

## 在 React Redux 应用中使用 hooks

和 `connect()` 一样，你应该先用 `<Provider>` 组件来包裹你的整个应用程序，以使 store 在整个组件树中可用。

```jsx
const store = createStore(rootReducer)

// 在 React 18 中
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
```

从这里，你可以导入任何列出的 React Redux hooks API，并在你的函数组件中使用它们。

## `useSelector()`

```js
const result: any = useSelector(selector: Function, equalityFn?: Function)
```

允许你使用一个 selector 函数从 Redux store state 中提取数据。

:::info 说明

selector 函数应该是 [纯函数](https://en.wikipedia.org/wiki/Pure_function)，因为它有可能在任意时间点上多次执行。

:::

selector 在概念上大约等同于 [`mapStateToProps` argument to `connect`](../using-react-redux/connect-extracting-data-with-mapStateToProps.md)。selector 将以整个 Redux store state 作为唯一的参数被调用。每当函数组件渲染时，selector 就会被运行（除非在组件的前一次渲染后引用没有改变，这样 hooks 就会返回缓存的结果，而不是重新运行 selector）。`useSelector()` 也会订阅 Redux store，每当有 action 被 dispatched 时就会运行 selector。

然而，传递给 `useSelector()` 和 `mapState` 函数的 selector 之间有一些区别。

- selector 返回的结果可以是任何值，而不仅仅是一个对象。selector 的返回值将被作为 `useSelector()` hook 的返回值被使用。
- 当 dispatch 一个 action 时，`useSelector()` 将对 selector 的前一个结果值和当前的结果值做一个引用比较。如果它们不同，该组件将被强制重新渲染。如果它们相同，组件将不会重新渲染。
- selector 函数 _不接收_ `ownProps` 参数。然而，可以通过闭包（见下面的例子），或者通过使用 curried selector 来使用 props。
- 在使用缓存化的 selector 时必须格外小心（详见下面的例子）。
- `useSelector()` 默认使用严格的 `===` 引用全等检查，而不是浅层全等比较（详见下节）。

:::info 说明

在 selector 中使用 props 会导致许多潜在的边缘 case，这可能会造成问题。请参阅本页面的 [使用注意事项](#usage-warnings) 部分以了解更多细节。

:::

你可以在一个函数组件中多次调用 `useSelector()`。每调用一次 `useSelector()` 都会在 Redux store 中创建一个单独的订阅。由于 React Redux v7 中使用的是 React 更新批处理行为，因此 dispatch action 引发的同一组件中多次调用 `useSelector()` 来返回新值的过程只 _会_ 重新渲染一次。

### 全等比较和更新

当函数组件渲染时，给定的 selector 函数将被调用，`useSelector()` hook 会返回其结果。(如果与前一次组件渲染对比，两次是相同的函数引用，hook 不会重新调用 selector，而是会返回缓存的结果)。

然而，当 dispatch 一个 action 到 Redux store 时，只有 selector 的结果与上一次的结果不同时，`useSelector()` 才会强制重新渲染。默认的对比方式是严格的 `===` 引用比较。这与 `connect()` 不同，后者对 `mapState` 的调用结果进行浅层全等对比，以此决定是否需要重新渲染。这对你应该如何使用 `useSelector()` 有一些影响。

有了 `mapState`，所有单独的字段都在一个组合对象中返回。返回的对象是否是一个新的引用并不重要—— `connect()` 只是比较各个字段。使用 `useSelector()`，默认情况下每次返回一个新的对象 _都会_ 强制重新渲染。如果你想从 store 中获取多个值，你可以：

- 多次调用 `useSelector()`，每次调用返回一个字段值
- 使用 Reselect 或类似的库来创建一个记忆化的 selector，在一个对象中返回多个值，但是只有当其中一个值发生变化时才返回一个新的对象。
- 使用 React-Redux 的 `shallowEqual` 函数作为 `useSelector()` 的 `equalityFn` 参数，比如：

```js
import { shallowEqual, useSelector } from 'react-redux'

// 随后
const selectedData = useSelector(selectorReturningObject, shallowEqual)
```

可选的比较函数也可以使用类似 Lodash 的 `_.isEqual()` 或 Immutable.js 的比较功能。

### `useSelector` 示例

基本用法：

```jsx
import React from 'react'
import { useSelector } from 'react-redux'

export const CounterComponent = () => {
  const counter = useSelector((state) => state.counter)
  return <div>{counter}</div>
}
```

通过闭包的方式使用 props 来确定提取的内容：

```jsx
import React from 'react'
import { useSelector } from 'react-redux'

export const TodoListItem = (props) => {
  const todo = useSelector((state) => state.todos[props.id])
  return <div>{todo.text}</div>
}
```

#### 使用记忆化的 selectors

如上所示，当使用 `useSelector` 与内联 selector 时，每当组件被渲染时，就会创建一个新的 selector 实例。只要 selector 不维护任何 state，这就有效。然而，记忆化的 selector（例如通过 `reselect` 的 `createSelector` 创建）确实有内部 state，因此在使用它们时必须小心。你可以在下面找到记忆化 selector 的典型使用场景。

当 selector 只依赖于 state 时，只需确保它在组件之外被声明，这样每次渲染都会使用同一个 selector 实例。

```jsx
import React from 'react'
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'

const selectNumCompletedTodos = createSelector(
  (state) => state.todos,
  (todos) => todos.filter((todo) => todo.completed).length
)

export const CompletedTodosCounter = () => {
  const numCompletedTodos = useSelector(selectNumCompletedTodos)
  return <div>{numCompletedTodos}</div>
}

export const App = () => {
  return (
    <>
      <span>Number of completed todos:</span>
      <CompletedTodosCounter />
    </>
  )
}
```

如果 selector 依赖于组件的 props，情况也是如此，但只会在单个组件的单个实例中使用：

```jsx
import React from 'react'
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'

const selectCompletedTodosCount = createSelector(
  (state) => state.todos,
  (_, completed) => completed,
  (todos, completed) =>
    todos.filter((todo) => todo.completed === completed).length
)

export const CompletedTodosCount = ({ completed }) => {
  const matchingCount = useSelector((state) =>
    selectCompletedTodosCount(state, completed)
  )

  return <div>{matchingCount}</div>
}

export const App = () => {
  return (
    <>
      <span>Number of done todos:</span>
      <CompletedTodosCount completed={true} />
    </>
  )
}
```

但是，当 selector 用于多个组件实例并依赖于组件的 props 时，你需要确保每个组件实例都有自己的 selector 实例（请参阅[此处](https://github.com/reduxjs/reselect#q-can-i-share-a-selector-across-multiple-component-instances)以更全面地了解为什么有必要这样做）：

```jsx
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'

const makeSelectCompletedTodosCount = () =>
  createSelector(
    (state) => state.todos,
    (_, completed) => completed,
    (todos, completed) =>
      todos.filter((todo) => todo.completed === completed).length
  )

export const CompletedTodosCount = ({ completed }) => {
  const selectCompletedTodosCount = useMemo(makeSelectCompletedTodosCount, [])

  const matchingCount = useSelector((state) =>
    selectCompletedTodosCount(state, completed)
  )

  return <div>{matchingCount}</div>
}

export const App = () => {
  return (
    <>
      <span>Number of done todos:</span>
      <CompletedTodosCount completed={true} />
      <span>Number of unfinished todos:</span>
      <CompletedTodosCount completed={false} />
    </>
  )
}
```

## `useDispatch()`

```js
const dispatch = useDispatch()
```

这个 hook 返回一个对 Redux store 中的 `dispatch` 函数的引用。你可以按需使用它来 dispatch action。
#### Examples

```jsx
import React from 'react'
import { useDispatch } from 'react-redux'

export const CounterComponent = ({ value }) => {
  const dispatch = useDispatch()

  return (
    <div>
      <span>{value}</span>
      <button onClick={() => dispatch({ type: 'increment-counter' })}>
        Increment counter
      </button>
    </div>
  )
}
```

当使用 `dispatch` 向子组件传递回调时，有时你可能想用 [`useCallback`](https://reactjs.org/docs/hooks-reference.html#usecallback) 对其进行储存。_如果_ 子组件试图使用 `React.memo()` 或类似的方法来优化渲染行为，这可以避免子组件由于回调引用变更而导致的不必要渲染。

```jsx
import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'

export const CounterComponent = ({ value }) => {
  const dispatch = useDispatch()
  const incrementCounter = useCallback(
    () => dispatch({ type: 'increment-counter' }),
    [dispatch]
  )

  return (
    <div>
      <span>{value}</span>
      <MyIncrementButton onIncrement={incrementCounter} />
    </div>
  )
}

export const MyIncrementButton = React.memo(({ onIncrement }) => (
  <button onClick={onIncrement}>Increment counter</button>
))
```

:::info 说明

只要传递给 `<Provider>` 的是同一个 store 实例，`dispatch` 函数引用就是稳定的。
通常情况下，该 store 实例在应用程序中不会改变。

然而，React hooks 的 lint 规则并不知道 `dispatch` 应该是稳定的，并且会警告说 `dispatch` 变量应该被添加到 `useEffect` 和 `useCallback` 的依赖数组中。最简单的解决方案就是：

```js
export const Todos = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTodos())
    // 高亮开始
    // 安全地将 dispatch 添加到依赖数组中
  }, [dispatch])
  // 高亮结束
}
```

:::

## `useStore()`

```js
const store = useStore()
```

这个 hook 返回一个 Redux store 引用，该 store 与传递给 `<Provider>` 组件的 store 相同。

不应该被频繁使用这个 hook。宁愿将 `useSelector()` 作为主要选择。然而，对于少量需要访问 store 的场景而言，例如替换 reducer，这个 hook 很有用。

#### 示例

```js
import React from 'react'
import { useStore } from 'react-redux'

export const CounterComponent = ({ value }) => {
  const store = useStore()

  // 仅仅是示例！不要在实际的应用中这么做。
  // 当 store state 变更时，组件不会自动更新
  return <div>{store.getState()}</div>
}
```

## 自定义 context

`<Provider>` 组件允许你通过 `context` prop 指定一个备用的上下文。如果你正在构建一个复杂的、可复用的组件，并且你不希望 store 与 consumer 应用程序可能使用的任何 Redux store 相冲突，那么这很有用。

要通过各种 hook API 访问备用上下文，请使用 hook creator 函数：

```js
import React from 'react'
import {
  Provider,
  createStoreHook,
  createDispatchHook,
  createSelectorHook,
} from 'react-redux'

const MyContext = React.createContext(null)

// 如果想在其他文件使用自定义 hook，导出这些自定义 hook。
export const useStore = createStoreHook(MyContext)
export const useDispatch = createDispatchHook(MyContext)
export const useSelector = createSelectorHook(MyContext)

const myStore = createStore(rootReducer)

export function MyProvider({ children }) {
  return (
    <Provider context={MyContext} store={myStore}>
      {children}
    </Provider>
  )
}
```

## 使用注意事项

### Stale Props 和 "Zombie Children"

:::info 说明

自从 v7.1.0 中发布了 hook API，React-Redux 的 hook API 就已经可以被引入生产环境，**我们推荐你在组件中使用 hook API 作为默认方法**。然而，这可能会导致一些边缘情况，**我们将这些情况记录下来，以便你能了解它们**。

实际情况下，这些问题比较罕见——我们收到的关于文档中存在这些问题的评论远远多于关于这些问题在应用中成为实际问题的实际报告。

:::

React Redux 实现中最困难的方面之一是明确你的 `mapStateToProps` 函数是否被定义为 `(state, ownProps)`，它每次都会以"最新的" props 被调用。直到第 4 个版本，经常有涉及边缘情况的错误报告，例如从 `mapState` 函数中抛出列表项的数据刚被删除之类的错误。

从版本 5 开始，React Redux 试图用 `ownProps` 来保证这种一致性。在第 7 版中，在 `connect()` 内部使用自定义的 `Subscription` 类实现这个过程，它形成了一个嵌套结构。这确保树中较低层的连接组件只有在最近的连接祖先被更新后才会收到 store 更新通知。然而，这依赖于每个 `connect()` 实例覆盖内部 React 上下文的一部分，并提供自己独特的 `Subscription` 实例以形成嵌套，并使用新上下文的值渲染 `<ReactReduxContext.Provider>`。

有了 hook，就没有办法渲染一个上下文 provider，这意味着也没有嵌套的订阅层次结构。正因为如此，应用中的"stale props"和"zombie child"问题有可能在使用 hook 而不是 `connect()` 时重新出现。

具体来说，"stale props" 是指当下述任何情况发生时：

- 一个 selector 函数依赖于这个组件的 props 来提取数据
- 父级组件 _会_ 重新渲染并向下传递新的 props 作为 action 的结果
- 但这个组件的 selector 函数在这个组件有机会用新 props 重新渲染之前就已经执行了

根据所使用的 props 和当前的 store state，这 _可能_ 会导致从 selector 返回不正确的数据，甚至抛出一个错误。

"Zombie child" 是指当下述任何情况发生时：

- 多个嵌套连接的组件在一次传入时 mount，导致子组件先于其父组件订阅 store
- dispatch 一个 action 来删除 store 中的数据，例如一个 todo 项
- 父组件会因此而停止渲染子组件
- 然而，由于子组件先订阅了 store，其订阅会在父组件停止渲染子组件之前运行。当它依赖 props 从 store 中读取一个值时，该数据不存在，如果提取逻辑不细心，这可能会导致抛出一个错误。

`useSelector()` 试图在 store 更新时，通过捕捉 selector 执行抛出的所有错误（但不是在渲染期间执行时）来处理这个问题。当错误发生时，该组件将被强制渲染，此时 selector 将被再次执行。只要 selector 是一个纯函数，并且不依赖于 selector 抛出的错误，这就可以了。

如果你喜欢自己处理这个问题，这里有一些可能的选择，可以用 `useSelector()` 完全避免这些问题：

- 不要在 selector 函数中依赖 props 来提取数据
- 如果你在 selector 函数中依赖 props，_而且_ 这些 props 可能会随着时间的推移而改变，_或者_ 你要提取的数据可能是基于可以被删除的项目，请尝试以防御的方式编写 selector 函数。不要直接进入 `state.todos[props.id].name` ——首先读取 `state.todos[props.id]`，并在试图读取 `todo.name` 之前验证它是否存在。
- 因为 `connect` 向上下文 provider 添加了必要的 `Subscription`，并且直到被连接的组件重新渲染之前都不会评估子组件的订阅，因此，在组件树中使用 `useSelector` 在组件上方放置被连接组件，只要被连接组件由于 store 更新而重新渲染，就可以防止这些问题，其中被连接组件的 store 与 hook 组件的相同。

:::info 说明

有关这些方案的详细说明，请参阅：

- ["Stale props and zombie children in Redux" by Kai Hao](https://kaihao.dev/posts/Stale-props-and-zombie-children-in-Redux)
- [A chat log that describes the problems in more detail](https://gist.github.com/markerikson/faac6ae4aca7b82a058e13216a7888ec)
- [issue #1179](https://github.com/reduxjs/react-redux/issues/1179)

:::

### 性能

如前所述，默认情况下，在 dispatch 一个 action 后，会运行 selector 函数，此时 `useSelector()` 会对所选值进行引用全等比较，只有在所选值发生变化时才会导致组件重新渲染。然而，与 `connect()` 不同的是，`useSelector()` 会在组件父级重新渲染时导致自身重新渲染，即使该组件的 props 没有改变。

如果需要进一步优化性能，你可以考虑用 `React.memo()` 来包裹你的函数组件。

```jsx
const CounterComponent = ({ name }) => {
  const counter = useSelector((state) => state.counter)
  return (
    <div>
      {name}: {counter}
    </div>
  )
}

export const MemoizedCounterComponent = React.memo(CounterComponent)
```

## Hooks 方法

我们已经从最初的 alpha 版本中缩减了我们的 hook API，专注于一套更简单的 API 基元。
然而，你可能仍然希望在你自己的应用程序中使用我们尝试的一些方法。这些例子已经准备好，你可以复制并粘贴到你自己的代码库中。

### 方法：`useActions()`

这个 hook 在我们最初的 alpha 版本中，但在 `v7.1.0-alpha.4` 中被移除，这是基于 [Dan Abramov 的建议](https://github.com/reduxjs/react-redux/issues/1252#issuecomment-488160930)。
这个建议是基于"绑定 action creator"在 hooks-based 的用例中不那么有用，而且会造成太多的概念开销和句法复杂性。

你可能更喜欢在你的组件中调用 [`useDispatch`](#usedispatch) hook 来检索对 `dispatch` 的引用，并根据需要在回调和 effects 中手动调用 `dispatch(someActionCreator())`。你也可以使用 Redux 的 [`bindActionCreators`](https://redux.js.org/api/bindactioncreators) 函数在你自己的代码中绑定 action creator，或者像 `const boundAddTodo = (text) => dispatch(addTodo(text))` 那样"手动"绑定它们。

然而，如果你仍然想使用这个 hook，这里有一个可复制的版本，支持将 action creators 作为一个单一的函数、一个数组或一个对象传入。

```js
import { bindActionCreators } from 'redux'
import { useDispatch } from 'react-redux'
import { useMemo } from 'react'

export function useActions(actions, deps) {
  const dispatch = useDispatch()
  return useMemo(
    () => {
      if (Array.isArray(actions)) {
        return actions.map((a) => bindActionCreators(a, dispatch))
      }
      return bindActionCreators(actions, dispatch)
    },
    deps ? [dispatch, ...deps] : [dispatch]
  )
}
```

### 方法: `useShallowEqualSelector()`

```js
import { useSelector, shallowEqual } from 'react-redux'

export function useShallowEqualSelector(selector) {
  return useSelector(selector, shallowEqual)
}
```

### 使用 hooks 的其他注意事项

在决定是否使用 hooks 时，有一些架构上的权衡需要考虑到。Mark Erikson 在他的两篇博文 [Thoughts on React Hooks, Redux, and Separation of Concerns](https://blog.isquaredsoftware.com/2019/07/blogged-answers-thoughts-on-hooks/) 和 [Hooks, HOCs, and Tradeoffs](https://blog.isquaredsoftware.com/2019/09/presentation-hooks-hocs-tradeoffs/) 中很好地总结了这些。
