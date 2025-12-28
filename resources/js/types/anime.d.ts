interface IImageURL {
    image_url?: string;
    small_image_url?: string;
    medium_image_url?: string;
    large_image_url?: string;
    maximum_image_url?: string;
}

interface IImages {
    jpg: IImageURL;
    webp: IImageURL;
}

interface IMeta {
    mal_id?: number;
    type?: string;
    name?: string;
    url?: string;
}

interface IAnime {
    pagination?: {
        last_visible_page?: number;
        has_next_page?: boolean;
        current_page?: number;
        items?: {
            count?: number;
            total?: number;
            per_page?: number;
        }[];
    },
    data?: {
        mal_id?: number;
        images: IImages;
        trailer?: {
            youtube_id?: string;
            url?: string;
            embed_url?: string;
            images?: IImageURL[]
        }[],
        titles?: {
            type?: string;
            title?: string;
        }[]
        title?: string;
        title_english?: string;
        title_japanese?: string;
        type?: string;
        source?: string;
        episodes?: number;
        status?: string;
        airing?: boolean;
        aired?: {
            from?: string;
            to?: string;
            string?: string;
        }[];
        duration?: string;
        rating?: string;
        score?: float;
        scored_by?: number;
        rank?: number;
        popularity?: number;
        members?: number;
        favorites?: number;
        synopsis?: Text;
        background?: string;
        season?: string;
        year?: number;
        broadcast?: {
            day?: string;
            time?: string;
            timezone?: string;
            string?: string;
        }[];
        producers?: IMeta[];
        licensors?: IMeta[];
        studios?: IMeta[];
        genres?: IMeta[];
        demographics?: IMeta[];
    }[]
}