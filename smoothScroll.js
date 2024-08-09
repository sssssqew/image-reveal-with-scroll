function lerp(start, end, t){
    return start * (1 - t) + end * t
}
class SmoothScroll{
    constructor(el, images){
        this.el = el  // scrollable 요소
        console.log(el)
        this.images = images 
        this.currentY = 0
        this.targetY = 0
        this.setup()
        this.onWindowResize()
        this.animate()
    }
    setup(){
        document.body.style.height = `${this.el.offsetHeight}px` 
        window.addEventListener('scroll',  () => {
            this.targetY = window.scrollY 
        })
    }
    onWindowResize(){
        window.addEventListener('resize', () => {
            document.body.style.height = `${this.el.offsetHeight}px`
        })
    }
    // top > 0 : 이미지는 브라우저 수평중앙선 아래 위치함
    // top < 0 : 이미지는 브라우저 수평중앙선 위에 위치함
    // top == 0 : 이미지가 브라우저 수평중앙선에 위치함
    animate(){
        // console.log('hi')
        this.currentY = lerp(this.currentY, this.targetY, .037)
        this.el.style.transform = `translate3d(0, ${-this.currentY}px, 0)`
        for(let i=0; i<this.images.length; i++){
            let {top, height} = this.images[i].parentElement.getBoundingClientRect() // image_wrapper
            top -= (window.innerHeight / 2) - (height / 2) // 이미지가 브라우저 중앙수평선에서 얼마나 떨어져 있는지에 대한 거리
            top = top * .15 // 스케일링 (15%)
            const imageTop = top // top 을 제한하기 전의 값을 사용해야 하므로 해당 변수에 저장해서 사용함

            // 이미지가 브라우저 수평중앙선 아래에 있을때는 50부터 점점 줄어들다가 브라우저 수평중앙선을 넘어 위로 올라가면 계속 0이다
            // clip path transformation
            top = top < 0 ? 0 : top >= 50 ?  50: top // top 의 범위를 0 ~ 50으로 제한함
            this.images[i].style.clipPath = `polygon(${0 + top}% 0%, ${100 - top}% 0%, ${100 - top}% 100%, ${0+top}% 100%)` // top 이 브라우저 수평중앙선보다 아래에 있을때는 50부터 점점 줄어들므로 
            // clip-path 에 의하여 이미지의 수직중앙부터 시작해서 좌우로 이미지가 서서히 드러나기 시작함
            // 이미지가 브라우저 수평중앙선에 도달한 시점에는 top 이 0이므로 이미지가 완전히 드러남
            this.images[i].style.transform = `translate3d(0, ${imageTop}px, 0)` // top 이 50부터 0으로 점점 줄어들므로 이미지가 점점 위로 올라가면서 위쪽 부분이 서서히 드러남
        }
       

        requestAnimationFrame(this.animate.bind(this))
    }
}
export {SmoothScroll}