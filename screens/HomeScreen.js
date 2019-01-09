import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  CheckBox,
  TextInput,
  Button
} from 'react-native';
import { WebBrowser } from 'expo';
import moment from 'moment';

import { MonoText } from '../components/StyledText';

const formatDate = {
  sameDay: '[Today]',
  nextDay: '[Tomorrow]',
  nextWeek: 'dddd',
  lastDay: '[Yesterday]',
  lastWeek: '[Last] dddd',
  sameElse: 'DD/MM/YYYY'
}

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  
  state = {
    todolist: [
      { id: 1, text: 'todo 1', date: 'Yesterday at 1:02 PM', done: false },
      { id: 2, text: 'todo 2', date: 'Last Monday at 1:02 PM', done: false },
      { id: 3, text: 'todo 3', date: 'Last Sunday at 1:03 PM', done: false },
    ],
    form: ''
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <Text style={styles.title}>To Do List</Text>
          {this.state.todolist.sort((a,b) => (b.date - a.date)).map((x, i) => (
            <View key={i} style={styles.todo}>
              <CheckBox />
              <Text style={styles.todo_text}>{x.text}</Text>
              <Text style={styles.todo_date}>{x.date}</Text>
            </View>
          ))}
          <View style={styles.form}>
            <TextInput
              style={{ flexGrow: 2 }}
              placeholder="Type here..."
              value={this.state.form}
              onChangeText={(text) => this.setState({ form: text })}
            />
            <Button style={styles.todo_button} onPress={this._handleAddTodo} title="add todo" color="#da4c40" />
          </View>
        </ScrollView>
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleAddTodo = () => {
    this.setState({
      todolist: [ 
        ...this.state.todolist,
        { id: Math.random(), text: this.state.form, date: moment().calendar(formatDate), done: false }
      ],
      form: ''
    })
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 8
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  title: {
    fontSize: 14,
    color: '#adafb1'
  },
  todolist: {
    fontSize: 24
  },
  todo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#e0e0e0',
    borderBottomWidth: 2
  },
  todo_text: {
    lineHeight: 40,
    fontSize: 16,
    flexGrow: 2
  },
  todo_date: {
    fontSize: 12,
    color: '#e0e0e0'
  },
  todo_button: {
    borderRadius: 4
  },
  form: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8
  }
});
