import { redirect, type LoaderFunctionArgs } from "react-router";

import { paths } from "@libs/paths";
import { getDefaultFilters } from "@stores/lancamentosFilterStore";

export function lancamentosLoader({ request }: LoaderFunctionArgs) {
  if (new URL(request.url).search) return null;

  return redirect(paths.lancamentos(getDefaultFilters()));
}
