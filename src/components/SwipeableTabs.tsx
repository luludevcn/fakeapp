import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  tabs: {name: string, label: string}[];
  initialTab: string;
  onTabChange: (tab: string) => void;
}

export default function SwipeableTabs({ tabs,initialTab,onTabChange }:Props) {

    const [activeTab, setActiveTab] = useState(initialTab);
    const handleTabPress = (tab: {name: string, label: string}) => {
      setActiveTab(tab.name);
      onTabChange(tab.name);
    }

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        {tabs.map((tab) => (
        <TouchableOpacity style={tab.name === activeTab ? styles.tabActive : styles.tab} 
        key={tab.name} 
        onPress={() => handleTabPress(tab)}>
          <Text style={[tab.name === activeTab ? styles.tabActiveText : styles.tabText]}>
            {tab.label}
            </Text>
        </TouchableOpacity>
    ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 12,
  },
   tabs: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  tabActive: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
    backgroundColor: '#FF6B00',
  },
  tabText: {
    fontSize: 14,
    color: '#666666',
  },
  tabActiveText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});