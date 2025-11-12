import type { Config } from "tailwindcss";

export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],

	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				primText: "var(--primText)",

				card: "var(--card)",
				cardHover: "var(--cardHover)",
			},
		},
	},
} satisfies Config;
