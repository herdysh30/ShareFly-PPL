import BottomNav from '@/components/BottomNav'
import PeopleYouMayKnow from '@/components/PeopleYouMayKnow'
import SidebarNav from '@/components/SidebarNav'
import { useHomeContext } from '@/pages/Home'
import { forwardRef, ReactNode } from 'react'

const AppLayout = forwardRef<HTMLDivElement, { children: ReactNode }>(
    ({ children }, ref) => {
        const { hasHome } = useHomeContext()

        return (
            <main className='relative flex flex-col h-screen overflow-hidden bg-background md:flex-row'>
                <section className="md:w-max">
                    <SidebarNav />
                </section>
                <section ref={ref} className='flex-1 h-screen overflow-hidden overflow-y-auto scrollbar-custom md:w-2/4'>
                    {children}
                </section>
                {
                    hasHome && (
                        <section className='hidden h-screen p-4 overflow-hidden border-l lg:block lg:w-1/3 xl:w-1/4'>
                            <PeopleYouMayKnow />
                        </section>
                    )
                }
                <BottomNav />
            </main>
        )
    }
)

AppLayout.displayName = 'AppLayout'

export default AppLayout