export default function makeText(text) {
    let document = new DOMParser().parseFromString(text, 'text/html'); // Parser init

    // Emit inline CSS, custom attribute, class and id
    document.querySelectorAll('mark').forEach((aMark) => {
        aMark.removeAttribute('data-highlight-content');
        aMark.removeAttribute('data-component-name');
        aMark.removeAttribute('style');
        aMark.removeAttribute('data-subcomponent-text');
        aMark.removeAttribute('class');
        aMark.removeAttribute('id');
    });

    return document.querySelector('body').innerHTML;
}