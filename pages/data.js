export const data = {
  nodes: [
    {
      id: '1',
      label: '公司1'
    },
    {
      id: '2',
      label: '公司2'
    },
    {
      id: '3',
      label: '公司3'
    },
    {
      id: '4',
      label: '公司4'
    },
    {
      id: '5',
      label: '公司5'
    },
    {
      id: '6',
      label: '公司6'
    },
    {
      id: '7',
      label: '公司7'
    },
    {
      id: '8',
      label: '公司8'
    },
    {
      id: '9',
      label: '公司9'
    }
  ],
  edges: [
    {
      source: '1',
      target: '2',
      data: {
        type: '凭证开立',
        amount: '100,000,000,00 元',
        date: '2019-08-03'
      }
    },
    {
      source: '1',
      target: '3',
      data: {
        type: '凭证转让',
        amount: '100,000,000,00 元',
        date: '2019-08-03'
      }
    },
    {
      source: '2',
      target: '5',
      data: {
        type: '凭证开立',
        amount: '100,000,000,00 元',
        date: '2019-08-03'
      }
    },
    {
      source: '5',
      target: '6',
      data: {
        type: '凭证转让',
        amount: '100,000,000,00 元',
        date: '2019-08-03'
      }
    },
    {
      source: '3',
      target: '4',
      data: {
        type: '凭证融资',
        amount: '100,000,000,00 元',
        date: '2019-08-03'
      }
    },
    {
      source: '4',
      target: '7',
      data: {
        type: '凭证转让',
        amount: '100,000,000,00 元',
        date: '2019-08-03'
      }
    },
    {
      source: '1',
      target: '8',
      data: {
        type: '凭证转让',
        amount: '100,000,000,00 元',
        date: '2019-08-03'
      }
    },
    {
      source: '1',
      target: '9',
      data: {
        type: '凭证融资',
        amount: '100,000,000,00 元',
        date: '2019-08-03'
      }
    }
  ]
};