import React from 'react';
import 
{ StyleSheet, 
  Text, 
  View, 
  StatusBar, 
  TextInput, 
  Dimensions, 
  Platform ,
  ScrollView,
} 
from 'react-native';
import {AppLoading} from "expo";
import ToDo from './ToDo';
import uuidv1 from 'uuid/v1';
// import console = require('console');


const {height, width} = Dimensions.get('window');

export default class App extends React.Component{
  
  state = {
    newToDo: "",
    loadedToDos: false,
    toDos: {}
  };

  componentDidMount = () =>{
    this._loadToDos;
  };

  render(){  
    const { newToDo, loadedToDos, toDos} = this.state;
    console.log(toDos);
    // if(!loadedToDos){
    //   return <AppLoading/>
    // }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>TODO List</Text>
        <View style={styles.card}>
          <TextInput 
            style={styles.input} 
            placeholder={"New To Do list"} 
            value={newToDo} 
            onChangeText={this._controlNewToDo}
            placeholderTextColor={'#999'}
            returnKeyType={'done'}
            autoCorrect={false}
            onSubmitEditing={this._addToDo}
          />
          <ScrollView contentContainerStyle={styles.toDos}>
            {/* <ToDo text={"hello I'm a To do"}/> */}
            {Object.values(toDos).map(toDo => 
              <ToDo 
                key={toDo.id}
                delete={this._deleteToDo}
                // {...toDo} 
              />
            )}
          </ScrollView>
        </View>
      </View>
    );
  }

  _controlNewToDo = text => {
    this.setState({
      newToDo: text,
    });
  }

  _loadToDos = () =>{
    this.setState({
      loadedToDos: true
    });
  };

  _addToDo = () =>{
    const {newToDo, toDos } = this.state;
    if(newToDo !== ""){
      this.setState({
        newToDo : ''
      });
    
      this.setState(prevState => {
        const ID = uuidv1();
        const newToDoObject = {
          [ID]:{
            id: ID,
            isCompleted: false,
            text: newToDo,
            createAt : Date.now(),
          }
        };
        const newState = {
          ...prevState,
          newToDo: "",
          toDos: {
            ...prevState, toDos,
            ...newToDoObject,
            // newToDoObject : id : { text: 'new todo'},
          }
        };
        
        return {...newState};
      });
      // delete toDos["65416546846541"];
      // const toDos = {
      //   65416546846541: {
      //     id: 65416546846541,
      //     text: 'buy something',
      //     isCompleted: false,
      //     date: 6541321534
      //   },
      //   23232: {
      //     id: 23232,
      //     text: 'buy something',
      //     isCompleted: false,
      //     date: 6541321534
      //   }
      // };
      
    }
  };

  _deleteToDo = (id) =>{
    this.setState(prevState => {
      const toDos = prevState.toDos;
      delete toDos[id];
      const newState = {
        ...prevState,
        ...toDos,
      };
      return {...newState};
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F23657',
    // backgroundColor: 'powderblue',
    alignItems: 'center',
  },
  title:{
    color: 'white',
    fontSize: 30,
    marginTop: 50,
    fontWeight: '100',
    marginBottom: 30,
  },
  card:{
    backgroundColor: 'white',
    flex:1,
    width: width - 25,
    borderTopLeftRadius : 10,
    borderTopRightRadius: 10,
    // marginBottom : 10,
    // borderRadius: 10,
    ...Platform.select({
      ios:{
        shadowColor: 'rgb(50,50,50)',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset:{
          height: -1,
          width: 0,
        },
      },
      android:{
        elevation: 5,
      },
    }),
  },
  input:{
    padding:20,
    borderBottomColor: '#bbb',
    borderBottomWidth : 1,
    fontSize:25,
  },
  toDos:{
    alignItems: 'center',
  },
});
