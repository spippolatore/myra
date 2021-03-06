import { defineComponent, evolve } from 'myra/core'
import { httpRequest, HttpResponse } from 'myra/http'
import { nothing } from 'myra/html'
import { section, div, h2, p, strong, button } from 'myra/html/elements'


/**
 * Model
 */
type ResponseStatus = 'init' | 'success' | 'failure'
type Model = {
    responseStatus: ResponseStatus
    response?: HttpResponse
}
const init: Model = {
    responseStatus: 'init'
}


/**
 * Updates
 */
const httpSuccess = (model: Model, response: HttpResponse) => 
    evolve(model, m => {
        m.responseStatus = 'success'
        m.response = response
    })

const httpFailure = (model: Model, response: HttpResponse) => 
    evolve(model, m => {
        m.responseStatus = 'failure'
        m.response = response
    })

const httpRequestTask = 
    httpRequest(httpSuccess, httpFailure, {
        method: 'GET',
        url: 'https://api.github.com/repos/jhdrn/myra'
    })


/**
 * View
 */
const view = (model: Model) => 
    section(
        h2('HTTP example'),
        button({ type: 'button',
                 'class': 'btn btn-sm btn-default',
                 onclick: httpRequestTask },
            'Make HTTP request'
        ),
        p(`Response status: ${model.responseStatus}`),
        model.response ? 
            div(
                model.response.status,
                model.response.statusText,
                model.responseStatus === 'success' ? 
                    p(strong('Response text:'), model.response.data) 
                    : nothing()
            ) : nothing() 
    )


/**
 * Component
 */
export const httpComponent = defineComponent({
    // The name of the component. Used for debugging purposes.
    name: 'HttpComponent',

    // Init takes either an initial model or a tuple of an initial model 
    // and one or more tasks to execute when the component is initialized.
    init: init,

    // The view function is called after update. 
    view: view
})