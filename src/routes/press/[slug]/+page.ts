export async function load({ params }) {
	const { slug } = params;
	/* const res = await fetch(`https://api.example.com/press/${slug}`);
    if (!res.ok) {
        return {
            status: res.status,
            error: new Error(`Could not load press release: ${res.statusText}`)
        };
    }
    const pressRelease = await res.json(); */
	const pressRelease = await import(`../${slug}.json`);
	const { date, title, content } = pressRelease;
	return {
		title,
		content,
		date
	};
}
