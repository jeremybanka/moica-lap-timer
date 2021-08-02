import { useEffect, useCallback } from 'react'
import useStore from '../store'

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
          timerStore.laps.map((lap, idx) => (
            <li key={idx}>{lap}</li>
          ))
        }
      </ul>
      {timerStore.msElapsed}
    </div>
  )
}
export default Timer
