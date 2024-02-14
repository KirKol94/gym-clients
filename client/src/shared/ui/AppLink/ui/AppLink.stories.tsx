import type { Meta, Story } from '@storybook/react'

import { AppLinkSize } from '../model/types/appLink'

import type { AppLinkProps } from './AppLink'
import { AppLink } from './AppLink'

export default {
  title: 'shared/ui/AppLink',
  component: AppLink,
  args: {
    to: '/',
    size: [AppLinkSize.S, AppLinkSize.M],
    children: 'AppLink',
  },
} as Meta

const Template: Story<AppLinkProps> = (args) => <AppLink {...args} />

export const Default = Template.bind({
  size: AppLinkSize.S,
})
