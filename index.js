import {SmoothScroll} from './smoothScroll.js'

const scrollable = document.querySelector('.scrollable')
const images = [...document.querySelectorAll('img')]

new SmoothScroll(scrollable, images)

