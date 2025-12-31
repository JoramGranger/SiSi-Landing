export default {
  name: 'contactSubmission',
  title: 'Contact Submission',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
    },
    {
      name: 'message',
      title: 'Message',
      type: 'text',
    },
    {
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Read', value: 'read' },
          { title: 'Replied', value: 'replied' },
          { title: 'Archived', value: 'archived' },
        ],
      },
      initialValue: 'new',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
      category: 'category',
    },
    prepare(selection: any) {
      const { title, subtitle, category } = selection;
      return {
        title: `${title} - ${category}`,
        subtitle: subtitle,
      };
    },
  },
};
