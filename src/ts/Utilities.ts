export function createElementFromHtml (html: string) {
    let template = document.createElement('template');
    template.innerHTML = html.trim();
    return <HTMLElement> template.content.firstChild;
}

export function rand(min: number, max: number) {
    return Math.random() * (max - min) + min;
}