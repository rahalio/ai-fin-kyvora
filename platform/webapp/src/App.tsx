import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppShell } from '@/app/AppShell';
import { LoginPage } from '@/app/LoginPage';
import {
  AttributeRegistryPage,
  DirectoryOps,
  DisputesOps,
  EvidencePacks,
  IdpHome,
  IssueRefusePage,
  RefreshPage,
  RpConsole,
  ScreeningPage,
  SettlementOps,
  SubjectPortal,
} from '@/app/pages';
import { loadState, saveState, type DemoState, type Role } from '@/lib/demo-store';

const queryClient = new QueryClient();

function AppRoutes() {
  const [state, setState] = useState<DemoState>(() => loadState());
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const setRole = (role: Role) => {
    setState((s) => ({ ...s, role }));
    setAuthed(true);
  };

  const update = (next: DemoState) => setState(next);

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <LoginPage
            role={state.role}
            onSelect={(role) => {
              setRole(role);
            }}
          />
        }
      />
      <Route
        path="/"
        element={
          authed ? (
            <AppShell
              role={state.role}
              onLogout={() => setAuthed(false)}
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      >
        <Route index element={<Navigate to="/idp" replace />} />
        <Route path="idp" element={<IdpHome state={state} />} />
        <Route
          path="idp/attributes"
          element={<AttributeRegistryPage state={state} />}
        />
        <Route
          path="idp/issue"
          element={<IssueRefusePage state={state} onChange={update} />}
        />
        <Route path="idp/refresh" element={<RefreshPage />} />
        <Route
          path="idp/screening"
          element={<ScreeningPage state={state} onChange={update} />}
        />
        <Route
          path="rp"
          element={<RpConsole state={state} onChange={update} />}
        />
        <Route
          path="subject"
          element={<SubjectPortal state={state} onChange={update} />}
        />
        <Route
          path="ops"
          element={<DirectoryOps state={state} onChange={update} />}
        />
        <Route path="ops/settlement" element={<SettlementOps />} />
        <Route
          path="ops/disputes"
          element={<DisputesOps state={state} onChange={update} />}
        />
        <Route
          path="compliance"
          element={<EvidencePacks state={state} onChange={update} />}
        />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
