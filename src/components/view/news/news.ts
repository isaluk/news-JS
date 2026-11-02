import './news.css';
import { Article } from '../../../types';
import { getElement } from '../../../utils/dom';

const MAX_NEWS_COUNT = 10;
const PLACEHOLDER_IMAGE = 'img/news_placeholder.svg';
const EMPTY_SUBTITLE = 'no stories found';

class News {
    public draw(data: readonly Readonly<Article>[]): void {
        const news = data.slice(0, MAX_NEWS_COUNT);

        const fragment = document.createDocumentFragment();
        const newsItemTemp = getElement<HTMLTemplateElement>('#newsItemTemp');

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

            if (idx % 2) getElement('.news__item', newsClone).classList.add('alt');

            getElement('.news__meta-photo', newsClone).style.backgroundImage = this.getPhotoLayers(item.urlToImage);
            getElement('.news__meta-author', newsClone).textContent = item.author || item.source.name;
            getElement('.news__meta-date', newsClone).textContent = this.formatDate(item.publishedAt);

            getElement('.news__description-title', newsClone).textContent = item.title;
            getElement('.news__description-source', newsClone).textContent = item.source.name;
            getElement('.news__description-content', newsClone).textContent = item.description;
            getElement<HTMLAnchorElement>('.news__read-more a', newsClone).href = item.url;

            fragment.append(newsClone);
        });

        const newsContainer = getElement('.news');
        newsContainer.innerHTML = '';
        newsContainer.appendChild(fragment);

        const [firstArticle] = news;
        getElement('.news-section__subtitle').textContent = firstArticle
            ? `from ${firstArticle.source.name}`
            : EMPTY_SUBTITLE;
    }

    private getPhotoLayers(urlToImage: string | null): string {
        const placeholder = `url("${PLACEHOLDER_IMAGE}")`;

        return urlToImage ? `url("${urlToImage}"), ${placeholder}` : placeholder;
    }

    private formatDate(isoDate: string): string {
        return isoDate.slice(0, 10).split('-').reverse().join('-');
    }
}

export default News;
