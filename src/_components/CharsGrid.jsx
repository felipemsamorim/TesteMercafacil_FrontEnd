import React from 'react';
import { DataGrid, GridColumn } from 'rc-easyui';
import {styles} from './styles';
import { Pagination} from './';

export class CharsGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            total: props.Info.count,
            pageSize: 20,
        }
    }
    render() {
        const { chars, Info, getAllCustom,activePage } = this.props;
        const { total, pageSize } = this.state;

        return (
            <div style={styles.container}>
                <DataGrid data={chars} style={{ height: 550, width: 850 }} columnResizing >
                    <GridColumn field="name" align="center" render={({ row }) => {
                        return row.name
                    }}
                        title="Nome" sortable>
                    </GridColumn>
                    <GridColumn field="origin" title="Origem" align="center" render={({ row }) => {
                        return row.origin.name
                    }}></GridColumn>
                    <GridColumn field="episode" align="center" render={({ row }) => {
                        return row.episode.map(e => e.split('/')[5]).join(',')
                    }}
                        title="Episodio">
                    </GridColumn>
                </DataGrid>
                <Pagination Info={Info} Total={total} pageSize={pageSize} getAllCustom={getAllCustom} activePage={activePage}></Pagination>
            </div>
        );
    }
}