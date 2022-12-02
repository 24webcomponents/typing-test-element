const html = String.raw
/**
 * An example Custom Element. This documentation ends up in the
 * README so describe how this elements works here.
 *
 * You can event add examples on the element is used with Markdown.
 *
 * ```
 * <typing-test></typing-test>
 * ```
 */
class TypingTestElement extends HTMLElement {
  #renderRoot = this.attachShadow({mode: 'open'})
  #started = false
  #position = 0
  #feedback!: HTMLElement

  get started() {
    return this.#started
  }

  connectedCallback(): void {
    // eslint-disable-next-line github/no-inner-html
    this.#renderRoot.innerHTML = html`
      <style>
        p span {
          color: green;
        }
        p del {
          color: red;
        }
      </style>
      <slot></slot>
      <p></p>
    `
    this.ownerDocument.addEventListener('keypress', this)
    // eslint-disable-next-line custom-elements/no-dom-traversal-in-connectedcallback
    this.#feedback = this.#renderRoot.querySelector<HTMLElement>('p')!
  }

  start() {
    this.#started = true
    this.#position = 0
  }

  stop() {
    this.#started = false
  }

  #continue() {
    this.#feedback.querySelectorAll('del').forEach(e => e.remove())
    const span = this.ownerDocument.createElement('span')
    span.textContent = this.textContent?.[this.#position] || ''
    this.#feedback.append(span)
    this.#position += 1
  }

  #error(character: string) {
    this.#feedback.querySelectorAll('del').forEach(e => e.remove())
    const del = this.ownerDocument.createElement('del')
    del.textContent = character
    this.#feedback.append(del)
  }

  handleEvent(event) {
    if (!this.#started) return
    const character = this.textContent?.[this.#position]
    console.log(event.key, character)
    if (event.key === character) {
      this.#continue()
    } else {
      this.#error(event.key)
    }
  }
}

declare global {
  interface Window {
    TypingTestElement: typeof TypingTestElement
  }
}

export default TypingTestElement

if (!window.customElements.get('typing-test')) {
  window.TypingTestElement = TypingTestElement
  window.customElements.define('typing-test', TypingTestElement)
}
