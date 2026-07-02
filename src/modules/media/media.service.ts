
import { TMDBProvider } from "../../shared/providers/tmdb/tmdb.provider.js";
import { AppMedia, AppMediaType, IMediaRepository } from "./media.types.js";


export class MediaService {
    public constructor(private readonly mediaRepository: IMediaRepository, private readonly mediaProvider: TMDBProvider) { }

    public trending(type: AppMediaType): Promise<AppMedia[]> {
        return this.mediaProvider.getTrending(type)
    }

    public async search(query: string): Promise<any> {
        return await this.mediaProvider.search(query)
    }

    public async find(id: number, type: AppMediaType): Promise<AppMedia> {
        const domainMedia = await this.mediaRepository.findById(id, type);
        if (domainMedia) return domainMedia;

        const dataProvider = await this.mediaProvider.getMediaById(id, type);

        return await this.mediaRepository.insert(dataProvider);
    }
}