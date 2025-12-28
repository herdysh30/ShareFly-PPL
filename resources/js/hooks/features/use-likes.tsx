import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const useLikes = () => {
  return useQuery({
      queryKey: ['likes'],
    queryFn: async () => {
        try {
            const res = await axios.get(route('get.likes'))
            return res.data
        } catch (error) {
            console.log(error)
        }
    }
  })
}

export default useLikes