import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const pageContainerVariants = cva("px-6 md:px-8", {
  variants: {
    variant: {
      default: "pb-10 pt-3",
      review: "pb-10 pt-6",
      compact: "pb-8 pt-2",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface PageContainerProps extends VariantProps<typeof pageContainerVariants> {
  children: React.ReactNode;
  className?: string;
  constrained?: boolean;
}

export function PageContainer({
  children,
  variant,
  className,
  constrained = false,
}: PageContainerProps) {
  return (
    <div className={cn(pageContainerVariants({ variant }), className)}>
      {constrained ? (
        <div className="mx-auto max-w-7xl space-y-8">{children}</div>
      ) : (
        children
      )}
    </div>
  );
}
