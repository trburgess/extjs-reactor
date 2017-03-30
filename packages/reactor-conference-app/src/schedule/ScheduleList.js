import React, { Component, PropTypes } from 'react';
import { List } from '@extjs/reactor/modern';
import { Template } from '@extjs/reactor';
import highlight from '../util/highlight';
import { toggleFavorite } from './actions';
import { connect } from 'react-redux';

const days = ['Tuesday', 'Wednesday', 'Thursday'];

class ScheduleList extends Component {
    
    static propTypes = {
        dataStore: PropTypes.any.isRequired,
        onFavoriteClick: PropTypes.func,
        showTime: PropTypes.bool,
        flex: PropTypes.number
    }

    itemTpl = new Template(data => {
        const mark = highlight.bind(null, this.props.query);

        return (
            <div className="app-list-content">
                <div className="app-list-text">
                    <div className="app-list-item-title" dangerouslySetInnerHTML={mark(data.name)}/>
                    <div className="app-list-item-details">{data.speaker ? <span>by <span dangerouslySetInnerHTML={mark(data.speaker)}/></span> : ''}{data.category} - {data.location}</div>
                    { this.props.showTime && (<div className="app-list-item-details">{days[data.day]} {data.time}</div>) }
                </div>
                <div 
                    onClick={this.props.onFavoriteClick && this.props.onFavoriteClick.bind(this, data)} 
                    className={`x-font-icon md-icon-star app-list-tool app-favorite${data.favorite ? '-selected' : ''}`}
                />
            </div>
        )
    })

    render() {
        const { query, dataStore, ...listProps } = this.props;

        return (
            <List 
                {...listProps}
                store={dataStore}
                disableSelection
                itemTpl={this.itemTpl}
                grouped
                rowLines
                itemCls="app-list-item"
                maxWidth={600}
                cls="app-list"
                emptyText="No events found."
            />
        )
    }

}

const mapStateToProps = (state) => {
    return {};
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFavoriteClick: (data, e) => dispatch(toggleFavorite(data.id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleList);