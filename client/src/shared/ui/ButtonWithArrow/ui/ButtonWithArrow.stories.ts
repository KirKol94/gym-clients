import { Meta, StoryObj } from "@storybook/react";
import { ButtonWithArrow } from "..";



const meta = {
    title: "Shared/ButtonWithArrow",
    component: ButtonWithArrow,
    parameters: {
        layout: 'centered'
    },
    argTypes: {
    }
} satisfies Meta<typeof ButtonWithArrow>

export default meta;
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {
        direction: undefined
    }
}