import ShowsEffect from './ShowsEffect';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import ActionUtility from '../../utilities/ActionUtility';
import { ReduxDispatch } from '../../models/ReduxProps';
import IStore from '../../models/IStore';
import ShowModel from './models/shows/ShowModel';
import EpisodeModel from './models/episodes/EpisodeModel';
import CastModel from './models/cast/CastModel';

export type ShowActionUnion = undefined | HttpErrorResponseModel | ShowModel | EpisodeModel[] | CastModel[];

export default class ShowsAction {
  public static readonly REQUEST_SHOW: string = 'ShowAction.REQUEST_SHOW';
  public static readonly REQUEST_SHOW_FINISHED: string = 'ShowAction.REQUEST_SHOW_FINISHED';

  public static readonly REQUEST_EPISODES: string = 'ShowAction.REQUEST_EPISODES';
  public static readonly REQUEST_EPISODES_FINISHED: string = 'ShowAction.REQUEST_EPISODES_FINISHED';

  public static readonly REQUEST_CAST: string = 'ShowAction.REQUEST_CAST';
  public static readonly REQUEST_CAST_FINISHED: string = 'ShowAction.REQUEST_CAST_FINISHED';

  public static requestShow(): any {
    return async (dispatch: ReduxDispatch<ShowActionUnion>, getState: () => IStore) => {
      const showId: string = getState().shows.currentShowId;

      await ActionUtility.createThunkEffect<ShowModel>(dispatch, ShowsAction.REQUEST_SHOW, ShowsEffect.requestShow, showId);
    };
  }

  public static requestEpisodes(): any {
    return async (dispatch: ReduxDispatch<ShowActionUnion>, getState: () => IStore) => {
      const showId: string = getState().shows.currentShowId;

      await ActionUtility.createThunkEffect<EpisodeModel[]>(dispatch, ShowsAction.REQUEST_EPISODES, ShowsEffect.requestEpisodes, showId);
    };
  }

  public static requestCast(): any {
    return async (dispatch: ReduxDispatch<ShowActionUnion>, getState: () => IStore) => {
      const showId: string = getState().shows.currentShowId;

      await ActionUtility.createThunkEffect<CastModel[]>(dispatch, ShowsAction.REQUEST_CAST, ShowsEffect.requestCast, showId);
    };
  }
}
