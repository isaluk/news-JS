import './sources.css';
import { SourceItem } from '../../../types';
import { getElement } from '../../../utils/dom';

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
    }
}

export default Sources;
