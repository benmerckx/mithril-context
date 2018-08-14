import {createContext} from '.'
import m from 'mithril'

const Test = createContext(0)

const Example = {
  count: 50,
  view() {
    return m('div', [
      m('', `Out: ${this.count}`),
      m(Test.Provider, {value: this.count}, [
        m('input[type=range]', {
          min: 0, max: 100,
          value: this.count,
          oninput: e => {
            console.log('in')
            this.count = e.target.value
          }
        }),
        m('', `Direct: ${this.count}`),
        m(Test.Consumer, count => 
          m('', `From consumer: ${count}`)
        ),
        m(Test.Provider, {value: this.count * 2}, [
          m('div', 'Nested provider'),
          m(Test.Consumer, count => 
            m('', [
              `From nested consumer: ${count}`,
              m('input[type=range]', {
                min: 0, max: 100,
                value: this.count,
                oninput: e => this.count = e.target.value
              })
            ])
          )
        ]),
        m(Test.Consumer, count => 
          m('', `From consumer: ${count}`)
        )
      ]),
      m('div', [
        m('input[type=range]', {
          min: 0, max: 100,
          value: this.count,
          oninput: e => this.count = e.target.value
        })
      ])
    ])
  }
}

m.mount(document.body, Example)