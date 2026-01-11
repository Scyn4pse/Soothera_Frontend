import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';

export default function ProfileScreenWeb() {
  return (
    <ScrollView className="flex-1">
      {/* Header */}
      <View className="bg-white border-b border-gray-200 px-8 py-6">
        <Text className="text-3xl font-bold text-gray-900">Profile Settings</Text>
        <Text className="text-gray-600 mt-2">Manage your account and preferences</Text>
      </View>

      {/* Main Content */}
      <View className="p-8">
        <View className="flex-row gap-8">
          {/* Left Column - Profile Info */}
          <View className="flex-1">
            {/* Profile Card */}
            <View className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
              <View className="items-center mb-6">
                <View className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 items-center justify-center mb-4">
                  <Text className="text-white text-4xl font-bold">JD</Text>
                </View>
                <Text className="text-2xl font-bold text-gray-900">John Doe</Text>
                <Text className="text-gray-600 mt-1">john.doe@soothera.com</Text>
                <View className="bg-blue-100 rounded-full px-3 py-1 mt-3">
                  <Text className="text-blue-600 text-sm font-medium">Premium Member</Text>
                </View>
              </View>

              <View className="border-t border-gray-200 pt-6">
                <View className="flex-row justify-around">
                  <View className="items-center">
                    <Text className="text-2xl font-bold text-gray-900">42</Text>
                    <Text className="text-gray-500 text-sm mt-1">Projects</Text>
                  </View>
                  <View className="items-center">
                    <Text className="text-2xl font-bold text-gray-900">1,234</Text>
                    <Text className="text-gray-500 text-sm mt-1">Followers</Text>
                  </View>
                  <View className="items-center">
                    <Text className="text-2xl font-bold text-gray-900">567</Text>
                    <Text className="text-gray-500 text-sm mt-1">Following</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Account Information */}
            <View className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <Text className="text-xl font-bold text-gray-900 mb-4">Account Information</Text>
              <View className="space-y-4">
                <View className="flex-row justify-between items-center py-3 border-b border-gray-100">
                  <Text className="text-gray-600">Username</Text>
                  <Text className="text-gray-900 font-medium">johndoe</Text>
                </View>
                <View className="flex-row justify-between items-center py-3 border-b border-gray-100">
                  <Text className="text-gray-600">Member Since</Text>
                  <Text className="text-gray-900 font-medium">January 2024</Text>
                </View>
                <View className="flex-row justify-between items-center py-3 border-b border-gray-100">
                  <Text className="text-gray-600">Account Type</Text>
                  <Text className="text-gray-900 font-medium">Premium</Text>
                </View>
                <View className="flex-row justify-between items-center py-3">
                  <Text className="text-gray-600">Status</Text>
                  <View className="flex-row items-center">
                    <View className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                    <Text className="text-green-600 font-medium">Active</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Right Column - Settings & Preferences */}
          <View className="flex-1">
            {/* Settings Section */}
            <View className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
              <Text className="text-xl font-bold text-gray-900 mb-4">Settings</Text>
              <View className="space-y-3">
                {[
                  { icon: '🔔', title: 'Notifications', subtitle: 'Manage your notification preferences' },
                  { icon: '🔒', title: 'Privacy & Security', subtitle: 'Control your privacy settings' },
                  { icon: '🎨', title: 'Appearance', subtitle: 'Customize the look and feel' },
                  { icon: '🌐', title: 'Language & Region', subtitle: 'Set your language preferences' },
                ].map((setting, index) => (
                  <Pressable
                    key={index}
                    className="flex-row items-center p-4 rounded-lg hover:bg-gray-50 border border-gray-100"
                  >
                    <Text className="text-2xl mr-4">{setting.icon}</Text>
                    <View className="flex-1">
                      <Text className="text-gray-900 font-medium">{setting.title}</Text>
                      <Text className="text-gray-500 text-sm mt-1">{setting.subtitle}</Text>
                    </View>
                    <Text className="text-gray-400">›</Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Preferences */}
            <View className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
              <Text className="text-xl font-bold text-gray-900 mb-4">Preferences</Text>
              <View className="space-y-4">
                <View className="flex-row justify-between items-center py-3">
                  <View className="flex-1">
                    <Text className="text-gray-900 font-medium">Email Notifications</Text>
                    <Text className="text-gray-500 text-sm mt-1">Receive updates via email</Text>
                  </View>
                  <View className="w-12 h-6 bg-blue-500 rounded-full items-end justify-center px-1">
                    <View className="w-5 h-5 bg-white rounded-full" />
                  </View>
                </View>
                <View className="flex-row justify-between items-center py-3">
                  <View className="flex-1">
                    <Text className="text-gray-900 font-medium">Dark Mode</Text>
                    <Text className="text-gray-500 text-sm mt-1">Switch to dark theme</Text>
                  </View>
                  <View className="w-12 h-6 bg-gray-300 rounded-full items-start justify-center px-1">
                    <View className="w-5 h-5 bg-white rounded-full" />
                  </View>
                </View>
              </View>
            </View>

            {/* Danger Zone */}
            <View className="bg-red-50 rounded-lg p-6 border border-red-200">
              <Text className="text-xl font-bold text-red-900 mb-2">Danger Zone</Text>
              <Text className="text-red-600 text-sm mb-4">
                These actions cannot be undone. Please proceed with caution.
              </Text>
              <Pressable className="bg-red-600 rounded-lg py-3 px-4">
                <Text className="text-white font-medium text-center">Delete Account</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
