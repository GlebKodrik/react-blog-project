import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { THEMES } from 'constants/themes';
import { Navbar } from './navbar';

import { ThemeDecorator } from '../../../../../configs-project/storybook/decorators/theme-decorator';

export default {
  title: 'widgets/Navbar',
  component: Navbar,
} as ComponentMeta<typeof Navbar>;

const Template: ComponentStory<typeof Navbar> = (args) => <Navbar {...args} />;

export const NavbarWithThemeDark = Template.bind({});
NavbarWithThemeDark.args = {};
NavbarWithThemeDark.decorators = [ThemeDecorator(THEMES.DARK)];

export const NavbarWithThemeLight = Template.bind({});
NavbarWithThemeLight.args = {};
