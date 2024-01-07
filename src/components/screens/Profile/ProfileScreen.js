import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, SafeAreaView, StatusBar } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const ProfileScreen = () => {
  const [completedTasks, setCompletedTasks] = useState([
    { task: '0', status: 'Completed' },
  ]);

  const [pendingTasks, setPendingTasks] = useState([
    { task: '1', status: 'Pending' },
  ]);

  const renderTaskItem = ({ item }) => (
    <View style={styles.taskItem}>
      <Text style={styles.taskText}>{item.task}</Text>
      <Text style={styles.taskStatus}>{item.status}</Text>
    </View>
  );

  // Example data for the line chart
  const chartData = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        data: [0, 2, 4, 6, 8], // Replace this with your completion data
      },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Profile */}
      <View style={styles.userCard}>
        <Image source={{ uri: 'https://www.bootdey.com/img/Content/avatar/avatar1.png' }} style={styles.userPhoto} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Lessa Mae Ebarle</Text>
          <Text style={styles.userFollowers}>Keep plan for 1 day</Text>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>

      {/* Tasks Section */}
      <View style={styles.tasksContainer}>
        {/* Completed Tasks */}
        <View style={styles.tasksList}>
          <Text style={styles.tasksHeading}>Completed Tasks</Text>
          <FlatList
            data={completedTasks}
            renderItem={renderTaskItem}
            keyExtractor={(item, index) => `completed-${index}`}
          />
        </View>

        {/* Pending Tasks */}
        <View style={styles.tasksList}>
          <Text style={styles.tasksHeading}>Pending Tasks</Text>
          <FlatList
            data={pendingTasks}
            renderItem={renderTaskItem}
            keyExtractor={(item, index) => `pending-${index}`}
          />
        </View>
      </View>

      {/* Line Chart */}
      <View style={styles.chartContainer}>
        <LineChart
          data={chartData}
          width={Dimensions.get('window').width - 40}
          height={200}
          chartConfig={{
            backgroundGradientFrom: '#f4f4f4',
            backgroundGradientTo: '#f4f4f4',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 139, 139, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
        />
      </View>

      {/* Pending Tasks Circle */}
      <View style={styles.pendingTasksContainer}>
        <View style={styles.pendingTasksCircle}>
          <Text style={styles.pendingTasksCount}>{pendingTasks.length}</Text>
        </View>
        <Text style={styles.pendingTasksText}>Pending Tasks</Text>
      </View>

      {/* Add Button */}
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  userPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userInfo: {
    flex: 1,
    marginLeft: 10,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  userFollowers: {
    color: '#999',
  },
  editButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#008B8B',
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  tasksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  tasksList: {
    flex: 1,
    width: '48%',
  },
  taskItem: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: '#fff',
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  taskText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  taskStatus: {
    color: '#999',
  },
  tasksHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 10,
    alignSelf: 'center',
  },
  chartContainer: {
    marginTop: 40,
    paddingHorizontal: 20,
  },
  pendingTasksContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  pendingTasksCircle: {
    width: 100,
    height: 100,
    borderRadius: 40,
    backgroundColor: 'green', // Adjust the color as needed
    alignItems: 'center',
    justifyContent: 'center',
  },
  pendingTasksCount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  pendingTasksText: {
    marginTop: 10,
    fontSize: 20,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#6495ED',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addButtonText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default ProfileScreen;
