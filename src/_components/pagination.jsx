import React, { useState } from 'react';

export class Pagination extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            activePage: props.activePage
        }
    }

    handleClick = (i) => {
        const { activePage } = this.state;
        if(i != activePage)
        this.setState({ activePage: i }, () =>
            this.props.getAllCustom(this.props.Info.prev || this.props.Info.next, i)
        )
    }
    onPrevious = () => {
        const { activePage } = this.state;
        if (activePage - 1 > 0 && this.props.Info.prev) {
            this.setState({ activePage: activePage - 1 }, () =>
                this.props.getAllCustom(this.props.Info.prev, activePage - 1, true)
            )
        }
    }
    onNext = () => {
        const { activePage } = this.state;
        const { Total, pageSize } = this.props;
        const totalPages = Math.ceil(Total / pageSize)
        if (activePage  < totalPages && this.props.Info.next)
            this.setState({ activePage: activePage + 1 }, () => {
                this.props.getAllCustom(this.props.Info.next, activePage + 1, true)
                this.setState({ activePage: activePage + 1 })
            })
    }

    render() {
        const { Total, pageSize } = this.props;
        const { activePage } = this.state;
        const totalPages = Math.ceil(Total / pageSize)
        return (
            <nav>
                <ul className="pagination">
                    <li className="page-item">
                        <a className="page-link" onClick={this.onPrevious.bind(this)}>Anterior</a>
                    </li>
                    {[...Array(totalPages)].map((x, i) =>
                        <li key={i} className={`page-item ${activePage === i + 1 ? "active" : ""}`}>
                            <a className="page-link" onClick={this.handleClick.bind(this, i + 1)}>{i + 1}</a>
                        </li>
                    )}
                    <li className="page-item">
                        <a className="page-link" onClick={this.onNext.bind(this)}>Proximo</a>
                    </li>
                </ul>
            </nav>
        )
    }
}