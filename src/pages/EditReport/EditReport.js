import React, { useEffect , useRef} from "react";
import EditBar from "./components/EditBar";
import ViewBar from "./components/ViewBar";
import "./EditReport.css";


export default function EditReport(props) {

    return (
        <div>
            <div className="row">
                <div className="col-2 bg-info"> menu</div>
                <div className="col-10">
                    <div className="rightColumn p-3">
                        <h2>My report</h2>
                        {
                            props.isEdit == true ? (
                                <EditBar/>

                            ): (
                                <ViewBar/>
                            )
                        }

                        <div>
                            <div className="m-2 content"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
