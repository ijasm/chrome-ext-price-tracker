export class Product {
  constructor(public url: string, public price: number, public priceDOMInfo: HTMLDOMInfo) {
  }
}

export class HTMLDOMInfo {
  constructor(public tagName: string, public idName: string, public className: string, public parent?: HTMLDOMInfo) {
  }
}
