import './BubbleChart.scss'
import * as d3 from 'd3'
import React from 'react'
import { Simulation, SimulationNodeDatum } from 'd3'
import { Types } from './types'

const uuid = require('react-uuid')

export default class BubbleChart extends React.PureComponent<IBubbleChartProps, IBubbleChartState> {

  public forceData: Types.ForceData[]

  private simulation: Simulation<SimulationNodeDatum, undefined> | undefined

  constructor(props: IBubbleChartProps) {
    super(props)
    this.state = {
      data: []
    }
    this.forceData = this.setForceData(props)
  }

  componentDidMount() {
    this.animatebubbles()
  }

  setForceData = (props: IBubbleChartProps) => {
    const d : any[] = []
    for (let i = 0; i < props.bubblesData.length; i++) {
      d.push({
        'size': props.bubblesData[i].size
      })
    }
    return d
  }

  animatebubbles = () => {
    if ( this.props.bubblesData.length > 0 ) {
      this.simulatePositions(this.forceData)
    }
  }

  simulatePositions = (data: Types.ForceData[]) => {
    this.simulation = d3
      .forceSimulation()
      .nodes(data as SimulationNodeDatum[])
      .velocityDecay(0.05)
      .force('x', d3.forceX().strength(0.2))
      .force('y', d3.forceX().strength(0.2))
      .force(
        'collide',
        d3.forceCollide((d) => this.radiusScale((d as Types.ForceData).size))
      )
      .on('tick', () => {
        this.setState({ data })
      })
  }

  radiusScale = (value: d3.Numeric) => {
    const fx = d3
      .scaleSqrt()
      .range([1, 50])
      .domain([this.props.minValue, this.props.maxValue])
    return fx(value)
  }


  renderBubbles = (data: []) => data.map((item: Types.ForceDataComplete, index) => {
      const { props } = this
      const fontSize = this.radiusScale((item as unknown as Types.ForceData).size) / 4
      const content = props.bubblesData.length > index ? props.bubblesData[index].name : ''
      const strokeColor = props.bubblesData.length > index ? 'darkgrey' : this.props.backgroundColor

      return (
        <g 
        key={`g-${uuid}`}
        transform={`translate(${props.width / 2 + item.x - 70}, ${props.height / 2 + item.y })`}
        >
          <circle 
          style={{ cursor: 'pointer' }}
          r={this.radiusScale(item.size)}
          fill={props.bubblesData[index].fillColor}
          stroke={strokeColor}
          strokeWidth="2"
          />
          <text 
          className='bubbleText'
          fill={this.props.textFillColor}
          fontSize={`${fontSize}px`}
          fontWeight="normal"
          >
            {content}
          </text>
        </g>
      )
    })

  render() {
    return (
      <div className="chart" style={{ background: this.props.backgroundColor, cursor: 'pointer' }}>
        <svg 
        width={this.props.width} 
        height={this.props.height}
        >
          {this.renderBubbles(this.state.data as [])}
        </svg>
      </div>
    )
  }
}

interface IBubbleChartProps {
  bubblesData: Types.Data[]
  width: number
  height: number
  backgroundColor: string
  textFillColor: string
  minValue: number
  maxValue: number
}

interface IBubbleChartState {
  data: Types.ForceData[]
}