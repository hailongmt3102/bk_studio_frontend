import React, { useEffect, useRef, useState } from 'react'
import { getAllComponent } from 'api/Report'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, ArcElement, LineElement, Title, Tooltip, Legend, BarElement } from 'chart.js';
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


export default function Content(props) {
    const [components, setComponents] = useState([])
    const ShapeRef = useRef([]);
    ShapeRef.current = []
    const addToRefs = (el, index) => {
        if (el && !ShapeRef.current.includes(el) && !Object.keys(ShapeRef.current).includes(index.toString())) {
            ShapeRef.current.push(el);
        }
    };

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
        let currentProject = localStorage.getItem("currentProject")
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

    useEffect(() => {
        getComponents()
    }, [])
    return (
        <React.Fragment>
            <button onClick={() => {
                ShapeRef.current.map(shape => shape.SaveShape())
            }}>
                save
            </button>
            {
                components.map((component, index) => <Shape ref={el => addToRefs(el, index)} data={component} key={index} />)
            }

        </React.Fragment>
    )
}
