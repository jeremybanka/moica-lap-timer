import {
  IonContent,
  IonPage,
} from '@ionic/react'
import Timer from '../components/Timer'

const Home: React.FC = () => (
  <IonPage>
    <IonContent fullscreen>
      <Timer />
    </IonContent>
  </IonPage>
)
export default Home
