import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\FederatedLearningController::globalModel
 * @see app/Http/Controllers/Api/FederatedLearningController.php:79
 * @route '/api/federated/model/global'
 */
export const globalModel = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: globalModel.url(options),
    method: 'get',
})

globalModel.definition = {
    methods: ["get","head"],
    url: '/api/federated/model/global',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\FederatedLearningController::globalModel
 * @see app/Http/Controllers/Api/FederatedLearningController.php:79
 * @route '/api/federated/model/global'
 */
globalModel.url = (options?: RouteQueryOptions) => {
    return globalModel.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\FederatedLearningController::globalModel
 * @see app/Http/Controllers/Api/FederatedLearningController.php:79
 * @route '/api/federated/model/global'
 */
globalModel.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: globalModel.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\FederatedLearningController::globalModel
 * @see app/Http/Controllers/Api/FederatedLearningController.php:79
 * @route '/api/federated/model/global'
 */
globalModel.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: globalModel.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\FederatedLearningController::globalModel
 * @see app/Http/Controllers/Api/FederatedLearningController.php:79
 * @route '/api/federated/model/global'
 */
    const globalModelForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: globalModel.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\FederatedLearningController::globalModel
 * @see app/Http/Controllers/Api/FederatedLearningController.php:79
 * @route '/api/federated/model/global'
 */
        globalModelForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: globalModel.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\FederatedLearningController::globalModel
 * @see app/Http/Controllers/Api/FederatedLearningController.php:79
 * @route '/api/federated/model/global'
 */
        globalModelForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: globalModel.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    globalModel.form = globalModelForm
const fl = {
    globalModel: Object.assign(globalModel, globalModel),
}

export default fl