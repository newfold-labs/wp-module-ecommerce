import { TAILWINDCSS_PRESET } from '@newfold/ui-component-library';

module.exports = {
	presets: [ TAILWINDCSS_PRESET ],
	content: [
		...TAILWINDCSS_PRESET.content,
		'./src/**/*.js',
	],
	theme: {
		extend: {
			colors: {
				primary: {
					50:  "#EAF2FB",
					100: "#D4E0F6",
					200: "#ABC3F0",
					300: "#82A7EA",
					400: "#5A8BE3",
					500: "#196BDE",
					600: "#175FC6",
					700: "#1B53A6",
					800: "#1B4A91",
					900: "#1A4884",
				},
				secondary: {
					DEFAULT: '#FCD34D',
					dark: '#E9B404',
					light: '#FEF6D9',
					lighter: '#FEF6D9',
				},
				title: '#0F172A',
				body: '#4A5567',
				link: '#2271B1',
				line: '#E2E8F0',
				white: '#FFFFFF',
				offWhite: '#F0F0F5',
				black: '#000000',
				canvas: '#F1F5F9',
			},
		},
	},
};
