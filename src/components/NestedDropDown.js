import React from 'react'
import {NestedDropdown} from 'mui-nested-menu'

export default function NestedDropDown(props) {



    const fileDropdownData = {
        label: ' files, faf, fas',
        items: [
            {
                label: 'Field',
                //leftIcon: <SaveAsIcon />,
                items: [
                    {
                        label: "username",
                        //rightIcon: <SaveAsIcon />,
                        callback: () => console.log('Save As > Option 1 clicked'),
                    },
                    {
                        label: 'id',
                        //leftIcon: <SaveAsIcon />,
                        callback: () => console.log('Save As > Option 2 clicked'),
                    },
                ],
            },
            {
                label: 'Export',
                //leftIcon: <ImportExportRoundedIcon />,
                //rightIcon: <ImportExportRoundedIcon />,
                items: [
                    {
                        label: 'File Type 1',
                        items: [
                            {
                                label: 'Option 1',
                                //rightIcon: <SaveAsIcon />,
                                callback: () => console.log('Export > FT1 > O1 clicked'),
                            },
                            {
                                label: 'Option 2',
                                //leftIcon: <SaveAsIcon />,
                                callback: () => console.log('Export > FT1 > O2 clicked'),
                            },
                        ],
                    },
                    {
                        label: 'File Type 2',
                        callback: () => console.log('Export > FT2 clicked'),
                    },
                ],
            },
        ],
    }
    return (
        <div>
            <NestedDropdown
                // variant='contained'
                sx={{ borderRadius: '50px' }}
                data={fileDropdownData}
            />
        </div>
    )
}
