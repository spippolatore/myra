import { defineComponent, Task } from 'myra/core'
import { route, updateLocation, matchLocation, trackLocationChanges, goBack, goForward, LocationData } from 'myra/location'
import { component, nothing } from 'myra/html'
import { section, h2, p, ul, li, a } from 'myra/html/elements'
import { routeComponent } from './route-component'


/**
 * Model
 */
type Model = undefined
const init = [undefined, trackLocationChanges()] as [Model, Task]


/**
 * Subscriptions
 */
const subscriptions = {
    '__locationChanged': (m: Model, _locationData: LocationData) => m
}


/**
 * View
 */
const view = (_: Model) => 
    section(
        h2('Location examples'),
        route({
            'test1': p(`Route to '/test1'.`),
            'test1/:param': component(routeComponent) 
        }),
        
        matchLocation('test1/:param') ? 
            p(`Location '/test2/:param' matched.`) : nothing(),
        ul({ 'class': 'list-group' },
            li({ class: 'list-group-item' },
                a({ href: '', onclick: { listener: updateLocation('/test1'), preventDefault: true } },
                    `Update location to '/test1'`
                )
            ),
            li({ class: 'list-group-item' },
                a({ href: '', onclick: { listener: updateLocation('/test1/test2'), preventDefault: true } },
                    `Update location to '/test1/test2'`
                )
            ),
            li({ class: 'list-group-item' },
                a({ href: '', onclick: { listener: goBack(), preventDefault: true } },
                    'Go back'
                )
            ),
            li({ class: 'list-group-item' },
                a({ href: '', onclick: { listener: goForward(), preventDefault: true } },
                    'Go forward'
                )
            )
        )
    )


/**
 * Component
 */
export const locationComponent = defineComponent({
    // The name of the component. Used for debugging purposes.
    name: 'LocationComponent',

    // Init takes either an initial model or a tuple of an initial model 
    // and one or more tasks to execute when the component is initialized.
    init: init,

    subscriptions: subscriptions,

    // The view function is called after update. 
    view: view
})