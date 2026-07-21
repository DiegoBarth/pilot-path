"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  type BreadcrumbItem,
  useBreadcrumbItems,
} from "@/components/shared/breadcrumb";
import { STATIC_ROUTE_BREADCRUMBS } from "@/lib/breadcrumb-trails";

function BreadcrumbSeparator() {
  return (
    <ChevronRight
      className="h-3.5 w-3.5 shrink-0 text-slate-600"
      aria-hidden
    />
  );
}

export function TopBar() {
  const pathname = usePathname();
  const customItems = useBreadcrumbItems();
  const trail = customItems ?? STATIC_ROUTE_BREADCRUMBS[pathname] ?? [];

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-1.5 px-6 pt-5 text-sm text-slate-500 md:px-8"
    >
      <Link
        href="/dashboard"
        className="font-medium text-slate-300 transition hover:text-amber-400"
      >
        PilotPath
      </Link>

      {trail.map((item, index) => {
        const isLast = index === trail.length - 1;
        const isLink = Boolean(item.href) && !isLast;

        return (
          <span key={`${item.label}-${index}`} className="flex items-center gap-1.5">
            <BreadcrumbSeparator />

            {isLink ? (
              <Link
                href={item.href!}
                className="transition hover:text-amber-400 font-medium text-slate-300"
              >
                {item.label}
              </Link>
            ) : (
              <span
                aria-current={isLast ? "page" : undefined}
              >
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
