const deep_blue_primary = "#034078";
const blue_cloud = "#0085FF";
const orange = "#FF7F0D"

const shapeBackgroundColors = [
    'rgba(255, 99, 132, 0.8)',
    'rgba(54, 162, 235, 0.8)',
    'rgba(153, 102, 255, 0.8)',
    'rgba(218,165,32, 0.8)',
    'rgba(124,252,0, 0.8)',
    'rgba(255,160,122, 0.8)',
    'rgba(25,25,112, 0.8)',
    'rgba(46,139,87, 0.8)',
    'rgba(0,255,127, 0.8)',
    'rgba(135,206,235, 0.8)',
    'rgba(219,112,147, 0.8)',
    'rgba(119,136,153, 0.8)',
    'rgba(178,34,34, 0.8)',
    'rgba(255,228,196, 0.8)',
    'rgba(32,178,170, 0.8)',
    'rgba(255, 206, 86, 0.8)',
    'rgba(75, 192, 192, 0.8)',


]

const shapeBorderColors = [
    // 'rgba(255, 99, 132, 1)',
    // 'rgba(54, 162, 235, 1)',
    // 'rgba(255, 206, 86, 1)',
    // 'rgba(75, 192, 192, 1)',
    // 'rgba(153, 102, 255, 1)',
    // 'rgba(255, 159, 64, 1)',
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',

    'rgba(153, 102, 255, 1)',
    'rgba(218,165,32, 1)',
    'rgba(124,252,0, 1)',
    'rgba(255,160,122, 1)',
    'rgba(25,25,112, 1)',
    'rgba(46,139,87, 1)',
    'rgba(0,255,127, 1)',
    'rgba(135,206,235, 1)',
    'rgba(219,112,147, 1)',
    'rgba(119,136,153, 1)',
    'rgba(178,34,34, 1)',
    'rgba(255,228,196, 1)',
    'rgba(32,178,170, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
]


const colorTemplate1 = {
    size: 8,
    backgroundColors: [
        'rgba(135,206,235, 0.8)',
        'rgba(219,112,147, 0.8)',
        'rgba(119,136,153, 0.8)',
        'rgba(178,34,34, 0.8)',
        'rgba(255,228,196, 0.8)',
        'rgba(32,178,170, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
    ],
    borderColors: [
        'rgba(135,206,235, 1)',
        'rgba(219,112,147, 1)',
        'rgba(119,136,153, 1)',
        'rgba(178,34,34, 1)',
        'rgba(255,228,196, 1)',
        'rgba(32,178,170, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
    ]
}

const colorTemplate2 = {
    size: 8,
    backgroundColors: [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(153, 102, 255, 0.8)',
        'rgba(218,165,32, 0.8)',
        'rgba(124,252,0, 0.8)',
        'rgba(255,160,122, 0.8)',
        'rgba(25,25,112, 0.8)',
        'rgba(46,139,87, 0.8)',
    ],
    borderColors: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(218,165,32, 1)',
        'rgba(124,252,0, 1)',
        'rgba(255,160,122, 1)',
        'rgba(25,25,112, 1)',
        'rgba(46,139,87, 1)',
    ]
}

const colorTemplate3 = {
    size: 8,
    backgroundColors: [
        'rgba(82, 158, 147, 0.8)',
        'rgba(110, 235, 216, 0.8)',
        'rgba(235, 178, 98, 0.8)',
        'rgba(51, 60, 158, 0.8)',
        'rgba(87, 100, 235, 0.8)',
        'rgba(235, 103, 94, 0.8)',
        'rgba(47, 158, 156, 0.8)',
        'rgba(130, 235, 106, 0.8)',
    ],
    borderColors: [
        'rgba(82, 158, 147, 1)',
        'rgba(110, 235, 216, 1)',
        'rgba(235, 178, 98, 1)',
        'rgba(51, 60, 158, 1)',
        'rgba(87, 100, 235, 1)',
        'rgba(235, 103, 94, 1)',
        'rgba(47, 158, 156, 1)',
        'rgba(130, 235, 106, 1)',
    ]
}

const colorTemplate4 = {
    size: 8,
    backgroundColors: [
        'rgba(235, 165, 164, 0.8)',
        'rgba(235, 234, 176, 0.8)',
        'rgba(235, 152, 233, 0.8)',
        'rgba(129, 235, 160, 0.8)',
        'rgba(184, 141, 235, 0.8)',
        'rgba(87, 100, 235, 0.8)',
        'rgba(235, 103, 94, 0.8)',
        'rgba(47, 158, 156, 0.8)',
    ],
    borderColors: [
        'rgba(235, 165, 164, 1)',
        'rgba(235, 234, 176, 1)',
        'rgba(235, 152, 233, 1)',
        'rgba(129, 235, 160, 1)',
        'rgba(184, 141, 235, 1)',
        'rgba(87, 100, 235, 1)',
        'rgba(235, 103, 94, 1)',
        'rgba(47, 158, 156, 1)',
    ]
}

const colorTemplate5 = {
    size: 5,
    backgroundColors: [
        'rgba(119,136,153, 0.8)',
        'rgba(178,34,34, 0.8)',
        'rgba(255,228,196, 0.8)',
        'rgba(235, 101, 52, 0.8)',
        'rgba(133, 235, 63, 0.8)',
        'rgba(235, 39, 56, 0.8)',
        'rgba(16, 235, 191, 0.8)',
        'rgba(225, 28, 235, 0.8)',
    ],
    borderColors: [
        'rgba(119,136,153, 1)',
        'rgba(178,34,34, 1)',
        'rgba(255,228,196, 1)',
        'rgba(235, 101, 52, 1)',
        'rgba(133, 235, 63, 1)',
        'rgba(235, 39, 56, 1)',
        'rgba(16, 235, 191, 1)',
        'rgba(225, 28, 235, 1)',
    ]
}

const colorTemplate6 = {
    size: 5,
    backgroundColors: [
        'rgba(29, 6, 184, 0.8)',
        'rgba(78, 70, 133, 0.8)',
        'rgba(31, 113, 235, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(153, 102, 255, 0.8)',
        'rgba(218,165,32, 0.8)',
        'rgba(237, 172, 90, 0.8)',
        'rgba(184, 79, 6, 0.8)',
    ],
    borderColors: [
        'rgba(29, 6, 184, 1)',
        'rgba(78, 70, 133, 1)',
        'rgba(31, 113, 235, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(218,165,32, 1)',
        'rgba(237, 172, 90, 1)',
        'rgba(184, 79, 6, 1)',
    ]
}

const colorTemplates = [
    colorTemplate4,
    colorTemplate5,
    colorTemplate6,
    colorTemplate1,
    colorTemplate2,
    colorTemplate3
]

module.exports = {
    deep_blue_primary,
    blue_cloud,
    orange,
    shapeBackgroundColors,
    shapeBorderColors,
    colorTemplates
}
