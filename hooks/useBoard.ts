import { boardService } from "@/lib/services/frontend/boardService";
import { useQuery } from "@tanstack/react-query";
import { Board } from "@/types/board";

export default function useBoard(id: number) {
    return useQuery<Board>({
        queryKey: ["board", id],
        queryFn: () => boardService.getById(id),
        enabled: !!id
    })
}