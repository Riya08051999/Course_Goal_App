import { StatusBar } from 'expo-status-bar';
import React ,{useState} from 'react';
import { StyleSheet, Text, View,Button, TextInput ,ScrollView,FlatList} from 'react-native';
import GoalItem from './components/GoalItem'
import GoalInput from './components/GoalInput';


export default function App() {
  

const [courseGoals,setCourseGoals]=useState([]);
const [isAddMode,setIsAddMode]=useState(false)

const addGoalHandler=goalTitle=>{
  if(goalTitle.length===0){
    return;
  }
   setCourseGoals(currentGoals=>[...currentGoals,{id:Math.random().toString(),value:goalTitle}]);
   setIsAddMode(false)
  }

const removeGoalHandler=goalId=>{
  
  setCourseGoals(currentGoals=>{
    return currentGoals.filter((goal)=>goal.id!==goalId)
  })
}

const cancelGoalAdditionalHandler=()=>{
  setIsAddMode(false);
}

  return (
    <View style={styles.container}>
     <Button title="Add new Goal" onPress={()=>setIsAddMode(true)}/>
      {/* <ScrollView >
        {courseGoals.map((goal)=><View key={goal} style={styles.listItem}><Text>{goal}</Text></View>)}
      </ScrollView> */}
        <GoalInput visible={isAddMode} onAddGoal={addGoalHandler} onCancel={cancelGoalAdditionalHandler}/>
        <FlatList 
          keyExtractor={(item,index)=>item.id}
          data={courseGoals} 
          renderItem={itemData=>(
             <GoalItem  title={itemData.item.value} onDelete={removeGoalHandler} id={itemData.item.id}/>
          )}  
       />


      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding:50
  },
 
  
});
