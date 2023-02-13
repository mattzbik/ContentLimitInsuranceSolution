import { LoadingButton } from "@mui/lab";
import { Box, Grid, MenuItem, Select } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { categories, ItemData } from "src/hooks/useGetItems";
import { InputField } from "./InputField";

interface AddItemFormValues {
	name: string;
	value: number;
	category: number;
}

export const AddItemForm: React.FC<{
	addItem: (item: Partial<ItemData>) => Promise<void>;
}> = ({ addItem }) => {
	const formReturnValues = useForm<AddItemFormValues>({
		defaultValues: { name: "", value: 1000, category: 0 },
	});

	const { formState, handleSubmit, setError, control, ...rest } =
		formReturnValues;
	const { isSubmitting } = formState;

	const onSubmit: SubmitHandler<AddItemFormValues> = async (data) => {
		await addItem({
			name: data.name,
			value: data.value,
			category: data.category,
		});
	};

	return (
		<Box component="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
			<Grid
				container
				spacing={2}
				alignItems="center"
				justifyContent="space-between"
			>
				<Grid item xs={3}>
					<InputField
						label="Item Name"
						name="name"
						placeholder="Item Name"
						formProps={{
							...rest,
							control,
							formState: { ...formState, isSubmitting },
							handleSubmit,
							setError,
						}}
					/>
				</Grid>
				<Grid item xs={3}>
					<InputField
						label="Value"
						name="value"
						placeholder="Item Value"
						type="number"
						formProps={{
							...rest,
							control,
							formState: { ...formState, isSubmitting },
							handleSubmit,
							setError,
						}}
					/>
				</Grid>
				<Grid item xs={3}>
					<Controller
						defaultValue={0}
						control={control}
						name="category"
						render={({ field }) => (
							<Select {...field} fullWidth>
								{Object.values(categories).map((value, i) => {
									if (!isNaN(Number(value))) {
										return null;
									}
									return (
										<MenuItem key={i} value={i}>
											{value}
										</MenuItem>
									);
								})}
							</Select>
						)}
					/>
				</Grid>
				<Grid item xs={3}>
					<LoadingButton
						loading={isSubmitting}
						variant="contained"
						size="large"
						type="submit"
					>
						Add
					</LoadingButton>
				</Grid>
			</Grid>
		</Box>
	);
};
