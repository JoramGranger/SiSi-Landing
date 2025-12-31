export default {
  name: 'contactInfo',
  title: 'Contact Info',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'info',
      title: 'Information',
      type: 'string',
    },
    {
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      options: {
        list: [
          { title: 'Mail', value: 'Mail' },
          { title: 'Phone', value: 'Phone' },
          { title: 'MapPin', value: 'MapPin' },
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
