export const DateReferenceEnum = {
  EntryDate: "EntryDate",
  PaymentDate: "PaymentDate",
} as const;

export type DateReferenceEnum =
  (typeof DateReferenceEnum)[keyof typeof DateReferenceEnum];

export const DateReferenceLabel = {
  EntryDate: "Lançamento",
  PaymentDate: "Pagamento",
};
