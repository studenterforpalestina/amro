<script lang="ts">
	import type { ClassValue, HTMLInputAttributes, HTMLSelectAttributes } from 'svelte/elements';

	type Option = {
		value: string;
		label: string;
	};

	type BaseProps = {
		id: string;
		name: string;
		label: string;
		error?: string;
		fullWidth?: boolean;
		class?: ClassValue;
	};

	type InputProps = BaseProps &
		HTMLInputAttributes & {
			type?: 'text' | 'email' | 'tel' | 'number';
			options?: never;
		};

	type SelectProps = BaseProps &
		HTMLSelectAttributes & {
			type: 'select';
			options: Option[];
		};

	export type FormFieldProps = InputProps | SelectProps;

	let {
		id,
		name,
		label,
		error,
		fullWidth = false,
		type = 'text',
		options,
		class: clas,
		...props
	}: FormFieldProps = $props();

	const baseClass =
		'w-full rounded-xl border border-gray-400 bg-transparent p-2.5 placeholder-gray-400 transition-all outline-none focus:border-(--contrast-text-green) focus:ring-2 focus:ring-(--contrast-text-green)';
	const errorClass =
		'border-(--contrast-text-red) focus:border-(--contrast-text-red) focus:ring-(--contrast-text-red)';
	const classes = $derived([baseClass, error ? errorClass : '', clas]);
	const widthClass = $derived(fullWidth ? 'md:col-span-2' : '');
	const inputProps = props as HTMLInputAttributes;
	const selectProps = props as HTMLSelectAttributes;
</script>

<div class={`col-span-1 min-w-0 space-y-2 ${widthClass}`}>
	<label for={id} class="font-medium">{label}</label>
	{#if type === 'select'}
		<select
			{id}
			{name}
			class={classes}
			aria-invalid={error ? 'true' : undefined}
			aria-describedby={error ? `${id}-error` : undefined}
			{...selectProps}
		>
			{#each options as option (option.value)}
				<option value={option.value}>{option.label}</option>
			{/each}
		</select>
	{:else}
		{@const inputValue = 'value' in props ? props.value : undefined}
		<input
			{id}
			{name}
			{type}
			class={classes}
			value={inputValue}
			aria-invalid={error ? 'true' : undefined}
			aria-describedby={error ? `${id}-error` : undefined}
			{...inputProps}
		/>
	{/if}
	{#if error}
		<p id={`${id}-error`} class="text-sm text-(--contrast-text-red)">{error}</p>
	{/if}
</div>
