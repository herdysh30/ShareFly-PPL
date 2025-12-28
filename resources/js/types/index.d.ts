export interface ConnectedAccount {
    id: number;
    provider: string;
    provider_id: number;
    created_at: string
}

export declare type ProviderId = 'google' | 'tiktok' | 'twitter-oauth-2';

export interface Provider {
    id: ProviderId;
    name: string;
    buttonLabel?: string;
}

export interface Socialstream {
    show: boolean;
    prompt: string;
    hasPassword: boolean;
    providers: Provider[];
    connectedAccounts: ConnectedAccount[];
}

export interface User {
    id: number;
    firstname: string;
    lastname: string;
    username: string;
    bio: string;
    email: string;
    email_verified_at: DateTime;
    verified_at: DateTime;
    banned_at: DateTime;
    no_telepon: string;
    profile_picture: string;
    profile_background: string;
    created_at: DateTime;
    updated_at: DateTime;
    roleId: number;
    role: IRole;
}

interface IRole {
    id: number;
    name: string;
    created_at: DateTime;
    Updated_at: DateTime;
}

interface IMeta<T> {
    data?: T[];
    current_page?: number;
    first_page_url?: string;
    from?: number;
    last_page?: number;
    last_page_url?: string;
    links?: {
        active?: boolean;
        label?: string;
        url?: string;
    }[];
    next_page_url?: string;
    path?: string;
    per_page?: number;
    per_page_url?: string;
    to?: number;
    total?: number;
}

interface IPosts {
    id: number;
    slug: string;
    description: string;
    image: string
    userId: number
    users: User
    likes_count: number;
    comments_count: number;
    created_at: DateTime
    updated_at: DateTime
}

interface IStories {
    id: number;
    caption: string;
    image: string
    userId: number
    users: User
    created_at: DateTime
    updated_at: DateTime
}

interface ILikes {
    id: number;
    userId: number;
    entityId: number;
    entity_type: string;
    created_at: DateTime;
    updated_at: DateTime;
}

interface IComments {
    id: number;
    description: string;
    postId: number;
    userId: number;
    created_at: DateTime;
    updated_at: DateTime;
}

interface IHomeProps {
    canLogin: boolean;
    canRegister: boolean;
    hasHome: boolean;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};
