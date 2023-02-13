export const currencyFormat = (value?: number): string | number | undefined => {
	if (!value) {
		return;
	}
	const formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 0,
	});

	return formatter.format(value) ?? value;
};
