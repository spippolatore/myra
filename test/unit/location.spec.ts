import * as location from 'location' 

if (window.history && window.history.pushState) {
    
    const dispatch = (fn: any, args: any) => fn(undefined, args)

    describe('location module', () => {

        afterEach(() => {
            window.history.pushState('/', '', '/')
        })

        it('updateLocation updates window.location', () => {

            location.updateLocation('/some/path').execute(dispatch)

            expect(window.location.pathname).toBe('/some/path')
        })


        it('updateLocation serializes parameters', () => {

            location.updateLocation('/some/path', {
                foo: 'bar',
                baz: '1'
            }).execute(dispatch)
            
            expect(window.location.search).toBe('?foo=bar&baz=1')
        })

        // it('trackLocationChanges broadcasts message for subscribers', () => {

        //     location.trackLocationChanges()
        //     expect(window.location.search).toBe('?foo=bar&baz=1')
        // })

    })

}