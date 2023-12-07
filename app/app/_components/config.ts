import { Clock, DoorClosed, Home } from "lucide-react";

export const NAV_CONFIG = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: Home
  },
  {
    name: "Reservation",
    path: "/reservation",
    icon: Clock
  },
  {
    name: "Reservable",
    path: "/reservable",
    icon: DoorClosed
  }
]