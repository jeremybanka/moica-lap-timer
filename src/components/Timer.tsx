import { useEffect, useCallback, useMemo } from 'react'
import useStore from '../store'
import { msToClockUnits } from '../util/printTime'

const Timer: React.FC = () => {
  const timerStore = useStore()

  const tick = useCallback(async () => timerStore.tick(), [])

  useEffect(() => {
    const timerId = setInterval(
      timerStore.isRunning
        ? tick
        : () => undefined,
      timerStore.tickDurationInMs
    )
    return () => clearInterval(timerId)
  }, [timerStore.isRunning])

  const printedLaps = useMemo(() =>
    timerStore.lapTimes.map(
      lapTime => msToClockUnits(lapTime)
    ), [timerStore.lapTimes])

  // console.log(timerStore)
  return (
    <div className="container">
      <button type="button" onClick={() => timerStore.toggleRunning()}>
        {timerStore.isRunning ? `Stop` : `Start`}
      </button>
      <button type="button" onClick={() => timerStore.recordLap()}>
        Lap
      </button>
      <ul>
        {
          printedLaps.map((lap, idx) => (
            <li key={idx}>{lap}</li>
          ))
        }
      </ul>
      {msToClockUnits(timerStore.msElapsed)}
    </div>
  )
}
export default Timer
