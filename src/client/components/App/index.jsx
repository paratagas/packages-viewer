/* eslint-disable no-trailing-spaces, max-len */

import React, { Component } from 'react';
import axios from 'axios';
import './App.scss';
import { createDependencies } from '../Util/dataProcessing';
import { API_URL } from '../../constants';
import Package from '../Package';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      packages: [],
      pureData: {},
      loading: false,
    };

    this.renderPackages = this.renderPackages.bind(this);
    this.prepareDependencies = this.prepareDependencies.bind(this);
    this.prepareReversedDependencies = this.prepareReversedDependencies.bind(this);
  }

  componentWillMount() {
    this.setState({ loading: true });

    axios
      .get(API_URL)
      .then((response) => {
        const { data } = response;
        const pureData = data;
        const packages = Object.entries(data)
          .sort((a, b) => a[0].localeCompare(b[0]))
          .map(packageData => packageData[1])
          .map(pack => ({
            name: pack.package,
            dependencies: createDependencies(pack.depends),
            description: pack.description
          }));

        this.setState({
          packages,
          pureData,
          loading: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  prepareDependencies(pack, pureData, reversed) {
    return pack.dependencies.map((packDep, index) => {
      const packageDep = pureData[packDep];

      if (packageDep) {
        const newPack = {
          name: packageDep.package,
          dependencies: createDependencies(packageDep.depends),
          description: packageDep.description,
        };

        return (
          <Package key={`pack-dep-${index}`} pack={newPack} reversed={reversed} />
        );
      }

      return (
        <button type="button" className="btn btn-secondary disabled" disabled>
          {`${packDep} (not installed)`}
        </button>
      );
    });
  }

  prepareReversedDependencies(pack, pureData) {
    return Object.entries(pureData)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(packageData => packageData[1])
      .filter(pck => pck.package !== pack.name)
      .filter(pck => pck.package.includes(pack.name))
      .map(packFormed => ({
        name: packFormed.package,
        dependencies: createDependencies(packFormed.depends),
        description: packFormed.description
      }));
  }

  renderPackages(packages, pureData) {
    return packages.map((item, index) => {
      const reversed = this.prepareReversedDependencies(item, pureData);

      return (
        <Package
          key={`pack-${index}`}
          pack={item}
          dependencies={this.prepareDependencies(item, pureData, reversed)}
          reversed={reversed}
        />
      );
    });
  }

  render() {
    const { packages, pureData, loading } = this.state;

    return (
      <div className="packages--list">
        <div className="alert alert-secondary header" role="alert">
          Package viewer
        </div>
        {
          loading ?
            'Loading...' :
            this.renderPackages(packages, pureData)
        }
      </div>
    );
  }
}
