const fs = require('fs-extra');
const concat = require('concat');

(async function build(){
    const file =[
        'dist/custom-element/runtime.js',
        'dist/custom-element/polyfills.js',
        'dist/custom-element/main.js'
    ]

    await fs.ensureDir('button')

    await concat(file, 'build.js')
    console.info("element created successfully")
})() 