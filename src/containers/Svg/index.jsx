import React from 'react';
import {INITIAL_VALUE, ReactSVGPanZoom, TOOL_NONE} from 'react-svg-pan-zoom';
import {Col, Row} from "reactstrap";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

const colors = {
    "Pile Installation" : '#3072B2',
    "Pile Quality Control" : '#5C9E1F',
    "Riser Installation" : '#8A3F95',
    "Top Chord Installation" : '#1AD0D0',
    "Racking (Purlin) Installation" : '#FF750B',
    "Racking (Purlin) Quality Control" : '#A77F06',
    "Module Installation" : '#FB75B8',
    "Module Quality Control" : '#A7EA22',
    "Plug and Play Installation" : '#7675D1',
    "Grounding Installation" : '#9E4B1F',
    "Harness Installation" : '#B46DB8',
    "Combiner Box Installation" : '#CC7A0B',
    "Combiner Box Quality Control" : '#199E71',
    "Combiner Box Termination" : '#F5EB5B',
    "CAB Installation" : '#B8E5FE',
    "DC Feeder Installation" : '#83D3C2',
    "Inverter Installation" : '#FEA55D',
    "Inverter Quality Control" : '#FECCE4',
    "Inverter Termination" : '#E35103',
    "Lower Bearing Installation" : '#B7B1D8',
    "Tourque Tube Installation" : '#FC725D',
    "Purlin Bracket Installation" : '#72A3C9',
    "Electrical Array Quality Control" : '#F799AF',
    "Table Electrical Quality Control" : '#2E2E30',
    24 : '#CA9731',
};


class SVG extends React.PureComponent {

    state = {
        tool: TOOL_NONE,
        value: INITIAL_VALUE,
        fill: "grey",
        idClicked: []
    };

    Viewer = null;


    componentDidMount() {
        this.Viewer.fitToViewer();
    }

    changeTool(nextTool) {
        this.setState({tool: nextTool})
    }

    changeValue(nextValue) {
        this.setState({value: nextValue})
    }

    fitToViewer() {
        this.Viewer.fitToViewer()
    }

    fitSelection() {
        this.Viewer.fitSelection(40, 40, 200, 200)
    }

    zoomOnViewerCenter() {
        this.Viewer.zoomOnViewerCenter(1.1)
    }

    handleClick(id) {
        this.setState({idClicked: [...this.state.idClicked, id]})
    }


    render() {
        const {farm, colorData} = this.props;
        const {fill, idClicked} = this.state;

        console.log("colorData", colorData);

        const paths = [];
        const pointsData = farm ? farm : false;

        function renderPointsData(withColor) {

            pointsData["points"].forEach((point, index) => {

                let color = null;
                if (withColor){
                    // render with color
                    const id = pointsData["pointsIds"][index];
                    if(colorData[id] && index === 0){
                        alert(colorData[id])
                    }
                }else {
                    color = idClicked.includes(index) ? "red" : fill;
                }

                paths.push(
                    <polygon
                        id={pointsData["pointsIds"][index]}
                        onClick={()=>{
                            const id = pointsData["pointsIds"][index];
                            alert(id);
                            this.handleClick(id)
                        }}
                        points={point}
                        style={{
                            fill: color, stroke:"black", strokeWidth:0.2
                        }}
                    />
                )
            });
        }
        if (pointsData){
            pointsData["points"].forEach((point, index) => {
                const color = idClicked.includes(index) ? "red" : fill;
                paths.push(
                    <polygon
                        id={pointsData["pointsIds"][index]}
                        onClick={()=>{
                            const id = pointsData["pointsIds"][index];
                            alert(id);
                            this.handleClick(id)
                        }}
                        points={point}
                        style={{
                            fill: color, stroke:"black", strokeWidth:0.2
                        }}
                    />
                )
            });
        }
        // Do when colorData is added
        if (pointsData && colorData){
            pointsData["points"].forEach((point, index) => {

                let color = null;
                if (colorData){
                    // render with color
                    const id = pointsData["pointsIds"][index];
                    if(colorData[id]){
                        // color = colorData[id]
                        color = colors[colorData[id]["vertexPhase"]];
                    }
                }else {
                    color = idClicked.includes(index) ? "red" : fill;
                }

                paths.push(
                    <polygon
                        id={pointsData["pointsIds"][index]}
                        onClick={()=>{
                            const id = pointsData["pointsIds"][index];
                            alert(id);
                            this.handleClick(id)
                        }}
                        points={point}
                        style={{
                            fill: color, stroke:"black", strokeWidth:0.2
                        }}
                    />
                )
            });
        }

        return (
            <div className='main__content'>

                <div className='main__btn'>
                            {/*<button className="btn btn-primary account__btn account__btn--small" onClick={() => this.zoomOnViewerCenter()}>Zoom in</button>*/}
                            {/*<button className="btn btn-primary account__btn account__btn--small" onClick={() => this.fitSelection()}>Zoom area 200x200</button>*/}
                            <button className="btn btn-primary account__btn account__btn--small" onClick={() => this.fitToViewer()}>Fit</button>
                </div>


                <div className='main__graphic'>
                    <ReactSVGPanZoom
                        width={800} height={650}
                        ref={Viewer => this.Viewer = Viewer}
                        tool={this.state.tool} onChangeTool={tool => this.changeTool(tool)}
                        value={this.state.value} onChangeValue={value => this.changeValue(value)}
                    >
                        <svg width={800} height={800}>
                            <g fillOpacity=".5">
                                {paths}
                            </g>
                        </svg>
                    </ReactSVGPanZoom>
                </div>
            </div>
        );
    }
}

export default withRouter(connect(state => ({
    socket: state.socket,
    project: state.project,
    controllerData: state.controllerData,
    colorData: state.colorData
}))(SVG));