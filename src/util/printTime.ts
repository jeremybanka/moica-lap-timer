const MS_PER_HR = 3600000
const MS_PER_MN = 60000
const MS_PER_SC = 1000
const MS_PER_CS = 10

const clockStringify = (natural:number): string =>
  natural <= 9
    ? `0${natural}`
    : `${natural}`

const printTime = (ms:number): string => {
  let hr = 0
  let mn = 0
  let sc = 0
  let cs = 0

  console.log(ms)

  while (ms > MS_PER_HR) {
    ms -= MS_PER_HR
    hr += 1
  }
  while (ms > MS_PER_MN) {
    ms -= MS_PER_MN
    mn += 1
  }
  while (ms > MS_PER_SC) {
    ms -= MS_PER_SC
    sc += 1
  }
  while (ms > MS_PER_CS) {
    ms -= MS_PER_CS
    cs += 1
  }

  console.log(hr, mn, sc, cs)

  const hrStr = clockStringify(hr)
  const mnStr = clockStringify(mn)
  const scStr = clockStringify(sc)
  const csStr = clockStringify(cs)

  return `${hrStr}:${mnStr}:${scStr}.${csStr}`
}

export default printTime
