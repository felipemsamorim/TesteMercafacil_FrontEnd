import { charsConstants } from '../_constants';

export function chars(state = {}, action) {
  switch (action.type) {

    case charsConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case charsConstants.GETALL_SUCCESS:
      return {
        items: action.c
      };
    case charsConstants.GETALL_FAILURE:
      return {
        error: action.error
      };

    default:
      return state
  }
}