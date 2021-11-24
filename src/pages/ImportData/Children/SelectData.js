import React from 'react'
import ReactFileReader from 'react-file-reader'
import ImportFileImage from 'resources/images/importFile.png'
import ImportButton from '../Components/ImportButton'


export default function SelectData(props) {

    const executeStringResult = (result) => {
        let data = []
        let dataSheet = result.split('\n').length == 2 ? result.split('\r') : result.split('\n')
        if (dataSheet.length ===  0) return
        // find the sign to split string
        let divider = dataSheet[0].includes(',') ? ',' : ';'
        let keys = dataSheet[0].split(divider)
        console.log(dataSheet[1])
        keys.map((ele, index) => ele.includes('\"') ? keys[index] = ele.substring(1, ele.length - 1) : ele)
        console.log(keys)
        dataSheet.map((row, index) => {
            if (row.includes(divider)) {
                if (index != 0){
                    let rows = {}
                    row.split(divider).map((ele, index) => {
                        rows[keys[index]] = ele.includes('\"')? ele.substring(1, ele.length - 1) : ele
                    })
                    data.push(rows)
                }
            }
        })
        console.log(data)
        props.setDataFile(data)
        // void callback
        props.onloadComplete()
    }

    const handleFiles = (file) => {
        // check file format
        if (!file[0].name.includes('csv')) {
            alert("Invalid format, expected: '.csv'")
        } else {
            // valid format
            // store file information
            props.setFileInformation({...file[0], name: file[0].name.replaceAll('.', '_')})
            var reader = new FileReader();
            reader.readAsText(file[0]);
            console.log(file[0])
            reader.onloadend = e => {
                // set data when loaded
                executeStringResult(reader.result)
            }
        }
    }
    return (
        <div>
            <div>
                <div>
                    <h2 className='m-3'>
                        Import Data
                    </h2>
                </div>
                <div className='bg-white'>
                    <ReactFileReader handleFiles={(file) => { handleFiles(file) }} fileTypes={'.csv'}>
                        <ImportButton text="Import file" image={ImportFileImage} />
                    </ReactFileReader>
                </div>
            </div>
        </div>
    )
}
