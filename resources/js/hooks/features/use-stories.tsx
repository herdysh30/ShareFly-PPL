import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const useStories = () => {
  return useQuery({
    queryKey: ['stories'],
    queryFn: async () => {
        try {
            const res = await axios.get(route('get.stories'))
            return res.data
        } catch (error) {
            console.log(error)
        }
    }
  })
}

export default useStories