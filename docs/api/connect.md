---
id: connect
title: Connect
sidebar_label: connect()
hide_title: true
description: 'API > connect: a Higher-Order Component to interact with Redux'
---

&nbsp;

# `connect()`

:::tip 提示

`connect` 仍然有效，并且在 React-Redux 8.x. 中同样支持。然而，[**我们建议默认使用 hooks API**](./hooks.md)。


:::

## 概述

`connect()` 函数将 React 组件连接到 React store。

它向连接的组件提供其需要从 store 中获取的数据片段，以及可以用来向 store dispatch actions 的功能。

它不会修改传递给它的组件类；相反，它返回一个新的、连接的组件类并 wrapper 了你传入的组件。

```js
function connect(mapStateToProps?, mapDispatchToProps?, mergeProps?, options?)
```

`mapStateToProps` 和 `mapDispatchToProps` 分别处理 Redux store 的 `state` 和 `dispatch`。`state` 和 `dispatch` 将作为第一个参数提供给 `mapStateToProps` 或 `mapDispatchToProps` 函数。

在内部，`mapStateToProps` 和 `mapDispatchToProps` 的返回值分别称为 `stateProps` 和 `dispatchProps`。如果定义了，它们将作为第一个和第二个参数提供给 `mergeProps`，其中第三个参数将是 `ownProps`。组合的结果通常称为 `mergedProps`，将提供给连接的组件。

## `connect()` 参数

`connect` 接收四种不同的、皆可选的参数。按照惯例，它们被称为：

1. `mapStateToProps?: Function`
2. `mapDispatchToProps?: Function | Object`
3. `mergeProps?: Function`
4. `options?: Object`

### `mapStateToProps?: (state, ownProps?) => Object`

如果指定了 `mapStateToProps` 函数，新的 wrapper 组件将订阅 Redux store 更新。这意味着无论何时更新 store，都会调用 `mapStateToProps`。`mapStateToProps` 的返回值必须是一个普通对象，它将被合并到被 wrapper 组件的 props 中。如果你不想订阅 store 更新，请传递 `null` 或 `undefined` 代替 `mapStateToProps`。

#### 参数

1. `state: Object`
2. `ownProps?: Object`

`mapStateToProps` 函数最多需要两个参数。声明函数参数的数量（又名 arity）会影响它何时被调用。这也决定了函数是否会收到 ownProps。请参阅[这里](#the-arity-of-maptoprops-functions)。 
##### `state`

如果你的 `mapStateToProps` 函数被声明传入一个参数，则每当 store state 变更时都会调用它，并将 store state 作为唯一参数。

```js
const mapStateToProps = (state) => ({ todos: state.todos })
```

##### `ownProps`

如果你的 `mapStateToProps` 函数被声明传入两个参数，则每当 store state 变更时 _或_ 当 wrapper 组件接收到新 props 时（基于浅相等比较）都将被调用。它将 store state 作为第一个参数，wrapper 组件的 props 作为第二个参数。

按照惯例，第二个参数通常称为 `ownProps`。

```js
const mapStateToProps = (state, ownProps) => ({
  todo: state.todos[ownProps.id],
})
```

#### 返回值

你的 `mapStateToProps` 函数应该返回一个对象。这个对象通常称为 `stateProps`，将作为 props 合并到连接的组件。如果你定义了 `mergeProps`，它将作为第一个参数提供给 `mergeProps`。

`mapStateToProps` 的返回值决定了连接的组件是否会重新渲染（详情参阅[这里](../using-react-redux/connect-extracting-data-with-mapStateToProps.md#return-values-determine-if-your-component-re-renders)）。

有关 `mapStateToProps` 推荐用法的更多详细信息，请参阅 [our guide on using `mapStateToProps`](../using-react-redux/connect-extracting-data-with-mapStateToProps.md)。

> 你可以将 `mapStateToProps` 和 `mapDispatchToProps` 定义为工厂函数，即返回一个函数而不是一个对象。在这种情况下，你返回的函数将被视为实时的 `mapStateToProps` 或 `mapDispatchToProps`，并在后续调用中被调用。 你可以查看有关 [Factory Functions](#factory-functions) 的说明或我们的性能优化指南。

### `mapDispatchToProps?: Object | (dispatch, ownProps?) => Object`

通常称为 `mapDispatchToProps`，`connect()` 的第二个参数可以是对象、函数或不提供。

默认情况下，你的组件将接收 `dispatch`，即当你未向 `connect()` 提供第二个参数时：

```js
// 未传入 `mapDispatchToProps`
connect()(MyComponent)
connect(mapState)(MyComponent)
connect(mapState, null, mergeProps, options)(MyComponent)
```

如果你将 `mapDispatchToProps` 定义为函数，调用时最多可以传入两个参数。

#### 参数

1. `dispatch: Function`
2. `ownProps?: Object`

##### `dispatch`

如果你的 `mapDispatchToProps` 被声明为带有一个参数的函数，它将被赋予 `store` 中的 `dispatch`。

```js
const mapDispatchToProps = (dispatch) => {
  return {
    // dispatch 普通的 action
    increment: () => dispatch({ type: 'INCREMENT' }),
    decrement: () => dispatch({ type: 'DECREMENT' }),
    reset: () => dispatch({ type: 'RESET' }),
  }
}
```

##### `ownProps`

如果你的 `mapDispatchToProps` 函数声明为传入两个参数，它将以 `dispatch` 作为第一个参数调用，并将传递给 wrapper 组件的 props 作为第二个参数，并且每当连接的组件接收到新 props 时都会重新请求。

按照惯例，第二个参数通常称为 `ownProps`。

```js
// 绑定组件重新渲染
<button onClick={() => this.props.toggleTodo(this.props.todoId)} />

// 绑定的 `props` 变更
const mapDispatchToProps = (dispatch, ownProps) => ({
  toggleTodo: () => dispatch(toggleTodo(ownProps.todoId)),
})
```

`mapDispatchToProps` 声明函数的参数数量决定了它们是否接收到 ownProps。请参阅[此处](#the-arity-of-maptoprops-functions)。

#### 返回值

`mapDispatchToProps` 函数应该返回一个对象。 对象的每个字段都应该是一个函数，调用时期望将一个 action dispatch 到 store 中。

`mapDispatchToProps` 函数的返回值被视为 `dispatchProps`。它将作为 props 合并到连接的组件。如果你定义了 `mergeProps`，它将作为 `mergeProps` 的第二个参数提供。

```js
const createMyAction = () => ({ type: 'MY_ACTION' })
const mapDispatchToProps = (dispatch, ownProps) => {
  const boundActions = bindActionCreators({ createMyAction }, dispatch)
  return {
    dispatchPlainObject: () => dispatch({ type: 'MY_ACTION' }),
    dispatchActionCreatedByActionCreator: () => dispatch(createMyAction()),
    ...boundActions,
    // 你应该在此处 dispatch
    dispatch,
  }
}
```

有关推荐用法的更多详细信息，请参阅 [our guide on using `mapDispatchToProps`](../using-react-redux/connect-mapdispatch)。

> 你可以将 `mapStateToProps` 和 `mapDispatchToProps` 定义为工厂函数，即返回一个函数而不是一个对象。在这种情况下，你返回的函数将被视为实时的 `mapStateToProps` 或 `mapDispatchToProps`，并在后续调用中被调用。 你可以查看有关 [Factory Functions](#factory-functions) 的说明或我们的性能优化指南。

#### 对象简写形式

`mapDispatchToProps` 可以是一个对象，其中每个字段都是一个 [action creator](https://redux.js.org/glossary#action-creator)。

```js
import { addTodo, deleteTodo, toggleTodo } from './actionCreators'

const mapDispatchToProps = {
  addTodo,
  deleteTodo,
  toggleTodo,
}

export default connect(null, mapDispatchToProps)(TodoApp)
```

在这种情况下，React-Redux 使用 `bindActionCreators` 将 store 的 `dispatch` 绑定到每个 action creator。其结果将被视为 `dispatchProps`，它将直接合并到连接的组件中，或者作为第二个参数提供给 `mergeProps`。

```js
// 在内部，React-Redux 调用 bindActionCreators
// 将 action creators 绑定到 store 的 dispatch
bindActionCreators(mapDispatchToProps, dispatch)
```

我们的 `mapDispatchToProps` 指南中还有一节介绍对象简写形式的用法，查阅[此处](../using-react-redux/connect-mapdispatch#defining-mapdispatchtoprops-as-an-object)。

### `mergeProps?: (stateProps, dispatchProps, ownProps) => Object`

如果指定了，则定义如何确定你的 wrapper 组件的最终 props。 如果你未提供 `mergeProps`，你的 wrapper 组件默认接收 `{ ...ownProps, ...stateProps, ...dispatchProps }`。

#### 参数

`mergeProps` 可以指定最多三个参数。 分别是 `mapStateToProps()`、`mapDispatchToProps()` 和 wrapper 组件的 `props` 的结果：

1. `stateProps`
2. `dispatchProps`
3. `ownProps`

从 `mergeProps` 返回的普通对象中的字段将作为 wrapper 组件的 props。你可以指定 `mergeProps` 函数以根据 props 选择 state 的一个 slice，或将 action creator 绑定到 props 中的特定变量中。

#### 返回值

`mergeProps` 的返回值称为 `mergedProps`，字段将作为 wrapper 组件的 props。

> 注意：在 mergeProps 中创建新值会导致重新渲染。建议缓存字段以避免不必要的重新渲染。

### `options?: Object`

```js
{
  context?: Object,
  areStatesEqual?: Function,
  areOwnPropsEqual?: Function,
  areStatePropsEqual?: Function,
  areMergedPropsEqual?: Function,
  forwardRef?: boolean,
}
```

#### `context: Object`

> 注意：参数仅支持 v6.0 及以上

React-Redux v6 允许你提供一个自定义上下文实例以供 React-Redux 使用。
你需要将上下文的实例传递给 `<Provider />` 和连接的组件。
将上下文传递给连接的组件，可以通过在此处将上下文作为选项字段传入，或者在渲染时作为连接组件的 prop 传入。
```js
// const MyContext = React.createContext();
connect(mapStateToProps, mapDispatchToProps, null, { context: MyContext })(
  MyComponent
)
```

#### `areStatesEqual: (next: Object, prev: Object) => boolean`

- 默认值： `strictEqual: (next, prev) => prev === next`

将传入的 store state 与其先前的值进行比较。

```js
const areStatesEqual = (next, prev) =>
  prev.entities.todos === next.entities.todos
```

如果你的 `mapStateToProps` 函数计算上花销大并且也只关心 state 的一小部分 slice，你可能希望重写 `areStatesEqual`。上面的示例将有效地忽略除该 state 的 slice 之外的所有内容的 state 更改。

这也可能会影响其他相等性检查，具体取决于你的 `mapStateToProps` 函数。

#### `areOwnPropsEqual: (next: Object, prev: Object) => boolean`

- 默认值：`shallowEqual: (objA, objB) => boolean`
（当对象的每个字段相等时返回 `true`）

将传入的 props 与其先前的值进行比较。

你可能希望将重写 `areOwnPropsEqual` 作为把传入的 props 列入白名单的一种方式。你还必须执行 `mapStateToProps`、`mapDispatchToProps` 和 `mergeProps` 将 props 列入白名单。（其他方式可能更简单，例如使用 [recompose's mapProps](https://github.com/acdlite/recompose/blob/master/docs/API.md#mapprops)。）

#### `areStatePropsEqual: (next: Object, prev: Object) => boolean`

- 类型： `function`
- 默认值： `shallowEqual`

将 `mapStateToProps` 的结果与其先前的值进行比较。

#### `areMergedPropsEqual: (next: Object, prev: Object) => boolean`

- 默认值： `shallowEqual`

将 `mergeProps` 的结果与其先前的值进行比较。

如果你的 `mapStateToProps` 使用一个仅在相关 prop 发生更改时才会返回新对象的缓存化 selector，则你可能希望重写 `areStatePropsEqual` 以使用 `strictEqual`。 这将是一个非常轻微的性能改进，因为每次调用 `mapStateToProps` 时都会避免对单个 props 进行额外的相等检查。

如果你的 selector 产生复杂的 props，你可能希望重写 `areMergedPropsEqual` 以实现 `deepEqual`。 例如：嵌套对象、新数组等（深度相等检查可能比重新渲染更快。）

#### `forwardRef: boolean`

> 注意：参数仅支持 v6.0 及以上

如果 `{forwardRef : true}` 已传递给 `connect`，则向连接的 wrapper 组件添加 ref 实际上将返回被包裹组件的实例。

## `connect()` 返回值

`connect()` 的返回值是一个 wrapper 函数，它接收你的组件并返回一个 wrapper 组件，其中包含它注入的附加 props。

```js
import { login, logout } from './actionCreators'

const mapState = (state) => state.user
const mapDispatch = { login, logout }

// 第一次调用：返回一个可用于包装任何组件的高阶组件
const connectUser = connect(mapState, mapDispatch)

// 第二次调用：返回带有 mergedProps 的 wrapper 组件
// 你可以使用高阶组件让不同的组件获得相同的行为
const ConnectedUserLogin = connectUser(Login)
const ConnectedUserProfile = connectUser(Profile)
```

在大多数情况下，wrapper 函数会被立即调用，而不是保存在临时变量中：
```js
import { login, logout } from './actionCreators'

const mapState = (state) => state.user
const mapDispatch = { login, logout }

// 调用 connect 生成 wrapper 函数，并立即调用
// wrapper 函数生成最终 wrapper 组件。
export default connect(mapState, mapDispatch)(Login)
```

## 示例

因为 `connect` 非常灵活，看一些其他的例子来说明如何调用它可能会有所帮助：

- 只注入 `dispatch` 而不监听 store

```js
export default connect()(TodoApp)
```

- 在不订阅 store 的情况下注入所有 action creator（`addTodo`、`completeTodo`、...）

```js
import * as actionCreators from './actionCreators'

export default connect(null, actionCreators)(TodoApp)
```

- 注入 `dispatch` 和全局 state 的每个字段

> 不要这样做！它会扼杀任何性能优化，因为 `TodoApp` 将在每次 state 变更后重新渲染。
> 最好在视图层次结构中的多个组件上使用更细粒度的 `connect()`，每个组件只监听相关的 state slice。

```js
// 别这么做！
export default connect((state) => state)(TodoApp)
```

- 注入 `dispatch` 和 `todos`

```js
function mapStateToProps(state) {
  return { todos: state.todos }
}

export default connect(mapStateToProps)(TodoApp)
```

- 注入 `todos` 和所有的 action creator

```js
import * as actionCreators from './actionCreators'

function mapStateToProps(state) {
  return { todos: state.todos }
}

export default connect(mapStateToProps, actionCreators)(TodoApp)
```

- 将 `todos` 和所有 action creator（`addTodo`、`completeTodo`、...）作为 `actions` 注入

```js
import * as actionCreators from './actionCreators'
import { bindActionCreators } from 'redux'

function mapStateToProps(state) {
  return { todos: state.todos }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp)
```

- 注入 `todos` 和一个指定的 action creator (`addTodo`)

```js
import { addTodo } from './actionCreators'
import { bindActionCreators } from 'redux'

function mapStateToProps(state) {
  return { todos: state.todos }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addTodo }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp)
```

- 使用简写语法注入 `todos` 和特定 action creator（`addTodo` 和 `deleteTodo`）

```js
import { addTodo, deleteTodo } from './actionCreators'

function mapStateToProps(state) {
  return { todos: state.todos }
}

const mapDispatchToProps = {
  addTodo,
  deleteTodo,
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp)
```

- 将 `todos`、`todoActionCreators` 作为 `todoActions`、`counterActionCreators` 作为 `counterActions` 注入

```js
import * as todoActionCreators from './todoActionCreators'
import * as counterActionCreators from './counterActionCreators'
import { bindActionCreators } from 'redux'

function mapStateToProps(state) {
  return { todos: state.todos }
}

function mapDispatchToProps(dispatch) {
  return {
    todoActions: bindActionCreators(todoActionCreators, dispatch),
    counterActions: bindActionCreators(counterActionCreators, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp)
```

- 将 `todos`、todoActionCreators 和 counterActionCreators 一起作为 `actions` 注入

```js
import * as todoActionCreators from './todoActionCreators'
import * as counterActionCreators from './counterActionCreators'
import { bindActionCreators } from 'redux'

function mapStateToProps(state) {
  return { todos: state.todos }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      { ...todoActionCreators, ...counterActionCreators },
      dispatch
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp)
```

- 将 `todos`，以及所有 `todoActionCreators` 和 `counterActionCreators` 作为 props 直接注入

```js
import * as todoActionCreators from './todoActionCreators'
import * as counterActionCreators from './counterActionCreators'
import { bindActionCreators } from 'redux'

function mapStateToProps(state) {
  return { todos: state.todos }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { ...todoActionCreators, ...counterActionCreators },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp)
```

- 根据 props 注入特定用户的 `todos`

```js
import * as actionCreators from './actionCreators'

function mapStateToProps(state, ownProps) {
  return { todos: state.todos[ownProps.userId] }
}

export default connect(mapStateToProps)(TodoApp)
```

- 根据 props 注入特定用户的 `todos`，并在 action 中注入 `props.userId`

```js
import * as actionCreators from './actionCreators'

function mapStateToProps(state) {
  return { todos: state.todos }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return Object.assign({}, ownProps, {
    todos: stateProps.todos[ownProps.userId],
    addTodo: (text) => dispatchProps.addTodo(ownProps.userId, text),
  })
}

export default connect(mapStateToProps, actionCreators, mergeProps)(TodoApp)
```

## 说明

### `mapToProps` 函数的参数数量

`mapStateToProps` 和 `mapDispatchToProps` 的声明函数的参数数量决定了它们是否接收到 `ownProps`

> 注意：如果函数的正式定义包含一个强制参数（函数长度为 1），则 `ownProps` 不会传递给 `mapStateToProps` 和 `mapDispatchToProps`。例如，如下定义的函数不会接收 `ownProps` 作为第二个参数。 如果 `ownProps` 的传入值为 `undefined`，则将使用默认参数值。

```js
function mapStateToProps(state) {
  console.log(state) // state
  console.log(arguments[1]) // undefined
}

const mapStateToProps = (state, ownProps = {}) => {
  console.log(state) // state
  console.log(ownProps) // {}
}
```

没有强制参数或两个参数的函数\*将收到 `ownProps`。

```js
const mapStateToProps = (state, ownProps) => {
  console.log(state) // state
  console.log(ownProps) // ownProps
}

function mapStateToProps() {
  console.log(arguments[0]) // state
  console.log(arguments[1]) // ownProps
}

const mapStateToProps = (...args) => {
  console.log(args[0]) // state
  console.log(args[1]) // ownProps
}
```

### 工厂函数

如果你的 `mapStateToProps` 或 `mapDispatchToProps` 函数返回一个函数，它们将在组件实例化时被调用一次，并且在它们的后续调用中，返回值将分别用作实际的 `mapStateToProps`、`mapDispatchToProps` 函数。

工厂函数通常与缓存化 selector 一起使用。 这使你能够在闭包内创建特定于组件实例的 selector：

```js
const makeUniqueSelectorInstance = () =>
  createSelector([selectItems, selectItemId], (items, itemId) => items[itemId])
const makeMapState = (state) => {
  const selectItemForThisComponent = makeUniqueSelectorInstance()
  return function realMapState(state, ownProps) {
    const item = selectItemForThisComponent(state, ownProps.itemId)
    return { item }
  }
}
export default connect(makeMapState)(SomeComponent)
```

## 旧版文档

虽然 `connect` API 在我们所有的主要版本之间几乎完全保持 API 兼容，但不同版本的选项和行为发生了一些小的变化。

有关旧版 5.x 和 6.x 版本的详细信息，请参阅 React Redux 仓库中的这些归档文件：

- [5.x `connect` API reference](https://github.com/reduxjs/react-redux/blob/v7.2.2/website/versioned_docs/version-5.x/api/connect.md)
- [6.x `connect` API reference](https://github.com/reduxjs/react-redux/blob/v7.2.2/website/versioned_docs/version-6.x/api/connect.md)
