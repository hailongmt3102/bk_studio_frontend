import { createNewComponent, deleteShape as deleteShapeApi, getAllComponent } from 'api/Report';
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Rnd } from 'react-rnd';
import { useLocation } from 'react-router-dom';
import FloatingCard from './FloatingCard';
import FloatText from './FloatText';
import LongCanvas from './LongCanvas';
import Shape from './Shape';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    BarElement
);


const Content = React.forwardRef((props, ref) => {
    const [components, setComponents] = useState([])
    const ShapeRef = useRef([]);
    const currentProject = localStorage.getItem("currentProject")
    const [mode, setMode] = useState("addText")
    const [newFloatCard, setNewFloatCard] = useState(<FloatText />)
    ShapeRef.current = []
    const addToRefs = (el, index) => {
        if (el && !ShapeRef.current.includes(el) && !Object.keys(ShapeRef.current).includes(index.toString())) {
            ShapeRef.current.push(el);
        } else {
            ShapeRef.current[index] = el
        }
    };
    const location = useLocation().pathname
    const RId = parseInt(location.split('/')[3])

    // const PieData = {
    //     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    //     datasets: [
    //         {
    //             label: '# of Votes',
    //             data: [1, 2, 3, 4, 5],
    //             backgroundColor: [
    //                 'rgba(255, 99, 132, 0.2)',
    //                 'rgba(54, 162, 235, 0.2)',
    //                 'rgba(255, 206, 86, 0.2)',
    //                 'rgba(75, 192, 192, 0.2)',
    //                 'rgba(153, 102, 255, 0.2)',
    //                 // 'rgba(255, 159, 64, 0.2)',
    //             ],
    //             borderColor: [
    //                 'rgba(255, 99, 132, 1)',
    //                 'rgba(54, 162, 235, 1)',
    //                 'rgba(255, 206, 86, 1)',
    //                 'rgba(75, 192, 192, 1)',
    //                 'rgba(153, 102, 255, 1)',
    //                 // 'rgba(255, 159, 64, 1)',
    //             ],
    //             borderWidth: 1,
    //         },
    //     ],
    // };



    // const Baroptions = {
    //     responsive: true,
    //     plugins: {
    //         legend: {
    //             position: 'top',
    //         },
    //         title: {
    //             display: true,
    //             text: 'Chart.js Bar Chart',
    //         },
    //     },
    // };
    // const BarNgangoptions = {
    //     indexAxis: 'y',
    //     elements: {
    //         bar: {
    //             borderWidth: 2,
    //         },
    //     },
    //     responsive: true,
    //     plugins: {
    //         legend: {
    //             position: 'right',
    //         },
    //         title: {
    //             display: true,
    //             text: 'Chart.js Horizontal Bar Chart',
    //         },
    //     },
    // };

    //  const Bardata = {
    //     labels:['January', 'February', 'March', 'April', 'May', 'June'],
    //     datasets: [
    //         {
    //             label: 'Dataset 1',
    //             data:  [33, 53, 85, 41, 44, 65],
    //             backgroundColor: 'rgba(255, 99, 132, 0.5)',
    //         },
    //         {
    //             label: 'Dataset 2',
    //             data: [33, 53, 85, 41, 44, 65],
    //             backgroundColor: 'rgba(53, 162, 235, 0.5)',
    //         },
    //     ],
    // };

    // const Linedata = {
    //     labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    //     datasets: [
    //         {
    //             label: "First dataset",
    //             data: ["asdfasdf", "asdf", "asdf", "zxcv", "qwer", "dfgh"],
    //             fill: true,
    //             backgroundColor: "rgba(75,192,192,0.2)",
    //             borderColor: "rgba(75,192,192,1)"
    //         },
    //         {
    //             label: "Second dataset",
    //             data: [33, 25, 35, 51, 54, 76],
    //             fill: false,
    //             borderColor: "#742774"
    //         }
    //     ]
    // };


    // get all components in report
    const getComponents = async () => {
        if (currentProject != null) {
            getAllComponent(currentProject, props.RId)
                .then(res => {
                    setComponents(res.data)
                })
                .catch(res => {
                    alert(res.response.data)
                })
        }
    }

    // define ref to parent
    // parent can call some methods bellow by useRef hook
    useImperativeHandle(ref,
        () => (
            {
                saveAllShape() {
                    saveAllShape()
                },
                pushNewComponent(newComponent) {
                    pushNewComponent(newComponent)
                },
                pasteShape() {
                    pasteShape()
                },
                deleteShape() {
                    deleteShape()
                }
            }
        ))

    const saveAllShape = () => {
        ShapeRef.current.map(shape => shape.SaveShape())
    }

    useEffect(() => {
        getComponents()
    }, [])

    // this function will be called when a component has clicked
    const onComponentHasClick = (componentData) => {
        updateTabData(componentData)
    }

    // push new component 
    const pushNewComponent = (component) => {
        setComponents([...components, component])
    }

    const updateTabData = (componentData) => {
        props.setTabData({
            data: "",
            style: {
                font: "Roboto1",
                size: 14,
                decoration: "",
                alignment: "",
                fill: "",
                stroke: ""
            }
        })
    }

    // declare variable and function to update style of component 
    const [followingIndexComponent, setFollowingIndexComponent] = useState(-1)
    const updateStyleOfComponent = () => {
        if (followingIndexComponent != -1) {

        }
    }

    useEffect(() => {
        console.log(components)
    }, [components])

    // copy and paste new shape
    const pasteShape = async () => {
        let currentProject = localStorage.getItem("currentProject")
        if (currentProject == null) return
        let RId = location.split('/')[3]
        try {
            if (followingIndexComponent == -1) {
                return
            }
            let newShape = JSON.parse(ShapeRef.current[followingIndexComponent].getShapeInfo())
            newShape.Position.x += 50
            newShape.Position.y += 50
            newShape.Position = JSON.stringify(newShape.Position)
            newShape.TextTheme = JSON.stringify(newShape.TextTheme)
            newShape.FrameTheme = JSON.stringify(newShape.FrameTheme)
            let result = await createNewComponent(currentProject, RId, newShape)
            newShape.RId = RId
            newShape.Id = result.data.id
            pushNewComponent(newShape)
        } catch (err) {
            console.log(err)
        }
    }

    const deleteShape = async () => {
        if (followingIndexComponent == -1) return
        console.log(followingIndexComponent)
        console.log(components)
        deleteShapeApi(currentProject, RId, parseInt(components[followingIndexComponent].Id))
            .then(res => {
                setComponents([...components.slice(0, followingIndexComponent), {}, ...components.slice(followingIndexComponent + 1)])
                setFollowingIndexComponent(-1)
            })
            .catch(err => {
                alert(err.response.data)
            })
    }
    // -------------------------------------
    // drag area
    const defaultLocation = {
        size: {
            width: 0,
            height: 0
        },
        position: {
            x: 0, y: 0
        }
    }
    const [dragAreaLocation, setDragAreaLocation] = useState(defaultLocation)
    const [isAdding, setIsAdding] = useState(true)
    // -------------------------------------------------------
    return (
        <React.Fragment>
            {
                components.map((component, index) =>
                    <div onMouseDown={() => {
                        setFollowingIndexComponent(index)
                    }}>
                        <Shape
                            ref={el => addToRefs(el, index)}
                            data={component}
                            key={index}
                            focus={followingIndexComponent === index}
                            onComponentHasClick={onComponentHasClick}
                        />
                    </div>)
            }
            {props.isAdding && <Rnd size={props.mouseDragValue.size} position={props.mouseDragValue.position} className="border" />}
        </React.Fragment>
    )
})

export default Content
