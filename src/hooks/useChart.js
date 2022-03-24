import React, { useState, useEffect } from 'react';
import { useSession } from './useSession'
import ms from 'pretty-ms'

export const useChart = (id) => {
  const { getSession } = useSession();
  const [sessionData, setSessionData] = useState([])
  const [chartOptions, setChartOptions] = useState({
    chart: {
      id: 'line'
    },
    xaxis: {
      type: 'datetime',
      labels: {
        format: 
          'HH:mm'
      }
    },
    stroke: {curve: 'smooth'}
  })
  const [chartSeries, setChartSeries] = useState([
    {
      name: 'Understand',
      data: []
    },
    {
      name: 'Confused',
      data: []
    },
    {
      name: 'Bored',
      data: []
    },
    {
      name: 'Mind Blown',
      data: []
    },
  ])


  useEffect(() => {
    const fetchData = async () => {
      const data = await getSession(id)
      console.log(data)
      setSessionData(data)

      setChartOptions({
        chart: {
          id: data.title
        },
        xaxis: {
          labels: {
            datetimeFormatter: {
              hour: 'HH:mm'
            }
          }
        },
        stroke: 'smooth',
        markers: {
          size: 1,
      }
      })

      let liveDataDummy = []
      let feelingChange
      let updateResponse
      let currentFeelings = {
        'understand': 0,
        'confused': 0,
        'bored': 0,
        'mind blown': 0,
        'total': 0,
      }
      let chartSeriesData = []
      //mimic live data coming in to plot the graph over time
      data.responses.slice().reverse().forEach((response) => {
        liveDataDummy.unshift(response)
        if (liveDataDummy.slice(1).some((s) => {
          if ((s.response_type === 'feeling' && s.user_id === response.user_id)) {
            feelingChange = s.response
            return true
          }
          return false
        })) {
          updateResponse = {
            [response.response]: currentFeelings[response.response] + 1,
            [feelingChange]: currentFeelings[feelingChange] - 1,
            total: currentFeelings.total,
          }
        } else {
          updateResponse = {
            [response.response]: currentFeelings[response.response] + 1,
            total: currentFeelings.total + 1
          }
        }

        currentFeelings = { ...currentFeelings, ...updateResponse }
        const timeDiff = new Date(response.time) - new Date(data.time)

        console.log(timeDiff.toString())
        chartSeriesData.push({
          time: ms(timeDiff),
          Understand: currentFeelings.understand * 100 / currentFeelings.total
        ,
        
          Confused : currentFeelings.confused * 100 / currentFeelings.total
        ,
        
          Bored: currentFeelings.bored * 100 / currentFeelings.total
        ,
        
          'Mind Blown': currentFeelings['mind blown'] * 100 / currentFeelings.total
        })
        
      })

      setChartSeries(chartSeriesData)
    }
    fetchData()
  }, [])

  return { sessionData, chartOptions, chartSeries }
}