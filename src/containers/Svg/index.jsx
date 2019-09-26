import React from 'react';
import {INITIAL_VALUE, ReactSVGPanZoom, TOOL_NONE} from 'react-svg-pan-zoom';
import {Col, Row} from "reactstrap";

export default class SVG extends React.PureComponent {

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
        const {farm} = this.props;
        const {fill, idClicked} = this.state;

        const paths = [];
        const pointsData = farm ? farm : false;
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
