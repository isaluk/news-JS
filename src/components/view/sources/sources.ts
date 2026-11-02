import './sources.css';
import { SourceItem } from '../../../types';
import { getElement } from '../../../utils/dom';

const ACTIVE_CLASS = 'source__item--active';

class Sources {
    public draw(data: readonly SourceItem[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = getElement<HTMLTemplateElement>('#sourceItemTemp');

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            getElement('.source__item-name', sourceClone).textContent = item.name;
            getElement('.source__item', sourceClone).dataset.sourceId = item.id;

            fragment.append(sourceClone);
        });

        getElement('.sources').append(fragment);
        getElement('.sources-count').textContent = String(data.length);
    }

    public highlightActive(): void {
        const sourcesContainer = getElement('.sources');
        const activeId = sourcesContainer.dataset.source;

        sourcesContainer.querySelectorAll<HTMLElement>('.source__item').forEach((item) => {
            item.classList.toggle(ACTIVE_CLASS, item.dataset.sourceId === activeId);
        });
    }
}

export default Sources;
