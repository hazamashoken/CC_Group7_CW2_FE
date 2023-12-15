import { createGatewayClient } from "@/lib/data";
import { CreateReservationDialog } from "../dashboard/_components/reservation-create-dialog";
import { Metadata } from "next";
import { ReservationCard } from "./_components/reservation-card";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard for reservation system",
};

export default async function DashBoardPage() {
  const client = await createGatewayClient();

  const { data, error, response } = await client.GET("/api/reservables/", {
    next: {
      tags: ["reservables"],
    },
  });

  const myReservationResponse = await client.GET("/api/reservation/me/", {
    next: {
      tags: ["reservations"],
    },
  });

  if (!response.ok || !data) {
    return <div>Error: {error}</div>;
  }

  if (!myReservationResponse.response.ok || !myReservationResponse.data) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="container  items-center justify-center space-y-2">
        <div pb-8>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>
        <CreateReservationDialog reservableData={data} />
        <ReservationCard reservationData={myReservationResponse.data} />
      </div>
    </>
  );
}
