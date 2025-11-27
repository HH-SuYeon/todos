import React, { useState } from 'react'
import {
  StyleSheet, Text, View, TextInput,
  Platform, FlatList, Pressable
} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'

export default function App() {
  const [text, setText] = useState('')
  const [todos, setTodos] = useState([])
  const [date, setDate] = useState(new Date())
  const [showPicker, setShowPicker] = useState(false)

  const formatDate = (d) => {
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${y}-${m}-${day}`
  }

  const addTodo = () => {
    if (!text.trim()) return;
    const newTodo = {
      id: Date.now().toString(),
      title: text.trim(),
      date: formatDate(date)
    }
    setTodos([newTodo, ...todos])
    setText('')
  }

  const removeTodo = (id) => {
    setTodos(todos.filter(item => item.id !== id))
  }

  const changeDate = (e, chdate) => {
    if (Platform.OS === 'android') setShowPicker(false)
    if (chdate) setDate(chdate)
  }


  return (
    <View style={styles.container}>

      <Text style={styles.title}>Todo List 📋</Text>

      {/* 날짜를 제목 바로 아래로 배치 */}
      <Pressable onPress={() => setShowPicker(true)} style={styles.dateLine}>
        <Text style={styles.dateText}>{formatDate(date)}</Text>
      </Pressable>

      {/* 입력창 + 추가버튼 */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder='할 일 입력 · · ·'
          value={text}
          onChangeText={setText}
        />
        <Pressable style={styles.addbtn} onPress={addTodo}>
          <Text style={styles.addtext}>추가</Text>
        </Pressable>
      </View>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode='date'
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={changeDate}
        />
      )}

      {/* 리스트 */}
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={{ marginTop: 10 }}>할일이 없어요</Text>}
        renderItem={({ item, idx }) => (
          <Pressable onLongPress={() => removeTodo(item.id)}>
            <Text>{idx}</Text>
            <Text>{item.title}</Text>
            <Text>{item.date}</Text>
            <Text> (길게 눌러서 삭제)</Text>
          </Pressable>
        )}
      />

    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'center',      // 전체 가운데 정렬
    backgroundColor: 'lightpink',
  },
  title: { fontSize: 40, marginBottom: 10 },

  dateLine: { marginBottom: 15 },
  dateText: { fontSize: 18, fontWeight: 'bold' },

  inputRow: {
    flexDirection: 'row',
    marginBottom: 20
  },
  input: {
    width: 200,                 // 더 넓게 수정
    height: 35,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10,
    borderRadius: 8,
    marginRight: 10
  },
  addbtn: {
    backgroundColor: 'black',
    paddingHorizontal: 15,
    justifyContent: 'center',
    borderRadius: 8
  },
  addtext: { color: 'white', fontSize: 18 }
})
