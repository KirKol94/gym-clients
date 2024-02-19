import type { Meta, StoryFn } from '@storybook/react'

import { appLinkSize } from '../model/types/appLink'

import type { AppLinkProps } from './AppLink'
import { AppLink } from './AppLink'

export default {
  title: 'shared/ui/AppLink',
  component: AppLink,
  args: {
    to: '/',
    size: [appLinkSize.small, appLinkSize.medium],
    children: 'AppLink',
  },
} as Meta

const Template: StoryFn<AppLinkProps> = (args) => <AppLink {...args} />

export const Default = Template.bind({
  size: appLinkSize.small,
})
