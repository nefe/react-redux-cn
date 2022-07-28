module.exports = {
  docs: [
    {
      type: 'category',
      label: '简介',
      collapsed: false,
      items: [
        'introduction/getting-started',
        'introduction/why-use-react-redux',
      ],
    },
    {
      type: 'category',
      label: '教程',
      collapsed: false,
      items: [
        'tutorials/quick-start',
        'tutorials/typescript-quick-start',
        'tutorials/connect',
      ],
    },
    {
      type: 'category',
      label: '使用指南',
      collapsed: false,
      items: [
        'using-react-redux/usage-with-typescript',
        'using-react-redux/connect-mapstate',
        'using-react-redux/connect-mapdispatch',
        'using-react-redux/accessing-store',
      ],
    },
    {
      type: 'category',
      label: 'API 文档',
      items: ['api/provider', 'api/hooks', 'api/connect', 'api/batch'],
    },
    {
      type: 'category',
      label: '避坑指南',
      items: ['troubleshooting'],
    },
  ],
}
