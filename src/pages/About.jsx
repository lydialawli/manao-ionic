import { IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { americanFootball, basketball, beer, bluetooth, boat, build, flask, football, paperPlane, wifi } from 'ionicons/icons';
import React from 'react';
import '../styles/toolbar.css'

class About extends React.Component {
  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar className="toolbar">
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>About Manao</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <ListItems />
        </IonContent>
      </IonPage >
    )
  }
}

const ListItems = () => {
  const icons = [
    flask,
    wifi,
    beer,
    football,
    basketball,
    paperPlane,
    americanFootball,
    boat,
    bluetooth,
    build
  ];

  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(x => {
    return (
      <IonItem key={x}>
        <IonIcon icon={icons[x - 1]} slot="start" />
        Item {x}
        <div className="item-note" slot="end">
          This is item # {x}
        </div>
      </IonItem>
    );
  });

  return <IonList>{items}</IonList>;
};


export default About;