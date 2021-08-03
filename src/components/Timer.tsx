/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { useEffect, useCallback, useMemo } from 'react'
import useStore from '../store'
import { msToClockUnits } from '../util/printTime'

const Timer: React.FC = () => {
  const timerStore = useStore()
  const [hr, mn, sc, cs] = msToClockUnits(timerStore.msElapsed)

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
    <div css={css`
      height: 100vh;
      display: flex;
      flex-direction: column;
    `}
    >
      <h1>
        {
          `${hr}:${mn}:${sc}.${cs}`
        }
      </h1>
      <ul>
        {
          printedLaps.map((lap, idx) => (
            <li key={idx}>{lap}</li>
          ))
        }
      </ul>
      <section>
        <button type="button" onClick={() => timerStore.toggleRunning()}>
          {timerStore.isRunning ? `Stop` : `Start`}
        </button>
        <button type="button" onClick={() => timerStore.recordLap()}>
          Lap
        </button>
      </section>
    </div>
  )
}
export default Timer
