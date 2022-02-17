class Carrousel {
    constructor (element, options = {}) {
        this.element = element
        this.options = Object.assign({}, {
            slideToScroll: 1,
            slideVisible: 7
        }, options)
        
        let root = this.createDivWithClass("carrousel")
        let container = this.createDivWithClass('carrousel__container')
        root.appendChild(container)
        this.element.appendChild(root)

        
    }


    createDivWithClass(className) {
        let div = document.createElement('div')
        div.setAttribute('class', className)
        return div
    }
}








document.addEventListener('DOMContentLoaded', function (){
    new Carrousel(document.querySelector("boxMovie1"), {})
})