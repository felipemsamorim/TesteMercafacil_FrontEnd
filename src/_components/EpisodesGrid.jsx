import React from 'react';
import { DataGrid, GridColumn } from 'rc-easyui';
import {styles} from './styles';
import { Pagination} from './';

export class EpisodesGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            total: props.Info.count,
            pageSize: 20,
        }
    }
    render() {
        const { episodes, Info, getAllCustom,activePage } = this.props;
        const { total, pageSize } = this.state;

        return (
            <div style={styles.container}>
            <DataGrid data={episodes} style={{ height: 550, width: 850 }} columnResizing >
                <GridColumn field="name" align="center" render={({ row }) => {
                    return row.name
                }}
                    title="Nome" sortable>
                </GridColumn>
                <GridColumn field="air_date" title="Data" align="center" render={({ row }) => {
                    return row.air_date
                }}></GridColumn>
                <GridColumn field="characters" align="center" render={({ row }) => {
                    return row.characters.map(e => e.split('/')[5]).join(',')
                }}
                    title="Personagens">
                </GridColumn>
            </DataGrid>
            <Pagination Info={Info} Total={total} pageSize={pageSize} getAllCustom={getAllCustom} activePage={activePage}></Pagination>
            </div>
        );
    }
}