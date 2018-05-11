const faker = require('faker')

const svg1 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><defs><style>.cls-1,.cls-2,.cls-3,.cls-4,.cls-5{fill:none;}.cls-2,.cls-3,.cls-4,.cls-5{stroke:#fff;stroke-width:2.26px;}.cls-2,.cls-5{stroke-linecap:round;}.cls-2,.cls-4{stroke-linejoin:round;}.cls-3,.cls-5{stroke-miterlimit:10;}.cls-4{stroke-linecap:square;}</style></defs><title>drafting-comp</title><g id="text"><path class="cls-2" d="M48.55,27.91A88.63,88.63,0,0,1,99.82,11.68c49.06,0,88.83,39.63,88.83,88.52s-39.77,88.52-88.83,88.52S11,149.09,11,100.2A88.24,88.24,0,0,1,44.39,31"/><path class="cls-2" d="M70.41,75l13.16,92.93-11.11,2.66s-33.1-106.17-34-109.71A22.59,22.59,0,1,1,71.25,74.47l-.84.44"/><path class="cls-3" d="M47.28,36.34,39.43,21.92A2.57,2.57,0,0,1,44,19.47L51.8,33.88"/><polyline class="cls-4" points="80.76 169.14 81.67 186.62 75.55 170.39"/><polyline class="cls-2" points="71.12 74.62 143.08 135.46 151.01 127.54 77.43 40.08"/><polyline class="cls-4" points="145.19 133.98 160.46 144.06 149.56 130.03"/><path class="cls-5" d="M79.2,137l4.87,0c28.21,0,54.54,2.76,76.83,7.54"/><path class="cls-5" d="M21.75,141.82a394.34,394.34,0,0,1,40.44-4.25"/><ellipse class="cls-5" cx="59.99" cy="55.28" rx="3.59" ry="3.58"/><path class="cls-5" d="M140.39,114.54c15.18,2,30.25,5.71,45,9.59"/><path class="cls-5" d="M75.44,110.42a316.65,316.65,0,0,1,38.68,1.09"/><path class="cls-5" d="M12.42,116.1q15.94-2.73,32.08-4.16,4.59-.41,9.18-.7"/></g></svg>`

const svg2 = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="181px" height="180px" viewBox="0 0 181 180" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <!-- Generator: Sketch 49.1 (51147) - http://www.bohemiancoding.com/sketch -->
    <title>Web-design-drafting-comp-online</title>
    <desc>Created with Sketch.</desc>
    <defs></defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Web-design-drafting-comp-online" transform="translate(2.000000, 1.000000)" stroke="#FFFFFF" stroke-width="2.26">
            <path d="M37.55,16.91 C52.5466348,6.32063026 70.4615448,0.649497265 88.82,0.68 C137.88,0.68 177.65,40.31 177.65,89.2 C177.65,138.09 137.88,177.72 88.82,177.72 C39.76,177.72 -3.72556261e-15,138.09 -3.72556261e-15,89.2 C-0.0239867387,62.2441121 12.2745014,36.7557808 33.39,20" id="Shape" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M59.41,64 L72.57,156.93 L61.46,159.59 C61.46,159.59 28.36,53.42 27.46,49.88 C24.2688969,38.5343995 30.3364659,26.6420579 41.3953553,22.5669191 C52.4542446,18.4917802 64.7876962,23.6034486 69.7215314,34.3068622 C74.6553665,45.0102757 70.5313834,57.7081473 60.25,63.47 L59.41,63.91" id="Shape" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M36.28,25.34 L28.43,10.92 C27.9923497,10.1036481 28.0234626,9.11582421 28.5116189,8.32863195 C28.9997752,7.5414397 29.8708122,7.07447233 30.7966189,7.10363195 C31.7224255,7.13279157 32.5623497,7.65364813 33,8.47 L40.8,22.88" id="Shape"></path>
            <polyline id="Shape" stroke-linecap="square" stroke-linejoin="round" points="69.76 158.14 70.67 175.62 64.55 159.39"></polyline>
            <polyline id="Shape" stroke-linecap="round" stroke-linejoin="round" points="60.12 63.62 132.08 124.46 140.01 116.54 66.43 29.08"></polyline>
            <polyline id="Shape" stroke-linecap="square" stroke-linejoin="round" points="134.19 122.98 149.46 133.06 138.56 119.03"></polyline>
            <path d="M68.2,126 L73.07,126 C101.28,126 127.61,128.76 149.9,133.54" id="Shape" stroke-linecap="round"></path>
            <path d="M10.75,130.82 C24.1479409,128.708813 37.6458811,127.290261 51.19,126.57" id="Shape" stroke-linecap="round"></path>
            <ellipse id="Oval" stroke-linecap="round" cx="48.99" cy="44.28" rx="3.59" ry="3.58"></ellipse>
            <path d="M129.39,103.54 C144.57,105.54 159.64,109.25 174.39,113.13" id="Shape" stroke-linecap="round"></path>
            <path d="M64.44,99.42 C77.3434978,98.9944595 90.2609439,99.3584723 103.12,100.51" id="Shape" stroke-linecap="round"></path>
            <path d="M1.42,105.1 C12.0466667,103.28 22.74,101.893333 33.5,100.94 C36.56,100.666667 39.62,100.433333 42.68,100.24" id="Shape" stroke-linecap="round"></path>
        </g>
    </g>
</svg>`

module.exports = {
  get: () => ({
    data: faker.random.number(10) % 2 === 0 ? svg1 : svg2,
  }),
}
