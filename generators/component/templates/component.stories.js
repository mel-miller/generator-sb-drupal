import Twig<%= component %> from './<%= tag %><%= local %>.twig'; <% if(includeSrc){ %>
import <%= component %>Source from '!!raw-loader!./<%= tag %>.twig'
<% } _%>
import <%= component %>Docs from '!!raw-loader!./<%= tag %>.docs.mdx';
<% if(includeJs){ %>
import './<%= tag %>.behaviors.js';
<% } %>
export default {
  title: '<%= category %>/<%= label %>',
  parameters: {
    componentSubtitle: '', <% if(includeSrc) { %>
    componentSource: {
			code: <%= component %>Source,
			language: 'twig',
		},
    <% } _%>
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

export const <%= component %> = Template.bind({});
