import { charsService } from '../_services';
import { charsConstants,genericConstants } from '../_constants';

export const charsAction = {
    getAll,
    getAllCustom
};

function getAll(input = '') {
    return dispatch => {
        dispatch(request());
        charsService.getAll(input)
            .then(
                c => dispatch(success(c)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: charsConstants.GETALL_REQUEST } }
    function success(c) { return { type: charsConstants.GETALL_SUCCESS, c } }
    function failure(error) { return { type: charsConstants.GETALL_FAILURE, error } }
}

function getAllCustom(fullPath) {
    return dispatch => {
        dispatch(request());
        charsService.getAllCustom(fullPath)
            .then(
                c => dispatch(success(c)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: genericConstants.GETALL_REQUEST } }
    function success(g) { return { type: genericConstants.GETALL_SUCCESS, g } }
    function failure(error) { return { type: genericConstants.GETALL_FAILURE, error } }
}
