import { Delete } from "@mui/icons-material";
import { Grid, IconButton, Typography } from "@mui/material";
import { ItemData } from "src/hooks/useGetItems";
import { currencyFormat } from "src/utils/currencyFormat";

export const Item: React.FC<
	ItemData & { deleteItem: (id: number) => Promise<void> }
> = ({ name, value, id, deleteItem }) => (
	<Grid container item xs={12} ml={4}>
		<Grid item xs={6}>
			<Typography variant="h6">{name}</Typography>
		</Grid>
		<Grid alignItems="center" container item xs={6}>
			<Typography variant="h6" ml={2}>
				{currencyFormat(value)}
			</Typography>
			<IconButton onClick={() => deleteItem(id)}>
				<Delete />
			</IconButton>
		</Grid>
	</Grid>
);
