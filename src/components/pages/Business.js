import React, { Component } from 'react'
import NewsList from '../NewsList'

export default class Business extends Component {
  render() {
    return (
      <div>
        <NewsList dataLimit={20} country="us" category="business" />
      </div>
    )
  }
}
