import React, { useState } from 'react';
import {
  SafeAreaView, ScrollView, View, Text, TouchableOpacity,
  TextInput, StyleSheet, StatusBar, Alert
} from 'react-native';

const pink = '#F48FB1';
const purple = '#9B8AE6';
const dark = '#40334D';
const cream = '#FFF8FC';
const muted = '#8B7E91';

const questions = [
  'What was your first thought when we met?',
  'What little thing I do makes you smile?',
  'What should our next date be?',
  'What is one memory with me you want to relive?',
];
const thisOrThat = [
  ['Sunset date 🌅', 'Movie night 🎬'],
  ['Hugs 🤗', 'Kisses 💋'],
  ['Beach trip 🏖️', 'Mountain trip 🏔️'],
  ['Love letter 💌', 'Surprise gift 🎁'],
];

export default function App() {
  const [tab, setTab] = useState('Home');
  const [notes, setNotes] = useState([]);
  const [memories, setMemories] = useState([]);
  const [noteText, setNoteText] = useState('');
  const [memoryText, setMemoryText] = useState('');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [gameIndex, setGameIndex] = useState(0);
  const [picked, setPicked] = useState('');

  const addNote = () => {
    if (!noteText.trim()) return;
    setNotes([{ id: Date.now().toString(), text: noteText.trim() }, ...notes]);
    setNoteText('');
  };
  const addMemory = () => {
    if (!memoryText.trim()) return;
    setMemories([{ id: Date.now().toString(), text: memoryText.trim() }, ...memories]);
    setMemoryText('');
  };
  const nextGame = () => {
    setGameIndex((gameIndex + 1) % thisOrThat.length);
    setPicked('');
  };
  const nextQuestion = () => setQuestionIndex((questionIndex + 1) % questions.length);

  const Button = ({ title, onPress, secondary = false }) => (
    <TouchableOpacity onPress={onPress} style={[styles.button, secondary && styles.secondaryButton]}>
      <Text style={[styles.buttonText, secondary && styles.secondaryButtonText]}>{title}</Text>
    </TouchableOpacity>
  );

  const Card = ({ children }) => <View style={styles.card}>{children}</View>;

  const renderContent = () => {
    switch (tab) {
      case 'Home':
        return <>
          <View style={styles.hero}>
            <Text style={styles.eyebrow}>YOUR LITTLE CORNER OF LOVE</Text>
            <Text style={styles.heroTitle}>Always Us <Text>♡</Text></Text>
            <Text style={styles.heroCopy}>Two hearts, one little world.</Text>
            <Text style={styles.heartArt}>♡  ♥  ♡</Text>
          </View>
          <Text style={styles.sectionTitle}>Made for the two of you</Text>
          <View style={styles.grid}>
            {[
              ['🎮', 'Play together', 'Games'],
              ['💌', 'Love notes', 'Notes'],
              ['📸', 'Our memories', 'Memories'],
              ['📞', 'Stay close', 'Call'],
            ].map(([emoji, label, destination]) => (
              <TouchableOpacity key={destination} style={styles.tile} onPress={() => setTab(destination)}>
                <Text style={styles.tileEmoji}>{emoji}</Text>
                <Text style={styles.tileTitle}>{label}</Text>
                <Text style={styles.tileArrow}>Open →</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Card>
            <Text style={styles.cardKicker}>DAILY QUESTION 💭</Text>
            <Text style={styles.question}>{questions[questionIndex]}</Text>
            <Button title="Another question ↗" onPress={nextQuestion} secondary />
          </Card>
        </>;
      case 'Call':
        return <Card>
          <Text style={styles.bigEmoji}>📞</Text>
          <Text style={styles.sectionTitle}>Feel a little closer</Text>
          <Text style={styles.bodyCopy}>Your call corner is ready for the next step. Calling is currently a visual prototype; it does not place real audio or video calls yet.</Text>
          <Button title="Audio call" onPress={() => Alert.alert('Coming next 💗', 'Real-time calling still needs to be connected.')} />
          <Button title="Video call" onPress={() => Alert.alert('Coming next 💗', 'Real-time calling still needs to be connected.')} secondary />
        </Card>;
      case 'Games':
        return <>
          <Text style={styles.sectionTitle}>Little games, big smiles 🎮</Text>
          <Card>
            <Text style={styles.cardKicker}>THIS OR THAT</Text>
            <Text style={styles.question}>Choose your favourite</Text>
            {thisOrThat[gameIndex].map(option => (
              <TouchableOpacity key={option} onPress={() => setPicked(option)} style={[styles.choice, picked === option && styles.choicePicked]}>
                <Text style={styles.choiceText}>{option}</Text>
              </TouchableOpacity>
            ))}
            {picked ? <Text style={styles.successText}>Cute choice! 💗 You picked {picked}</Text> : null}
            <Button title="Next round →" onPress={nextGame} />
          </Card>
          <Card>
            <Text style={styles.cardKicker}>GET TO KNOW US 💞</Text>
            <Text style={styles.question}>{questions[questionIndex]}</Text>
            <Button title="Next question" onPress={nextQuestion} secondary />
          </Card>
        </>;
      case 'Notes':
        return <>
          <Text style={styles.sectionTitle}>Little love notes 💌</Text>
          <Card>
            <TextInput value={noteText} onChangeText={setNoteText} placeholder="Write something sweet..." placeholderTextColor={muted} multiline style={styles.input} />
            <Button title="Save note ♡" onPress={addNote} />
          </Card>
          {notes.length === 0 ? <Text style={styles.empty}>Your little notes will appear here.</Text> : notes.map(note => <Card key={note.id}><Text style={styles.noteText}>{note.text}</Text><Text style={styles.noteHeart}>♡ Always Us</Text></Card>)}
        </>;
      case 'Memories':
        return <>
          <Text style={styles.sectionTitle}>Our memory box 📸</Text>
          <Card>
            <TextInput value={memoryText} onChangeText={setMemoryText} placeholder="Add a favourite moment..." placeholderTextColor={muted} multiline style={styles.input} />
            <Button title="Save memory ♡" onPress={addMemory} />
          </Card>
          {memories.length === 0 ? <Text style={styles.empty}>The best moments are still ahead of us.</Text> : memories.map(memory => <Card key={memory.id}><Text style={styles.noteText}>{memory.text}</Text><Text style={styles.noteHeart}>A moment to keep ♡</Text></Card>)}
        </>;
      default: return null;
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={cream} />
      <View style={styles.topBar}>
        <Text style={styles.brand}>♡ Always Us</Text>
        <Text style={styles.topCaption}>JUST YOU + ME</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        {renderContent()}
        <Text style={styles.footer}>Made with love, for your little world ♡</Text>
      </ScrollView>
      <View style={styles.nav}>
        {[
          ['Home', '⌂'], ['Call', '♡'], ['Games', '✧'], ['Notes', '✉'], ['Memories', '♡'],
        ].map(([name, icon]) => (
          <TouchableOpacity key={name} onPress={() => setTab(name)} style={styles.navItem}>
            <Text style={[styles.navIcon, tab === name && styles.navActive]}>{icon}</Text>
            <Text style={[styles.navLabel, tab === name && styles.navActive]}>{name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: cream },
  topBar: { paddingHorizontal: 22, paddingVertical: 13, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  brand: { fontSize: 20, fontWeight: '800', color: dark },
  topCaption: { fontSize: 9, letterSpacing: 2, color: muted, fontWeight: '700' },
  content: { padding: 18, paddingBottom: 28 },
  hero: { backgroundColor: '#FCE4EF', borderRadius: 28, padding: 24, marginBottom: 22, overflow: 'hidden' },
  eyebrow: { color: '#A35E83', fontSize: 9, fontWeight: '800', letterSpacing: 2 },
  heroTitle: { color: dark, fontSize: 39, fontWeight: '900', marginTop: 12 },
  heroCopy: { color: '#75576C', fontSize: 15, marginTop: 5 },
  heartArt: { color: pink, fontSize: 31, marginTop: 17, letterSpacing: 7 },
  sectionTitle: { color: dark, fontSize: 23, fontWeight: '800', marginTop: 8, marginBottom: 15 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 12 },
  tile: { width: '48%', backgroundColor: '#FFFFFF', borderRadius: 20, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#F2E6EF' },
  tileEmoji: { fontSize: 26, marginBottom: 11 },
  tileTitle: { fontSize: 14, color: dark, fontWeight: '800' },
  tileArrow: { color: '#A27C9A', fontSize: 11, marginTop: 7 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 22, padding: 19, marginBottom: 14, borderWidth: 1, borderColor: '#F2E6EF' },
  cardKicker: { color: '#B26B91', fontSize: 10, fontWeight: '800', letterSpacing: 1.6, marginBottom: 10 },
  question: { color: dark, fontSize: 19, fontWeight: '700', lineHeight: 27, marginBottom: 16 },
  button: { backgroundColor: pink, paddingVertical: 13, paddingHorizontal: 16, borderRadius: 15, alignItems: 'center', marginTop: 8 },
  buttonText: { color: '#FFFFFF', fontWeight: '800', fontSize: 14 },
  secondaryButton: { backgroundColor: '#F7EDF5', borderWidth: 1, borderColor: '#EAD8E8' },
  secondaryButtonText: { color: dark },
  bigEmoji: { fontSize: 44, textAlign: 'center', marginVertical: 14 },
  bodyCopy: { color: muted, fontSize: 14, lineHeight: 22, marginBottom: 14 },
  choice: { borderWidth: 1, borderColor: '#EEDDEB', borderRadius: 16, padding: 16, marginBottom: 9, backgroundColor: '#FFFAFD' },
  choicePicked: { backgroundColor: '#FCE4EF', borderColor: pink },
  choiceText: { textAlign: 'center', color: dark, fontWeight: '700', fontSize: 16 },
  successText: { color: '#9B5E82', fontWeight: '700', marginTop: 5, textAlign: 'center' },
  input: { minHeight: 90, borderWidth: 1, borderColor: '#EAD8E8', borderRadius: 15, padding: 13, color: dark, textAlignVertical: 'top', fontSize: 15 },
  empty: { color: muted, textAlign: 'center', paddingVertical: 20 },
  noteText: { color: dark, fontSize: 16, lineHeight: 23 },
  noteHeart: { color: '#B26B91', fontSize: 11, marginTop: 12, fontWeight: '700' },
  footer: { color: '#B6A4B3', textAlign: 'center', fontSize: 11, marginTop: 18, marginBottom: 10 },
  nav: { flexDirection: 'row', backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#F0E5EF', paddingTop: 9, paddingBottom: 8, justifyContent: 'space-around' },
  navItem: { alignItems: 'center', minWidth: 48 },
  navIcon: { color: '#B5A4B3', fontSize: 19, fontWeight: '800' },
  navLabel: { color: '#B5A4B3', fontSize: 9, marginTop: 3, fontWeight: '700' },
  navActive: { color: '#D56F9F' },
});
