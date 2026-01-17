import React, { useRef, useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, primaryColor } from '@/constants/theme';
import { FilterModal } from './FilterModal';

interface SearchBarWithBackProps {
  onBack?: () => void;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  autoFocus?: boolean;
  onFiltersChange?: (filters: Record<string, any>) => void;
  autoOpenFilter?: boolean;
}

export function SearchBarWithBack({ 
  onBack, 
  placeholder = "Search Services...",
  value,
  onChangeText,
  autoFocus = false,
  onFiltersChange,
  autoOpenFilter = false
}: SearchBarWithBackProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const inputRef = useRef<TextInput>(null);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      // Small delay to ensure the screen is fully mounted before focusing
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [autoFocus]);

  useEffect(() => {
    if (autoOpenFilter) {
      // Small delay to ensure the screen is fully mounted before opening modal
      const timer = setTimeout(() => {
        setShowFilterModal(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [autoOpenFilter]);

  const handleFiltersApply = (filters: Record<string, any>) => {
    setActiveFilters(filters);
    onFiltersChange?.(filters);
  };

  const hasActiveFilters = Object.values(activeFilters).some((value) => value === true);

  return (
    <>
      <View className="flex-row items-center px-5 py-2 mb-4">
        {/* Back Button */}
        <TouchableOpacity 
          onPress={onBack}
          className="mr-3"
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>

        {/* Search Bar */}
        <View className="flex-1 flex-row items-center bg-gray-100 rounded-full px-4 py-1">
          <Ionicons name="search-outline" size={20} color={colors.icon} />
          <TextInput
            ref={inputRef}
            placeholder={placeholder}
            placeholderTextColor={colors.icon}
            value={value}
            onChangeText={onChangeText}
            className="flex-1 ml-2 text-base"
            style={{ color: colors.text }}
            autoFocus={autoFocus}
          />
        </View>

        {/* Filter Button */}
        <TouchableOpacity
          className="w-12 h-12 rounded-xl items-center justify-center ml-3"
          style={{ backgroundColor: primaryColor }}
          onPress={() => setShowFilterModal(true)}
          activeOpacity={0.7}
        >
          <Ionicons 
            name="options-outline" 
            size={24} 
            color="white" 
          />
          {hasActiveFilters && (
            <View
              className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
              style={{ backgroundColor: '#EF4444' }}
            />
          )}
        </TouchableOpacity>
      </View>

      {/* Filter Modal */}
      <FilterModal
        visible={showFilterModal}
        onApply={handleFiltersApply}
        onCancel={() => setShowFilterModal(false)}
      />
    </>
  );
}
