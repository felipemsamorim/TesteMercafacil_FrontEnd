import { episodesConstants } from '../_constants';

export function episodes(state = {}, action) {
  switch (action.type) {

    case episodesConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case episodesConstants.GETALL_SUCCESS:
      return {
        items: action.e
      };
    case episodesConstants.GETALL_FAILURE:
      return {
        error: action.error
      };

    default:
      return state
  }
}