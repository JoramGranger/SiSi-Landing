export default {
  name: 'mission',
  title: 'Mission',
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
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'Image to represent this mission',
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
    },
  ],
};
