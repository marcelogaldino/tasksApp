import React, {useState, useCallback, useEffect} from 'react'
import {View, Text, TextInput, TouchableOpacity, SafeAreaView, StyleSheet, StatusBar, FlatList, Modal, AsyncStorage} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import TaskList from './src/components/TaskList'
import * as Animatable from 'react-native-animatable'

const AnimatedeBtn = Animatable.createAnimatableComponent(TouchableOpacity)

export default function App() {
  const [task, setTask] = useState([])
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')

  useEffect( () => {
    
    async function loadTasks() {
      const taskStorage = await AsyncStorage.getItem('@task')

      if (taskStorage) {
        setTask(JSON.parse(taskStorage))
      }
    }

    loadTasks()

  }, [])

  useEffect( () => {

    async function saveTask() {
      await AsyncStorage.setItem('@task', JSON.stringify(task))
    }

    saveTask()

  }, [task])

  function handleAdd() {
    if (input === '') {
      return
    }

    const data = {
      key: input,
      task: input
    }

    setTask([...task, data])
    setOpen(false)
    setInput('')
  }

 const handleDelete = useCallback((data) => {
   const find = task.filter(r => r.key !== data.key)
   setTask(find)
 }) 
  
  return(
    <SafeAreaView style={style.container}>
      <StatusBar backgroundColor='#171d31' barStyle='light-content'/>

      <Text style={style.title}>Minhas tarefas</Text>

      <FlatList
        marginHorizontal={10}
        showsHorizontalScrollIndicator={false}
        data={task}
        keyExtractor={ (item) => String(item.key)}
        renderItem={ ({item}) => <TaskList data={item} handleDelete={handleDelete} /> }
      />

      <Modal animationType='slide' transparent={false} visible={open}>
        <SafeAreaView style={style.modal}>
          <View style={style.modalHeader}>
            <TouchableOpacity onPress={ () => setOpen(false) }>
              <Ionicons style={{ marginLeft: 5, marginRight: 5 }} name='md-arrow-back' size={40} color='#FFF' />
            </TouchableOpacity>
            <Text style={style.modalTitle}>Nova tarefa</Text>
          </View>

          <Animatable.View style={style.modalBody} animation='fadeInUp' useNativeDriver>
            <TextInput
              placeholder='O que precisa fazer hoje?'
              style={style.input}
              multiline={true}
              placeholderTextColor='#747474'
              autoCorrect={false}
              value={ input }
              onChangeText={ (text) => setInput(text)}
            />

            <TouchableOpacity style={style.handleAdd} onPress={ handleAdd }> 
              <Text style={style.handleAddText} >Cadastrar</Text>
            </TouchableOpacity>
          </Animatable.View>

        </SafeAreaView>
      </Modal>

      <AnimatedeBtn 
        style={style.fab}
        useNativeDriver
        animation='bounceInUp'
        duration={1500}
        onPress={ () => setOpen(true) }
        >
        <Ionicons name='ios-add' size={35} color='#FFF'/>
      </AnimatedeBtn>

    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171d31'
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginTop: 20,
    color: '#FFF',
    paddingBottom: 10
  },
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: '#0094FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    right: 25,
    bottom: 25,
    elevation: 2,
    zIndex: 9,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 1,
      height: 3
    }
  },
  modal: {
    flex: 1,
    backgroundColor: '#171d31'
  },
  modalHeader: {
    marginLeft: 10,
    marginRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalTitle: {
    marginLeft: 15,
    fontSize: 23,
    color: '#FFF'
  },
  modalBody: {
    marginBottom: 15
  },
  input: {
    marginLeft: 10,
    fontSize: 15,
    marginRight: 10,
    marginTop: 30,
    backgroundColor: '#FFF',
    padding: 9,
    height: 80,
    textAlignVertical: 'top',
    color: '#000',
    borderRadius: 5
  },  
  handleAdd: {
    backgroundColor: '#FFF',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    height: 40,
    borderRadius: 5
  },
  handleAddText: {
    fontSize: 20
  }
})