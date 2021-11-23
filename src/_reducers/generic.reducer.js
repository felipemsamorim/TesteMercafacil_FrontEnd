import { genericConstants } from '../_constants';

export function generic(state = {}, action) {
  switch (action.type) {

    case genericConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case genericConstants.GETALL_SUCCESS:
      return {
        items: action.g
      };
    case genericConstants.GETALL_FAILURE:
      return {
        error: action.error
      };

    default:
      return state
  }
}