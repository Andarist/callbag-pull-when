export default function sampleWhen(sampler) {
  return pullable => (start, sink) => {
    if (start !== 0) return

    let pullableTalkback
    let samplerTalkback

    pullable(0, (type, data) => {
      if (type === 0) {
        pullableTalkback = data

        sampler(0, (type, data) => {
          if (type === 0) {
            samplerTalkback = data
            return
          }

          if (type === 1) {
            pullableTalkback(1)
            return
          }

          if (type === 2) {
            pullableTalkback(2)
            sink(2)
            return
          }
        })

        sink(0, end => {
          if (end !== 2) return

          pullableTalkback(2)
          samplerTalkback(2)
        })
        return
      }

      if (type === 1) {
        sink(1, data)
        return
      }

      if (type === 2) {
        samplerTalkback(2)
        sink(2)
        return
      }
    })
  }
}
