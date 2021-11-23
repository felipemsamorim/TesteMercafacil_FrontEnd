import React from 'react';
import { connect } from 'react-redux';
import { DataGrid, GridColumn, SearchBox, Label, } from 'rc-easyui';
import { charsAction, episodesAction } from '../_actions';
import { CharsGrid, EpisodesGrid } from '../_components';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewType: 'chars',
            viewTitle: 'Characters',
            changeViewButton: 'Pesquisar Episódios',
            activePage: 1,
            useGenerics: false,
            searchValue: ''
        }
    }

    componentWillMount() {
        this.handleReload()
    }

    handleSearch({ value }) {
        const { viewType } = this.state
        if (viewType == 'chars') {
            this.props.dispatch(charsAction.getAll(value));
        } else {
            this.props.dispatch(episodesAction.getAll(value));
        }
        this.setState({ activePage: 1, useGenerics: false, searchValue: value })
    }

    getAllCustom(fullPath, activePage, step = false) {
        const arrPath = fullPath.split('&')
        if (!step) {
            if (arrPath.length == 1) {
                let path = arrPath[0].split('=')
                this.props.dispatch(charsAction.getAllCustom(path[0] + '=' + activePage))
            } else {
                let path = arrPath[0].split('=')
                arrPath[0] = path[0] + '=' + activePage
                this.props.dispatch(charsAction.getAllCustom(arrPath.join('&')))
            }
        } else {
            this.props.dispatch(charsAction.getAllCustom(fullPath))
        }
        this.setState({ activePage: activePage, useGenerics: true })
    }

    changeViewType() {
        const { viewType } = this.state
        this.setState({
            viewType: viewType == 'chars' ? 'eps' : 'chars',
            viewTitle: viewType == 'chars' ? 'Episodes' : 'Characters',
            changeViewButton: viewType == 'chars' ? 'Pesquisar Personagens' : 'Pesquisar Episódios',
            searchValue: ''
        }, this.handleReload);
    }

    handleReload() {
        const { viewType } = this.state
        console.log(this.state)
        if (viewType == 'chars') {
            this.props.dispatch(charsAction.getAll());
        } else {
            this.props.dispatch(episodesAction.getAll());
        }
        this.setState({ activePage: 1, useGenerics: false })
    }

    render() {
        const { chars, episodes, generic } = this.props;
        const {
            viewTitle,
            viewType,
            changeViewButton,
            activePage,
            useGenerics,
            searchValue
        } = this.state;

        return (
            <div className="col-md-6 col-md-offset-3">
                <h3>Rick & Morty - {viewTitle}</h3>
                <div style={{ marginBottom: 10 }}>
                    <Label htmlFor="input">Name:</Label>
                    <SearchBox name="input" value={searchValue} placeholder="aperte ENTER para pesquisar" onSearch={this.handleSearch.bind(this)} style={{ width: 320 }}></SearchBox>
                    <button onClick={() => this.changeViewType()} style={{ position: 'relative', right: '-19%' }}>{changeViewButton}</button>
                </div>
                <div>
                    {
                        viewType == 'chars' ?
                            chars.items &&
                            (
                                <CharsGrid
                                    chars={useGenerics && !generic.loading ? generic.items.results : chars.items.results}
                                    Info={useGenerics && !generic.loading ? generic.items.info : chars.items.info}
                                    getAllCustom={this.getAllCustom.bind(this)}
                                    activePage={activePage}
                                >
                                </CharsGrid>
                            )
                            :
                            episodes.items &&
                            (
                                <EpisodesGrid
                                    episodes={useGenerics && !generic.loading ? generic.items.results : episodes.items.results}
                                    Info={useGenerics && !generic.loading ? generic.items.info : episodes.items.info}
                                    getAllCustom={this.getAllCustom.bind(this)}
                                    activePage={activePage}
                                >
                                </EpisodesGrid>
                            )
                    }
                    {
                        (
                            episodes.error != 'undefined'
                            || chars.error != 'undefined'
                            || generic.error != 'undefined'
                        ) && (<div><h2>Nenhum resultado encontrado</h2></div>)
                    }

                </div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return state
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };