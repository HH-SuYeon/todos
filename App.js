import React, { useState } from 'react'
import {
  StyleSheet, Text, View, TextInput,
  Platform, FlatList, Pressable,
} from 'react-native';
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
    if (!text.trim()) return

    const newTodo = {
      id: Date.now().toString(),
      title: text.trim(),
      date: formatDate(date)
    }
    setTodos([newTodo, ...todos])
    setText('')
  }

  const removeTodo = (id) => {
    setTodos(todos.filter((item) => item.id !== id))
  }

  const changeDate = (e, chdate) => {
    if (Platform.OS === 'android') setShowPicker(false)
    if (chdate) setDate(chdate)
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List 📋</Text>

      {/* 🔥 날짜 위치를 TODO 리스트 제목 바로 아래로 이동 */}
      <Pressable onPress={() => setShowPicker(true)} style={styles.dateWrap}>
        <Text style={styles.dateText}>{formatDate(date)}</Text>
      </Pressable>

      {/* 입력창 + 버튼 */}
      <View style={styles.inputR}>
        <TextInput
          style={styles.in}
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
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={changeDate}
        />
      )}

      {/* 리스트 */}
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>할일이 없어요</Text>}
        renderItem={({ item, idx }) => (
          <Pressable onLongPress={() => removeTodo(item.id)}>
            <Text>{idx}</Text>
            <Text>{item.title}</Text>
            <Text>{item.date}</Text>
            <Text> 길게 눌러서 삭제</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    alignItems: 'center',
    backgroundColor: 'lightpink',
  },
  title: {
    fontSize: 50,
    marginBottom: 10,
  },

  /* 🔥 날짜를 한 줄로 가운데 정렬되도록 스타일만 추가 */
  dateWrap: {
    marginBottom: 15,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: darkgray,
  },

  inputR: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  in: {
    width: 180,  /* 기존보다 조금 넓힘 */
    height: 30,
    borderWidth: 1,
    borderColor: "lightGray",
    padding: 12,
    borderRadius: 10,
    marginRight: 10,
  },
  addbtn: {
    width: 60,
    height: 30,
    backgroundColor: "black",
    color: "white",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
  },
  addtext: {
    fontSize: 20,
    color: 'white',
  }
});
