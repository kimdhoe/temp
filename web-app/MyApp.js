import React from 'react'
import { connect } from 'react-redux'

import { nameActions } from '../shared/actions'

class _MyApp extends React.Component {
  constructor () {
    super()

    this.state = {
      newName: ''
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onNameClick = this.onNameClick.bind(this)
  }

  onChange (e) {
    this.setState({ newName: e.target.value })
  }

  onSubmit (e) {
    e.preventDefault()
    this.props.handleSubmit(this.state.newName)
    this.setState({ newName: '' })
  }

  onNameClick (id) {
    this.props.handleNameClick(id)
  }

  render () {
    return (
      <div>
        <h1>Names</h1>

        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            value={this.state.newName}
            onChange={this.onChange}
          />
        </form>

        {this.props.names.map((name, i) =>
          <h2
            key={i}
            onClick={() => this.onNameClick(i)}
          >
            {name}
          </h2>
        )}
      </div>
    )
  }
}

const mapStateToProps = ({ names }) => (
  {
    names
  }
)

const mapDispatchToProps = dispatch => (
  {
    handleSubmit: name => dispatch(nameActions.addName(name)),
    handleNameClick: id => dispatch(nameActions.removeName(id)),
  }
)

const MyApp = connect(mapStateToProps, mapDispatchToProps)(_MyApp)

export default MyApp
