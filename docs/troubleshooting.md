---
id: troubleshooting
title: Troubleshooting
sidebar_label: Troubleshooting
hide_title: true
---

&nbsp;

## 故障排除

**[Reactiflux Discord 社区](http://www.reactiflux.com)** 的 **[#redux 频道](https://discord.gg/0ZcbPKXt5bZ6au5t)** 是我们所有学习和使用 Redux 的相关官方资源。Reactiflux 是一个闲逛，提问，和学习的好地方 - 快来加入我们吧!

你也可以在 [Stack Overflow](https://stackoverflow.com) 上用 **[#redux 标签](https://stackoverflow.com/questions/tagged/redux)** 去提问。

### 我们的观点没有改变！

简而言之，

- Reducers 永远不应该去 mutate state，他们必须返回新的对象，否则 React Redux 将看不到更新。
- 确保你实际上是去 _dispatching_ actions。 例如，如果你有一个像 `addTodo` 这样的构造器，仅调用导入的 `addTodo()` 函数本身不会做任何事情因为它只是 _returns_ 一个 action，但不会 _dispatch_ 它。你需要去调用 `dispatch(addTodo())`（如果你正在使用 hooks API）或者 `props.addTodo()`（如果使用 `connect` + `mapDispatch`）。

### 在 context 或 props 中找不到 store

如果你有 context 的问题，

1. [确保没有重复的 React 实例](https://medium.com/@dan_abramov/two-weird-tricks-that-fix-react-7cf9bbdef375)在你的页面上。
2. 确保在你的项目中没有多个 React Redux 的实例或副本。
3. 确保你没有忘记将根或其他祖先组件用 [`<Provider>`](#provider-store) 包裹。
4. 确保你运行的是最新版本的 React 和 React Redux。

### 不可变的侵害：addComponentAsRefTo(...)：只有 ReactOwner 可以有 refs。这通常意味着你正在尝试将 ref 添加到没有所有者的组件。

如果你正在使用 React for web，这通常意味着你有一个[重复的 React](https://medium.com/@dan_abramov/two-weird-tricks-that-fix-react-7cf9bbdef375)。按照链接的说明解决此问题。

### 我在单元测试中收到有关 useLayoutEffect 的警告

如果在“服务器上”使用 `useLayoutEffect` ReactDOM 会发出此警告。React Redux 试图通过检测它是否在浏览器上下文中运行来解决这个问题。默认情况下 Jest 定义了足够多的浏览器环境，React Redux 认为它在浏览器中运行，从而导致这些警告。

你可以通过为单个测试文件设置 `@jest-environment` 来防止警告：

```jsx
// my.test.jsx
/**
 * @jest-environment node
 */
```

或者通过全局设置：

```js
// package.json
{
  "name": "my-project",
  "jest": {
    "testEnvironment": "node"
  }
}
```

见 https://github.com/facebook/react/issues/14927#issuecomment-490426131
