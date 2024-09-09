import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getPerformance, providePerformance } from '@angular/fire/performance';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'little-linguist-dc21f',
        appId: '1:118777750763:web:dd939ccd8721e1b43a0aae',
        storageBucket: 'little-linguist-dc21f.appspot.com',
        apiKey: 'AIzaSyBTV1vmqYVK0fXmcy5KzOHp6z6cZUBJuRg',
        authDomain: 'little-linguist-dc21f.firebaseapp.com',
        messagingSenderId: '118777750763',
        measurementId: 'G-RF8NCMRJC6',
      })
    ),
    provideFirestore(() => getFirestore()),
    providePerformance(() => getPerformance()),
  ],
};
