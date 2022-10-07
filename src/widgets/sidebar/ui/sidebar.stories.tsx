import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Sidebar } from './sidebar';
import {
  ETheme,
} from '../../../app/provider/theme-provider/config/theme-context';
import { ThemeDecorator } from '../../../shared/config/decorators/theme-decorator';

export default {
  title: 'widgets/Sidebar',
  component: Sidebar,
} as ComponentMeta<typeof Sidebar>;

const Template: ComponentStory<typeof Sidebar> = (args) => <Sidebar {...args} />;

export const SidebarDark = Template.bind({});
SidebarDark.args = {};
SidebarDark.decorators = [ThemeDecorator(ETheme.DARK)];

export const SidebarLight = Template.bind({});
SidebarLight.args = {};