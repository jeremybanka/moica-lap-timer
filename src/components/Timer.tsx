/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { useEffect, useCallback, useMemo } from 'react'
import useStore from '../store'
import { msToClockUnits, msToClockString } from '../util/printTime'

const blinking = css`animation: blink 1s steps(2, jump-end) infinite;`

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
      lapTime => msToClockString(lapTime)
    ), [timerStore.lapTimes])

  // console.log(timerStore)
  return (
    <div css={css`
      height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      h1 {
        color: var(--ion-color-primary);
        font-weight: 300;
        margin-top: 70px;
        &, span {
          font-size: 81px;
        }
        span {
          ${timerStore.isRunning && blinking}
        }
      }
      ul {
        display: flex;
        flex-direction: column;
        list-style-type: none;
        flex-grow: 1;
        justify-content: center;
        li {
          span {
            user-select: none;
            pointer-events: none;
            color: var(--ion-color-medium-shade)
          }
        }
      }
      section {
        display: flex;
        justify-content: space-between;
        width: calc(100% - 100px);
        max-width: 500px;
        height: 200px;
        button {
          --fg-color: #777;
          color: var(--fg-color);
          font-weight: 500;
          height: 90px;
          width: 90px;
          border: 2px solid var(--fg-color);
          border-radius: 45px;
          &:disabled {
            opacity: 50%;
            cursor: not-allowed;
          }
          &.clear {
            --fg-color: var(--ion-color-danger);
          }
          &.start {
            --fg-color: var(--ion-color-primary);
          }
        }
      }
    `}
    >
      <h1>
        {hr}
        <span>
          :
        </span>
        {mn}
        <span>
          :
        </span>
        {sc}
        <span>
          .
        </span>
        {cs}
      </h1>
      <ul>
        {
          printedLaps.map((lap, idx) => (
            <li key={idx}><span>Lap {idx + 1}: </span>{lap}</li>
          ))
        }
      </ul>
      <section>
        <button
          className="lap"
          type="button"
          disabled={!timerStore.isRunning}
          onClick={() => timerStore.recordLap()}
        >
          Lap
        </button>
        <button
          className="start"
          type="button"
          onClick={() => timerStore.toggleRunning()}
        >
          {timerStore.isRunning ? `Stop` : `Start`}
        </button>
      </section>
    </div>
  )
}
export default Timer
