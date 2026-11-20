import { Autocomplete, Box, CircularProgress, TextField } from "@mui/material";
import { useEffect } from "react";
import { Controller, useFormContext, type FieldError } from "react-hook-form";

import ColorDot from "@components/ColorDot";

interface AutoCompleteProps<TData> {
  label: string;
  name: string;
  options: TData[];
  renderOptions: (d: TData) => string;
  getOptionColor?: (d: TData) => string | null | undefined;
  onRefetch?: () => void;
  isLoading?: boolean;
  idField: keyof TData extends string ? keyof TData : never;
  required?: boolean;
  onChange?: (d: string | null) => void;
  value?: string;
  error?: FieldError;
}

function AutoCompleteDefault<TData>({
  label,
  name,
  options,
  renderOptions,
  getOptionColor,
  onRefetch,
  isLoading,
  idField,
  required,
  onChange,
  value,
  error,
}: AutoCompleteProps<TData>) {
  const selectedOption = options.find((d) => d[idField] === value) || null;
  useEffect(() => {
    if (value && options.length <= 0 && onRefetch) {
      onRefetch();
    }
  }, [value, onRefetch, options]);

  return (
    <Autocomplete
      id="auto-complete"
      onChange={(_, obj) =>
        onChange && onChange(obj ? (obj[idField] as string) : null)
      }
      value={selectedOption}
      getOptionLabel={renderOptions}
      renderOption={
        getOptionColor &&
        (({ key, ...optionProps }, option) => (
          <Box
            component="li"
            key={key}
            {...optionProps}
            sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
          >
            <ColorDot color={getOptionColor(option)} />
            {renderOptions(option)}
          </Box>
        ))
      }
      getOptionKey={(d) => d[idField] as string}
      options={options}
      loading={isLoading}
      openText="Abrir"
      clearText="Limpar"
      closeText="Fechar"
      loadingText="Carregando..."
      noOptionsText="Sem opções"
      onOpen={() => options.length <= 0 && onRefetch && onRefetch()}
      renderInput={(params) => (
        <TextField
          {...params}
          name={name}
          helperText={error ? error.message : null}
          error={!!error}
          label={label}
          required={required}
          slotProps={{
            input: {
              ...params.InputProps,
              startAdornment:
                getOptionColor && selectedOption ? (
                  <ColorDot
                    color={getOptionColor(selectedOption)}
                    sx={{ ml: 0.5 }}
                  />
                ) : (
                  params.InputProps.startAdornment
                ),
              endAdornment: (
                <>
                  {isLoading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            },
          }}
        />
      )}
    />
  );
}

export default function AutoComplete<TData>({
  name,
  ...rest
}: AutoCompleteProps<TData>) {
  const form = useFormContext();

  if (!form) {
    return <AutoCompleteDefault {...rest} name={name} />;
  }

  return (
    <Controller
      name={name}
      render={({ field, fieldState }) => (
        <AutoCompleteDefault
          {...rest}
          name={name}
          onChange={field.onChange}
          value={field.value}
          error={fieldState.error}
        />
      )}
    />
  );
}
