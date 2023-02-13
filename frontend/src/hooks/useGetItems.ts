import { useCallback, useEffect, useState } from "react";

export const categories = ["Electronics", "Clothing", "Kitchen"] as const;
export type Categories = typeof categories[number];

interface ApiResponse<T> {
	data?: T;
	loading: boolean;
	error?: Error;
}

export interface UseGetItemData {
	totalValue: number;
	mappedCategories: Map<Categories, MappedItems>;
	categories: string[];
	deleteItem: (id: number) => Promise<void>;
	addItem: (item: Partial<ItemData>) => Promise<void>;
}

interface MappedItems {
	items: ItemData[];
	subTotalValue: number;
}

export interface ItemData {
	id: number;
	name: string;
	value: number;
	category: number;
}

export const useGetItems = (): ApiResponse<UseGetItemData> => {
	const [data, setData] = useState<ApiResponse<UseGetItemData>>({
		loading: true,
	});
	const [tempData, setTempData] = useState<ItemData[]>();

	const fetchData = useCallback(async () => {
		await fetch("items")
			.then((r) => r.json())
			.then((d) => {
				setTempData(d);
				setData({ loading: false });
			})
			.catch((e) => setData({ loading: false, error: e }));
	}, []);

	const handleDelete = useCallback(
		async (id: number) => {
			await fetch(`items/${id}`, { method: "delete" })
				.then((response) => response.json())
				.catch((e) => console.error(e));
			await fetchData();
		},
		[fetchData]
	);

	const handleAddItem = useCallback(
		async (item: Partial<ItemData>) => {
			await fetch(`items`, {
				method: "post",
				body: JSON.stringify(item),
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			})
				.then((r) => r.json())
				.catch((e) => console.error(e));
			await fetchData();
		},
		[fetchData]
	);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	useEffect(() => {
		if (tempData && !data.loading) {
			setData({
				data: {
					addItem: handleAddItem,
					deleteItem: handleDelete,
					totalValue: tempData.reduce<number>((acc, curr) => acc + curr.value, 0),
					categories: tempData.reduce<string[]>(
						(acc, curr) => Array.from(new Set([...acc, categories[curr.category]])),
						[]
					),
					mappedCategories: tempData.reduce<UseGetItemData["mappedCategories"]>((acc, curr) => {
						const { category: c } = curr;
						const cat = acc.get(categories[c]);
						if (!cat) {
							acc.set(categories[c], {
								subTotalValue: curr.value,
								items: [curr],
							});
						} else {
							cat.items.push(curr);
							cat.subTotalValue += curr.value;
						}
						return acc;
					}, new Map()),
				},
				loading: false,
				error: undefined,
			});
		}
	}, [data.loading, fetchData, handleAddItem, handleDelete, tempData]);

	return data;
};
