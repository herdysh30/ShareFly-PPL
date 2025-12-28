import { toast as toastify, ToastOptions } from 'react-toastify'
import { useTheme } from '../components/ThemeProvider'

export const useToast = () => {
    const { theme } = useTheme()

    const toast = (title: string, options?: ToastOptions) => toastify(title, {
        ...options,
        theme: theme === 'dark' ? 'dark' : 'light',
    })

    return toast
}