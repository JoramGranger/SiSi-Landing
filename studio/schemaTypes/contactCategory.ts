export default {
  name: 'contactCategory',
  title: 'Contact Form Category',
  type: 'document',
  fields: [
    {
      name: 'value',
      title: 'Value',
      type: 'string',
      description: 'Internal value for the category',
    },
    {
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Display label for the category',
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
    },
  ],
};
