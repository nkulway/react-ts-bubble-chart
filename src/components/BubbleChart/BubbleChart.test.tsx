/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: src/component/BubbleChart/BubbleChart.test.tsx
*/

import React from 'react'
import { shallow } from 'enzyme'
import BubbleChart from './BubbleChart'

describe('<BubbleChart />', () => {
  let component

  beforeEach(() => {
    component = shallow(<BubbleChart bubblesData={[]} width={0} height={0} backgroundColor={''} textFillColor={''} minValue={0} maxValue={0} />)
  });

  test('It should mount', () => {
    expect(component.length).toBe(1)
  })
})
