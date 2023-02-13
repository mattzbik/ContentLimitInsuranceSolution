import {
	Alert,
	Container,
	Grid,
	Paper,
	ThemeProvider,
	Typography,
} from "@mui/material";
import React from "react";
import { AddItemForm } from "./components/AddItemForm";
import { SubCategory } from "./components/SubCategory";
import { useGetItems } from "./hooks/useGetItems";
import theme from "./theme";
import { currencyFormat } from "./utils/currencyFormat";

const App: React.FC = () => {
	const { data, loading, error } = useGetItems();

	return (
		<ThemeProvider theme={theme}>
			{loading && <div>Loading...</div>}
			{error && <Alert severity="error">{error.message}</Alert>}
			{data && (
				<Container>
					<Paper elevation={3} sx={{ background: "lightblue", m: 2 }}>
						<Grid container spacing={3} p={4}>
							<Grid item xs={12} textAlign="center">
								<Typography variant="h1">Content Limit Insurance</Typography>
							</Grid>
							<Grid item xs={12}>
								<SubCategory category={"Electronics"} data={data} />
								<SubCategory category={"Clothing"} data={data} />
								<SubCategory category={"Kitchen"} data={data} />
							</Grid>
							<Grid item xs={6}>
								<Typography variant="h5" variantMapping={{ h6: "h2" }}>
									Total
								</Typography>
							</Grid>
							<Grid item xs={6}>
								<Typography variant="h5" variantMapping={{ h6: "h2" }}>
									{currencyFormat(data.totalValue)}
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<AddItemForm addItem={data.addItem} />
							</Grid>
						</Grid>
					</Paper>
				</Container>
			)}
		</ThemeProvider>
	);
};

export default App;
