import type { Meta, Story } from '@storybook/react'

import type { ErrorPageProps } from './ErrorPage'
import { ErrorPage } from './ErrorPage'

export default {
  title: 'pages/ErrorPage',
  component: ErrorPage,
  args: {},
} as Meta

const Template: Story<ErrorPageProps> = (args) => <ErrorPage {...args} />
export const Default = Template.bind({})
