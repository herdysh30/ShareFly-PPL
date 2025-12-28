import ProviderIcon from '@/components/icon/ProviderIcon.jsx';
import { Provider } from '@/types';

export default function Socialstream({ providers, error }: {
    providers: Provider[],
    error?: string
}) {
    return (
        <div className="grid grid-cols-3 gap-2">

            {error && <span className='text-xs text-center text-red-500'>{error}</span>}

            {providers.map(provider => {
                return (
                    <a
                        key={provider.id}
                        href={route('oauth.redirect', provider.id)}
                        className="inline-flex justify-center items-center gap-2 py-3 bg-white border border-gray-300 rounded-md font-semibold text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150"
                    >
                        <ProviderIcon provider={provider} className="h-6 w-6" />

                        <span className="block font-medium text-sm text-gray-700">{provider.buttonLabel || provider.name}</span>
                    </a>
                );
            })}
        </div>
    );
}
