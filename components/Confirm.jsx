import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import TimePicker from './TimePicker';

const Confirm = () => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [cost, setCost] = useState('');
  const [tranxID, setTranxID] = useState('');
  const [paymentType, setPaymentType] = useState('Advance Payment');

  const handleDateTimeChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleSubmit = () => {
    // Add your submission logic here
    console.log('Booking Info:', {
      date,
      name,
      phone,
      cost,
      tranxID,
      paymentType,
    });
  };
  return (
    <View style={styles.container}>
        <Text style={styles.headerText}>
            Booking Info
        </Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Date & Time</Text>
        <TimePicker />
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="datetime"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleDateTimeChange}
          />
        )}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Name"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Number"
          value={phone}
          keyboardType="phone-pad"
          onChangeText={setPhone}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Cost"
          value={cost}
          keyboardType="numeric"
          onChangeText={setCost}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Tranx ID"
          value={tranxID}
          onChangeText={setTranxID}
        />
      </View>
{/* Payment Option is Here */}
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Payment Type</Text>
        <View style={styles.paymentTypeContainer}>
          <View style={styles.paymentTypeOption}>
            <Text style={styles.paymentTypeText}>Advance Payment</Text>
            <TouchableOpacity
              style={[
                styles.paymentTypeCheckbox,
                paymentType === 'Advance Payment' ? styles.selectedPaymentType : null,
              ]}
              onPress={() => setPaymentType('Advance Payment')}
            >
              {paymentType === 'Advance Payment' && (
                <View style={styles.checkboxIndicator} />
              )}
            </TouchableOpacity>
            
          </View>
          <View style={styles.paymentTypeOption}>
          <Text style={styles.paymentTypeText}>Full Payment</Text>
            <TouchableOpacity
              style={[
                styles.paymentTypeCheckbox,
                paymentType === 'Full Payment' ? styles.selectedPaymentType : null,
              ]}
              onPress={() => setPaymentType('Full Payment')}
            >
              {paymentType === 'Full Payment' && (
                <View style={styles.checkboxIndicator} />
              )}
            </TouchableOpacity>
            
          </View>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.confirmButton} onPress={handleSubmit}>
          <Text style={styles.confirmButtonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
       <Text style={styles.warningText}>
        You can cancel your booking within 20 minutes of confirmation !
       </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  headerText:{
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    marginLeft:1,
  },
  dateTimeInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  dateTimeText: {
    fontSize: 16,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: '#7A67FF',
    borderRadius: 8,
    paddingVertical: 12,
    marginHorizontal:5,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  paymentTypeContainer: {
    // flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paymentTypeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    margin:10,
    justifyContent: 'space-between',
  },
  paymentTypeCheckbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#7A67FF',
    borderRadius: '50%',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedPaymentType: {
    backgroundColor: '#7A67FF',
  },
  checkboxIndicator: {
    width: 12,
    height: 12,
    backgroundColor: '#fff',
    borderRadius: '50%',
  },
  paymentTypeText: {
    fontSize: 20,
    color: '#333',
  },
  warningText:{
    marginHorizontal:7,
    color: '#333',
  },
});

export default Confirm;