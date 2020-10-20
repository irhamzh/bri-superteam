import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCepvPNPIurU2gzXF0Pt5IA2sf3YXhdIu4',
  authDomain: 'geochat-252415.firebaseapp.com',
  databaseURL: 'https://geochat-252415.firebaseio.com',
  projectId: 'geochat-252415',
  storageBucket: 'geochat-252415.appspot.com',
  messagingSenderId: '408297810709',
  appId: '1:408297810709:web:f7460ce49018d35a54971c',
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export default firebase
