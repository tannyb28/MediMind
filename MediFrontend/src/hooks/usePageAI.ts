// hooks/usePageAI.ts
import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

export function usePageAI(slug: string) {
  return useQuery({
    queryKey: ["ai-page", slug],
    queryFn: () => api.get(`/ai/pages/${slug}`).then(res => res.data)
  });
}