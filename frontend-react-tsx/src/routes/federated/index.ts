import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
 * @see routes/web.php:46
 * @route '/federated/monitor'
 */
export const monitor = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: monitor.url(options),
    method: 'get',
})

monitor.definition = {
    methods: ["get","head"],
    url: '/federated/monitor',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:46
 * @route '/federated/monitor'
 */
monitor.url = (options?: RouteQueryOptions) => {
    return monitor.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:46
 * @route '/federated/monitor'
 */
monitor.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: monitor.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:46
 * @route '/federated/monitor'
 */
monitor.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: monitor.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:46
 * @route '/federated/monitor'
 */
    const monitorForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: monitor.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:46
 * @route '/federated/monitor'
 */
        monitorForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: monitor.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:46
 * @route '/federated/monitor'
 */
        monitorForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: monitor.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    monitor.form = monitorForm
const federated = {
    monitor: Object.assign(monitor, monitor),
}

export default federated