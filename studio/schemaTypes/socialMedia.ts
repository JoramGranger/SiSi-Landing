export default {
  name: 'socialMedia',
  title: 'Social Media Links',
  type: 'document',
  fields: [
    {
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          { title: 'Instagram', value: 'instagram' },
          { title: 'Facebook', value: 'facebook' },
          { title: 'Twitter', value: 'twitter' },
          { title: 'LinkedIn', value: 'linkedin' },
        ],
      },
    },
    {
      name: 'url',
      title: 'URL',
      type: 'url',
    },
    {
      name: 'enabled',
      title: 'Enabled',
      type: 'boolean',
      initialValue: true,
    },
  ],
};
