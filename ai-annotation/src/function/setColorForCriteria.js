export default function colorMapping(aHtmlString, textComponents) {
    // DOM Init
    let doc = new DOMParser().parseFromString(aHtmlString, "text/html");

    // Mapping
    doc.querySelectorAll('mark').forEach((aMark) => {
        let data = aMark.getAttribute('data').split(',');

        // Map Text Component background color
        const textComp = textComponents.find(component => component.text_component_id === parseInt(data[0]));
        if(textComp) {
            aMark.style.backgroundColor = `var(--c${textComp.colorIndex}-background)`;
        }

        // Map flags
    })

    return doc.querySelector('body').innerHTML
}