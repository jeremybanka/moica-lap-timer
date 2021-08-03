import create from 'zustand'
import produce from 'immer'

type setter = (fn:((state:TimerStore) => void)) => void

interface TimerStore {
  set: setter
  isRunning: boolean
  lapTimes: number[]
  msElapsed: number
  recordLap: () => void
  tick: () => void
  tickDurationInMs: Readonly<number>
  toggleRunning: () => void
}

const useStore = create<TimerStore>((setState, getState) => {
  // immer's produce() grants the use of mutation patterns without the drawbacks
  const set: setter = fn => setState(produce(fn))
  const intoSum = (acc: number, current: number) => acc + current
  return ({
    set,
    lapTimes: [],
    isRunning: false,
    msElapsed: 0,
    recordLap: () =>
      getState().isRunning
        ? set(state => {
          const priorLapTimesTotal = state.lapTimes.reduce(intoSum, 0)
          const lapTime = state.msElapsed - priorLapTimesTotal
          state.lapTimes.push(lapTime)
        })
        : undefined,
    tick: () => set(state => { state.msElapsed += state.tickDurationInMs }),
    tickDurationInMs: 10,
    toggleRunning: () => set(state => { state.isRunning = !state.isRunning }),
  })
})

export default useStore
