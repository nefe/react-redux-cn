---
id: connect-mapstate
title: 'Connect: 使用 mapStateToProps 获取数据'
hide_title: true
sidebar_label: 'Connect: 使用 mapStateToProps 获取数据'
description: '使用指南 > mapState: options for reading state with connect'
---

&nbsp;

# Connect: 使用 `mapStateToProps` 获取数据

作为传递给 `connect` 的第一个参数，`mapStateToProps` 用于从 store 中选择出连接组件需要的那部分数据。它经常被简称为 `mapState`。

- 每次 store state 变更时都会调用它。
- 它接收整个 store state，并应返回组件所需的数据对象。

## 定义 `mapStateToProps`

`mapStateToProps` 应该被定义为一个函数：

```js
function mapStateToProps(state, ownProps?)
```

它应该接受 `state` 作为第一个参数，可选的第二个参数名为 `ownProps`，返回一个包含连接组件所需数据的普通对象。

这个函数应该作为第一个参数传递给 `connect`，并且每次 Redux store state 发生变化时都会被调用。如果你不想订阅 store，请将 `null` 或 `undefined` 代替 `mapStateToProps`传递给 `connect`。

**`mapStateToProps` 函数无需考虑是使用 `function` 关键字（`function mapState(state) { }` ）还是箭头函数（`const mapState = (state) => { }` ）来编写** ——无论哪种方式，它的效果都是一样的。

### 参数

1. **`state`**
2. **`ownProps` (可选的)**

#### `state`

`mapStateToProps` 函数的第一个参数是整个 Redux store state（与调用 `store.getState()` 返回的值相同）。正因为如此，第一个参数习惯上只是称作 `state`。（虽然你可以给参数取任何名字，但称它为 `store` 是不正确的——它是“状态值”，而不是“store 实例”。）

编写 `mapStateToProps` 函数时，至少应该传入 `state`。

```js
// TodoList.js

function mapStateToProps(state) {
  const { todos } = state;
  return { todoList: todos.allIds };
}

export default connect(mapStateToProps)(TodoList);
```

#### `ownProps` (可选的)

如果你的组件需要利用 props 的数据来检索 store 中的数据，你可以使用第二个参数 `ownProps` 定义该函数。这个参数将包含所有 props，其来自 `connect` 生成的 wrapper 组件。

```js
// Todo.js

function mapStateToProps(state, ownProps) {
  const { visibilityFilter } = state;
  // ownProps 诸如 { "id" : 123 }
  const { id } = ownProps;
  const todo = getTodoById(state, id);

  // 组件额外接受的内容
  return { todo, visibilityFilter };
}

// 之后，你的应用中 render 一个父组件：
<ConnectedTodo id={123} />;
// 并且你的组件接收了 props.id、props.todo 和 props.visibilityFilter
```

你不需要从 `mapStateToProps` 返回的对象中包含来自 `ownProps` 的值。`connect` 会自动将这些不同的 props 源合并成最终的 props 集合。

### 返回值

你的 `mapStateToProps` 函数应该返回一个包含组件所需数据的普通对象：

- 对象中的每个字段都将成为实际组件中的 prop
- 字段中的值将用于确定你的组件是否需要重新渲染

举例来说：

```js
function mapStateToProps(state) {
  return {
    a: 42,
    todos: state.todos,
    filter: state.visibilityFilter,
  };
}

// 组件会接收到：props.a, props.todos, and props.filter
```

> 注意：在需要更多地控制渲染性能的高级场景中，`mapStateToProps` 也可以返回一个函数。在这种情况下，该函数将用作特定组件实例的最终 `mapStateToProps`。这允许你执行每个实例的 memoization。有关详细信息，请参阅文档的 [Advanced Usage: Factory Functions](../api/connect.md) 部分，以及 [PR #279](https://github.com/reduxjs/react-redux/pull/279) 和它添加的示例。大多数应用程序用不上这个。

## 使用指南

### 让 `mapStateToProps` 重塑 Store 中的数据

`mapStateToProps` 函数可以而且应该做的不仅仅是 `return state.someSlice`。**他们有责任根据该组件的需要“重新塑造” store 数据。** 这可能包括将值作为特定的 prop 名称返回，组合来自 state tree 不同部分的数据，以及使用不同方式转换 store 的数据。

### 使用 Selector 函数提取和转换数据

我们强烈建议使用 selector 函数来封装从 state tree 特定位置取数的逻辑。缓存化的 selector 函数在提高应用程序性能方面也发挥着关键作用（参见本页的以下部分和 [Advanced Usage: Computing Derived Data](https://redux.js.org/recipes/computing-derived-data) 页面了解为什么以及如何使用 selector 的更多详细信息。）

### `mapStateToProps` 函数应该快速运行

每当 store 发生变化时，所有 connect 过的组件，对应的所有 `mapStateToProps` 函数都会运行。因此，你的 `mapStateToProps` 函数应该尽可能快地运行。这也意味着缓慢的 `mapStateToProps` 函数可能是应用程序中的潜在瓶颈。

作为“重塑数据”理念的一部分，`mapStateToProps` 函数经常需要以各种方式转换数据（例如过滤数组、将 ID 数组映射到其对应的对象，或从 Immutable.js 对象中提取普通 JS 值）。无论是在执行转换的成本方面，还是在组件是否因此重新渲染方面，这些转换通常都比较消耗性能。如果性能是一个问题，请确保仅在输入值发生更改时才运行这些转换。

### `mapStateToProps` 函数应该是干净的和同步的

正如 Redux reducer，`mapStateToProps` 函数应该始终是 100% 干净和同步的。它应该只接受 `state`（和 `ownProps`）作为参数，并返回组件需要的数据作为 props，而不改变这些参数。它 _不_ 应该用于触发异步行为，如获取数据的 AJAX 调用，并且函数不应该被声明为 `async`。

## `mapStateToProps` 和性能

### 返回值决定你的组件是否重新渲染

React Redux 在内部实现了 `shouldComponentUpdate` 方法，这样当组件需要的数据发生变化时，wrapper 组件就会精确地重新渲染。默认情况下，React Redux 针对 `mapStateToProps` 返回的对象中的每个字段，使用 `===` 进行比较（“浅对比”检查）以判断其内容是否不同。如果任何字段发生更改，那么你的组件将被重新渲染，以便它可以接收更新的值作为 props。请注意，返回相同引用的 mutated 对象是一个常见错误，可能会导致组件未按预期重新渲染。

总结一下 `connect` 包裹的组件与 `mapStateToProps` 从 store 中提取数据的行为：

|                              | `(state) => stateProps`    | `(state, ownProps) => stateProps`                                          |
| ---------------------------- | -------------------------- | -------------------------------------------------------------------------- |
| `mapStateToProps` 运行条件： | store `state` 变更         | store `state` 变更 <br /> 或者 <br />任何 `ownProps` 的字段变化            |
| 组件重现渲染条件：           | 任何 `stateProps` 字段变化 | 任何 `stateProps` 的字段变化 <br /> 或者 <br /> 任何 `ownProps` 的字段变化 |

### 仅在需要时返回新对象引用

React Redux 会进行浅层比较以查看 `mapStateToProps` 的结果是否发生了变化。每次都很容易意外地返回新的对象或数组引用，这会导致组件重新渲染，即使数据是相同的。

对于新的对象或者数组，推荐使用下面的 immutable 操作，返回新的引用

- 使用 `someArray.map()` 或 `someArray.filter()` 创建新数组
- 使用 `array.concat` 合并数组
- 使用 `array.slice` 选择数组的一部分
- 使用 `Object.assign` 复制值
- 使用扩展运算符 `{ ...oldState, ...newData }` 复制值

将这些操作放入 [memoized selector functions](https://redux.js.org/recipes/computing-derived-data#creating-a-memoized-selector) 以确保它们仅在输入值发生更改时运行。这也将确保如果输入值 _没有_ 改变，`mapStateToProps` 仍将返回与以前相同的结果值，并且 `connect` 可以跳过重新渲染。

### 仅在数据更改时执行代价昂贵的操作

转换数据通常代价昂贵（_并且_ 通常会导致创建新的对象引用）。为了使你的 `mapStateToProps` 函数尽可能快，你应该只在相关数据发生变化时重新运行这些复杂的转换。

有几种方法可以解决这个问题：

- 一些转换可以在 action creator 或者 reducer 中计算，转换后的数据可以保存在 store 中
- 转换也可以在组件的 `render()` 方法中完成
- 如果确实需要在 `mapStateToProps` 函数中进行转换，我们建议使用 [memoized selector functions](https://redux.js.org/recipes/computing-derived-data#creating-a-memoized-selector)以确保仅在输入值发生更改时进行转换。

#### Immutable.js 性能问题

Immutable.js 的作者 Lee Byron 在 Twitter [explicitly advises avoiding `toJS` when performance is a concern](https://twitter.com/leeb/status/746733697093668864?lang=en)中写道：

> #immutablejs 的性能提示：避免 .toJS() .toObject() 和 .toArray() 缓慢的全复制操作，这会导致结构共享变得无用。

Immutable.js 还需要考虑其他几个性能问题 - 请参阅本页末尾的链接列表以获取更多信息。

## 行为和陷阱

### `mapStateToProps` 在 Store State 相同时不会运行

`connect` 生成的 wrapper 组件订阅了 Redux store。每次 dispatch 一个 action 时，它都会调用 `store.getState()` 并检查是否 `lastState === currentState`。如果两个 state 值的引用是相同的，它将 _不会_ 重新运行你的 `mapStateToProps` 函数，因为它假定 store state 的其余部分也没有改变。

Redux `combineReducers` 实用程序函数尝试对此进行优化。如果 slice reducers 都没有返回新的值，则 `combineReducers` 返回旧 state 对象而不是新 state 对象。这意味着 reducer 中的 mutation 会导致 root state 对象不被更新，因此 UI 不会重新渲染。

### 声明参数的数量影响行为

仅使用 `(state)`，当 root store state 对象变更，该函数就会运行。使用 `(state, ownProps)`，它会在 store state 不同时运行，并且在 wrapper props 发生变化时也运行。

这意味着**你不应该添加 `ownProps` 参数，除非你真的需要使用它**，否则你的 `mapStateToProps` 函数会运行得比它需要的更频繁。

这种行为有一些极端情况。 **强制参数的数量决定了 `mapStateToProps` 是否会收到 `ownProps`**。

如果函数的正式定义包含一个强制参数，`mapStateToProps` 将 _不_ 接收 `ownProps`：

```js
function mapStateToProps(state) {
  console.log(state); // state
  console.log(arguments[1]); // undefined
}
const mapStateToProps = (state, ownProps = {}) => {
  console.log(state); // state
  console.log(ownProps); // {}
};
```

当函数的正式定义包含零个或两个强制参数时，它 _将_ 接收`ownProps`：

```js
function mapStateToProps(state, ownProps) {
  console.log(state); // state
  console.log(ownProps); // ownProps
}

function mapStateToProps() {
  console.log(arguments[0]); // state
  console.log(arguments[1]); // ownProps
}

function mapStateToProps(...args) {
  console.log(args[0]); // state
  console.log(args[1]); // ownProps
}
```

## 链接和参考

**教程**

- [Practical Redux Series, Part 6: Connected Lists, Forms, and Performance](https://blog.isquaredsoftware.com/2017/01/practical-redux-part-6-connected-lists-forms-and-performance/)
- [Idiomatic Redux: Using Reselect Selectors for Encapsulation and Performance](https://blog.isquaredsoftware.com/2017/12/idiomatic-redux-using-reselect-selectors/)

**性能**

- [Lee Byron's Tweet Suggesting to avoid `toJS`, `toArray` and `toObject` for Performance](https://twitter.com/leeb/status/746733697093668864)
- [Improving React and Redux performance with Reselect](https://rangle.io/blog/react-and-redux-performance-with-reselect/)
- [Immutable data performance links](https://github.com/markerikson/react-redux-links/blob/master/react-performance.md#immutable-data)

**Q&A**

- [Why Is My Component Re-Rendering Too Often?](https://redux.js.org/faq/react-redux#why-is-my-component-re-rendering-too-often)
- [Why isn't my component re-rendering, or my mapStateToProps running](https://redux.js.org/faq/react-redux#why-isnt-my-component-re-rendering-or-my-mapstatetoprops-running)
- [How can I speed up my mapStateToProps?](https://redux.js.org/faq/react-redux#how-can-i-speed-up-my-mapstatetoprops)
- [Should I only connect my top component, or can I connect multiple components in my tree?](https://redux.js.org/faq/react-redux#should-i-only-connect-my-top-component-or-can-i-connect-multiple-components-in-my-tree)
