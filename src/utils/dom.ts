export function getElement<T extends Element = HTMLElement>(selector: string, parent: ParentNode = document): T {
    const element = parent.querySelector<T>(selector);

    if (!element) {
        throw new Error(`Element "${selector}" not found`);
    }

    return element;
}