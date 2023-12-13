import { Suspense } from "react";
import { ReservableList } from "./_components/reservable-list";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: 'Reservable',
  description: 'Reservable page for reservation system',
}

export default async function ReservablePage() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <ReservableList />
      </Suspense>
    </>
  );
}
