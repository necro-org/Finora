import { useRef, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useImportCsv } from "@pages/Lancamentos/mutations/useImportCsv";
import { fireError } from "@libs/alert";
import DatePicker from "./DatePicker";
import AutoCompleteAccount from "./AutoComplete/AutoCompleteAccount";
import { Close } from "@mui/icons-material";
import { formatDate, formatToDayjs } from "@utils";

export default function UploadCsvButton() {
  const { mutateAsync, isPending } = useImportCsv();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dateFinancialEntry, setDateFinancialEntry] = useState<string | null>(
    null,
  );
  const [accountId, setAccountId] = useState<string | null>(null);

  function handleSelectFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.type !== "text/csv") {
      fireError(new Error("Por favor selecione um arquivo CSV"));
      return;
    }

    setSelectedFile(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function handleSubmit() {
    if (!selectedFile) {
      fireError(new Error("Selecione um arquivo CSV"));
      return;
    }

    if (!dateFinancialEntry) {
      fireError(new Error("Informe a Data do lançamento"));
      return;
    }

    await mutateAsync({
      dateFinancialEntry,
      timezoneOffsetMinutes: 1,
      file: selectedFile,
      accountId,
    });

    setSelectedFile(null);
    setDateFinancialEntry("");
    setAccountId("");
    setOpen(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  return (
    <div>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Importar CSV
      </Button>

      <Dialog open={open} onClose={() => !isPending && setOpen(false)}>
        <DialogTitle>Importar arquivo CSV</DialogTitle>

        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1, minWidth: 400 }}>
            <DatePicker
              name="dateFinancialEntry"
              label="Data do lançamento"
              required
              onChange={(newValue) =>
                setDateFinancialEntry(formatDate(newValue))
              }
              value={formatToDayjs(dateFinancialEntry)}
              disabled={isPending}
            />

            <AutoCompleteAccount
              name="accountId"
              onChange={(val) => setAccountId(val || null)}
              value={accountId ?? undefined}
            />

            <input
              ref={fileInputRef}
              accept=".csv"
              style={{ display: "none" }}
              id="upload-csv-file"
              type="file"
              onChange={handleSelectFile}
              disabled={isPending}
            />

            <label htmlFor="upload-csv-file">
              <Button
                variant={selectedFile ? "contained" : "outlined"}
                component="span"
                fullWidth
                disabled={isPending}
              >
                Selecionar CSV
              </Button>
            </label>

            {selectedFile && (
              <Typography
                variant="body2"
                sx={(theme) => ({
                  border: "solid 1px",
                  borderColor: theme.palette.primary.light,
                  borderRadius: 1,
                  padding: 0.5,
                  gap: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                })}
              >
                <span>Arquivo selecionado: {selectedFile.name}</span>
                <IconButton
                  size="small"
                  onClick={() => setSelectedFile(null)}
                  disabled={isPending}
                >
                  <Close />
                </IconButton>
              </Typography>
            )}
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            disabled={isPending}
            variant="outlined"
          >
            Cancelar
          </Button>

          <Button
            variant="contained"
            onClick={handleSubmit}
            loading={isPending}
          >
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
