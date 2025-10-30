import React from "react";
import { View, Text } from "react-native";
import { ScaledSheet, scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export function Task({ counts }) {  // استقبال counts كـ prop

  const summaryData = [
    {
      icon: 'beaker',
      label: 'On Hold',
      bgColor: '#FFF5E1',
      iconColor: '#F6A609',
    },
    {
      icon: 'check-circle',
      label: 'Completed',
      bgColor: '#E3F8ED',
      iconColor: '#00C566',
    },
    {
      icon: 'progress-clock',
      label: 'OnGoing',
      bgColor: '#E3EBFF',
      iconColor: '#3B5AFB',
    },
    {
      icon: 'cancel',
      label: 'Canceled ',
      bgColor: '#EEE7F9',
      iconColor: '#9B51E0',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Appointments summary</Text>
      <View style={styles.grid}>
        {counts.map((count, index) => (
          <View key={index} style={[styles.card, { backgroundColor: summaryData[index].bgColor }]}>
            <View style={styles.iconBox}>
              <Icon name={summaryData[index].icon} size={scale(22)} color={summaryData[index].iconColor} />
            </View>
            <Text style={styles.count}>{count}</Text>
            <Text style={styles.label}>{summaryData[index].label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    paddingHorizontal: '10@s',
    paddingVertical:"5@s",
  },
  title: {
    fontSize: '18@ms',
    fontWeight: '600',
    marginBottom: '12@vs',
    color: '#000',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    borderRadius: '12@ms',
    padding: '16@ms',
    marginBottom: '10@vs',
  },
  iconBox: {
    marginBottom: '10@vs',
  },
  count: {
    fontSize: '22@ms',
    fontWeight: 'bold',
    color: '#000',
  },
  label: {
    fontSize: '14@ms',
    color: '#888',
  },
});
