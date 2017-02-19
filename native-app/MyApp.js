import React from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { connect } from 'react-redux'

import { nameActions } from '../shared/actions'

class _MyApp extends React.Component {
  constructor () {
    super()

    this.state = {
      newName: ''
    }

    this.onChangeText = this.onChangeText.bind(this)
    this.onCreatePress = this.onCreatePress.bind(this)
    this.onNamePress = this.onNamePress.bind(this)
  }

  onChangeText (text) {
    this.setState({ newName: text })
  }

  onCreatePress () {
    this.props.handleSubmit(this.state.newName)
    this.setState({ newName: '' })
  }

  onNamePress (i) {
    this.props.handleNamePress(i)
  }

  render () {
    return (
      <View>
        <Text>Names</Text>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            value={this.state.newName}
            onChangeText={this.onChangeText}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={this.onCreatePress}
          >
            <Text>create</Text>
          </TouchableOpacity>
        </View>

        {this.props.names.map((name, i) =>
          <TouchableOpacity key={i} onPress={() => this.onNamePress(i)}>
            <Text>{name}</Text>
          </TouchableOpacity>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  form: {
    flexDirection: 'row',
    height: 30,
  },
  input: {
    flex: 0.7,
    height: 30,
    backgroundColor: '#ccc',
  },
  button: {
    flex: 0.2,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

const mapStateToProps = ({ names }) => (
  {
    names
  }
)

const mapDispatchToProps = dispatch => (
  {
    handleSubmit: name => dispatch(nameActions.addName(name)),
    handleNamePress: id => dispatch(nameActions.removeName(id)),
  }
)

const MyApp = connect(mapStateToProps, mapDispatchToProps)(_MyApp)

export default MyApp
