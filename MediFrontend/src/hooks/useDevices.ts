import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

export function useDevices() {
  return useQuery({
    queryKey: ["devices"],
    queryFn: () => api.get("/devices").then(res => res.data)
  });
}
