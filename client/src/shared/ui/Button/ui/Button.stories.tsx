import { ButtonSize, ButtonTheme } from '..'

import type { ButtonProps } from './Button'
import { Button } from './Button'

export default {
  title: 'shared/ui/Button',
  component: Button,
  args: {
    size: {
      type: 'radio',
      options: [ButtonSize.XS, ButtonSize.S, ButtonSize.M],
    },
    theme: {
      type: 'radio',
      options: [ButtonTheme.PRIMARY, ButtonTheme.SECONDARY, ButtonTheme.SECONDARY_BLUE, ButtonTheme.SECONDARY_WHITE],
    },
    children: 'Button',
  },
}

const Template: Story<ButtonProps> = (args) => <Button {...args} />
export const Base = Template.bind({
  size: ButtonSize.XS,
  theme: ButtonTheme.PRIMARY,
})
