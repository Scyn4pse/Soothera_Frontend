import React, { useState, useEffect, useMemo } from 'react';
import { Modal, View, TouchableOpacity, TouchableWithoutFeedback, ScrollView, Dimensions } from 'react-native';
import { Text } from '@/components/Text';
import { Ionicons } from '@expo/vector-icons';
import { Colors, primaryColor } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export interface RescheduleModalProps {
  visible: boolean;
  initialDate?: Date;
  initialTime?: Date;
  onConfirm: (date: Date, time: Date) => void;
  onCancel: () => void;
}

export const RescheduleModal: React.FC<RescheduleModalProps> = ({
  visible,
  initialDate,
  initialTime,
  onConfirm,
  onCancel,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const isDark = colorScheme === 'dark';

  // Initialize with current date/time or provided values
  const [selectedDate, setSelectedDate] = useState<Date>(
    initialDate || new Date()
  );
  const [selectedTime, setSelectedTime] = useState<Date>(
    initialTime || new Date()
  );

  // Calendar view state (current month being displayed)
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  
  // Calendar container width for calculating day cell size
  const [calendarWidth, setCalendarWidth] = useState<number>(0);

  // Update state when initial values change or modal visibility changes
  useEffect(() => {
    if (visible) {
      if (initialDate) {
        setSelectedDate(new Date(initialDate));
      } else {
        setSelectedDate(new Date());
      }
      if (initialTime) {
        setSelectedTime(new Date(initialTime));
      } else {
        setSelectedTime(new Date());
      }
      // Set current month to selected date or today
      const dateToShow = initialDate || new Date();
      setCurrentMonth(new Date(dateToShow.getFullYear(), dateToShow.getMonth(), 1));
      
      // Round initial time to nearest 15-minute interval
      if (initialTime) {
        const roundedTime = roundToNearest15Minutes(new Date(initialTime));
        setSelectedTime(roundedTime);
      } else {
        setSelectedTime(roundToNearest15Minutes(new Date()));
      }
    }
  }, [initialDate, initialTime, visible]);

  // Round time to nearest 15-minute interval
  const roundToNearest15Minutes = (date: Date): Date => {
    const rounded = new Date(date);
    const minutes = rounded.getMinutes();
    const roundedMinutes = Math.round(minutes / 15) * 15;
    rounded.setMinutes(roundedMinutes);
    rounded.setSeconds(0);
    rounded.setMilliseconds(0);
    return rounded;
  };

  // Generate time slots with 15-minute intervals (8:00 AM to 8:00 PM)
  const timeSlots = useMemo(() => {
    const slots: Date[] = [];
    const startHour = 8; // 8:00 AM
    const endHour = 20; // 8:00 PM (20:00)
    
    const baseDate = new Date(selectedDate);
    baseDate.setHours(0, 0, 0, 0);
    
    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        // Skip if it's past the end time
        if (hour === endHour && minute > 0) break;
        
        const slot = new Date(baseDate);
        slot.setHours(hour, minute, 0, 0);
        slots.push(slot);
      }
    }
    
    return slots;
  }, [selectedDate]);

  // Format date for display
  const formatDate = (date: Date): string => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  // Format time for display
  const formatTime = (date: Date): string => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes.toString().padStart(2, '0');
    return `${displayHours}:${displayMinutes} ${ampm}`;
  };

  // Check if a time slot is selected
  const isTimeSlotSelected = (slot: Date): boolean => {
    return (
      selectedTime.getHours() === slot.getHours() &&
      selectedTime.getMinutes() === slot.getMinutes()
    );
  };

  // Handle time slot selection
  const handleTimeSlotSelect = (slot: Date) => {
    setSelectedTime(new Date(slot));
  };

  // Calendar helper functions
  const getDaysInMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const isToday = (date: Date): boolean => {
    const today = new Date();
    return isSameDay(date, today);
  };

  const isPast = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    today.setMinutes(0, 0);
    today.setSeconds(0, 0);
    today.setMilliseconds(0);
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    compareDate.setMinutes(0, 0);
    compareDate.setSeconds(0, 0);
    compareDate.setMilliseconds(0);
    // Only mark as past if the date is strictly before today (allow today)
    return compareDate.getTime() < today.getTime();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    if (direction === 'prev') {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
  };

  const handleDateSelect = (day: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    // Allow selection of today and future dates only
    if (!isPast(newDate)) {
      setSelectedDate(newDate);
    }
  };

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days: (number | null)[] = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  }, [currentMonth]);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Calculate day cell size for calendar grid based on actual container width
  const dayCellSize = useMemo(() => {
    let calculatedSize: number;
    if (calendarWidth === 0) {
      // Fallback calculation if container hasn't been measured yet
      const screenWidth = Dimensions.get('window').width;
      const modalMaxWidth = Math.min(384, screenWidth - 40);
      const availableWidth = modalMaxWidth - 48 - 24; // modal padding + calendar padding
      calculatedSize = Math.floor(availableWidth / 7);
    } else {
      // Use actual measured width, accounting for padding (p-3 = 12px each side = 24px total)
      const availableWidth = calendarWidth - 24;
      calculatedSize = Math.floor(availableWidth / 7);
    }
    // Ensure minimum size for clickability (at least 40px for proper touch target)
    const finalSize = Math.max(calculatedSize, 40);
    console.log('Day cell size calculated:', finalSize, 'calendarWidth:', calendarWidth);
    return finalSize;
  }, [calendarWidth]);


  // Handle confirm
  const handleConfirm = () => {
    // Combine date and time
    const combinedDateTime = new Date(selectedDate);
    combinedDateTime.setHours(selectedTime.getHours());
    combinedDateTime.setMinutes(selectedTime.getMinutes());
    combinedDateTime.setSeconds(0);
    combinedDateTime.setMilliseconds(0);

    onConfirm(selectedDate, selectedTime);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <TouchableWithoutFeedback onPress={onCancel}>
        <View className="flex-1 bg-black/50 justify-center items-center p-5">
          <TouchableWithoutFeedback>
            <View
              className={`rounded-2xl p-6 w-full max-w-sm ${
                isDark ? 'bg-[#1f1f1f]' : 'bg-white'
              }`}
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8,
              }}
            >
              {/* Icon */}
              <View className="items-center mb-4">
                <View
                  className="w-16 h-16 rounded-full items-center justify-center"
                  style={{ backgroundColor: `${primaryColor}20` }}
                >
                  <Ionicons name="calendar-outline" size={32} color={primaryColor} />
                </View>
              </View>

              {/* Title */}
              <Text
                className="text-xl font-semibold mb-6 text-center"
                style={{ color: colors.text }}
              >
                Re-schedule Booking
              </Text>

              {/* Custom Date Picker Section */}
              <View className="mb-4">
                <Text
                  className="text-sm font-semibold mb-2"
                  style={{ color: colors.text }}
                >
                  Select Date
                </Text>
                <View
                  className="rounded-xl border p-3"
                  style={{
                    borderColor: isDark ? '#3a3a3a' : '#E5E7EB',
                    backgroundColor: isDark ? '#2a2a2a' : '#F9FAFB',
                  }}
                  onLayout={(event) => {
                    const { width } = event.nativeEvent.layout;
                    setCalendarWidth(width);
                  }}
                >
                  {/* Month Navigation */}
                  <View className="flex-row items-center justify-between mb-4">
                    <TouchableOpacity
                      onPress={() => navigateMonth('prev')}
                      className="w-8 h-8 items-center justify-center rounded-full"
                      style={{ backgroundColor: isDark ? '#3a3a3a' : '#E5E7EB' }}
                      activeOpacity={0.7}
                    >
                      <Ionicons
                        name="chevron-back"
                        size={18}
                        color={colors.text}
                      />
                    </TouchableOpacity>
                    <Text
                      className="text-base font-semibold"
                      style={{ color: colors.text }}
                    >
                      {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                    </Text>
                    <TouchableOpacity
                      onPress={() => navigateMonth('next')}
                      className="w-8 h-8 items-center justify-center rounded-full"
                      style={{ backgroundColor: isDark ? '#3a3a3a' : '#E5E7EB' }}
                      activeOpacity={0.7}
                    >
                      <Ionicons
                        name="chevron-forward"
                        size={18}
                        color={colors.text}
                      />
                    </TouchableOpacity>
                  </View>

                  {/* Day Names Header */}
                  <View className="flex-row mb-2">
                    {dayNames.map((day, index) => (
                      <View key={index} className="flex-1 items-center py-1">
                        <Text
                          className="text-xs font-medium"
                          style={{ color: colors.icon }}
                        >
                          {day}
                        </Text>
                      </View>
                    ))}
                  </View>

                  {/* Calendar Grid */}
                  <View className="flex-row flex-wrap" style={{ width: '100%' }}>
                    {calendarDays.map((day, index) => {
                      if (day === null) {
                        return (
                          <View
                            key={index}
                            style={{
                              width: dayCellSize,
                              height: dayCellSize,
                              minWidth: 40,
                              minHeight: 40,
                            }}
                          />
                        );
                      }

                      const dayDate = new Date(
                        currentMonth.getFullYear(),
                        currentMonth.getMonth(),
                        day
                      );
                      const isSelected = isSameDay(dayDate, selectedDate);
                      const isDayToday = isToday(dayDate);
                      const isDayPast = isPast(dayDate);

                      return (
                        <TouchableOpacity
                          key={index}
                          className="items-center justify-center rounded-lg"
                          style={{
                            width: dayCellSize,
                            height: dayCellSize,
                            minWidth: 40,
                            minHeight: 40,
                            backgroundColor: isSelected
                              ? colors.primary
                              : isDayToday
                              ? `${colors.primary}20`
                              : isDark
                              ? '#2a2a2a'
                              : '#F9FAFB',
                            opacity: isDayPast ? 0.3 : 1,
                            borderWidth: isSelected ? 2 : 0,
                            borderColor: isSelected ? colors.primary : 'transparent',
                          }}
                          onPress={() => {
                            console.log('Date pressed:', day, 'isPast:', isDayPast);
                            handleDateSelect(day);
                          }}
                          disabled={isDayPast}
                          activeOpacity={0.6}
                          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                        >
                          <Text
                            className="text-sm font-medium"
                            style={{
                              color: isSelected
                                ? 'white'
                                : isDayToday
                                ? colors.primary
                                : isDayPast
                                ? colors.icon
                                : colors.text,
                            }}
                          >
                            {day}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              </View>

              {/* Time Slots Section */}
              <View className="mb-6">
                <Text
                  className="text-sm font-semibold mb-2"
                  style={{ color: colors.text }}
                >
                  Select Time
                </Text>
                <View
                  className="rounded-xl border"
                  style={{
                    borderColor: isDark ? '#3a3a3a' : '#E5E7EB',
                    backgroundColor: isDark ? '#2a2a2a' : '#F9FAFB',
                  }}
                >
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ padding: 8 }}
                    nestedScrollEnabled
                  >
                    {timeSlots.map((slot, index) => {
                      const isSelected = isTimeSlotSelected(slot);
                      return (
                        <TouchableOpacity
                          key={index}
                          className="px-3 py-2 rounded-lg border mr-2"
                          style={{
                            borderColor: isSelected ? colors.primary : (isDark ? '#3a3a3a' : '#E5E7EB'),
                            backgroundColor: isSelected ? colors.primary : 'transparent',
                          }}
                          onPress={() => handleTimeSlotSelect(slot)}
                          activeOpacity={0.7}
                        >
                          <Text
                            className="text-sm font-medium"
                            style={{
                              color: isSelected ? 'white' : colors.text,
                            }}
                          >
                            {formatTime(slot)}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                </View>
              </View>

              {/* Buttons */}
              <View className="flex-row gap-3">
                <TouchableOpacity
                  className={`flex-1 border rounded-xl py-3.5 ${
                    isDark ? 'border-[#3a3a3a]' : 'border-gray-300'
                  }`}
                  onPress={onCancel}
                  activeOpacity={0.7}
                >
                  <Text
                    className="font-semibold text-center"
                    style={{ color: colors.text }}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex-1 rounded-xl py-3.5"
                  style={{ backgroundColor: primaryColor }}
                  onPress={handleConfirm}
                  activeOpacity={0.7}
                >
                  <Text className="text-white font-semibold text-center">
                    Confirm
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default RescheduleModal;
