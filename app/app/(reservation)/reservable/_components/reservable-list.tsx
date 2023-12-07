import { createGatewayClient } from "@/lib/data";
import { CreateReservableDialog } from "./reservable-create-dialog";

export async function ReservableList() {
    const client = await createGatewayClient();
    
    const { data, error, response } = await client.GET("/api/reservables/", {
        next: {
            tags: ["reservables"],
        }
    });
    console.log(data)
    if (!response.ok) {
        return <div>Error: {error}</div>
    }
    return (
        <>
        <CreateReservableDialog />
        {
            data.map((reservable) => {
                return (
                    <div key={reservable.id}>
                        <h1>{reservable.name}</h1>
                        <p>{reservable.description}</p>
                    </div>
                )
            })
        }
        </>
    )
}