import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyB1MW7pASNs_Kgm_ribo9uZly95NDX1kQY',
  authDomain: 'restaurant-app-356708.firebaseapp.com',
  projectId: 'restaurant-app-356708',
  storageBucket: 'restaurant-app-356708.appspot.com',
  messagingSenderId: '308437814384',
  appId: '1:308437814384:web:f6b0114868ed35885038b5',
  measurementId: 'G-Q9HVGDHJJ2',
}

const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app);
