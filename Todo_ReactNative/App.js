import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Button, Switch } from 'react-native';
import DatePicker from 'react-native-datepicker';

const styles = StyleSheet.create({
  appContainer: {
    // flex: 1,
    paddingTop: 20,
  },
  title: {
    height: 50,
    marginTop: 30,
    fontSize: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    color: "white"
  },
  addtaskButton: {
    width: 100,
    fontSize: 20,
  },
  listContainer: {
    margin: 20,
    paddingTop: 10,
    paddingLeft: 20,
  },
  taskinline: {
    flexDirection: "row",
    paddingTop: 10,
    backgroundColor: "azure",
    borderColor: "gray",
    // borderWidth: 1,
  },
  taskinput: {
    height: 35,
    backgroundColor: 'azure',
    fontSize: 17,
  }

})

function Task(props) {
  return <View style={styles.taskinline}>
    <Switch value={props.checked} onValueChange={props.onToggle}></Switch>
    <Text style={{
      fontSize: 20, fontWeight: "bold",
      color: props.checked ? 'grey' : 'black',
      textDecorationLine: props.checked ? 'line-through' : 'none',
    }}>{props.name} :  {props.dueDate} {"  "}</Text>
    <Button onPress={props.onDeleteTask} title="X" color="red"></Button>
  </View >
}

export default class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { list: [] };

    this.toggleTodo = this.toggleTodo.bind(this);
    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
  }

  toggleComplete = (id) => {
    this.setState({
      list: this.state.list.map(task => {
        if (task.id === id) {
          return {
            ...task,
            complete: !task.complete
          }
        } else {
          return task
        }
      })
    })
  }


  toggleTodo(id) {
    console.log("switch task clicked", id);
    this.setState({
      list: this.state.list.map(task => {
        if (task.id !== id) { return task }
        else {
          return {
            ...task,
            checked: !task.checked,
          }
        }
      })
    })
  }

  handleDeleteTask(id) {
    console.log("Delete task clicked", id);
    this.setState({ list: this.state.list.filter(task => task.id != id) })
  }

  handleAddTask(task) {
    console.log("add task clicked");
    this.state.list.push(task);
    this.setState({ list: this.state.list })
  }
  render() {
    return (
      <View style={styles.appContainer} >
        <Text style={styles.title}>TODO List</Text>
        <TaskNameForm onAddTask={this.handleAddTask} />
        <ScrollView style={styles.listContainer}>
          {
            this.state.list.map((t) =>
              <Task key={t.id} name={t.name} dueDate={t.dueDate} checked={t.checked} onDeleteTask={() => this.handleDeleteTask(t.id)} onToggle={() => this.toggleTodo(t.id)} id={t.id} />)
          }
        </ScrollView>
      </View >
    );
  }
}

class TaskNameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '', date: '' };

    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const taskList = this.props.taskList;
    // create a task object
    event.preventDefault();
    const task = {
      id: Date.now(), name: this.state.value,
      dueDate: this.state.date, checked: false,
    };
    //clearing the input after submit
    this.setState({ value: '', date: '' })
    // add the task object to the task list
    this.props.onAddTask(task);
  }

  handleChange = (text) => {
    this.setState({ value: text })
  }

  handleDateChange = (date) => {
    this.setState({ date: date })
  }

  render() {
    return (
      <View style={styles.listContainer}>
        <TextInput style={styles.taskinput} type="text" value={this.state.value}
          onChangeText={this.handleChange} placeholder="Write the task here.." />
        <View style={{ flexDirection: "row" }}>
          <DatePicker
            date={this.state.date} //initial date from state
            mode="date" //The enum of date, datetime and time
            placeholder="Select date"
            format="DD-MM-YYYY"
            minDate="01-01-2020"
            maxDate="01-01-2030"
            onDateChange={this.handleDateChange}
          />
          <Button style={styles.addtaskButton} onPress={this.handleSubmit} type="submit" title="Add Task" />
        </View>

      </View >
    );
  }
}
