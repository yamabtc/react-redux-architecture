import * as React from 'react';
import { connect, DispatchProp } from 'react-redux';
import IStore from '../../../../models/IStore';
import IAction from '../../../../models/IAction';
import { Item } from 'semantic-ui-react';
import ShowModel from '../../../../stores/show/models/ShowModel';
import { oc } from 'ts-optchain';

interface IProps {}
interface IState {}
interface IStateToProps {
  readonly show: ShowModel | null;
}

const mapStateToProps = (state: IStore, ownProps: IProps): IStateToProps => ({
  show: state.show.show,
});

class MainOverview extends React.Component<IProps & IStateToProps & DispatchProp<IAction<any>>, IState> {
  public render(): JSX.Element | null {
    const { show } = this.props;

    if (!show) {
      return null;
    }

    const image: string = oc(show).image.medium('');
    const network: string = oc(show).network.name('');

    return (
      <Item.Group>
        <Item>
          <Item.Image src={image} />
          <Item.Content>
            <Item.Header as="a">{show.name}</Item.Header>
            <Item.Meta>{network}</Item.Meta>
            <Item.Description>
              <div dangerouslySetInnerHTML={{ __html: show.summary }} />
            </Item.Description>
            <Item.Extra>{show.genres.join(' | ')}</Item.Extra>
          </Item.Content>
        </Item>
      </Item.Group>
    );
  }
}

export { MainOverview as Unconnected };
export default connect(mapStateToProps)(MainOverview);
