<script lang="ts">
	import type { ClassValue, HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import type { WithChildren } from '$lib/types';
	export type Size = 'small' | 'medium' | 'large';
	type SharedProps = WithChildren<{
		class?: ClassValue;
		size?: Size;
		color?: 'red' | 'green';
	}>;

	type ButtonProps = SharedProps &
		HTMLButtonAttributes & {
			asLink?: false;
			href?: null;
		};

	type LinkProps = SharedProps &
		HTMLAnchorAttributes & {
			asLink: true;
			href: string;
		};

	export type StandardButtonProps = ButtonProps | LinkProps;

	const sizes: Record<Size, string> = {
		small: 'scale-80',
		medium: 'scale-100',
		large: 'scale-125'
	};
	const colors: Record<'red' | 'green', string> = {
		red: 'bg-(--contrast-bg-red) hover:bg-(--color-red-dark) active:bg-(--color-red-dark)',
		green: 'bg-(--color-green-light) hover:bg-(--color-green-dark) active:bg-(--color-green-dark)'
	};

	const {
		children,
		class: clas,
		size = 'medium',
		color = 'red',
		asLink,
		...props
	}: StandardButtonProps = $props();

	const useA = $derived(asLink || ('href' in props && !!props?.href));
	const anchorProps = props as HTMLAnchorAttributes;
	const buttonProps = props as HTMLButtonAttributes;
	$effect(() => {
		if (!asLink && 'href' in props && props?.href) {
			console.warn(
				"Don't use the StandardButton with the 'href' attribute without setting asLink to true"
			);
		}
	});

	const classes = $derived([
		`px-4 py-2 text-(--color-text-light) rounded-lg text-nowrap
	    transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 w-fit`,
		colors[color],
		sizes[size],
		clas
	]);
</script>

{#if useA}
	<a {...anchorProps} class="w-fit">
		<div class={classes}>
			{@render children?.()}
		</div>
	</a>
{:else}
	<button class={classes} {...buttonProps}>
		{@render children?.()}
	</button>
{/if}
