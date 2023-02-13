import { currencyFormat } from "./currencyFormat";

describe(currencyFormat, () => {
	it("returns undefined", () => {
		expect(currencyFormat()).toEqual(undefined);
	});

	it("returns $1", () => {
		expect(currencyFormat(1)).toEqual("$1");
	});

	it("returns $2,000", () => {
		expect(currencyFormat(2000)).toEqual("$2,000");
	});
});
