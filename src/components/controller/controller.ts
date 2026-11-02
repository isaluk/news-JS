import AppLoader from './appLoader';
import { Callback, Endpoint, NewsResponse, SourcesResponse } from '../../types';

class AppController extends AppLoader {
    public getSources(callback: Callback<SourcesResponse>): void {
        this.getResp<SourcesResponse>({ endpoint: Endpoint.Sources }, callback);
    }

    public getNews(event: MouseEvent, callback: Callback<NewsResponse>): void {
        const sourcesContainer = event.currentTarget;
        const target = event.target;

        if (!(sourcesContainer instanceof HTMLElement) || !(target instanceof Element)) return;

        const sourceId = target.closest<HTMLElement>('.source__item')?.dataset.sourceId;

        if (!sourceId || sourcesContainer.dataset.source === sourceId) return;

        sourcesContainer.dataset.source = sourceId;
        this.getResp<NewsResponse>({ endpoint: Endpoint.Everything, options: { sources: sourceId } }, callback);
    }
}

export default AppController;
