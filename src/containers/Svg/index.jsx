import React from 'react';
import {INITIAL_VALUE, ReactSVGPanZoom, TOOL_NONE} from 'react-svg-pan-zoom';
import {Card, CardBody, Col, Row} from "reactstrap";
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
        fill: "white",
        startLongON: false
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

    // handle all clicks long and regular
    handleClicks(ON, clickId=false) {
        let localON = false;

        if (ON){
            this.setState({startLongON: true});
            console.log("started long press");
            localON = true
        }else {
            this.setState({startLongON: false});
            console.log("Cancel long press")
        }

        let timer = null;
        if (localON){
            console.log("aki start");
            timer = setTimeout(()=> {
               if (this.state.startLongON){
                   // handle long press
                   console.log("Long pressed executed");
                   this.setState({startLongON: false});
               }
           }, 2000)
        }
        // handle regular click
        else if (!ON && clickId){
            alert("just click" + clickId);
            clearTimeout(timer);
        }
    }

    render() {
        const {farm, colorData} = this.props;
        const {fill, idClicked} = this.state;
        console.log("colorData", colorData);

        const paths = [];
        const pointsData = farm ? farm : false;

        if (pointsData){
            pointsData["points"].forEach((point, index) => {

                let color = fill;
                if (colorData){
                    const id = pointsData["pointsIds"][index];
                    if(colorData[id]){
                        color = colors[colorData[id]["vertexPhase"]];
                    }
                }else {
                    color = idClicked.includes(index) ? "red" : fill;
                }

                paths.push(
                    <polygon
                        id={pointsData["pointsIds"][index]}
                        onMouseUp={()=> {
                            const {startLongON} = this.state;
                            const id = pointsData["pointsIds"][index];
                                if (startLongON){
                                    this.handleClicks(false, id)
                                }
                            }
                        }
                        // onTouchStart={}
                        // onTouchEnd={}
                        onMouseDown={()=> this.handleClicks(true)}
                        onMouseLeave={()=>this.handleClicks(false)}
                        points={point}
                        style={{
                            fill: color, stroke:"black", strokeWidth:0.2
                        }}
                    />
                )
            });
        }

        return (
            <Col md={12}>

                        <div className='main__content'>

                            <div className='main__btn'>
                                {/*<button className="btn btn-primary account__btn account__btn--small" onClick={() => this.zoomOnViewerCenter()}>Zoom in</button>*/}
                                {/*<button className="btn btn-primary account__btn account__btn--small" onClick={() => this.fitSelection()}>Zoom area 200x200</button>*/}
                                <button className="btn btn-primary account__btn account__btn--small" onClick={() => this.fitToViewer()}>center</button>
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

            </Col>

        );
    }
}

export default withRouter(connect(state => ({
    socket: state.socket,
    project: state.project,
    colorData: state.colorData
}))(SVG));