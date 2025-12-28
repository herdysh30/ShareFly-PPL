import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      try {
        const res = await axios.get(route('get.posts'))
        return res.data
      } catch (error) {
        console.log(error)
      }
    }
  })
}

export default usePosts