import { cn } from '@/lib/utils'
import { Loader } from 'lucide-react'

const Loading = ({className}: {className?: string}) => {
  return (
    <span className='flex items-center justify-center gap-2'>
        <Loader className={cn('animate-spin', className)} />
        Loading...
    </span>
  )
}

export default Loading