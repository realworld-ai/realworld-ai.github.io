/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter', 'Noto Sans JP', 'system-ui', 'sans-serif'],
				heading: ['Inter', 'Noto Sans JP', 'sans-serif'], // Unify fonts for cleaner look
			},
			colors: {
				'lab-bg': '#0B1120',    // Deep Navy (Darker/Richer than Slate-950)
				'lab-card': '#162032',  // Slightly Lighter Navy
				'lab-text': '#F1F5F9',  // Slate-100 (Crisp White text)
				'lab-subtext': '#94A3B8', // Slate-400 (Muted text)
				'lab-accent': '#0EA5E9', // Sky-500 (Vibrant Tech Blue)
				'lab-accent-hover': '#38BDF8', // Sky-400 (Lighter hover state)
				'lab-secondary': '#6366F1', // Indigo-500 (Subtle secondary)
			},
		},
	},
	plugins: [],
}