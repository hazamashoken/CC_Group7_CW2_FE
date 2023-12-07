import { Suspense } from "react";
import { ReservableList } from "./_components/reservable-list";

export default async function ReservablePage() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <ReservableList />
      </Suspense>
    </>
  );
}
