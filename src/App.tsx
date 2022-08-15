import './App.scss'
import React from 'react'
import BubbleChart from './components/BubbleChart/BubbleChart'
import { Types } from './components/BubbleChart/types'

function App() {

  const d: Types.Data[] = [
    { id: 1, name: 'React', size: 350, fillColor: '#d3d3d3' },
    { id: 2, name: 'Typescript', size: 100, fillColor: '#9d9a9f' },
    { id: 3, name: 'SCSS', size: 75, fillColor: '#605f62' },
    { id: 4, name: 'Recoil', size: 150, fillColor: '#D3D3D3' },
    { id: 5, name: 'Redux', size: 150, fillColor: '#D3D3D3' },
    { id: 6, name: 'Material-UI', size: 125, fillColor: '#c6c5c6' }
  ]

  const [data, setData] = React.useState<Types.Data[]>(d.slice(1, 10))

  return (
    <div className="App">
      <header className="App-header">
        <BubbleChart 
          bubblesData={data}
          width={800}
          height={600}
          textFillColor="darkgrey"
          minValue={1}
          maxValue={150}
          backgroundColor="white"
        />
      </header>
    </div>
  )
}

export default App
