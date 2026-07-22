interface AuthFormAlertProps {
  message: string;
}

export function AuthFormAlert({ message }: AuthFormAlertProps) {
  return (
    <div
      role="alert"
      className="rounded-md border border-red-500/30 bg-red-950/30 px-3 py-2 text-sm text-red-400"
    >
      {message}
    </div>
  );
}
