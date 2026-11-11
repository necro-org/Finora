export const ClassificationEnum = {
  Expense: "Expense",
  Revenue: "Revenue",
} as const;

export type ClassificationEnum =
  (typeof ClassificationEnum)[keyof typeof ClassificationEnum];

export const ClassificationLabel = {
  Expense: "Despesa",
  Revenue: "Receita",
};

export const ClassificationList = Object.values(ClassificationEnum).map(
  (value) => ({
    value,
    label: ClassificationLabel[value],
  }),
);
