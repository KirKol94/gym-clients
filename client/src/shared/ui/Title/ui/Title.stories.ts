import { Meta, StoryObj } from "@storybook/react";

import { TitleSize } from "../model/types/title.ts";

import { Title } from "./Title.tsx";


const meta = {
    title: "Shared/Title",
    component: Title,
    parameters: {
        layout: 'centered'
    },
    argTypes: {
    }
} satisfies Meta<typeof Title>

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        size: TitleSize.XL,
        children: 'Title'
    }
}
export const BigSize: Story = {
    args: {
        size: TitleSize.XXL,
        children: 'Title'
    }
}