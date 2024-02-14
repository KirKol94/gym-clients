import type { Story } from '@storybook/react'

import { CounterColor, CounterSize } from '../model/types/counter'

import type { CounterProps } from './Counter'
import { Counter } from './Counter'

export default {
  title: 'shared/ui/Counter',
  component: Counter,
  args: {
    size: {
      type: 'radio',
      options: [CounterSize.S, CounterSize.M],
    },
  },
}

const Template: Story<CounterProps> = (args) => <Counter {...args} />

export const Yellow = Template.bind({})
Yellow.args = {
  count: 20,
  size: CounterSize.S,
  color: CounterColor.YELLOW,
}

const TemplateWithBg: Story<CounterProps> = (args) => (
  <div
    style={{
      backgroundColor: 'gray',
      display: 'flex',
      height: '100%',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Counter {...args} />
  </div>
)

export const White = TemplateWithBg.bind({})
White.args = {
  count: 20,
  size: CounterSize.S,
  color: CounterColor.WHITE,
}
