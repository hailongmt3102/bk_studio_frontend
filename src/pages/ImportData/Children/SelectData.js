import React from 'react'
import ReactFileReader from 'react-file-reader'
import ImportFileImage from 'resources/images/importFile.png'
import ImportButton from '../Components/ImportButton'


export default function SelectData(props) {

    const executeStringResult = (result) => {
        let data = []

        let dataSheet = result.split('\n')
        let keys = dataSheet[0].split(';')
        keys.map((ele, index) => typeof (ele) === 'string' ? keys[index] = ele.substring(1, ele.length - 1) : ele)

        dataSheet.map((row, index) => {
            if (row.includes(';')) {
                if (index != 0){
                    let rows = {}
                    row.split(';').map((ele, index) => {
                        rows[keys[index]] = isNaN(parseInt(ele)) ? ele.substring(1, ele.length - 1) : parseInt(ele)
                    })
                    data.push(rows)
                }
            }
        })
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
            props.setFileInformation(file[0])
            var reader = new FileReader();
            reader.readAsText(file[0]);
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
