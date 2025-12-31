export default {
  name: 'impactStat',
  title: 'Impact Stat',
  type: 'document',
  fields: [
    {
      name: 'number',
      title: 'Number',
      type: 'string',
    },
    {
      name: 'label',
      title: 'Label',
      type: 'string',
    },
    {
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      options: {
        list: [
          { title: 'Users', value: 'Users' },
          { title: 'Target', value: 'Target' },
          { title: 'HandHeart', value: 'HandHeart' },
        ],
      },
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
    },
  ],
};
