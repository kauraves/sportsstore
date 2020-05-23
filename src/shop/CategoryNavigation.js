import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ToggleLink } from "../ToggleLink";

export class CategoryNavigation extends Component {
    render() {
        return <React.Fragment>
            <ToggleLink to={ `${this.props.baseUrl}/all` } exact={ false }>All</ToggleLink>
            { this.props.categories && this.props.categories.map(cat => 
            <ToggleLink key={ cat } to={ `${this.props.baseUrl}/${cat.toLowerCase()}`}>{ cat }</ToggleLink>
            )}
            <Link className="btn btn-block btn-secondary fixed-bottom m-2 col-3" to="/admin">
                Administration
            </Link>
        </React.Fragment>
    }
}

/*

    <Link className="btn btn-secondary btn-block" to={ this.props.baseUrl }>
                All
            </Link>
            { this.props.categories && this.props.categories.map(cat =>
                <Link className="btn btn-secondary btn-block" key={ cat } to={ `${this.props.baseUrl}/${cat.toLowerCase()}`}>
                    { cat }
                </Link>
            )}


*/