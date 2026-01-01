import { Suspense } from "react";
import PaymentInformationClient from "./PaymentInformationClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-10">Loading payment info…</div>}>
      <PaymentInformationClient />
    </Suspense>
  );
}
