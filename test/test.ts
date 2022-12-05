import {assert, fixture, html} from '@open-wc/testing'
import '../src/typing-test-element'

describe('typing-test', function () {
  describe('element creation', function () {
    it('creates from document.createElement', function () {
      const el = document.createElement('typing-test')
      assert.equal('TYPING-TEST', el.nodeName)
    })

    it('creates from constructor', function () {
      const el = new window.TypingTestElement()
      assert.equal('TYPING-TEST', el.nodeName)
    })
  })

  describe('after tree insertion', function () {
    beforeEach(async function () {
      await fixture(html` <typing-test></typing-test>`)
    })
  })
})
