import { SVGAttributes } from 'react';
import Google from './Google';
import Twitter from './Twitter';
import { Provider } from '@/types';
import Tiktok from './Tiktok';

export default function ProviderIcon({ className = '', provider, ...props }: SVGAttributes<SVGElement> & {
    provider: Provider
}) {
    const Icon = () => {
        switch (provider.id) {
            case 'google':
                return <Google {...props} className={className} />
            case 'twitter-oauth-2':
                return <Twitter {...props} className={className} />
            case 'tiktok':
                return <Tiktok {...props} className={className} />
        }
    };

    return (
        <div className="text-gray-900">
            <Icon />
        </div>
    )
}
