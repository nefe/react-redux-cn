---
id: why-use-react-redux
title: Why Use React Redux?
hide_title: true
sidebar_label: Why Use React Redux?
description: 'Introduction > Why Use React Redux: benefits of using React Redux in a React app'
---

&nbsp;

# 为什么要使用 React Redux?

Redux 本身是一个能够在任何UI层或框架中使用的独立的库,包括React, Angular, Vue, Ember, 和 vanilla JS. 
尽管 Redux 和 React 经常被一起使用,但是它们还是彼此独立的。

如果您在使用 Redux 和任意一个UI框架, 您通常会使用"UI 绑定"库将 Redux 与您的 UI 框架联系在一起, 而不是让您的 UI 代码与 store 直接交流。

**React Redux 是 React 官方的的 Redux UI 绑定库**。 如果您正在使用 Redux 和 React， 您也应该使用 React Redux去连接这两个库。

要了解为什么应该使用React Redux，了解"UI 绑定库"的作用可能会有所帮助。

:::info

如果您对是否使用Redux有疑问, 请参阅这些文章以讨论何时，以及为什么要使用Redux，以及它的使用方式:

- [Redux 文档: 动机](https://redux.js.org/introduction/motivation)
- [Redux 文档: FAQ - 我应该什么时候使用Redux?](https://redux.js.org/faq/general#when-should-i-use-redux)
- [你可能不需要Redux](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367)
- [惯用的 Redux: Redux之道, 第1部分 - 实现和意图](https://blog.isquaredsoftware.com/2017/05/idiomatic-redux-tao-of-redux-part-1/)

:::

## 集成 Redux 和 UI

将 Redux 和 _任意_ 的UI 框架一起使用都需要 [相同一致的以下几个步骤](https://blog.isquaredsoftware.com/presentations/workshops/redux-fundamentals/ui-layer.html#/4):

1. 创建一个 Redux store
2. 订阅更新
3. 订阅回调内部:
   1. 获取当前的 store state
   2. 提取这部分 UI 需要的数据
   3. 使用数据更新 UI
4. 如有必要, 用初始的 state 去渲染 UI
5. 通过 dispatching Redux actions 去响应 UI 层的交互

虽然可以手动编写此逻辑，但这样做会变得非常重复。此外，优化 UI 性能需要很复杂的逻辑。

订阅 store，检查更新数据和触发重新渲染的过程可以变得更加通用和可重用。 **像React Redux这样的 UI 绑定库处理 store  的交互逻辑, 因此您不必自己编写这部分代码。**

:::info

要更深入地了解 React Redux 如何在内部工作以及它如何为您处理 store 的交互, 请参阅 **[Idiomatic Redux: React Redux 的历史和实现](https://blog.isquaredsoftware.com/2018/11/react-redux-history-implementation/)**.

:::

## 使用 React Redux 的理由

### 它是 React 官方的 Redux UI 绑定

虽然 Redux 可以和任意的 UI 层一起使用，但它最初是为与 React 一起工作而设计的。 此处有 [许多其他框架的 UI 绑定层 (https://redux.js.org/introduction/ecosystem#library-integration-and-bindings), 但是 React Redux 是由 Redux 团队直接维护的。

作为 React 官方的 Redux 绑定，React Redux 与来自任一库的任何 API 更改保持更新，以确保您的 React 组件按预期运行。它的预期用途采用了 React 的设计原则 - 编写声明性组件。

### 它能帮助您提升性能优化

React 通常都会很快，但默认情况下的，对组件的任何更新都会导致 React 重新渲染组件树该部分内的所有组件。确实需要这样做， 如果给定组件的数据没有更改，那么重新渲染可能会浪费一些性能，因为请求到的 UI 输出将是相同的。

如果性能是一个问题，最好的提高性能的最佳方法就是跳过不必要的重新渲染，以便组件仅在其数据实际更改时重新渲染。 **React Redux 在内部实现了许多性能优化，以便您编写的组件仅在实际需要时重新渲染。**

此外，通过在 React 组件树中连接多个组件，您可以确保每个连接的组件仅从该组件所需的 store state 中提取特定的数据。 这意味着您自己的组件将需要更少的重新渲染，因为大多数时候这些特定的数据都没有改变。

### 社区支持

作为 React 和 Redux 的官方绑定库，React Redux 拥有庞大的用户社区。这使得您寻求帮助，了解最佳实践，使用构建在 React Redux 之上的库，在不同应用程序之间重用您的知识变的更加简单。

## 链接和参考

### 了解 React Redux

- [Idiomatic Redux: React Redux 的历史和实现](https://blog.isquaredsoftware.com/2018/11/react-redux-history-implementation/)
- [`connect.js` Explained](https://gist.github.com/gaearon/1d19088790e70ac32ea636c025ba424e)
- [Redux Fundamentals workshop slides](https://blog.isquaredsoftware.com/2018/06/redux-fundamentals-workshop-slides/)
  - [UI Layer Integration](https://blog.isquaredsoftware.com/presentations/workshops/redux-fundamentals/ui-layer.html)
  - [Using React Redux](https://blog.isquaredsoftware.com/presentations/workshops/redux-fundamentals/react-redux.html)

### 社区资源

- 意见频道: [#redux on Reactiflux](https://discord.gg/0ZcbPKXt5bZ6au5t) ([Reactiflux invite link](https://reactiflux.com))
- Stack Overflow 主题: [Redux](https://stackoverflow.com/questions/tagged/redux), [React Redux](https://stackoverflow.com/questions/tagged/redux)
- Reddit: [/r/reactjs](https://www.reddit.com/r/reactjs/), [/r/reduxjs](https://www.reddit.com/r/reduxjs/)
- GitHub issues (bug 报告 和 功能请求): https://github.com/reduxjs/react-redux/issues
- 教程，文章和更多资源: [React/Redux Links](https://github.com/markerikson/react-redux-links)
