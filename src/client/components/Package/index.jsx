/* eslint-disable react/forbid-prop-types, no-trailing-spaces */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Package.scss';
import { NO_DEPENDENCIES } from './constants';

export default class Package extends Component {
  static createDependenciesList(dependencies) {
    return dependencies.length ? dependencies : NO_DEPENDENCIES;
  }

  constructor(props) {
    super(props);

    this.state = {
      collapsed: true,
    };

    this.renderButton = this.renderButton.bind(this);
    this.renderInfo = this.renderInfo.bind(this);
    this.togglePackage = this.togglePackage.bind(this);
    this.createReversedDependenciesList = this.createReversedDependenciesList.bind(this);
  }

  togglePackage() {
    const { collapsed } = this.state;
    this.setState({ collapsed: !collapsed });
  }

  renderButton(pack) {
    const { collapsed } = this.state;
    const highLightExpanded = !collapsed ? 'expanded' : '';

    return (
      <button
        type="button"
        className={`btn btn-secondary ${highLightExpanded}`}
        onClick={this.togglePackage}
      >
        {`${pack.name}`}
      </button>
    );
  }

  createReversedDependenciesList(dependencies, reversed) {
    if (!reversed.length) return NO_DEPENDENCIES;

    return reversed.map((item, index) => {
      return <Package key={`pack-rev-dep-${index}`} pack={item} dependencies={dependencies} reversed={reversed} />;
    });
  }

  renderInfo(pack, dependencies, reversed) {
    return (
      <div className="package__info">
        {this.renderButton(pack)}
        <div className="package__info__content">
          <h2>{pack.name}</h2>
          <p>{pack.description}</p>
          <div className="package__info__content__dependencies">
            <h4>Dependencies</h4>
            <div className="package__info__content__dependencies__list">
              {Package.createDependenciesList(dependencies)}
            </div>
          </div>
          <div className="package__info__content__reversed--dependencies">
            <h4>Reversed dependencies</h4>
            <div className="package__info__content__reversed--dependencies__list">
              {this.createReversedDependenciesList(dependencies, reversed)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { collapsed } = this.state;
    const { pack, dependencies, reversed } = this.props;

    return (
      <div className="package">
        {collapsed ? this.renderButton(pack) : this.renderInfo(pack, dependencies, reversed)}
      </div>
    );
  }
}

Package.propTypes = {
  pack: PropTypes.object,
  dependencies: PropTypes.array,
  reversed: PropTypes.array,
};

Package.defaultProps = {
  pack: {},
  dependencies: [],
  reversed: [],
};
