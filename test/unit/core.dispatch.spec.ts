import { dispatch } from 'core/dispatch'
import { task, Task } from 'core'
import { text } from 'html'
/**
 * evolve
 */
describe('core.dispatch', () => {
    it('updates model and calls render', () => {
        const update = (x: number, arg: number) => x + arg
        const context = {
            name: '',
            view: () => text('a text'),
            parentNode: document.body,
            mounted: false,
            mountArg: undefined,
            dispatchLevel: 0,
            isUpdating: false,
            model: 1,
            oldView: undefined,
            rootNode: document.body
        }
        const render = () => {
            expect(context.model).toBe(2)
            return null as any as Node
        }
        dispatch(context, render, update, 2)
    })

    it('does not call render if dispatchLevel > 1', () => {
        const update = (x: number, arg: number) => x + arg
        const context = {
            name: '',
            view: () => text('a text'),
            parentNode: document.body,
            mounted: false,
            mountArg: undefined,
            dispatchLevel: 1,
            isUpdating: false,
            model: undefined,
            oldView: undefined,
            rootNode: document.body
        }
        const renderMock = {
            render: () => { 
                return null as any as Node
            }
        } 

        spyOn(renderMock, 'render')

        dispatch(context, renderMock.render, update, 2)
        
        expect(renderMock.render).not.toHaveBeenCalled()
    })

    it('throws if already updating', () => {
        const update = (x: number, arg: number) => x + arg
        const context = {
            name: '',
            view: () => text('a text'),
            parentNode: document.body,
            mounted: false,
            mountArg: undefined,
            dispatchLevel: 0,
            isUpdating: true,
            model: 1,
            oldView: undefined,
            rootNode: document.body
        }
        const render = () => {
            return null as any as Node
        }

        expect(() => dispatch(context, render, update, 2)).toThrow()
    })

    it('updates model and executes task', () => {
        const testTask = task(dispatch => {
            expect(dispatch).toBeDefined()
        })

        const update = (x: number, arg: number) => [x + arg, testTask] as [number, Task]
        const context = {
            name: '',
            view: () => text('a text'),
            parentNode: document.body,
            mounted: false,
            mountArg: undefined,
            dispatchLevel: 0,
            isUpdating: false,
            model: 1,
            oldView: undefined,
            rootNode: document.body
        }
        const render = () => {
            expect(context.model).toBe(2)
            return null as any as Node
        }
        dispatch(context, render, update, 2)
    })

    
    it('updates model and executes array of tasks', () => {
        const testTask1 = task(dispatch => {
            expect(dispatch).toBeDefined()
        })
        const testTask2 = task(dispatch => {
            expect(dispatch).toBeDefined()
        })
        const update = (x: number, arg: number) => [x + arg, [testTask1, testTask2]] as [number, Task[]]
        const context = {
            name: '',
            view: () => text('a text'),
            parentNode: document.body,
            mounted: false,
            mountArg: undefined,
            dispatchLevel: 0,
            isUpdating: false,
            model: 1,
            oldView: undefined,
            rootNode: document.body
        }
        const render = () => {
            expect(context.model).toBe(2)
            return null as any as Node
        }
        dispatch(context, render, update, 2)
    })
})
