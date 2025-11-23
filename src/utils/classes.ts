export const c = (...classes: (string | false | null | undefined)[]) => {
	return classes.filter(Boolean).join(" ");
};
