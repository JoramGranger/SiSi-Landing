export default {
  name: 'coreValue',
  title: 'Core Value',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      options: {
        list: [
          { title: 'Users', value: 'Users' },
          { title: 'HandHeart', value: 'HandHeart' },
          { title: 'Target', value: 'Target' },
          { title: 'Heart', value: 'Heart' },
        ],
      },
    },
    {
      name: 'color',
      title: 'Color',
      type: 'string',
      options: {
        list: [
          { title: 'Emerald', value: 'emerald' },
          { title: 'Gold', value: 'gold' },
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
