import Twig<%= component %> from './<%= tag %>.twig';
import <%= component %> Docs from '!!raw-loader!./<%= tag %>.docs.mdx';
<% if(includeJs){ %>
import './<%= tag %>.js';
<% } %>
export default {
  title: '<%= category %>/<%= label %>',
  parameters: {
    componentSubtitle: '',
    docs: {
      description: {
        component: <%= component %>Docs,
      },
    },
  },
  argTypes: {},
  args: {},
};

const Template = ({}) => Twig<%= component %>({});

export const Default = Template.bind({});
