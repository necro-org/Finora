export const DateReferenceEnum = {
  EntryDate: "EntryDate",
  TransactionDate: "TransactionDate",
} as const;

export type DateReferenceEnum =
  (typeof DateReferenceEnum)[keyof typeof DateReferenceEnum];

export const DateReferenceLabel = {
  EntryDate: "Lançamento",
  TransactionDate: "Transação",
};
