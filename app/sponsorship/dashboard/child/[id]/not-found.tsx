import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold tracking-tight text-foreground">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-semibold">Child record not found!</h2>

        <p className="mt-3 max-w-md text-muted-foreground">
          We couldn’t find the child profile you’re looking for. It may have
          been removed or the link might be incorrect.
        </p>

        <Link
          href="/dashboard"
          className="mt-8 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
