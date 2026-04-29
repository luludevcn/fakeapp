import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  tabs: {name: string, label: string}[];
  initialTab: string;
  onTabChange: (tab: string) => void;
}

export default function SwipeableTabs({ tabs, initialTab, onTabChange }: Props) {
  const [activeTab, setActiveTab] = useState(initialTab);
  
  const handleTabPress = (tab: {name: string, label: string}) => {
    setActiveTab(tab.name);
    onTabChange(tab.name);
  }

  return (
    <View className="bg-gray-100 py-3">
      <View className="flex-row bg-white mx-4 mb-4 rounded-lg p-1">
        {tabs.map((tab) => (
          <TouchableOpacity 
            key={tab.name}
            className={`flex-1 py-2.5 items-center rounded-md ${tab.name === activeTab ? 'bg-orange-500' : ''}`}
            onPress={() => handleTabPress(tab)}
          >
            <Text className={`text-sm ${tab.name === activeTab ? 'text-white font-bold' : 'text-gray-600'}`}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
