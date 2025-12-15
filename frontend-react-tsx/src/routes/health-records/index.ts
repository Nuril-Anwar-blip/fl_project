import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Api\HealthRecordController::index
 * @see app/Http/Controllers/Api/HealthRecordController.php:15
 * @route '/api/health-records'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/health-records',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\HealthRecordController::index
 * @see app/Http/Controllers/Api/HealthRecordController.php:15
 * @route '/api/health-records'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\HealthRecordController::index
 * @see app/Http/Controllers/Api/HealthRecordController.php:15
 * @route '/api/health-records'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\HealthRecordController::index
 * @see app/Http/Controllers/Api/HealthRecordController.php:15
 * @route '/api/health-records'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\HealthRecordController::index
 * @see app/Http/Controllers/Api/HealthRecordController.php:15
 * @route '/api/health-records'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\HealthRecordController::index
 * @see app/Http/Controllers/Api/HealthRecordController.php:15
 * @route '/api/health-records'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\HealthRecordController::index
 * @see app/Http/Controllers/Api/HealthRecordController.php:15
 * @route '/api/health-records'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\Api\HealthRecordController::store
 * @see app/Http/Controllers/Api/HealthRecordController.php:29
 * @route '/api/health-records'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/health-records',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\HealthRecordController::store
 * @see app/Http/Controllers/Api/HealthRecordController.php:29
 * @route '/api/health-records'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\HealthRecordController::store
 * @see app/Http/Controllers/Api/HealthRecordController.php:29
 * @route '/api/health-records'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\HealthRecordController::store
 * @see app/Http/Controllers/Api/HealthRecordController.php:29
 * @route '/api/health-records'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\HealthRecordController::store
 * @see app/Http/Controllers/Api/HealthRecordController.php:29
 * @route '/api/health-records'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Api\HealthRecordController::show
 * @see app/Http/Controllers/Api/HealthRecordController.php:54
 * @route '/api/health-records/{health_record}'
 */
export const show = (args: { health_record: string | number } | [health_record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/health-records/{health_record}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\HealthRecordController::show
 * @see app/Http/Controllers/Api/HealthRecordController.php:54
 * @route '/api/health-records/{health_record}'
 */
show.url = (args: { health_record: string | number } | [health_record: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { health_record: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    health_record: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        health_record: args.health_record,
                }

    return show.definition.url
            .replace('{health_record}', parsedArgs.health_record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\HealthRecordController::show
 * @see app/Http/Controllers/Api/HealthRecordController.php:54
 * @route '/api/health-records/{health_record}'
 */
show.get = (args: { health_record: string | number } | [health_record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\HealthRecordController::show
 * @see app/Http/Controllers/Api/HealthRecordController.php:54
 * @route '/api/health-records/{health_record}'
 */
show.head = (args: { health_record: string | number } | [health_record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\HealthRecordController::show
 * @see app/Http/Controllers/Api/HealthRecordController.php:54
 * @route '/api/health-records/{health_record}'
 */
    const showForm = (args: { health_record: string | number } | [health_record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\HealthRecordController::show
 * @see app/Http/Controllers/Api/HealthRecordController.php:54
 * @route '/api/health-records/{health_record}'
 */
        showForm.get = (args: { health_record: string | number } | [health_record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\HealthRecordController::show
 * @see app/Http/Controllers/Api/HealthRecordController.php:54
 * @route '/api/health-records/{health_record}'
 */
        showForm.head = (args: { health_record: string | number } | [health_record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\Api\HealthRecordController::update
 * @see app/Http/Controllers/Api/HealthRecordController.php:69
 * @route '/api/health-records/{health_record}'
 */
export const update = (args: { health_record: string | number } | [health_record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/health-records/{health_record}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Api\HealthRecordController::update
 * @see app/Http/Controllers/Api/HealthRecordController.php:69
 * @route '/api/health-records/{health_record}'
 */
update.url = (args: { health_record: string | number } | [health_record: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { health_record: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    health_record: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        health_record: args.health_record,
                }

    return update.definition.url
            .replace('{health_record}', parsedArgs.health_record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\HealthRecordController::update
 * @see app/Http/Controllers/Api/HealthRecordController.php:69
 * @route '/api/health-records/{health_record}'
 */
update.put = (args: { health_record: string | number } | [health_record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Api\HealthRecordController::update
 * @see app/Http/Controllers/Api/HealthRecordController.php:69
 * @route '/api/health-records/{health_record}'
 */
update.patch = (args: { health_record: string | number } | [health_record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Api\HealthRecordController::update
 * @see app/Http/Controllers/Api/HealthRecordController.php:69
 * @route '/api/health-records/{health_record}'
 */
    const updateForm = (args: { health_record: string | number } | [health_record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\HealthRecordController::update
 * @see app/Http/Controllers/Api/HealthRecordController.php:69
 * @route '/api/health-records/{health_record}'
 */
        updateForm.put = (args: { health_record: string | number } | [health_record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Api\HealthRecordController::update
 * @see app/Http/Controllers/Api/HealthRecordController.php:69
 * @route '/api/health-records/{health_record}'
 */
        updateForm.patch = (args: { health_record: string | number } | [health_record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\Api\HealthRecordController::destroy
 * @see app/Http/Controllers/Api/HealthRecordController.php:79
 * @route '/api/health-records/{health_record}'
 */
export const destroy = (args: { health_record: string | number } | [health_record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/health-records/{health_record}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\HealthRecordController::destroy
 * @see app/Http/Controllers/Api/HealthRecordController.php:79
 * @route '/api/health-records/{health_record}'
 */
destroy.url = (args: { health_record: string | number } | [health_record: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { health_record: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    health_record: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        health_record: args.health_record,
                }

    return destroy.definition.url
            .replace('{health_record}', parsedArgs.health_record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\HealthRecordController::destroy
 * @see app/Http/Controllers/Api/HealthRecordController.php:79
 * @route '/api/health-records/{health_record}'
 */
destroy.delete = (args: { health_record: string | number } | [health_record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Api\HealthRecordController::destroy
 * @see app/Http/Controllers/Api/HealthRecordController.php:79
 * @route '/api/health-records/{health_record}'
 */
    const destroyForm = (args: { health_record: string | number } | [health_record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\HealthRecordController::destroy
 * @see app/Http/Controllers/Api/HealthRecordController.php:79
 * @route '/api/health-records/{health_record}'
 */
        destroyForm.delete = (args: { health_record: string | number } | [health_record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const healthRecords = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
show: Object.assign(show, show),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default healthRecords