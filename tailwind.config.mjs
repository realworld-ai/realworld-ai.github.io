/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter', 'Noto Sans JP', 'sans-serif'],
				heading: ['Space Grotesk', 'Noto Sans JP', 'sans-serif'],
			},
			colors: {
				'lab-bg': '#0f172a',    // Dark Slate
				'lab-card': '#1e293b',  // Lighter Slate
				'lab-text': '#f8fafc',  // Off-white
				'lab-accent': '#3b82f6', // Electric Blue
				'lab-secondary': '#8b5cf6', // Purple
			},
		},
	},
	plugins: [],
}