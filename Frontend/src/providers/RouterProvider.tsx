import {
  createBrowserRouter,
  RouterProvider as RouterProviderLib,
} from "react-router";

import MainLayout from "@layouts/main-layout";
import PublicLayout from "@layouts/public-layout";

import Dashboard from "@pages/Dashboard";
import Lancamentos from "@pages/Lancamentos";
import { lancamentosLoader } from "@pages/Lancamentos/loader";
import LancamentosForm from "@pages/Lancamentos/form";
import Tipos from "@pages/Tipos";
import TiposForm from "@pages/Tipos/form";
import Contas from "@pages/Contas";
import ContasForm from "@pages/Contas/form";
import RecurringEntries from "@pages/RecurringEntries";
import RecurringEntriesForm from "@pages/RecurringEntries/form";
import Login from "@pages/Login";
import Register from "@pages/Register";

const router = createBrowserRouter([
  {
    Component: PublicLayout,
    children: [
      {
        path: "/",
        Component: Login,
      },
      {
        path: "/registrar",
        Component: Register,
      },
    ],
  },
  {
    Component: MainLayout,
    children: [
      {
        path: "/painel",
        Component: Dashboard,
      },
      {
        path: "/lancamentos",
        Component: Lancamentos,
        loader: lancamentosLoader,
      },
      {
        path: "/lancamentos/novo",
        Component: LancamentosForm,
      },
      {
        path: "/lancamentos/:typeId",
        Component: LancamentosForm,
      },
      {
        path: "/tipos",
        Component: Tipos,
      },
      {
        path: "/tipos/novo",
        Component: TiposForm,
      },
      {
        path: "/tipos/:typeId",
        Component: TiposForm,
      },
      {
        path: "/contas",
        Component: Contas,
      },
      {
        path: "/contas/novo",
        Component: ContasForm,
      },
      {
        path: "/contas/:accountId",
        Component: ContasForm,
      },
      {
        path: "/lancamentos-recorrentes",
        Component: RecurringEntries,
      },
      {
        path: "/lancamentos-recorrentes/novo",
        Component: RecurringEntriesForm,
      },
      {
        path: "/lancamentos-recorrentes/:recurringEntryId",
        Component: RecurringEntriesForm,
      },
      {
        path: "*",
        Component: () => <>Página em construção - Página não encontrada</>,
      },
    ],
  },
]);

export default function RouterProvider() {
  return <RouterProviderLib router={router} />;
}
