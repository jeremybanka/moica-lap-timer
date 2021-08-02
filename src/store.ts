import create from 'zustand'
import produce from 'immer'

type setter = (fn:((state:TimerStore) => void)) => void

interface TimerStore {
  tickDurationInMs: Readonly<number>
  msElapsed: number
  isRunning: boolean
  laps: number[]
  set: setter
  recordLap: () => void
  tick: () => void
  toggleRunning: () => void
}

const useStore = create<TimerStore>((setState, get) => {
  // immer's produce() grants the use of mutation patterns without the drawbacks
  const set: setter = fn => setState(produce(fn))
  const intoSum = (acc = 0, current = 0): number => acc + current
  return ({
    set,
    tickDurationInMs: 10,
    isRunning: false,
    laps: [],
    msElapsed: 0,
    recordLap: () =>
      get().isRunning
        ? set(state => {
          const priorLapsTotalMs = state.laps.reduce(intoSum, 0)
          const lapTime = state.msElapsed - priorLapsTotalMs
          state.laps.push(lapTime)
        })
        : undefined,
    tick: () => set(state => { state.msElapsed += state.tickDurationInMs }),
    toggleRunning: () => set(state => { state.isRunning = !state.isRunning }),
  })
})

export default useStore

// const [timerIsRunning, setTimerIsRunning] = useState(false)
//   const [millisecondsElapsed, setMillisecondsElapsed] = useState(0)
//   const emptyLaps: number[] = []
//   const [laps, setLaps] = useState(emptyLaps)
