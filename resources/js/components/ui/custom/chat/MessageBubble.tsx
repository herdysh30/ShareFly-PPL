import { cn } from "@/lib/utils";

export default function MessageBubble({
  position,
  text,
  isFirstMessage = false,
}: {
  position: 'left' | 'right'
  text: string
  isFirstMessage?: boolean
}) {
  return (
    <div className={cn("flex gap-2", position === 'left' ? "justify-start" : "justify-end")}>
      <div className={cn("grid w-1/2 gap-2", position === 'left' ? 'order-' : 'order-1')}>
        <div className={cn("grid p-2 rounded-lg min-w-min max-w-max", isFirstMessage && 'relative before:content-[""] before:absolute before:top-0 before:w-5 before:h-4', position === 'left' ? "bg-secondary before:bg-secondary before:-left-1 before:skew-x-[32deg] " : "before:-skew-x-[32deg] bg-primary before:-right-1 before:bg-primary min-w-min max-w-max place-self-end")}>
          <p className={cn("font-light", position === 'left' ? 'dark:text-white/70 text-black/70' : 'text-white/70 dark:text-black/70')}>{text}</p>
        </div>
      </div>
    </div>
  )
}
