import { Update, View, defineComponent } from 'myra/core'
import * as jsxFactory from 'myra/html/jsxFactory'


/**
 * Model
 */
type Model = string | undefined
const model: Model = undefined


/**
 * Update 
 */
const mount: Update<Model, any> = (_) => 'Hello world!'


/**
 * View
 */
const view: View<Model> = (model) => <p>a<span>{ model }</span><span>{ model }</span></p>


/**
 * Define a component
 */
const appComponent = defineComponent({
    name: 'HelloWorldApp',
    init: model,
    mount: mount,
    view: view
})


/**
 * Execute and mount component
 */
appComponent.mount(document.body)