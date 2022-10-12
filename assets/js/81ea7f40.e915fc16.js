"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[454],{3905:(e,t,n)=>{n.d(t,{Zo:()=>m,kt:()=>u});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var i=a.createContext({}),s=function(e){var t=a.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):p(p({},t),e)),n},m=function(e){var t=s(e.components);return a.createElement(i.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,i=e.parentName,m=l(e,["components","mdxType","originalType","parentName"]),c=s(n),u=r,k=c["".concat(i,".").concat(u)]||c[u]||d[u]||o;return n?a.createElement(k,p(p({ref:t},m),{},{components:n})):a.createElement(k,p({ref:t},m))}));function u(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,p=new Array(o);p[0]=c;var l={};for(var i in t)hasOwnProperty.call(t,i)&&(l[i]=t[i]);l.originalType=e,l.mdxType="string"==typeof e?e:r,p[1]=l;for(var s=2;s<o;s++)p[s]=n[s];return a.createElement.apply(null,p)}return a.createElement.apply(null,n)}c.displayName="MDXCreateElement"},2556:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>i,default:()=>c,frontMatter:()=>l,metadata:()=>s,toc:()=>m});var a=n(7462),r=n(3366),o=(n(7294),n(3905)),p=["components"],l={id:"connect-mapstate",title:"Connect: \u4f7f\u7528 mapStateToProps \u83b7\u53d6\u6570\u636e",hide_title:!0,sidebar_label:"Connect: \u4f7f\u7528 mapStateToProps \u83b7\u53d6\u6570\u636e",description:"\u4f7f\u7528\u6307\u5357 > mapState: options for reading state with connect"},i=void 0,s={unversionedId:"using-react-redux/connect-mapstate",id:"using-react-redux/connect-mapstate",isDocsHomePage:!1,title:"Connect: \u4f7f\u7528 mapStateToProps \u83b7\u53d6\u6570\u636e",description:"\u4f7f\u7528\u6307\u5357 > mapState: options for reading state with connect",source:"@site/../docs/using-react-redux/connect-extracting-data-with-mapStateToProps.md",sourceDirName:"using-react-redux",slug:"/using-react-redux/connect-mapstate",permalink:"/using-react-redux/connect-mapstate",editUrl:"https://github.com/reduxjs/react-redux/edit/master/website/../docs/using-react-redux/connect-extracting-data-with-mapStateToProps.md",tags:[],version:"current",lastUpdatedAt:1665562636,formattedLastUpdatedAt:"10/12/2022",frontMatter:{id:"connect-mapstate",title:"Connect: \u4f7f\u7528 mapStateToProps \u83b7\u53d6\u6570\u636e",hide_title:!0,sidebar_label:"Connect: \u4f7f\u7528 mapStateToProps \u83b7\u53d6\u6570\u636e",description:"\u4f7f\u7528\u6307\u5357 > mapState: options for reading state with connect"},sidebar:"docs",previous:{title:"\u4e0e TypeScript \u4e00\u8d77\u4f7f\u7528",permalink:"/using-react-redux/usage-with-typescript"},next:{title:"Connect: \u4f7f\u7528 mapDispatchToProps Dispatch Action",permalink:"/using-react-redux/connect-mapdispatch"}},m=[{value:"\u5b9a\u4e49 <code>mapStateToProps</code>",id:"\u5b9a\u4e49-mapstatetoprops",children:[{value:"\u53c2\u6570",id:"\u53c2\u6570",children:[{value:"<code>state</code>",id:"state",children:[],level:4},{value:"<code>ownProps</code> (\u53ef\u9009\u7684)",id:"ownprops-\u53ef\u9009\u7684",children:[],level:4}],level:3},{value:"\u8fd4\u56de\u503c",id:"\u8fd4\u56de\u503c",children:[],level:3}],level:2},{value:"\u4f7f\u7528\u6307\u5357",id:"\u4f7f\u7528\u6307\u5357",children:[{value:"\u8ba9 <code>mapStateToProps</code> \u91cd\u5851 Store \u4e2d\u7684\u6570\u636e",id:"\u8ba9-mapstatetoprops-\u91cd\u5851-store-\u4e2d\u7684\u6570\u636e",children:[],level:3},{value:"\u4f7f\u7528 Selector \u51fd\u6570\u63d0\u53d6\u548c\u8f6c\u6362\u6570\u636e",id:"\u4f7f\u7528-selector-\u51fd\u6570\u63d0\u53d6\u548c\u8f6c\u6362\u6570\u636e",children:[],level:3},{value:"<code>mapStateToProps</code> \u51fd\u6570\u5e94\u8be5\u5feb\u901f\u8fd0\u884c",id:"mapstatetoprops-\u51fd\u6570\u5e94\u8be5\u5feb\u901f\u8fd0\u884c",children:[],level:3},{value:"<code>mapStateToProps</code> \u51fd\u6570\u5e94\u8be5\u662f\u5e72\u51c0\u7684\u548c\u540c\u6b65\u7684",id:"mapstatetoprops-\u51fd\u6570\u5e94\u8be5\u662f\u5e72\u51c0\u7684\u548c\u540c\u6b65\u7684",children:[],level:3}],level:2},{value:"<code>mapStateToProps</code> \u548c\u6027\u80fd",id:"mapstatetoprops-\u548c\u6027\u80fd",children:[{value:"\u8fd4\u56de\u503c\u51b3\u5b9a\u4f60\u7684\u7ec4\u4ef6\u662f\u5426\u91cd\u65b0\u6e32\u67d3",id:"\u8fd4\u56de\u503c\u51b3\u5b9a\u4f60\u7684\u7ec4\u4ef6\u662f\u5426\u91cd\u65b0\u6e32\u67d3",children:[],level:3},{value:"\u4ec5\u5728\u9700\u8981\u65f6\u8fd4\u56de\u65b0\u5bf9\u8c61\u5f15\u7528",id:"\u4ec5\u5728\u9700\u8981\u65f6\u8fd4\u56de\u65b0\u5bf9\u8c61\u5f15\u7528",children:[],level:3},{value:"\u4ec5\u5728\u6570\u636e\u66f4\u6539\u65f6\u6267\u884c\u4ee3\u4ef7\u6602\u8d35\u7684\u64cd\u4f5c",id:"\u4ec5\u5728\u6570\u636e\u66f4\u6539\u65f6\u6267\u884c\u4ee3\u4ef7\u6602\u8d35\u7684\u64cd\u4f5c",children:[{value:"Immutable.js \u6027\u80fd\u95ee\u9898",id:"immutablejs-\u6027\u80fd\u95ee\u9898",children:[],level:4}],level:3}],level:2},{value:"\u884c\u4e3a\u548c\u9677\u9631",id:"\u884c\u4e3a\u548c\u9677\u9631",children:[{value:"<code>mapStateToProps</code> \u5728 Store State \u76f8\u540c\u65f6\u4e0d\u4f1a\u8fd0\u884c",id:"mapstatetoprops-\u5728-store-state-\u76f8\u540c\u65f6\u4e0d\u4f1a\u8fd0\u884c",children:[],level:3},{value:"\u58f0\u660e\u53c2\u6570\u7684\u6570\u91cf\u5f71\u54cd\u884c\u4e3a",id:"\u58f0\u660e\u53c2\u6570\u7684\u6570\u91cf\u5f71\u54cd\u884c\u4e3a",children:[],level:3}],level:2},{value:"\u94fe\u63a5\u548c\u53c2\u8003",id:"\u94fe\u63a5\u548c\u53c2\u8003",children:[],level:2}],d={toc:m};function c(e){var t=e.components,n=(0,r.Z)(e,p);return(0,o.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"connect-\u4f7f\u7528-mapstatetoprops-\u83b7\u53d6\u6570\u636e"},"Connect: \u4f7f\u7528 ",(0,o.kt)("inlineCode",{parentName:"h1"},"mapStateToProps")," \u83b7\u53d6\u6570\u636e"),(0,o.kt)("p",null,"\u4f5c\u4e3a\u4f20\u9012\u7ed9 ",(0,o.kt)("inlineCode",{parentName:"p"},"connect")," \u7684\u7b2c\u4e00\u4e2a\u53c2\u6570\uff0c",(0,o.kt)("inlineCode",{parentName:"p"},"mapStateToProps")," \u7528\u4e8e\u4ece store \u4e2d\u9009\u62e9\u51fa\u8fde\u63a5\u7ec4\u4ef6\u9700\u8981\u7684\u90a3\u90e8\u5206\u6570\u636e\u3002\u5b83\u7ecf\u5e38\u88ab\u7b80\u79f0\u4e3a ",(0,o.kt)("inlineCode",{parentName:"p"},"mapState"),"\u3002"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"\u6bcf\u6b21 store state \u53d8\u66f4\u65f6\u90fd\u4f1a\u8c03\u7528\u5b83\u3002"),(0,o.kt)("li",{parentName:"ul"},"\u5b83\u63a5\u6536\u6574\u4e2a store state\uff0c\u5e76\u5e94\u8fd4\u56de\u7ec4\u4ef6\u6240\u9700\u7684\u6570\u636e\u5bf9\u8c61\u3002")),(0,o.kt)("h2",{id:"\u5b9a\u4e49-mapstatetoprops"},"\u5b9a\u4e49 ",(0,o.kt)("inlineCode",{parentName:"h2"},"mapStateToProps")),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"mapStateToProps")," \u5e94\u8be5\u88ab\u5b9a\u4e49\u4e3a\u4e00\u4e2a\u51fd\u6570\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"function mapStateToProps(state, ownProps?)\n")),(0,o.kt)("p",null,"\u5b83\u5e94\u8be5\u63a5\u53d7 ",(0,o.kt)("inlineCode",{parentName:"p"},"state")," \u4f5c\u4e3a\u7b2c\u4e00\u4e2a\u53c2\u6570\uff0c\u53ef\u9009\u7684\u7b2c\u4e8c\u4e2a\u53c2\u6570\u540d\u4e3a ",(0,o.kt)("inlineCode",{parentName:"p"},"ownProps"),"\uff0c\u8fd4\u56de\u4e00\u4e2a\u5305\u542b\u8fde\u63a5\u7ec4\u4ef6\u6240\u9700\u6570\u636e\u7684\u666e\u901a\u5bf9\u8c61\u3002"),(0,o.kt)("p",null,"\u8fd9\u4e2a\u51fd\u6570\u5e94\u8be5\u4f5c\u4e3a\u7b2c\u4e00\u4e2a\u53c2\u6570\u4f20\u9012\u7ed9 ",(0,o.kt)("inlineCode",{parentName:"p"},"connect"),"\uff0c\u5e76\u4e14\u6bcf\u6b21 Redux store state \u53d1\u751f\u53d8\u5316\u65f6\u90fd\u4f1a\u88ab\u8c03\u7528\u3002\u5982\u679c\u4f60\u4e0d\u60f3\u8ba2\u9605 store\uff0c\u8bf7\u5c06 ",(0,o.kt)("inlineCode",{parentName:"p"},"null")," \u6216 ",(0,o.kt)("inlineCode",{parentName:"p"},"undefined")," \u4ee3\u66ff ",(0,o.kt)("inlineCode",{parentName:"p"},"mapStateToProps"),"\u4f20\u9012\u7ed9 ",(0,o.kt)("inlineCode",{parentName:"p"},"connect"),"\u3002"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},(0,o.kt)("inlineCode",{parentName:"strong"},"mapStateToProps")," \u51fd\u6570\u65e0\u9700\u8003\u8651\u662f\u4f7f\u7528 ",(0,o.kt)("inlineCode",{parentName:"strong"},"function")," \u5173\u952e\u5b57\uff08",(0,o.kt)("inlineCode",{parentName:"strong"},"function mapState(state) { }")," \uff09\u8fd8\u662f\u7bad\u5934\u51fd\u6570\uff08",(0,o.kt)("inlineCode",{parentName:"strong"},"const mapState = (state) => { }")," \uff09\u6765\u7f16\u5199")," \u2014\u2014\u65e0\u8bba\u54ea\u79cd\u65b9\u5f0f\uff0c\u5b83\u7684\u6548\u679c\u90fd\u662f\u4e00\u6837\u7684\u3002"),(0,o.kt)("h3",{id:"\u53c2\u6570"},"\u53c2\u6570"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("strong",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"strong"},"state"))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("strong",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"strong"},"ownProps")," (\u53ef\u9009\u7684)"))),(0,o.kt)("h4",{id:"state"},(0,o.kt)("inlineCode",{parentName:"h4"},"state")),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"mapStateToProps")," \u51fd\u6570\u7684\u7b2c\u4e00\u4e2a\u53c2\u6570\u662f\u6574\u4e2a Redux store state\uff08\u4e0e\u8c03\u7528 ",(0,o.kt)("inlineCode",{parentName:"p"},"store.getState()")," \u8fd4\u56de\u7684\u503c\u76f8\u540c\uff09\u3002\u6b63\u56e0\u4e3a\u5982\u6b64\uff0c\u7b2c\u4e00\u4e2a\u53c2\u6570\u4e60\u60ef\u4e0a\u53ea\u662f\u79f0\u4f5c ",(0,o.kt)("inlineCode",{parentName:"p"},"state"),"\u3002\uff08\u867d\u7136\u4f60\u53ef\u4ee5\u7ed9\u53c2\u6570\u53d6\u4efb\u4f55\u540d\u5b57\uff0c\u4f46\u79f0\u5b83\u4e3a ",(0,o.kt)("inlineCode",{parentName:"p"},"store")," \u662f\u4e0d\u6b63\u786e\u7684\u2014\u2014\u5b83\u662f\u201c\u72b6\u6001\u503c\u201d\uff0c\u800c\u4e0d\u662f\u201cstore \u5b9e\u4f8b\u201d\u3002\uff09"),(0,o.kt)("p",null,"\u7f16\u5199 ",(0,o.kt)("inlineCode",{parentName:"p"},"mapStateToProps")," \u51fd\u6570\u65f6\uff0c\u81f3\u5c11\u5e94\u8be5\u4f20\u5165 ",(0,o.kt)("inlineCode",{parentName:"p"},"state"),"\u3002"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"// TodoList.js\n\nfunction mapStateToProps(state) {\n  const { todos } = state;\n  return { todoList: todos.allIds };\n}\n\nexport default connect(mapStateToProps)(TodoList);\n")),(0,o.kt)("h4",{id:"ownprops-\u53ef\u9009\u7684"},(0,o.kt)("inlineCode",{parentName:"h4"},"ownProps")," (\u53ef\u9009\u7684)"),(0,o.kt)("p",null,"\u5982\u679c\u4f60\u7684\u7ec4\u4ef6\u9700\u8981\u5229\u7528 props \u7684\u6570\u636e\u6765\u68c0\u7d22 store \u4e2d\u7684\u6570\u636e\uff0c\u4f60\u53ef\u4ee5\u4f7f\u7528\u7b2c\u4e8c\u4e2a\u53c2\u6570 ",(0,o.kt)("inlineCode",{parentName:"p"},"ownProps")," \u5b9a\u4e49\u8be5\u51fd\u6570\u3002\u8fd9\u4e2a\u53c2\u6570\u5c06\u5305\u542b\u6240\u6709 props\uff0c\u5176\u6765\u81ea ",(0,o.kt)("inlineCode",{parentName:"p"},"connect")," \u751f\u6210\u7684 wrapper \u7ec4\u4ef6\u3002"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'// Todo.js\n\nfunction mapStateToProps(state, ownProps) {\n  const { visibilityFilter } = state;\n  // ownProps \u8bf8\u5982 { "id" : 123 }\n  const { id } = ownProps;\n  const todo = getTodoById(state, id);\n\n  // \u7ec4\u4ef6\u989d\u5916\u63a5\u53d7\u7684\u5185\u5bb9\n  return { todo, visibilityFilter };\n}\n\n// \u4e4b\u540e\uff0c\u4f60\u7684\u5e94\u7528\u4e2d render \u4e00\u4e2a\u7236\u7ec4\u4ef6\uff1a\n<ConnectedTodo id={123} />;\n// \u5e76\u4e14\u4f60\u7684\u7ec4\u4ef6\u63a5\u6536\u4e86 props.id\u3001props.todo \u548c props.visibilityFilter\n')),(0,o.kt)("p",null,"\u4f60\u4e0d\u9700\u8981\u4ece ",(0,o.kt)("inlineCode",{parentName:"p"},"mapStateToProps")," \u8fd4\u56de\u7684\u5bf9\u8c61\u4e2d\u5305\u542b\u6765\u81ea ",(0,o.kt)("inlineCode",{parentName:"p"},"ownProps")," \u7684\u503c\u3002",(0,o.kt)("inlineCode",{parentName:"p"},"connect")," \u4f1a\u81ea\u52a8\u5c06\u8fd9\u4e9b\u4e0d\u540c\u7684 props \u6e90\u5408\u5e76\u6210\u6700\u7ec8\u7684 props \u96c6\u5408\u3002"),(0,o.kt)("h3",{id:"\u8fd4\u56de\u503c"},"\u8fd4\u56de\u503c"),(0,o.kt)("p",null,"\u4f60\u7684 ",(0,o.kt)("inlineCode",{parentName:"p"},"mapStateToProps")," \u51fd\u6570\u5e94\u8be5\u8fd4\u56de\u4e00\u4e2a\u5305\u542b\u7ec4\u4ef6\u6240\u9700\u6570\u636e\u7684\u666e\u901a\u5bf9\u8c61\uff1a"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"\u5bf9\u8c61\u4e2d\u7684\u6bcf\u4e2a\u5b57\u6bb5\u90fd\u5c06\u6210\u4e3a\u5b9e\u9645\u7ec4\u4ef6\u4e2d\u7684 prop"),(0,o.kt)("li",{parentName:"ul"},"\u5b57\u6bb5\u4e2d\u7684\u503c\u5c06\u7528\u4e8e\u786e\u5b9a\u4f60\u7684\u7ec4\u4ef6\u662f\u5426\u9700\u8981\u91cd\u65b0\u6e32\u67d3")),(0,o.kt)("p",null,"\u4e3e\u4f8b\u6765\u8bf4\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"function mapStateToProps(state) {\n  return {\n    a: 42,\n    todos: state.todos,\n    filter: state.visibilityFilter,\n  };\n}\n\n// \u7ec4\u4ef6\u4f1a\u63a5\u6536\u5230\uff1aprops.a, props.todos, and props.filter\n")),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"\u6ce8\u610f\uff1a\u5728\u9700\u8981\u66f4\u591a\u5730\u63a7\u5236\u6e32\u67d3\u6027\u80fd\u7684\u9ad8\u7ea7\u573a\u666f\u4e2d\uff0c",(0,o.kt)("inlineCode",{parentName:"p"},"mapStateToProps")," \u4e5f\u53ef\u4ee5\u8fd4\u56de\u4e00\u4e2a\u51fd\u6570\u3002\u5728\u8fd9\u79cd\u60c5\u51b5\u4e0b\uff0c\u8be5\u51fd\u6570\u5c06\u7528\u4f5c\u7279\u5b9a\u7ec4\u4ef6\u5b9e\u4f8b\u7684\u6700\u7ec8 ",(0,o.kt)("inlineCode",{parentName:"p"},"mapStateToProps"),"\u3002\u8fd9\u5141\u8bb8\u4f60\u6267\u884c\u6bcf\u4e2a\u5b9e\u4f8b\u7684 memoization\u3002\u6709\u5173\u8be6\u7ec6\u4fe1\u606f\uff0c\u8bf7\u53c2\u9605\u6587\u6863\u7684 ",(0,o.kt)("a",{parentName:"p",href:"/api/connect"},"Advanced Usage: Factory Functions")," \u90e8\u5206\uff0c\u4ee5\u53ca ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/reduxjs/react-redux/pull/279"},"PR #279")," \u548c\u5b83\u6dfb\u52a0\u7684\u793a\u4f8b\u3002\u5927\u591a\u6570\u5e94\u7528\u7a0b\u5e8f\u7528\u4e0d\u4e0a\u8fd9\u4e2a\u3002")),(0,o.kt)("h2",{id:"\u4f7f\u7528\u6307\u5357"},"\u4f7f\u7528\u6307\u5357"),(0,o.kt)("h3",{id:"\u8ba9-mapstatetoprops-\u91cd\u5851-store-\u4e2d\u7684\u6570\u636e"},"\u8ba9 ",(0,o.kt)("inlineCode",{parentName:"h3"},"mapStateToProps")," \u91cd\u5851 Store \u4e2d\u7684\u6570\u636e"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"mapStateToProps")," \u51fd\u6570\u53ef\u4ee5\u800c\u4e14\u5e94\u8be5\u505a\u7684\u4e0d\u4ec5\u4ec5\u662f ",(0,o.kt)("inlineCode",{parentName:"p"},"return state.someSlice"),"\u3002",(0,o.kt)("strong",{parentName:"p"},"\u4ed6\u4eec\u6709\u8d23\u4efb\u6839\u636e\u8be5\u7ec4\u4ef6\u7684\u9700\u8981\u201c\u91cd\u65b0\u5851\u9020\u201d store \u6570\u636e\u3002")," \u8fd9\u53ef\u80fd\u5305\u62ec\u5c06\u503c\u4f5c\u4e3a\u7279\u5b9a\u7684 prop \u540d\u79f0\u8fd4\u56de\uff0c\u7ec4\u5408\u6765\u81ea state tree \u4e0d\u540c\u90e8\u5206\u7684\u6570\u636e\uff0c\u4ee5\u53ca\u4f7f\u7528\u4e0d\u540c\u65b9\u5f0f\u8f6c\u6362 store \u7684\u6570\u636e\u3002"),(0,o.kt)("h3",{id:"\u4f7f\u7528-selector-\u51fd\u6570\u63d0\u53d6\u548c\u8f6c\u6362\u6570\u636e"},"\u4f7f\u7528 Selector \u51fd\u6570\u63d0\u53d6\u548c\u8f6c\u6362\u6570\u636e"),(0,o.kt)("p",null,"\u6211\u4eec\u5f3a\u70c8\u5efa\u8bae\u4f7f\u7528 selector \u51fd\u6570\u6765\u5c01\u88c5\u4ece state tree \u7279\u5b9a\u4f4d\u7f6e\u53d6\u6570\u7684\u903b\u8f91\u3002\u7f13\u5b58\u5316\u7684 selector \u51fd\u6570\u5728\u63d0\u9ad8\u5e94\u7528\u7a0b\u5e8f\u6027\u80fd\u65b9\u9762\u4e5f\u53d1\u6325\u7740\u5173\u952e\u4f5c\u7528\uff08\u53c2\u89c1\u672c\u9875\u7684\u4ee5\u4e0b\u90e8\u5206\u548c ",(0,o.kt)("a",{parentName:"p",href:"https://redux.js.org/recipes/computing-derived-data"},"Advanced Usage: Computing Derived Data")," \u9875\u9762\u4e86\u89e3\u4e3a\u4ec0\u4e48\u4ee5\u53ca\u5982\u4f55\u4f7f\u7528 selector \u7684\u66f4\u591a\u8be6\u7ec6\u4fe1\u606f\u3002\uff09"),(0,o.kt)("h3",{id:"mapstatetoprops-\u51fd\u6570\u5e94\u8be5\u5feb\u901f\u8fd0\u884c"},(0,o.kt)("inlineCode",{parentName:"h3"},"mapStateToProps")," \u51fd\u6570\u5e94\u8be5\u5feb\u901f\u8fd0\u884c"),(0,o.kt)("p",null,"\u6bcf\u5f53 store \u53d1\u751f\u53d8\u5316\u65f6\uff0c\u6240\u6709 connect \u8fc7\u7684\u7ec4\u4ef6\uff0c\u5bf9\u5e94\u7684\u6240\u6709 ",(0,o.kt)("inlineCode",{parentName:"p"},"mapStateToProps")," \u51fd\u6570\u90fd\u4f1a\u8fd0\u884c\u3002\u56e0\u6b64\uff0c\u4f60\u7684 ",(0,o.kt)("inlineCode",{parentName:"p"},"mapStateToProps")," \u51fd\u6570\u5e94\u8be5\u5c3d\u53ef\u80fd\u5feb\u5730\u8fd0\u884c\u3002\u8fd9\u4e5f\u610f\u5473\u7740\u7f13\u6162\u7684 ",(0,o.kt)("inlineCode",{parentName:"p"},"mapStateToProps")," \u51fd\u6570\u53ef\u80fd\u662f\u5e94\u7528\u7a0b\u5e8f\u4e2d\u7684\u6f5c\u5728\u74f6\u9888\u3002"),(0,o.kt)("p",null,"\u4f5c\u4e3a\u201c\u91cd\u5851\u6570\u636e\u201d\u7406\u5ff5\u7684\u4e00\u90e8\u5206\uff0c",(0,o.kt)("inlineCode",{parentName:"p"},"mapStateToProps")," \u51fd\u6570\u7ecf\u5e38\u9700\u8981\u4ee5\u5404\u79cd\u65b9\u5f0f\u8f6c\u6362\u6570\u636e\uff08\u4f8b\u5982\u8fc7\u6ee4\u6570\u7ec4\u3001\u5c06 ID \u6570\u7ec4\u6620\u5c04\u5230\u5176\u5bf9\u5e94\u7684\u5bf9\u8c61\uff0c\u6216\u4ece Immutable.js \u5bf9\u8c61\u4e2d\u63d0\u53d6\u666e\u901a JS \u503c\uff09\u3002\u65e0\u8bba\u662f\u5728\u6267\u884c\u8f6c\u6362\u7684\u6210\u672c\u65b9\u9762\uff0c\u8fd8\u662f\u5728\u7ec4\u4ef6\u662f\u5426\u56e0\u6b64\u91cd\u65b0\u6e32\u67d3\u65b9\u9762\uff0c\u8fd9\u4e9b\u8f6c\u6362\u901a\u5e38\u90fd\u6bd4\u8f83\u6d88\u8017\u6027\u80fd\u3002\u5982\u679c\u6027\u80fd\u662f\u4e00\u4e2a\u95ee\u9898\uff0c\u8bf7\u786e\u4fdd\u4ec5\u5728\u8f93\u5165\u503c\u53d1\u751f\u66f4\u6539\u65f6\u624d\u8fd0\u884c\u8fd9\u4e9b\u8f6c\u6362\u3002"),(0,o.kt)("h3",{id:"mapstatetoprops-\u51fd\u6570\u5e94\u8be5\u662f\u5e72\u51c0\u7684\u548c\u540c\u6b65\u7684"},(0,o.kt)("inlineCode",{parentName:"h3"},"mapStateToProps")," \u51fd\u6570\u5e94\u8be5\u662f\u5e72\u51c0\u7684\u548c\u540c\u6b65\u7684"),(0,o.kt)("p",null,"\u6b63\u5982 Redux reducer\uff0c",(0,o.kt)("inlineCode",{parentName:"p"},"mapStateToProps")," \u51fd\u6570\u5e94\u8be5\u59cb\u7ec8\u662f 100% \u5e72\u51c0\u548c\u540c\u6b65\u7684\u3002\u5b83\u5e94\u8be5\u53ea\u63a5\u53d7 ",(0,o.kt)("inlineCode",{parentName:"p"},"state"),"\uff08\u548c ",(0,o.kt)("inlineCode",{parentName:"p"},"ownProps"),"\uff09\u4f5c\u4e3a\u53c2\u6570\uff0c\u5e76\u8fd4\u56de\u7ec4\u4ef6\u9700\u8981\u7684\u6570\u636e\u4f5c\u4e3a props\uff0c\u800c\u4e0d\u6539\u53d8\u8fd9\u4e9b\u53c2\u6570\u3002\u5b83 ",(0,o.kt)("em",{parentName:"p"},"\u4e0d")," \u5e94\u8be5\u7528\u4e8e\u89e6\u53d1\u5f02\u6b65\u884c\u4e3a\uff0c\u5982\u83b7\u53d6\u6570\u636e\u7684 AJAX \u8c03\u7528\uff0c\u5e76\u4e14\u51fd\u6570\u4e0d\u5e94\u8be5\u88ab\u58f0\u660e\u4e3a ",(0,o.kt)("inlineCode",{parentName:"p"},"async"),"\u3002"),(0,o.kt)("h2",{id:"mapstatetoprops-\u548c\u6027\u80fd"},(0,o.kt)("inlineCode",{parentName:"h2"},"mapStateToProps")," \u548c\u6027\u80fd"),(0,o.kt)("h3",{id:"\u8fd4\u56de\u503c\u51b3\u5b9a\u4f60\u7684\u7ec4\u4ef6\u662f\u5426\u91cd\u65b0\u6e32\u67d3"},"\u8fd4\u56de\u503c\u51b3\u5b9a\u4f60\u7684\u7ec4\u4ef6\u662f\u5426\u91cd\u65b0\u6e32\u67d3"),(0,o.kt)("p",null,"React Redux \u5728\u5185\u90e8\u5b9e\u73b0\u4e86 ",(0,o.kt)("inlineCode",{parentName:"p"},"shouldComponentUpdate")," \u65b9\u6cd5\uff0c\u8fd9\u6837\u5f53\u7ec4\u4ef6\u9700\u8981\u7684\u6570\u636e\u53d1\u751f\u53d8\u5316\u65f6\uff0cwrapper \u7ec4\u4ef6\u5c31\u4f1a\u7cbe\u786e\u5730\u91cd\u65b0\u6e32\u67d3\u3002\u9ed8\u8ba4\u60c5\u51b5\u4e0b\uff0cReact Redux \u9488\u5bf9 ",(0,o.kt)("inlineCode",{parentName:"p"},"mapStateToProps")," \u8fd4\u56de\u7684\u5bf9\u8c61\u4e2d\u7684\u6bcf\u4e2a\u5b57\u6bb5\uff0c\u4f7f\u7528 ",(0,o.kt)("inlineCode",{parentName:"p"},"===")," \u8fdb\u884c\u6bd4\u8f83\uff08\u201c\u6d45\u5bf9\u6bd4\u201d\u68c0\u67e5\uff09\u4ee5\u5224\u65ad\u5176\u5185\u5bb9\u662f\u5426\u4e0d\u540c\u3002\u5982\u679c\u4efb\u4f55\u5b57\u6bb5\u53d1\u751f\u66f4\u6539\uff0c\u90a3\u4e48\u4f60\u7684\u7ec4\u4ef6\u5c06\u88ab\u91cd\u65b0\u6e32\u67d3\uff0c\u4ee5\u4fbf\u5b83\u53ef\u4ee5\u63a5\u6536\u66f4\u65b0\u7684\u503c\u4f5c\u4e3a props\u3002\u8bf7\u6ce8\u610f\uff0c\u8fd4\u56de\u76f8\u540c\u5f15\u7528\u7684 mutated \u5bf9\u8c61\u662f\u4e00\u4e2a\u5e38\u89c1\u9519\u8bef\uff0c\u53ef\u80fd\u4f1a\u5bfc\u81f4\u7ec4\u4ef6\u672a\u6309\u9884\u671f\u91cd\u65b0\u6e32\u67d3\u3002"),(0,o.kt)("p",null,"\u603b\u7ed3\u4e00\u4e0b ",(0,o.kt)("inlineCode",{parentName:"p"},"connect")," \u5305\u88f9\u7684\u7ec4\u4ef6\u4e0e ",(0,o.kt)("inlineCode",{parentName:"p"},"mapStateToProps")," \u4ece store \u4e2d\u63d0\u53d6\u6570\u636e\u7684\u884c\u4e3a\uff1a"),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:null}),(0,o.kt)("th",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"th"},"(state) => stateProps")),(0,o.kt)("th",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"th"},"(state, ownProps) => stateProps")))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"mapStateToProps")," \u8fd0\u884c\u6761\u4ef6\uff1a"),(0,o.kt)("td",{parentName:"tr",align:null},"store ",(0,o.kt)("inlineCode",{parentName:"td"},"state")," \u53d8\u66f4"),(0,o.kt)("td",{parentName:"tr",align:null},"store ",(0,o.kt)("inlineCode",{parentName:"td"},"state")," \u53d8\u66f4 ",(0,o.kt)("br",null)," \u6216\u8005 ",(0,o.kt)("br",null),"\u4efb\u4f55 ",(0,o.kt)("inlineCode",{parentName:"td"},"ownProps")," \u7684\u5b57\u6bb5\u53d8\u5316")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},"\u7ec4\u4ef6\u91cd\u73b0\u6e32\u67d3\u6761\u4ef6\uff1a"),(0,o.kt)("td",{parentName:"tr",align:null},"\u4efb\u4f55 ",(0,o.kt)("inlineCode",{parentName:"td"},"stateProps")," \u5b57\u6bb5\u53d8\u5316"),(0,o.kt)("td",{parentName:"tr",align:null},"\u4efb\u4f55 ",(0,o.kt)("inlineCode",{parentName:"td"},"stateProps")," \u7684\u5b57\u6bb5\u53d8\u5316 ",(0,o.kt)("br",null)," \u6216\u8005 ",(0,o.kt)("br",null)," \u4efb\u4f55 ",(0,o.kt)("inlineCode",{parentName:"td"},"ownProps")," \u7684\u5b57\u6bb5\u53d8\u5316")))),(0,o.kt)("h3",{id:"\u4ec5\u5728\u9700\u8981\u65f6\u8fd4\u56de\u65b0\u5bf9\u8c61\u5f15\u7528"},"\u4ec5\u5728\u9700\u8981\u65f6\u8fd4\u56de\u65b0\u5bf9\u8c61\u5f15\u7528"),(0,o.kt)("p",null,"React Redux \u4f1a\u8fdb\u884c\u6d45\u5c42\u6bd4\u8f83\u4ee5\u67e5\u770b ",(0,o.kt)("inlineCode",{parentName:"p"},"mapStateToProps")," \u7684\u7ed3\u679c\u662f\u5426\u53d1\u751f\u4e86\u53d8\u5316\u3002\u6bcf\u6b21\u90fd\u5f88\u5bb9\u6613\u610f\u5916\u5730\u8fd4\u56de\u65b0\u7684\u5bf9\u8c61\u6216\u6570\u7ec4\u5f15\u7528\uff0c\u8fd9\u4f1a\u5bfc\u81f4\u7ec4\u4ef6\u91cd\u65b0\u6e32\u67d3\uff0c\u5373\u4f7f\u6570\u636e\u662f\u76f8\u540c\u7684\u3002"),(0,o.kt)("p",null,"\u5bf9\u4e8e\u65b0\u7684\u5bf9\u8c61\u6216\u8005\u6570\u7ec4\uff0c\u63a8\u8350\u4f7f\u7528\u4e0b\u9762\u7684 immutable \u64cd\u4f5c\uff0c\u8fd4\u56de\u65b0\u7684\u5f15\u7528"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"\u4f7f\u7528 ",(0,o.kt)("inlineCode",{parentName:"li"},"someArray.map()")," \u6216 ",(0,o.kt)("inlineCode",{parentName:"li"},"someArray.filter()")," \u521b\u5efa\u65b0\u6570\u7ec4"),(0,o.kt)("li",{parentName:"ul"},"\u4f7f\u7528 ",(0,o.kt)("inlineCode",{parentName:"li"},"array.concat")," \u5408\u5e76\u6570\u7ec4"),(0,o.kt)("li",{parentName:"ul"},"\u4f7f\u7528 ",(0,o.kt)("inlineCode",{parentName:"li"},"array.slice")," \u9009\u62e9\u6570\u7ec4\u7684\u4e00\u90e8\u5206"),(0,o.kt)("li",{parentName:"ul"},"\u4f7f\u7528 ",(0,o.kt)("inlineCode",{parentName:"li"},"Object.assign")," \u590d\u5236\u503c"),(0,o.kt)("li",{parentName:"ul"},"\u4f7f\u7528\u6269\u5c55\u8fd0\u7b97\u7b26 ",(0,o.kt)("inlineCode",{parentName:"li"},"{ ...oldState, ...newData }")," \u590d\u5236\u503c")),(0,o.kt)("p",null,"\u5c06\u8fd9\u4e9b\u64cd\u4f5c\u653e\u5165 ",(0,o.kt)("a",{parentName:"p",href:"https://redux.js.org/recipes/computing-derived-data#creating-a-memoized-selector"},"memoized selector functions")," \u4ee5\u786e\u4fdd\u5b83\u4eec\u4ec5\u5728\u8f93\u5165\u503c\u53d1\u751f\u66f4\u6539\u65f6\u8fd0\u884c\u3002\u8fd9\u4e5f\u5c06\u786e\u4fdd\u5982\u679c\u8f93\u5165\u503c ",(0,o.kt)("em",{parentName:"p"},"\u6ca1\u6709")," \u6539\u53d8\uff0c",(0,o.kt)("inlineCode",{parentName:"p"},"mapStateToProps")," \u4ecd\u5c06\u8fd4\u56de\u4e0e\u4ee5\u524d\u76f8\u540c\u7684\u7ed3\u679c\u503c\uff0c\u5e76\u4e14 ",(0,o.kt)("inlineCode",{parentName:"p"},"connect")," \u53ef\u4ee5\u8df3\u8fc7\u91cd\u65b0\u6e32\u67d3\u3002"),(0,o.kt)("h3",{id:"\u4ec5\u5728\u6570\u636e\u66f4\u6539\u65f6\u6267\u884c\u4ee3\u4ef7\u6602\u8d35\u7684\u64cd\u4f5c"},"\u4ec5\u5728\u6570\u636e\u66f4\u6539\u65f6\u6267\u884c\u4ee3\u4ef7\u6602\u8d35\u7684\u64cd\u4f5c"),(0,o.kt)("p",null,"\u8f6c\u6362\u6570\u636e\u901a\u5e38\u4ee3\u4ef7\u6602\u8d35\uff08",(0,o.kt)("em",{parentName:"p"},"\u5e76\u4e14")," \u901a\u5e38\u4f1a\u5bfc\u81f4\u521b\u5efa\u65b0\u7684\u5bf9\u8c61\u5f15\u7528\uff09\u3002\u4e3a\u4e86\u4f7f\u4f60\u7684 ",(0,o.kt)("inlineCode",{parentName:"p"},"mapStateToProps")," \u51fd\u6570\u5c3d\u53ef\u80fd\u5feb\uff0c\u4f60\u5e94\u8be5\u53ea\u5728\u76f8\u5173\u6570\u636e\u53d1\u751f\u53d8\u5316\u65f6\u91cd\u65b0\u8fd0\u884c\u8fd9\u4e9b\u590d\u6742\u7684\u8f6c\u6362\u3002"),(0,o.kt)("p",null,"\u6709\u51e0\u79cd\u65b9\u6cd5\u53ef\u4ee5\u89e3\u51b3\u8fd9\u4e2a\u95ee\u9898\uff1a"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"\u4e00\u4e9b\u8f6c\u6362\u53ef\u4ee5\u5728 action creator \u6216\u8005 reducer \u4e2d\u8ba1\u7b97\uff0c\u8f6c\u6362\u540e\u7684\u6570\u636e\u53ef\u4ee5\u4fdd\u5b58\u5728 store \u4e2d"),(0,o.kt)("li",{parentName:"ul"},"\u8f6c\u6362\u4e5f\u53ef\u4ee5\u5728\u7ec4\u4ef6\u7684 ",(0,o.kt)("inlineCode",{parentName:"li"},"render()")," \u65b9\u6cd5\u4e2d\u5b8c\u6210"),(0,o.kt)("li",{parentName:"ul"},"\u5982\u679c\u786e\u5b9e\u9700\u8981\u5728 ",(0,o.kt)("inlineCode",{parentName:"li"},"mapStateToProps")," \u51fd\u6570\u4e2d\u8fdb\u884c\u8f6c\u6362\uff0c\u6211\u4eec\u5efa\u8bae\u4f7f\u7528 ",(0,o.kt)("a",{parentName:"li",href:"https://redux.js.org/recipes/computing-derived-data#creating-a-memoized-selector"},"memoized selector functions"),"\u4ee5\u786e\u4fdd\u4ec5\u5728\u8f93\u5165\u503c\u53d1\u751f\u66f4\u6539\u65f6\u8fdb\u884c\u8f6c\u6362\u3002")),(0,o.kt)("h4",{id:"immutablejs-\u6027\u80fd\u95ee\u9898"},"Immutable.js \u6027\u80fd\u95ee\u9898"),(0,o.kt)("p",null,"Immutable.js \u7684\u4f5c\u8005 Lee Byron \u5728 Twitter ",(0,o.kt)("a",{parentName:"p",href:"https://twitter.com/leeb/status/746733697093668864?lang=en"},"explicitly advises avoiding ",(0,o.kt)("inlineCode",{parentName:"a"},"toJS")," when performance is a concern"),"\u4e2d\u5199\u9053\uff1a"),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"#immutablejs \u7684\u6027\u80fd\u63d0\u793a\uff1a\u907f\u514d .toJS() .toObject() \u548c .toArray() \u7f13\u6162\u7684\u5168\u590d\u5236\u64cd\u4f5c\uff0c\u8fd9\u4f1a\u5bfc\u81f4\u7ed3\u6784\u5171\u4eab\u53d8\u5f97\u65e0\u7528\u3002")),(0,o.kt)("p",null,"Immutable.js \u8fd8\u9700\u8981\u8003\u8651\u5176\u4ed6\u51e0\u4e2a\u6027\u80fd\u95ee\u9898 - \u8bf7\u53c2\u9605\u672c\u9875\u672b\u5c3e\u7684\u94fe\u63a5\u5217\u8868\u4ee5\u83b7\u53d6\u66f4\u591a\u4fe1\u606f\u3002"),(0,o.kt)("h2",{id:"\u884c\u4e3a\u548c\u9677\u9631"},"\u884c\u4e3a\u548c\u9677\u9631"),(0,o.kt)("h3",{id:"mapstatetoprops-\u5728-store-state-\u76f8\u540c\u65f6\u4e0d\u4f1a\u8fd0\u884c"},(0,o.kt)("inlineCode",{parentName:"h3"},"mapStateToProps")," \u5728 Store State \u76f8\u540c\u65f6\u4e0d\u4f1a\u8fd0\u884c"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"connect")," \u751f\u6210\u7684 wrapper \u7ec4\u4ef6\u8ba2\u9605\u4e86 Redux store\u3002\u6bcf\u6b21 dispatch \u4e00\u4e2a action \u65f6\uff0c\u5b83\u90fd\u4f1a\u8c03\u7528 ",(0,o.kt)("inlineCode",{parentName:"p"},"store.getState()")," \u5e76\u68c0\u67e5\u662f\u5426 ",(0,o.kt)("inlineCode",{parentName:"p"},"lastState === currentState"),"\u3002\u5982\u679c\u4e24\u4e2a state \u503c\u7684\u5f15\u7528\u662f\u76f8\u540c\u7684\uff0c\u5b83\u5c06 ",(0,o.kt)("em",{parentName:"p"},"\u4e0d\u4f1a")," \u91cd\u65b0\u8fd0\u884c\u4f60\u7684 ",(0,o.kt)("inlineCode",{parentName:"p"},"mapStateToProps")," \u51fd\u6570\uff0c\u56e0\u4e3a\u5b83\u5047\u5b9a store state \u7684\u5176\u4f59\u90e8\u5206\u4e5f\u6ca1\u6709\u6539\u53d8\u3002"),(0,o.kt)("p",null,"Redux ",(0,o.kt)("inlineCode",{parentName:"p"},"combineReducers")," \u5b9e\u7528\u7a0b\u5e8f\u51fd\u6570\u5c1d\u8bd5\u5bf9\u6b64\u8fdb\u884c\u4f18\u5316\u3002\u5982\u679c slice reducers \u90fd\u6ca1\u6709\u8fd4\u56de\u65b0\u7684\u503c\uff0c\u5219 ",(0,o.kt)("inlineCode",{parentName:"p"},"combineReducers")," \u8fd4\u56de\u65e7 state \u5bf9\u8c61\u800c\u4e0d\u662f\u65b0 state \u5bf9\u8c61\u3002\u8fd9\u610f\u5473\u7740 reducer \u4e2d\u7684 mutation \u4f1a\u5bfc\u81f4 root state \u5bf9\u8c61\u4e0d\u88ab\u66f4\u65b0\uff0c\u56e0\u6b64 UI \u4e0d\u4f1a\u91cd\u65b0\u6e32\u67d3\u3002"),(0,o.kt)("h3",{id:"\u58f0\u660e\u53c2\u6570\u7684\u6570\u91cf\u5f71\u54cd\u884c\u4e3a"},"\u58f0\u660e\u53c2\u6570\u7684\u6570\u91cf\u5f71\u54cd\u884c\u4e3a"),(0,o.kt)("p",null,"\u4ec5\u4f7f\u7528 ",(0,o.kt)("inlineCode",{parentName:"p"},"(state)"),"\uff0c\u5f53 root store state \u5bf9\u8c61\u53d8\u66f4\uff0c\u8be5\u51fd\u6570\u5c31\u4f1a\u8fd0\u884c\u3002\u4f7f\u7528 ",(0,o.kt)("inlineCode",{parentName:"p"},"(state, ownProps)"),"\uff0c\u5b83\u4f1a\u5728 store state \u4e0d\u540c\u65f6\u8fd0\u884c\uff0c\u5e76\u4e14\u5728 wrapper props \u53d1\u751f\u53d8\u5316\u65f6\u4e5f\u8fd0\u884c\u3002"),(0,o.kt)("p",null,"\u8fd9\u610f\u5473\u7740",(0,o.kt)("strong",{parentName:"p"},"\u4f60\u4e0d\u5e94\u8be5\u6dfb\u52a0 ",(0,o.kt)("inlineCode",{parentName:"strong"},"ownProps")," \u53c2\u6570\uff0c\u9664\u975e\u4f60\u771f\u7684\u9700\u8981\u4f7f\u7528\u5b83"),"\uff0c\u5426\u5219\u4f60\u7684 ",(0,o.kt)("inlineCode",{parentName:"p"},"mapStateToProps")," \u51fd\u6570\u4f1a\u8fd0\u884c\u5f97\u6bd4\u5b83\u9700\u8981\u7684\u66f4\u9891\u7e41\u3002"),(0,o.kt)("p",null,"\u8fd9\u79cd\u884c\u4e3a\u6709\u4e00\u4e9b\u6781\u7aef\u60c5\u51b5\u3002 ",(0,o.kt)("strong",{parentName:"p"},"\u5f3a\u5236\u53c2\u6570\u7684\u6570\u91cf\u51b3\u5b9a\u4e86 ",(0,o.kt)("inlineCode",{parentName:"strong"},"mapStateToProps")," \u662f\u5426\u4f1a\u6536\u5230 ",(0,o.kt)("inlineCode",{parentName:"strong"},"ownProps")),"\u3002"),(0,o.kt)("p",null,"\u5982\u679c\u51fd\u6570\u7684\u6b63\u5f0f\u5b9a\u4e49\u5305\u542b\u4e00\u4e2a\u5f3a\u5236\u53c2\u6570\uff0c",(0,o.kt)("inlineCode",{parentName:"p"},"mapStateToProps")," \u5c06 ",(0,o.kt)("em",{parentName:"p"},"\u4e0d")," \u63a5\u6536 ",(0,o.kt)("inlineCode",{parentName:"p"},"ownProps"),"\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"function mapStateToProps(state) {\n  console.log(state); // state\n  console.log(arguments[1]); // undefined\n}\nconst mapStateToProps = (state, ownProps = {}) => {\n  console.log(state); // state\n  console.log(ownProps); // {}\n};\n")),(0,o.kt)("p",null,"\u5f53\u51fd\u6570\u7684\u6b63\u5f0f\u5b9a\u4e49\u5305\u542b\u96f6\u4e2a\u6216\u4e24\u4e2a\u5f3a\u5236\u53c2\u6570\u65f6\uff0c\u5b83 ",(0,o.kt)("em",{parentName:"p"},"\u5c06")," \u63a5\u6536",(0,o.kt)("inlineCode",{parentName:"p"},"ownProps"),"\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"function mapStateToProps(state, ownProps) {\n  console.log(state); // state\n  console.log(ownProps); // ownProps\n}\n\nfunction mapStateToProps() {\n  console.log(arguments[0]); // state\n  console.log(arguments[1]); // ownProps\n}\n\nfunction mapStateToProps(...args) {\n  console.log(args[0]); // state\n  console.log(args[1]); // ownProps\n}\n")),(0,o.kt)("h2",{id:"\u94fe\u63a5\u548c\u53c2\u8003"},"\u94fe\u63a5\u548c\u53c2\u8003"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"\u6559\u7a0b")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://blog.isquaredsoftware.com/2017/01/practical-redux-part-6-connected-lists-forms-and-performance/"},"Practical Redux Series, Part 6: Connected Lists, Forms, and Performance")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://blog.isquaredsoftware.com/2017/12/idiomatic-redux-using-reselect-selectors/"},"Idiomatic Redux: Using Reselect Selectors for Encapsulation and Performance"))),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"\u6027\u80fd")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://twitter.com/leeb/status/746733697093668864"},"Lee Byron's Tweet Suggesting to avoid ",(0,o.kt)("inlineCode",{parentName:"a"},"toJS"),", ",(0,o.kt)("inlineCode",{parentName:"a"},"toArray")," and ",(0,o.kt)("inlineCode",{parentName:"a"},"toObject")," for Performance")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://rangle.io/blog/react-and-redux-performance-with-reselect/"},"Improving React and Redux performance with Reselect")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://github.com/markerikson/react-redux-links/blob/master/react-performance.md#immutable-data"},"Immutable data performance links"))),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Q&A")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://redux.js.org/faq/react-redux#why-is-my-component-re-rendering-too-often"},"Why Is My Component Re-Rendering Too Often?")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://redux.js.org/faq/react-redux#why-isnt-my-component-re-rendering-or-my-mapstatetoprops-running"},"Why isn't my component re-rendering, or my mapStateToProps running")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://redux.js.org/faq/react-redux#how-can-i-speed-up-my-mapstatetoprops"},"How can I speed up my mapStateToProps?")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://redux.js.org/faq/react-redux#should-i-only-connect-my-top-component-or-can-i-connect-multiple-components-in-my-tree"},"Should I only connect my top component, or can I connect multiple components in my tree?"))))}c.isMDXComponent=!0}}]);