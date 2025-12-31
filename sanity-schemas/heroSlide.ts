export default {
  name: 'heroSlide',
  title: 'Hero Slide',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'highlight',
      title: 'Highlight Text',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'badge',
      title: 'Badge Text',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Background Image',
      type: 'image',
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
    },
  ],
};
