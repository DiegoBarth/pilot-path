"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbContextValue {
  items: BreadcrumbItem[] | null;
  setItems: (items: BreadcrumbItem[] | null) => void;
}

const BreadcrumbContext = createContext<BreadcrumbContextValue | null>(null);

export function BreadcrumbProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<BreadcrumbItem[] | null>(null);

  const value = useMemo(
    () => ({ items, setItems }),
    [items],
  );

  return (
    <BreadcrumbContext.Provider value={value}>
      {children}
    </BreadcrumbContext.Provider>
  );
}

function useBreadcrumbContext() {
  const context = useContext(BreadcrumbContext);

  if (!context) {
    throw new Error("useBreadcrumbs must be used within BreadcrumbProvider");
  }

  return context;
}

/** Define os itens do breadcrumb da página atual (substitui o padrão da rota). */
export function useBreadcrumbs(items: BreadcrumbItem[] | null) {
  const { setItems } = useBreadcrumbContext();

  useEffect(() => {
    setItems(items);

    return () => setItems(null);
  }, [items, setItems]);
}

export function useBreadcrumbItems() {
  return useBreadcrumbContext().items;
}
