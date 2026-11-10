import { useState } from "react";
import { Button, Checkbox, FormControlLabel, Grid } from "@mui/material";

import CurrencyTextField from "@components/CurrencyTextField";
import AutoCompleteTipo from "@components/AutoComplete/AutoCompleteTipo";
import AutoCompleteClassificacao from "@components/AutoComplete/AutoCompleteClassificacao";
import DatePicker from "@components/DatePicker";
import TextField from "@components/TextField";

import { formatDate, formatToDayjs } from "@utils";
import { ClassificationEnum } from "../data/dtos/ClassificationEnum";
import {
  getDefaultFilters,
  useLancamentosFilterStore,
  type LancamentosFilterData,
} from "@stores/lancamentosFilterStore";
import AutoCompleteAccount from "@components/AutoComplete/AutoCompleteAccount";

export default function FormFilter() {
  const { filters, setFilters, clearFilter } = useLancamentosFilterStore();

  const [draft, setDraft] = useState<LancamentosFilterData>(filters);

  function patch(value: Partial<LancamentosFilterData>) {
    setDraft((prev) => ({ ...prev, ...value }));
  }

  function handleSearch() {
    setFilters(draft);
  }

  function handleClear() {
    const defaults = getDefaultFilters();
    setDraft(defaults);
    clearFilter();
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
    >
      <Grid container spacing={1.5}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <DatePicker
            label="Data inicial"
            name="initialDate"
            onChange={(newValue) =>
              patch({
                initialDate: formatDate(newValue?.isValid() ? newValue : null),
              })
            }
            value={formatToDayjs(draft.initialDate)}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <DatePicker
            label="Data final"
            name="finalDate"
            onChange={(newValue) =>
              patch({ finalDate: formatDate(newValue || null) })
            }
            value={formatToDayjs(draft.finalDate)}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <CurrencyTextField
            label="Valor inicial"
            name="initialAmount"
            onValueChange={({ floatValue }) =>
              patch({ initialAmount: floatValue || null })
            }
            value={draft.initialAmount}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <CurrencyTextField
            label="Valor final"
            name="finalAmount"
            onValueChange={({ floatValue }) =>
              patch({ finalAmount: floatValue || null })
            }
            value={draft.finalAmount}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <AutoCompleteTipo
            name="typeId"
            onChange={(d) => patch({ typeId: d || null })}
            value={draft.typeId || undefined}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <AutoCompleteClassificacao
            name="classification"
            onChange={(d) =>
              patch({ classification: (d as ClassificationEnum) || null })
            }
            value={draft.classification || undefined}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <AutoCompleteAccount
            name="accountId"
            onChange={(d) => patch({ accountId: d || null })}
            value={draft.accountId || undefined}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 8, lg: 10 }}>
          <TextField
            label="Buscar"
            name="searchText"
            onChange={(e) => patch({ searchText: e.target.value || null })}
            value={draft.searchText || ""}
            fullWidth
          />
        </Grid>
        <Grid
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          size={{ xs: 12, sm: 4, lg: 2 }}
        >
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={draft.isNotConfirmed === true}
                indeterminate={draft.isNotConfirmed === null}
                onChange={() => {
                  let nextValue: boolean | null;
                  if (draft.isNotConfirmed === null) nextValue = true;
                  else if (draft.isNotConfirmed === true) nextValue = false;
                  else nextValue = null;
                  patch({ isNotConfirmed: nextValue });
                }}
              />
            }
            label="Não confirmados"
          />
        </Grid>
        <Grid
          size={{ xs: 12 }}
          sx={{ display: "flex", justifyContent: "end", gap: 1 }}
        >
          <Button variant="outlined" onClick={handleClear}>
            Limpar
          </Button>
          <Button type="submit">Buscar</Button>
        </Grid>
      </Grid>
    </form>
  );
}
