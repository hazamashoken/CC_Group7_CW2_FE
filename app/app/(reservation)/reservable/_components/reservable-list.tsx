import { createGatewayClient } from "@/lib/data";
import { CreateReservableDialog } from "./reservable-create-dialog";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { ReservableCard } from "./reservable-card";

export async function ReservableList() {
  const session = await getServerSession(authOptions);
  const client = await createGatewayClient();

  const { data, error, response } = await client.GET("/api/reservables/", {
    next: {
      tags: ["reservables"],
    },
  });

  if (!session) {
    return null;
  }

  if (!response.ok || !data) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
    <div className="container  items-center justify-center space-y-2">
      <CreateReservableDialog />
      <div className="grid lg:grid-cols-4 gap-4 md:grid-cols-3 grid-cols-1">
        {data.map((reservable, index) => {
          return (
            <ReservableCard key={index} reservable={reservable}/> 
          );
        })}
      </div>
    </div>
    </>
  );
}
