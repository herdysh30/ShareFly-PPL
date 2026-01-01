import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useSavedPosts = () => {
    return useQuery({
        queryKey: ["saved-posts"],
        queryFn: async () => {
            const response = await axios.get("/saved-posts");
            return response.data;
        },
    });
};

export default useSavedPosts;
