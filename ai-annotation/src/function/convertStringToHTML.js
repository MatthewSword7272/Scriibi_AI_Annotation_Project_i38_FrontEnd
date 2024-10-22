export default function convertStringtoHTML(text) {
    // Convert plain text to HTML and preserve line breaks
    text = text.replaceAll('\n\n','</p><p>');
    text = text.replaceAll('\n','</p><p>');
    text = '<p>' + text + '</p>';

    // DOM Construction
    let doc = new DOMParser().parseFromString(text, 'text/html');

    return doc.querySelector('body').innerHTML;
}