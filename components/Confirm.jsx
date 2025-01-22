import { getAuth } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { db } from '../Config/Firebase';
import TimePicker from './TimePicker';

const Confirm = () => {
  const [timeSlot, setTimeSlot] = useState({ from: null, to: null });
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [cost, setCost] = useState('');
  const [tranxID, setTranxID] = useState('');
  const [paymentType, setPaymentType] = useState('Advance Payment');

  const handleTimeChange = (slot) => {
    setTimeSlot(slot);
  };

  const handleSubmit = async () => {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;
  
    if (!userId) {
      alert('User not authenticated.');
      return;
    }
  
    const bookingData = {
      fromTime: timeSlot.from,
      toTime: timeSlot.to,
      name: name.trim(),
      phone: phone.trim(),
      cost: parseFloat(cost),
      tranxID: tranxID.trim(),
      paymentType,
      userId: userId,
      createdAt: new Date().toISOString(),
    };
  
    try {
      const docRef = await addDoc(collection(db, 'indoorBookings'), bookingData);
      console.log('Document written with ID:', docRef.id);
      alert('Booking Confirmed!');
    } catch (error) {
      console.error('Error adding document:', error);
      alert('Error confirming booking.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.headerText}>Booking Info</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Select Time Slot</Text>
          <TimePicker onTimeSelect={handleTimeChange} />
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
            placeholder="Enter Cost"
            value={cost}
            keyboardType="numeric"
            onChangeText={setCost}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter TranxID"
            value={tranxID}
            onChangeText={setTranxID}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Payment Type</Text>
          <View style={styles.paymentTypeContainer}>
            <TouchableOpacity
              style={[
                styles.paymentTypeCheckbox,
                paymentType === 'Advance Payment' ? styles.selectedPaymentType : null,
              ]}
              onPress={() => setPaymentType('Advance Payment')}
            >
              <Text style={styles.paymentTypeText}>Advance Payment</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.paymentTypeCheckbox,
                paymentType === 'Full Payment' ? styles.selectedPaymentType : null,
              ]}
              onPress={() => setPaymentType('Full Payment')}
            >
              <Text style={styles.paymentTypeText}>Full Payment</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.confirmButton} onPress={handleSubmit}>
          <Text style={styles.confirmButtonText}>Confirm</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: '#7A67FF',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  paymentTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paymentTypeCheckbox: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#7A67FF',
    borderRadius: 8,
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 5,
  },
  selectedPaymentType: {
    backgroundColor: '#7A67FF',
  },
  paymentTypeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Confirm;
