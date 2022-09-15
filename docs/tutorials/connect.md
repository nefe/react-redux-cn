---
id: connect
title: 'Tutorial: Connect API'
hide_title: true
sidebar_label: 'Tutorial: Connect API'
description: 'Tutorials > Connect API: how to use the legacy connect API'
---

&nbsp;

# 教程：使用 `connect` API

:::tip

如今我们推荐使用 [React-Redux hooks API 作为我们的默认推荐](../api/hooks.md)。但是，the `connect` API 仍然可以正常工作。

本教程还展示了一些我们不再推荐的旧做法，例如按类型将 Redux 逻辑按类型分成文件夹的做法。为了完整起见，我们将本教程保持原样， 但建议通过 Redux 文档中的 [Redux Essentials 教程](https://redux.js.org/tutorials/essentials/part-1-overview-concepts)和 [Redux 样式指南](https://redux.js.org/style-guide/style-guide)，了解我们当前的最佳实践。

我们正在编写一个介绍 hooks APIs的新教程。在此之前，我们建议阅读 [**Redux Fundamentals, Part 5: UI and React**](https://redux.js.org/tutorials/fundamentals/part-5-ui-react) 以获得 hooks 教程。

:::

我们将通过创建一个 todo list 应用来一步步展示如何在实践中使用 React Redux。

## 一个 Todo List 示例

**跳到**

- 🤞 [给我看一下代码](https://codesandbox.io/s/9on71rvnyo)
- 👆 [提供 store](#providing-the-store)
- ✌️ [连接 Component](#connecting-the-components)

**React UI 组件**

我们已经实现了 React UI 组件像下面这样：

- `TodoApp` 是我们应用的入口。它渲染 header，`AddTodo`，`TodoList`，和 `VisibilityFilters` 组件。
- `AddTodo` 是一个允许用户输入代办事项并通过点击 Add Todo 按钮添加到列表中的组件：
  - 它通过 input 的 `onChange` 事件去设置 state。
  - 当用户点击 Add Todo 按钮时，它通过 dispatches action（我们将使用 React Redux 的提供）把 todo 加到 store 中
- `TodoList` 是一个渲染 todos 列表的组件：
  - 当其中一个 `VisibilityFilters` 被选中时，它会渲染被过滤的 todos 列表。
- `Todo` 是一个渲染单个 todo 的组件：
  - 它渲染 todo 的内容，并显示一个 todo 是通过划掉它来完成的。
  - 它通过 `onClick` 去 dispatches the action 切换 todo 的完成状态。
- `VisibilityFilters` 渲染一组简单的过滤器： _all_，_completed_，和 _incomplete_。单击每一个过滤 todos：
  - 它接受来自父级的 `activeFilter` 属性，指示用户当前选择了哪个过滤器。一个被激活的过滤器会在渲染时包含下划线。
  - 它 dispatches `setFilter` action 去更新被选中的过滤器。
- `constants` 保存我们应用的常量数据。
- 最后 `index` 将我们的应用程序渲染到 DOM。

<br />

**The Redux Store**

应用程序的 Redux 部分已使用 [Redux 文档中推荐的模式](https://redux.js.org)进行设置：

- Store
  - `todos`：一个正常化的 todos 的 reducer。它包含一个对于所有 todos的 `byIds` map 和一个包含所有 ids 列表的 `allIds`。
  - `visibilityFilters`：一个简单的字符串 `all`，`completed`，或者 `incomplete`。
- Action Creators
  - `addTodo` 创建 action 添加到 todos 中。它采用单个字符串变量 `content` 并返回一个 `ADD_TODO` action 并且 `payload` 包含自增的 `id` 和 `content`
  - `toggleTodo` 创建 action 去切换 todos。它采用单个数字变量 `id` 并返回一个`TOGGLE_TODO` action 并且 `payload` 只包含 `id`
  - `setFilter` 创建 action 去设置 app 的激活过滤器。它采用单个字符串变量 `filter` 并返回一个 `SET_FILTER` action 并且 `payload` 包含 `filter` 自身。
- Reducers
  - The `todos` reducer
    - 添加 `id` 到自身的 `allIds` 域中并在收到 `ADD_TODO` action 后在其 `byIds` 字段中设置 todo
    - 在收到 `TOGGLE_TODO` action 后切换 todo 的 `completed` 字段
  - `visibilityFilters` reducer 设置 slice store 为从 `SET_FILTER` action payload 中的新 filter
- Action Types
  - 我们使用一个 `actionTypes.js` 文件去保存那些重复使用的 action types 常量
- Selectors
  - `getTodoList` 从 `todos` store 中返回 `allIds` 列表 
  - `getTodoById` 通过 `id` 查到到 todo
  - `getTodos` 稍微复杂一些。它从 `allIds` 中获取所有的 `id`，在 `byIds` 中找到每个 todo，并在最后返回一个 todos 的数组
  - `getTodosByVisibilityFilter` 根据 visibility filter 过滤 todos 

你可以通过查阅[此 CodeSandbox](https://codesandbox.io/s/6vwyqrpqk3) 获取 UI components 的源码和上述未连接的 Redux store

<br />

现在我们将展示如何使用 React Redux 将 store 连接到我们的应用中。

### Providing the Store

第一步我们需要使得 `store` 对于我们的应用是可见的。为了做到这个，我们使用 React Redux 提供的 API `<Provider />` 去包裹我们的应用。

```jsx
// index.js
import React from 'react'
import ReactDOM from 'react-dom'
import TodoApp from './TodoApp'

import { Provider } from 'react-redux'
import store from './redux/store'

// 对于 React 18
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <TodoApp />
  </Provider>
)
```

注意我们的 `<TodoApp />` 现在是如何被 `<Provider />` 包裹的其中 `store` 作为 prop 传入。

![](https://i.imgur.com/LV0XvwA.png)

### 连接 Components

React Redux 提供一个 `connect` 函数使你可以读取 Redux store（并且当 store 更新时会再次去读取值）的值。

`connect` 函数接收两个参数，都是可选的：

- `mapStateToProps`：在每一次 store state 改变时被调用。它接收整个 store state，并返回该组件需要的数据对象。

- `mapDispatchToProps`: 此参数可以是一个 function，或者一个 object。
  - 如果它是函数，会在 component 创建时立马被调用。它将接收 `dispatch` 作为一个参数，并且应该返回一个 object，其中包含使用 `dispatch` 来 dispatch actions 的函数。
  - 如果它是一个充满 action creators 的 object，每个 action creator 都会变车一个 prop 函数，在调用时会自动 dispatches 其 action。 **注意**：我们推荐使用这种 “object shorthand” 形式。

通常，你会以这种方式调用 `connect`：

```js
const mapStateToProps = (state, ownProps) => ({
  // ... computed data 从 state 和 自定义 ownProps
})

const mapDispatchToProps = {
  // ... 通常是一个充满 action creators 的 object
}

// `connect` 返回一个接收要包装的组件的新函数：
const connectToStore = connect(mapStateToProps, mapDispatchToProps)
// 并且该函数返回连接的，包装的组件：
const ConnectedComponent = connectToStore(Component)

// 通常我们会将两者一步完成，像这样：
connect(mapStateToProps, mapDispatchToProps)(Component)
```

让我们先处理 `<AddTodo />`。它需要触发对 `store` 的更改以添加新的 todos。因此，他需要能够 `dispatch` actions 到 store。接下来我们是如何做到的。

我们的 `addTodo` action creator 像这样：

```js
// redux/actions.js
import { ADD_TODO } from './actionTypes'

let nextTodoId = 0
export const addTodo = (content) => ({
  type: ADD_TODO,
  payload: {
    id: ++nextTodoId,
    content,
  },
})

// ... 其他 actions
```

通过将它传递给 `connect`，我们的组件将其作为 prop 接收，当它被调用时将自动 dispatch the action。 

```js
// components/AddTodo.js

// ... 其他 imports
import { connect } from 'react-redux'
import { addTodo } from '../redux/actions'

class AddTodo extends React.Component {
  // ... 组件实现
}

export default connect(null, { addTodo })(AddTodo)
```

注意现在 `<AddTodo />` 被一个叫做 `<Connect(AddTodo) />` 的父组件包裹。此时，`<AddTodo />` 现在获取一个 prop：`addTodo` action。

![](https://i.imgur.com/u6aXbwl.png)

我们还需要实现 `handleAddTodo` 函数，使得它 dispatch `addTodo` action 并重置输入

```jsx
// components/AddTodo.js

import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../redux/actions'

class AddTodo extends React.Component {
  // ...

  handleAddTodo = () => {
    // dispatches actions 添加 todo
    this.props.addTodo(this.state.input)

    // 设置 state 回到空的字符串
    this.setState({ input: '' })
  }

  render() {
    return (
      <div>
        <input
          onChange={(e) => this.updateInput(e.target.value)}
          value={this.state.input}
        />
        <button className="add-todo" onClick={this.handleAddTodo}>
          Add Todo
        </button>
      </div>
    )
  }
}

export default connect(null, { addTodo })(AddTodo)
```

现在我们的 `<AddTodo />` 已连接到 store。当我们添加一个 todo 它将 dispatch action 去改变 store。我们在应用程序中看不到它因为其他组件尚未连接。如果你连接了 Redux DevTools Extension，你应该可以看到正在 dispatched action：

![](https://i.imgur.com/kHvkqhI.png)

你还应该看到 store 已相应改变：

![](https://i.imgur.com/yx27RVC.png)

`<TodoList />` 组件负责渲染 todos 的列表。因此，它需要从 store中读取数据。我们通过使用 `mapStateToProps` 参数调用 `connect` 来启用它，改函数描述了我们需要从 store中获取哪一部分数据。

我们的 `<Todo />` 组件将 todo item 作为 props。我们从 `todos` 的 `byIds` 字段中获得了这些信息。但是，我们还需要来自store 的 `allIds` 字段的信息，指示哪些 todos 以及它们应该以什么顺序呈现。 我们的 `mapStateToProps` 可能如下所示：

```js
// components/TodoList.js

// ...其他导入
import { connect } from "react-redux";

const TodoList = // ... UI 组件实现

const mapStateToProps = state => {
  const { byIds, allIds } = state.todos || {};
  const todos =
    allIds && allIds.length
      ? allIds.map(id => (byIds ? { ...byIds[id], id } : null))
      : null;
  return { todos };
};

export default connect(mapStateToProps)(TodoList);
```

幸运的是我们有一个 selector 可以做到这点。我们可以简单导入 selector 并在这儿使用它。

```js
// redux/selectors.js

export const getTodosState = (store) => store.todos

export const getTodoList = (store) =>
  getTodosState(store) ? getTodosState(store).allIds : []

export const getTodoById = (store, id) =>
  getTodosState(store) ? { ...getTodosState(store).byIds[id], id } : {}

export const getTodos = (store) =>
  getTodoList(store).map((id) => getTodoById(store, id))
```

```js
// components/TodoList.js

// ...其他导入
import { connect } from "react-redux";
import { getTodos } from "../redux/selectors";

const TodoList = // ... UI 组件实现

export default connect(state => ({ todos: getTodos(state) }))(TodoList);
```

我们建议在 selector 函数中封装任何复杂的数据查找和计算。此外，你可以通过使用 [Reselect](https://github.com/reduxjs/reselect) 编写可以跳过不必要工作的记忆化 selectors 来进一步优化性能。（请参阅 [the Redux docs page on Computing Derived Data](https://redux.js.org/recipes/computing-derived-data#sharing-selectors-across-multiple-components) 和博客文章 [Idiomatic Redux: Using Reselect Selectors for Encapsulation and Performance](https://blog.isquaredsoftware.com/2017/12/idiomatic-redux-using-reselect-selectors/) 了解有关为什么以及如何使用 selector 函数的更多信息。）

现在我们的 `<TodoList />` 已连接到 store。它应该接收 todos 的列表，映射它们，并将每个 todo 传递给 `<Todo />` 组件。`<Todo />` 将依次将它们渲染到屏幕上。现在尝试添加 todo。它应该出现在我们的 todo 清单上！

![](https://i.imgur.com/N68xvrG.png)

我们将连接更多的组件。在我们这样做之前，让我们先暂停一下并了解更多关于 `connect` 的信息。

### 常见的调用方式 `connect`

根据你使用的组件类型，有不同的调用方式 `connect`，最常见的总结如下：

|                               | 不订阅 Store                  | 订阅Store                                    |
| ----------------------------- | ---------------------------------------------- | --------------------------------------------------------- |
| 不注入 Action Creators | `connect()(Component)`                         | `connect(mapStateToProps)(Component)`                     |
| 注入 Action Creators        | `connect(null, mapDispatchToProps)(Component)` | `connect(mapStateToProps, mapDispatchToProps)(Component)` |

#### 不订阅 store 且不注入 action creators

如果你在不提供任何参数的情况下调用 `connect`，你的组件将：

- 当 store 改变时 _不会_ 重渲染
- 接收 `props.dispatch` 你可以用它来手动 dispatch action

```js
// ... Component
export default connect()(Component) // 组件将接收 `dispatch`（就像我们的 <TodoList />！）
```

#### 订阅 store 不注入 action creators

如果你仅使用 `mapStateToProps` 调用 `connect`，你的组件将：

- 订阅 `mapStateToProps` 从 store 中提取的值，并仅在这些值发生更改时重新渲染
- 接收 `props.dispatch` 你可以用它来手动 dispatch action

```js
// ... Component
const mapStateToProps = (state) => state.partOfState
export default connect(mapStateToProps)(Component)
```

#### 不订阅 store 注入 action creators

如果你仅使用 `mapDispatchToProps` 调用 `connect`，你的组件将：

- 当 store 改变时 _不会_ 重渲染
- 接收你使用 `mapDispatchToProps` 作为 props 注入的每个 action creators，并在被调用时自动 dispatch actions 

```js
import { addTodo } from './actionCreators'
// ... Component
export default connect(null, { addTodo })(Component)
```

#### 订阅 store 注入 action creators

如果你同时调用 `mapStateToProps` 和 `mapDispatchToProps` `connect`，你的组件将：

- 订阅 `mapStateToProps` 从 store 中提取的值，并仅在这些值发生更改时重新渲染
- 接收你使用 `mapDispatchToProps` 注入的所有 action creators 作为 props 并自动在被调用时 dispatch actions。

```js
import * as actionCreators from './actionCreators'
// ... Component
const mapStateToProps = (state) => state.partOfState
export default connect(mapStateToProps, actionCreators)(Component)
```

这四种情况涵盖了 `connect` 最基本的用法。要了解有关 `connect` 的更多信息，请继续阅读我们的 [API 部分](../api/connect.md) 改部分对其进行了更详细的解释。

<!-- TODO: 放置链接到进一步解释连接的页面 -->

---

现在让我们连接 `<TodoApp />` 的其余部分。

我们应该如何实现 toggling todos 的交互呢? 敏锐的读者可能已经有了答案。如果您已经设置好您的环境并一直跟进到这一点，那么现在是放下它并自己实现该功能的好时机。我们以类似的方式连接 `<Todo />` 来 dispatch `toggleTodo` 也就不足为奇了：

```js
// components/Todo.js

// ... 其他导入
import { connect } from "react-redux";
import { toggleTodo } from "../redux/actions";

const Todo = // ... 组件实现

export default connect(
  null,
  { toggleTodo }
)(Todo);
```

现在我们的 todo 可以切换完成。我们快完成了！

![](https://i.imgur.com/4UBXYtj.png)

最后，让我们去实现 `VisibilityFilters` 特性。

`<VisibilityFilters />` 需要能够从 store 中读取当前活动状态的过滤器，并 dispatch actions 到 store。因此，我们需要同时传递 `mapStateToProps` 和 `mapDispatchToProps`。这里的 `mapStateToProps` 可以是 `visibilityFilter` 状态的简单访问器。并且 `mapDispatchToProps` 将包含 `setFilter` action creator。

```js
// components/VisibilityFilters.js

// ... 其他导入
import { connect } from "react-redux";
import { setFilter } from "../redux/actions";

const VisibilityFilters = // ... 组件实现

const mapStateToProps = state => {
  return { activeFilter: state.visibilityFilter };
};
export default connect(
  mapStateToProps,
  { setFilter }
)(VisibilityFilters);
```

同时，我们还需要更新我们的 `<TodoList />` 组件以根据活动过滤器过滤 todos。以前我们传递给 `<TodoList />` `connect` 函数调用的 `mapStateToProps` 只是选择整个 todos 列表的选择器。让我们编写另一个选择器来帮助按状态过滤的 todos。

```js
// redux/selectors.js

// ... other selectors
export const getTodosByVisibilityFilter = (store, visibilityFilter) => {
  const allTodos = getTodos(store)
  switch (visibilityFilter) {
    case VISIBILITY_FILTERS.COMPLETED:
      return allTodos.filter((todo) => todo.completed)
    case VISIBILITY_FILTERS.INCOMPLETE:
      return allTodos.filter((todo) => !todo.completed)
    case VISIBILITY_FILTERS.ALL:
    default:
      return allTodos
  }
}
```

并在选择器的帮助下连接到 store：

```js
// components/TodoList.js

// ...

const mapStateToProps = (state) => {
  const { visibilityFilter } = state
  const todos = getTodosByVisibilityFilter(state, visibilityFilter)
  return { todos }
}

export default connect(mapStateToProps)(TodoList)
```

现在我们通过 React Redux 完成了一个非常简单的 todo 应用的例子。我们的所有组件都被连接上了！这是不是很棒？ 🎉🎊

![](https://i.imgur.com/ONqer2R.png)

## 链接

- [使用 React 的方法](https://redux.js.org/basics/usage-with-react)
- [使用 React Redux 绑定](https://blog.isquaredsoftware.com/presentations/workshops/redux-fundamentals/react-redux.html)
- [深入研究高阶组件](https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e)
- [计算衍生数据](https://redux.js.org/recipes/computing-derived-data#sharing-selectors-across-multiple-components)
- [惯用的 Redux: 使用重选选择器来实现封装和性能](https://blog.isquaredsoftware.com/2017/12/idiomatic-redux-using-reselect-selectors/)

## 获取更多帮助

- [Reactiflux](https://www.reactiflux.com) Redux channel
- [StackOverflow](https://stackoverflow.com/questions/tagged/react-redux)
- [GitHub Issues](https://github.com/reduxjs/react-redux/issues/)
