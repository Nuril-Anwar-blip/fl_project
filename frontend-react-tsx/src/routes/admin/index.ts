import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\AdminController::create
 * @see app/Http/Controllers/AdminController.php:13
 * @route '/admin/create-new'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/create-new',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminController::create
 * @see app/Http/Controllers/AdminController.php:13
 * @route '/admin/create-new'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::create
 * @see app/Http/Controllers/AdminController.php:13
 * @route '/admin/create-new'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AdminController::create
 * @see app/Http/Controllers/AdminController.php:13
 * @route '/admin/create-new'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AdminController::create
 * @see app/Http/Controllers/AdminController.php:13
 * @route '/admin/create-new'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AdminController::create
 * @see app/Http/Controllers/AdminController.php:13
 * @route '/admin/create-new'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AdminController::create
 * @see app/Http/Controllers/AdminController.php:13
 * @route '/admin/create-new'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\AdminController::storeNew
 * @see app/Http/Controllers/AdminController.php:21
 * @route '/admin/create-new'
 */
export const storeNew = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeNew.url(options),
    method: 'post',
})

storeNew.definition = {
    methods: ["post"],
    url: '/admin/create-new',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AdminController::storeNew
 * @see app/Http/Controllers/AdminController.php:21
 * @route '/admin/create-new'
 */
storeNew.url = (options?: RouteQueryOptions) => {
    return storeNew.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::storeNew
 * @see app/Http/Controllers/AdminController.php:21
 * @route '/admin/create-new'
 */
storeNew.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeNew.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\AdminController::storeNew
 * @see app/Http/Controllers/AdminController.php:21
 * @route '/admin/create-new'
 */
    const storeNewForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeNew.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AdminController::storeNew
 * @see app/Http/Controllers/AdminController.php:21
 * @route '/admin/create-new'
 */
        storeNewForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeNew.url(options),
            method: 'post',
        })
    
    storeNew.form = storeNewForm
const admin = {
    create: Object.assign(create, create),
storeNew: Object.assign(storeNew, storeNew),
}

export default admin