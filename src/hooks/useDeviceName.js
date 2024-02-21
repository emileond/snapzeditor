import { useEffect, useState } from 'react'

export default function useDeviceName() {
  const [deviceName, setDeviceName] = useState('Unknown Device')

  useEffect(() => {
    const test = (regexp) => regexp.test(navigator.userAgent)

    let detectedBrowser = 'Unknown browser'
    const platform = navigator.platform

    if (test(/opr\//i) || !!window.opr) {
      detectedBrowser = 'Opera'
    } else if (test(/edg/i)) {
      detectedBrowser = 'Microsoft Edge'
    } else if (test(/chrome|chromium|crios/i)) {
      detectedBrowser = 'Google Chrome'
    } else if (test(/firefox|fxios/i)) {
      detectedBrowser = 'Mozilla Firefox'
    } else if (test(/safari/i) && !test(/chrome|chromium|crios/i)) {
      detectedBrowser = 'Apple Safari'
    } else if (test(/trident/i)) {
      detectedBrowser = 'Microsoft Internet Explorer'
    } else if (test(/ucbrowser/i)) {
      detectedBrowser = 'UC Browser'
    } else if (test(/samsungbrowser/i)) {
      detectedBrowser = 'Samsung Browser'
    }

    setDeviceName(`${detectedBrowser} ${platform}`)
  }, [])

  return deviceName
}
