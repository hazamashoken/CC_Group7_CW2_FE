import { createGatewayClient } from "@/lib/data";
import { CreateReservableDialog } from "./reservable-create-dialog";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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

  const is_staff = session.user?.is_staff;

  if (!response.ok || !data) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <CreateReservableDialog />
      {data.map((reservable) => {
        return (
          <Card
            key={reservable.id}
            className="px-4 py-2 min-w-[100px] text-center"
          >
            <CardHeader>
              <CardTitle>{reservable.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Description: {reservable.description}</p>
              <p>Location: {reservable.location}</p>
            </CardContent>
            <CardFooter className="space-x-1">
              <Button size={"sm"}>Reserve</Button>
              <Button size={"sm"}>Edit</Button>
              <Button size={"sm"} variant={"destructive"}>
                Delete
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
