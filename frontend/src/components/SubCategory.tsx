import { Grid, Typography } from "@mui/material";
import { Categories, UseGetItemData } from "src/hooks/useGetItems";
import { currencyFormat } from "src/utils/currencyFormat";
import { Item } from "./Item";

interface SubCategoryProps {
	category: Categories;
	data: Pick<UseGetItemData, "categories" | "mappedCategories" | "deleteItem">;
}

export const SubCategory: React.FC<SubCategoryProps> = ({ category, data }) => (
	<Grid container item xs={12} spacing={1}>
		<Grid item xs={6}>
			<Typography variant="h5">{category}</Typography>
		</Grid>
		<Grid item xs={6}>
			<Typography variant="h5">
				{currencyFormat(data.mappedCategories.get(category)?.subTotalValue)}
			</Typography>
		</Grid>

		{!data.mappedCategories.get(category)?.items.length && (
			<Grid item xs={6} ml={4}>
				<Typography>No items insured under {`${category}`} category</Typography>
			</Grid>
		)}

		{data.mappedCategories.get(category)?.items.map((i) => (
			<Item {...i} deleteItem={data.deleteItem} key={i.id} />
		))}
	</Grid>
);
