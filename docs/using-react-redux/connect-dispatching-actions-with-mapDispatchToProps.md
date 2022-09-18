---
id: connect-mapdispatch
title: 'Connect: Dispatching Actions with mapDispatchToProps'
hide_title: true
sidebar_label: 'Connect: Dispatching Actions with mapDispatchToProps'
description: 'Usage > mapDispatch: options for dispatching actions with connect'
---

&nbsp;

# 连接：使用 `mapDispatchToProps` Dispatching Actions

作为传递给 `connect` 的第二个参数，`mapDispatchToProps` 用于 dispatch actions 给 store。

`dispatch` 是 Redux store 的一个函数。你可以调用 `store.dispatch` 来 dispatch 一个 action。
这是触发 state 变更的唯一方法。

使用 React Redux，你的组件永远不会直接访问 store —— `connect` 会为你完成这个过程。
React Redux 为你提供了两种让组件 dispatch actions 的方法：

- 默认情况下，连接的组件接收 `props.dispatch` 并可以自行 dispatch actions。
- `connect` 可以接受一个名为 `mapDispatchToProps` 的参数，它允许你创建在被调用时 dispatch 的函数，并将这些函数作为 props 传递给你的组件。

`mapDispatchToProps` 函数通常简称为 `mapDispatch`，但实际使用的变量名可以是任何你想要的。

## Dispatch 的方法

### 默认：`dispatch` 作为 props

如果你没有为 `connect()` 指定第二个参数，你的组件将默认接收 `dispatch`。例如：

```js
connect()(MyComponent)
// 等同于
connect(null, null)(MyComponent)

// 或者
connect(mapStateToProps /** 没有第二个参数 */)(MyComponent)
```

一旦你以这种方式连接了你的组件，你的组件就会接收到 `props.dispatch`。你可以使用它向 store dispatch actions。

```js
function Counter({ count, dispatch }) {
  return (
    <div>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
      <span>{count}</span>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>reset</button>
    </div>
  )
}
```

### 提供 `mapDispatchToProps` 参数

提供 `mapDispatchToProps` 允许你指定组件可能需要 dispatch 的一些 action。它允许你提供 dispatch action 的函数作为 props。因此，你可以直接调用 `props.increment()`，而不是调用 `props.dispatch(() => increment())`。你想要这样做的原因有几个。

#### 更具声明性

首先，将 dispatch 逻辑封装到函数中使得实现更具声明性。
dispatch action 并让 Redux store 处理数据流是 _如何_ 实现行为，而不是它做了 _什么_。

一个很好的例子是在单击按钮时 dispatch 一个 action。直接连接按钮在概念上可能没有意义，按钮引用 `dispatch` 也没有意义。

```js
// button 需要注意 "dispatch"
<button onClick={() => dispatch({ type: "SOMETHING" })} />

// button 不需要注意 "dispatch",
<button onClick={doSomething} />
```

一旦你用 dispatch actions 的函数包装了我们所有的 action creators，这个组件就不再需要 `dispatch` 了。
因此，**如果你定义自己的 `mapDispatchToProps`，连接的组件将不再接收 `dispatch`。**

#### 将 dispatch action 的逻辑传递给（未连接的）子组件

此外，你还可以将 dispatch action 的函数传递给子（可能未连接）组件。
这允许更多组件 dispatch actions，同时让它们“不察觉” Redux。

```jsx
// 将 toggleTodo 向下传递给子组件
// 使 Todo 能够 dispatch toggleTodo action
const TodoList = ({ todos, toggleTodo }) => (
  <div>
    {todos.map((todo) => (
      <Todo todo={todo} onClick={toggleTodo} />
    ))}
  </div>
)
```

这就是 React Redux 的 `connect` 所做的工作——它封装了与 Redux store 对话的逻辑，让你不用关心它。这就是你应该在你的实现中充分利用的东西。

## `mapDispatchToProps` 的两种形式

`mapDispatchToProps` 参数可以有两种形式。虽然函数形式允许更多的自定义，但对象形式易于使用。

- **函数形式**：允许更多自定义，获得对 `dispatch` 和可选 `ownProps` 的访问权限
- **对象简写形式**：更具声明性且更易于使用

> ⭐ **注意：** 我们建议使用 `mapDispatchToProps` 的对象形式，除非你特别需要以某种方式自定义 dispatch 行为。

## 将 `mapDispatchToProps` 定义为函数

将 `mapDispatchToProps` 定义为函数可以让你在自定义组件接收的函数以及它们如何 dispatch actions 方面具有最大的灵活性。
你可以访问 `dispatch` 和 `ownProps`。
你可以利用这个机会编写自定义函数以供你连接的组件调用。

### 参数

1. **`dispatch`**
2. **`ownProps`（可选）**

**`dispatch`**

`mapDispatchToProps` 函数将使用 `dispatch` 作为第一个参数被调用。
你通常会通过返回在自身内部调用 `dispatch()` 的新函数来使用它，并直接传入一个普通的 action 对象或传入 action creator 的结果。

```js
const mapDispatchToProps = (dispatch) => {
  return {
    // dispatch 普通的 actions
    increment: () => dispatch({ type: 'INCREMENT' }),
    decrement: () => dispatch({ type: 'DECREMENT' }),
    reset: () => dispatch({ type: 'RESET' }),
  }
}
```

你可能还希望将参数转发给你的 action creators：

```js
const mapDispatchToProps = (dispatch) => {
  return {
    // 显式转发参数
    onClick: (event) => dispatch(trackClick(event)),

    // 隐式转发参数
    onReceiveImpressions: (...impressions) =>
      dispatch(trackImpressions(impressions)),
  }
}
```

**`ownProps` （可选的）**

如果你的 `mapDispatchToProps` 函数被声明为带两个参数，它将以 `dispatch` 作为第一个参数调用，并将 `props` 作为第二个参数传递给连接的组件，并且每当连接的组件接收到新的 props 时都会重新调用。

这意味着，不需要在组件重新渲染时将新的 `props` 重新绑定到 action dispatchers，而是可以在组件的 `props` 变更时这样做。

**在组件 mount 时绑定**

```js
render() {
  return <button onClick={() => this.props.toggleTodo(this.props.todoId)} />
}

const mapDispatchToProps = dispatch => {
  return {
    toggleTodo: todoId => dispatch(toggleTodo(todoId))
  }
}
```

**在 `props` 变更时绑定**

```js
render() {
  return <button onClick={() => this.props.toggleTodo()} />
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleTodo: () => dispatch(toggleTodo(ownProps.todoId))
  }
}
```

### 返回值

你的 `mapDispatchToProps` 函数应该返回一个普通对象：

- 对象中的每个字段都将成为你自己组件的单独 prop，并且该值通常应该是在调用时 dispatch action 的函数。
- 如果你在 `dispatch` 中使用 action creators（与普通对象 actions 相反），则约定将字段键命名为与 action creator 相同的名称：

```js
const increment = () => ({ type: 'INCREMENT' })
const decrement = () => ({ type: 'DECREMENT' })
const reset = () => ({ type: 'RESET' })

const mapDispatchToProps = (dispatch) => {
  return {
    // action creators 返回的 dispatching actions
    increment: () => dispatch(increment()),
    decrement: () => dispatch(decrement()),
    reset: () => dispatch(reset()),
  }
}
```

`mapDispatchToProps` 函数的返回值将作为 props 合并到你连接的组件中。你可以直接调用它们来 dispatch 其 action。

```js
function Counter({ count, increment, decrement, reset }) {
  return (
    <div>
      <button onClick={decrement}>-</button>
      <span>{count}</span>
      <button onClick={increment}>+</button>
      <button onClick={reset}>reset</button>
    </div>
  )
}
```

(Counter 示例的完整代码是 [in this CodeSandbox](https://codesandbox.io/s/yv6kqo1yw9))

### 使用 `bindActionCreators` 定义 `mapDispatchToProps` 函数

手动包装这些函数很乏味，因此 Redux 提供了一个函数来简化它。

> `bindActionCreators` 将值为 [action creators](https://redux.js.org/glossary#action-creator) 的对象转换为具有相同键的对象，但每个 action creator 都包裹在 [`dispatch`](https://redux.js.org/api/store#dispatch) 中，因此可以直接调用它们。请参阅 [关于 `bindActionCreators` 的 Redux 文档](https://redux.js.org/api/bindactioncreators)

`bindActionCreators` 接收两个参数：

1. **`function`** (an action creator) 或者 **`object`** (每个字段都是一个 action creator)
2. `dispatch`

`bindActionCreators` 生成的包装函数将自动转发它们的所有参数，因此你无需手动执行此操作。

```js
import { bindActionCreators } from 'redux'

const increment = () => ({ type: 'INCREMENT' })
const decrement = () => ({ type: 'DECREMENT' })
const reset = () => ({ type: 'RESET' })

// 绑定一个 action creator
// 返回 (...args) => dispatch(increment(...args))
const boundIncrement = bindActionCreators(increment, dispatch)

// 绑定一个全是 action creators 的对象
const boundActionCreators = bindActionCreators(
  { increment, decrement, reset },
  dispatch
)
// 返回
// {
//   increment: (...args) => dispatch(increment(...args)),
//   decrement: (...args) => dispatch(decrement(...args)),
//   reset: (...args) => dispatch(reset(...args)),
// }
```

在我们的 `mapDispatchToProps` 函数中使用 `bindActionCreators`：

```js
import { bindActionCreators } from 'redux'
// ...

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ increment, decrement, reset }, dispatch)
}

// 组件接收 props.increment, props.decrement, props.reset
connect(null, mapDispatchToProps)(Counter)
```

### 手动注入 `dispatch`

如果提供了 `mapDispatchToProps` 参数，组件将不再接收默认的 `dispatch`。你可以通过手动将其添加到你的 `mapDispatchToProps` 的返回中来恢复它，尽管大多数时候你不需要这样做：

```js
import { bindActionCreators } from 'redux'
// ...

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({ increment, decrement, reset }, dispatch),
  }
}
```

## 将 `mapDispatchToProps` 定义为对象

你已经看到在 React 组件中 dispatch Redux actions 的设置遵循一个非常相似的过程：定义一个 action creator，将其包装在另一个看起来像 `(…args) => dispatch(actionCreator(…args))` 的函数中，并将该包装函数作为 props 传递给你的组件。

因为这很常见，`connect` 支持 `mapDispatchToProps` 参数的“对象简写”形式：如果你传递一个充满 action creators 的对象而不是一个函数，`connect` 将在内部自动为你调用 `bindActionCreators`。

**我们建议始终使用 `mapDispatchToProps` 的“对象简写”形式，除非你有特定原因需要自定义 dispatch 行为。**

注意：

- `mapDispatchToProps` 对象的每个字段都假定为一个 action creator
- 你的组件将不再接收 `dispatch` 作为 prop

```js
// React Redux 自动替你进行了该操作:
;(dispatch) => bindActionCreators(mapDispatchToProps, dispatch)
```

因此，`mapDispatchToProps` 可以简化为：

```js
const mapDispatchToProps = {
  increment,
  decrement,
  reset,
}
```

由于变量的实际名称由你决定，你可能希望给它一个名称，如 `actionCreators`，或者甚至在对 `connect` 的调用中定义内联对象：

```js
import { increment, decrement, reset } from './counterActions'

const actionCreators = {
  increment,
  decrement,
  reset,
}

export default connect(mapState, actionCreators)(Counter)

// 或者
export default connect(mapState, { increment, decrement, reset })(Counter)
```

## 常见问题

### 为什么我的组件没有接收 `dispatch`？

同样如

```js
TypeError: this.props.dispatch is not a function
```

这是当你尝试调用 `this.props.dispatch` 时发生的常见错误，因为 `dispatch` 没有注入到你的组件中。

`dispatch` _仅在_ 以下情况下被注入到你的组件中：

**1. 你未提供 `mapDispatchToProps`**

默认的 `mapDispatchToProps` 只是 `dispatch => ({ dispatch })`。如果你未提供 `mapDispatchToProps`，则会如上所述提供 `dispatch`。

换句话说，如果你：

```js
// 组件接收 `dispatch`
connect(mapStateToProps /** 没有第二个参数 */)(Component)
```

**2. 你的自定义 `mapDispatchToProps` 函数返回明确地包含 `dispatch`**

你可以通过提供自定义的 `mapDispatchToProps` 函数来返回 `dispatch`：

```js
const mapDispatchToProps = (dispatch) => {
  return {
    increment: () => dispatch(increment()),
    decrement: () => dispatch(decrement()),
    reset: () => dispatch(reset()),
    dispatch,
  }
}
```

或者使用 `bindActionCreators`：

```js
import { bindActionCreators } from 'redux'

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({ increment, decrement, reset }, dispatch),
  }
}
```

请参阅 [this error in action in Redux’s GitHub issue #255](https://github.com/reduxjs/react-redux/issues/255)。

这有一个关于当你指定 `mapDispatchToProps` 时是否为你的组件提供 `dispatch` 的讨论 ([Dan Abramov’s response to #255](https://github.com/reduxjs/react-redux/issues/255#issuecomment-172089874) )。你可以阅读它们以进一步了解当前的实施意图。

### 我可以在 Redux 中不带 `mapStateToProps` 进行 `mapDispatchToProps` 吗？

是的。你可以通过传递 `undefined` 或 `null` 来跳过第一个参数。你的组件不会订阅 store，仍然会收到 `mapDispatchToProps` 定义的 dispatch props。

```js
connect(null, mapDispatchToProps)(MyComponent)
```

### 我能调用 `store.dispatch` 吗？

这是在 React 组件中直接与 store 交互是一种反模式，无论是显式导入 store 还是通过上下文访问它（参见 [Redux FAQ entry on store setup](https://redux.js.org/faq/storesetup#can-or-should-i-create-multiple-stores-can-i-import-my-store-directly-and-use-it-in-components-myself) 了解更多详情）。让 React Redux 的 `connect` 处理对 store 的访问，并使用它传递给 props 的 `dispatch` 来 dispatch actions。

## 链接和参考

**教程**

- [You Might Not Need the `mapDispatchToProps` Function](https://daveceddia.com/redux-mapdispatchtoprops-object-form/)

**相关文档**

- [Redux Doc on `bindActionCreators`](https://redux.js.org/api/bindactioncreators)

**Q&A**

- [How to get simple dispatch from `this.props` using connect with Redux?](https://stackoverflow.com/questions/34458261/how-to-get-simple-dispatch-from-this-props-using-connect-w-redux)
- [`this.props.dispatch` is `undefined` if using `mapDispatchToProps`](https://github.com/reduxjs/react-redux/issues/255)
- [Do not call `store.dispatch`, call `this.props.dispatch` injected by `connect` instead](https://github.com/reduxjs/redux/issues/916)
- [Can I `mapDispatchToProps` without `mapStateToProps` in Redux?](https://stackoverflow.com/questions/47657365/can-i-mapdispatchtoprops-without-mapstatetoprops-in-redux)
- [Redux Doc FAQ: React Redux](https://redux.js.org/faq/reactredux)
