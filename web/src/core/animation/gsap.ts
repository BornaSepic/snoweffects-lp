import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { SplitText } from 'gsap/dist/SplitText'

export * from 'gsap'
export * from 'gsap/dist/ScrollToPlugin'
export * from 'gsap/dist/ScrollTrigger'
export * from 'gsap/dist/SplitText'

if (typeof window !== 'undefined' && gsap !== null) {
  gsap.config({
    nullTargetWarn: false
  })
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText)
  ScrollTrigger.config({
    ignoreMobileResize: true
  })
}
