export default function colorMapping(aHtmlString, textComponents, flags) {
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
        if(data[1] !== "*") {
            const flag = flags.find((flag) => flag.flag_id === parseInt(data[1]));
            aMark.setAttribute('data-subcomponent-text', flag.characters);
            aMark.style.setProperty('--subcomponent-background', flag.colour);
            aMark.classList.add('flag'); // Add class
        }
    })

    return doc.querySelector('body').innerHTML
}