import { Map } from 'core/contract'
import { validateField, validateForm } from 'core/validation'

/**
 * evolve
 */
describe('core.validation', () => {
    it('validateField calls validator', () => {
        const mocks = {
            validate: (_: string) => ({
                valid: false,
                errors: ['An error message']
            })
        }

        spyOn(mocks, 'validate').and.callThrough()

        expect(JSON.stringify(validateField('asd', [mocks.validate]))).toEqual(JSON.stringify({
            valid: false,
            errors: ['An error message']
        }))
        expect(mocks.validate).toHaveBeenCalledTimes(1)
    })

    it('validateField calls validator with a successful validation', () => {
        const mocks = {
            validate: (_: string) => ({
                valid: true,
                errors: []
            })
        }

        spyOn(mocks, 'validate').and.callThrough()

        expect(JSON.stringify(validateField('asd', [mocks.validate]))).toEqual(JSON.stringify({
            valid: true,
            errors: []
        }))
        expect(mocks.validate).toHaveBeenCalledTimes(1)
    })

    it('validateForm calls validators', () => {
        const mocks = {
            validateForm: (_: Map<string>) => ({
                valid: false,
                errors: ['A form error'],
                fields: {
                    foo: {
                        valid: true,
                        errors: []
                    },
                    bar: {
                        valid: false,
                        errors: ['An error']
                    },
                }
            }),
            validateField1: (_: string) => ({
                valid: true,
                errors: []
            }),
            validateField2: (_: string) => ({
                valid: false,
                errors: ['An error']
            })
        }

        spyOn(mocks, 'validateForm').and.callThrough()
        spyOn(mocks, 'validateField1').and.callThrough()
        spyOn(mocks, 'validateField2').and.callThrough()

        const formData = {
            foo: 'bar',
            bar: 'baz'
        }
        const fieldValidators = {
            foo: [mocks.validateField1],
            bar: [mocks.validateField2]
        }
        expect(JSON.stringify(validateForm(formData, [mocks.validateForm], fieldValidators))).toEqual(JSON.stringify({
            valid: false,
            errors: ['A form error'],
            fields: {
                foo: {
                    valid: true,
                    errors: []
                },
                bar: {
                    valid: false,
                    errors: ['An error']
                },
            }
        }))

        expect(mocks.validateForm).toHaveBeenCalledTimes(1)
        expect(mocks.validateField1).toHaveBeenCalledTimes(1)
        expect(mocks.validateField2).toHaveBeenCalledTimes(1)
    })
})
