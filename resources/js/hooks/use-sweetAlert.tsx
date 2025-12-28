import Swal, { SweetAlertOptions } from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const useSweetAlert = () => {
    const modal = (options?: SweetAlertOptions) => withReactContent(Swal).fire({
        ...options,
        customClass: {
            popup: 'bg-foreground dark:bg-background dark:text-white',
            confirmButton: 'bg-primary text-black'
        },
    })

    return { modal }
}