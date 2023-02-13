import { TextField } from "@mui/material";
import { HTMLInputTypeAttribute } from "react";
import {
	Controller,
	FieldPath,
	FieldValues,
	UseControllerProps,
	UseFormReturn,
} from "react-hook-form";

interface InputFieldProps<T extends FieldValues> extends UseControllerProps {
	label?: string;
	placeholder?: string;
	name: FieldPath<T>;
	type?: HTMLInputTypeAttribute;
	formProps?: UseFormReturn<T[keyof T]>;
}

export const InputField: React.FC<InputFieldProps<FieldValues>> = ({
	label,
	name,
	placeholder,
	type,
	formProps,
}) => {
	return (
		<Controller
			control={formProps?.control}
			name={name}
			render={({ field, fieldState: { error } }) => (
				<TextField
					id={name}
					error={!!error}
					label={label}
					placeholder={placeholder}
					type={type}
					fullWidth
					{...field}
				/>
			)}
		/>
	);
};
