import { episodesService } from '../_services';
import { episodesConstants } from '../_constants';

export const episodesAction = {
    getAll,
};

function getAll(input = '') {
    return dispatch => {
        dispatch(request());
        episodesService.getAll(input)
            .then(
                c => dispatch(success(c)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: episodesConstants.GETALL_REQUEST } }
    function success(e) { return { type: episodesConstants.GETALL_SUCCESS, e } }
    function failure(error) { return { type: episodesConstants.GETALL_FAILURE, error } }
}
