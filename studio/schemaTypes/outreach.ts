export default {
  name: 'outreach',
  title: 'Outreach',
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
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Education', value: 'Education' },
          { title: 'Health', value: 'Health' },
          { title: 'Community', value: 'Community' },
          { title: 'Environment', value: 'Environment' },
        ],
      },
    },
    {
      name: 'impact',
      title: 'Impact',
      type: 'string',
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image' }],
      validation: (Rule: any) => Rule.min(1).max(10),
    },
  ],
};
