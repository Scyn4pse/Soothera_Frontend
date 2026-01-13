import React from 'react';
import { View, ScrollView, TextInput } from 'react-native';
import { Text } from '@/components/Text';

export default function ExploreScreenWeb() {
  return (
    <ScrollView className="flex-1">
      {/* Header with Search */}
      <View className="bg-white border-b border-gray-200 px-8 py-6">
        <Text className="text-3xl font-bold text-gray-900 mb-4">Explore</Text>
        <View className="bg-gray-50 rounded-lg px-4 py-3 border border-gray-200 flex-row items-center">
          <Text className="text-gray-400 mr-2">🔍</Text>
          <TextInput
            placeholder="Search content..."
            className="flex-1 text-gray-900 outline-none"
            placeholderTextColor="#9ca3af"
          />
        </View>
      </View>

      {/* Main Content */}
      <View className="p-8">
        {/* Categories Grid */}
        <View className="mb-8">
          <Text className="text-xl font-bold text-gray-900 mb-4">Categories</Text>
          <View className="flex-row flex-wrap gap-4">
            {['Technology', 'Design', 'Business', 'Health', 'Education', 'Entertainment'].map((category) => (
              <View 
                key={category}
                className="bg-white rounded-lg shadow-sm px-6 py-4 border border-gray-200 hover:border-blue-500 cursor-pointer"
              >
                <Text className="text-gray-900 font-medium">{category}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Featured Content */}
        <View className="mb-8">
          <Text className="text-xl font-bold text-gray-900 mb-4">Featured Content</Text>
          <View className="flex-row flex-wrap gap-6">
            {[1, 2, 3].map((item) => (
              <View key={item} className="bg-white rounded-lg shadow-md overflow-hidden flex-1 min-w-[300px] border border-gray-200">
                <View className="bg-gradient-to-br from-blue-400 to-purple-500 h-40 items-center justify-center">
                  <Text className="text-white text-6xl">📚</Text>
                </View>
                <View className="p-6">
                  <Text className="text-xl font-bold text-gray-900 mb-2">
                    Featured Item {item}
                  </Text>
                  <Text className="text-gray-600 mb-4 leading-6">
                    Discover amazing content and resources tailored for your needs. 
                    Explore new possibilities and expand your knowledge.
                  </Text>
                  <View className="flex-row items-center">
                    <View className="bg-blue-100 rounded-full px-3 py-1">
                      <Text className="text-blue-600 text-sm font-medium">Popular</Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Trending Section */}
        <View className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <Text className="text-xl font-bold text-gray-900 mb-4">Trending Now</Text>
          <View className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <View key={item} className="flex-row items-center py-3 border-b border-gray-100">
                <Text className="text-blue-500 font-bold text-lg mr-4 w-8">{item}</Text>
                <View className="flex-1">
                  <Text className="text-gray-900 font-medium">Trending Topic {item}</Text>
                  <Text className="text-gray-500 text-sm mt-1">
                    {Math.floor(Math.random() * 1000) + 100} views
                  </Text>
                </View>
                <Text className="text-green-500 font-medium">+{Math.floor(Math.random() * 50) + 10}%</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
